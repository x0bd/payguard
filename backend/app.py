import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from flask import Flask, current_app, jsonify, request
from werkzeug.exceptions import BadRequest, HTTPException

from db import (
    close_connection,
    fetch_account_history,
    fetch_alerts,
    fetch_metrics,
    fetch_transactions,
    init_db,
    insert_alert,
    insert_transaction,
    ping_db,
)
from ml.features import build_feature_frame

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_MODEL_PATH = ROOT_DIR / "models" / "fraud_model.joblib"
ALERT_OPEN_THRESHOLD = 0.65


class APIError(Exception):
    def __init__(self, message: str, status_code: int = 400, details: dict[str, Any] | None = None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.details = details or {}


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def parse_timestamp(value: str) -> str:
    if not isinstance(value, str):
        raise APIError("created_at must be an ISO-8601 string.", 400)

    normalized = value.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(normalized)
    except ValueError as exc:
        raise APIError("created_at must be a valid ISO-8601 datetime.", 400) from exc
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    else:
        dt = dt.astimezone(timezone.utc)
    return dt.isoformat()


def parse_is_fraud(value: Any) -> int:
    if isinstance(value, bool):
        return int(value)
    if isinstance(value, int) and value in (0, 1):
        return value
    raise APIError("is_fraud must be true/false or 0/1.", 400)


def validate_transaction_payload(payload: Any) -> dict[str, Any]:
    if not isinstance(payload, dict):
        raise APIError("Request body must be a JSON object.", 400)

    required_fields = ["account_id", "transaction_type", "amount"]
    missing = [field for field in required_fields if field not in payload]
    if missing:
        raise APIError(
            "Missing required fields.",
            400,
            {"missing_fields": missing},
        )

    account_id = str(payload["account_id"]).strip()
    transaction_type = str(payload["transaction_type"]).strip()
    if not account_id:
        raise APIError("account_id cannot be empty.", 400)
    if not transaction_type:
        raise APIError("transaction_type cannot be empty.", 400)

    try:
        amount = float(payload["amount"])
    except (TypeError, ValueError) as exc:
        raise APIError("amount must be a valid number.", 400) from exc

    if amount < 0:
        raise APIError("amount must be greater than or equal to 0.", 400)

    currency = str(payload.get("currency", "USD")).strip().upper()
    if len(currency) != 3:
        raise APIError("currency must be a 3-letter code.", 400)

    created_at = parse_timestamp(payload["created_at"]) if "created_at" in payload else utc_now_iso()

    is_fraud = parse_is_fraud(payload.get("is_fraud", 0))

    fraud_score = payload.get("fraud_score")
    if fraud_score is not None:
        try:
            fraud_score = float(fraud_score)
        except (TypeError, ValueError) as exc:
            raise APIError("fraud_score must be a valid number between 0 and 1.", 400) from exc
        if not 0 <= fraud_score <= 1:
            raise APIError("fraud_score must be between 0 and 1.", 400)

    metadata = payload.get("metadata")
    metadata_json = json.dumps(metadata) if metadata is not None else None

    device_id = payload.get("device_id")
    if device_id is not None:
        device_id = str(device_id).strip() or None

    location = payload.get("location")
    if location is not None:
        location = str(location).strip() or None

    return {
        "account_id": account_id,
        "transaction_type": transaction_type,
        "amount": amount,
        "currency": currency,
        "device_id": device_id,
        "location": location,
        "created_at": created_at,
        "is_fraud": is_fraud,
        "fraud_score": fraud_score,
        "metadata_json": metadata_json,
    }


def load_model_context() -> dict[str, Any]:
    model_path = Path(os.getenv("PAYGUARD_MODEL_PATH", str(DEFAULT_MODEL_PATH)))
    if not model_path.exists():
        raise FileNotFoundError(f"Model artifact not found at: {model_path}")

    payload = joblib.load(model_path)
    if isinstance(payload, dict) and "pipeline" in payload:
        model_name = str(payload.get("model_name", "unknown_model"))
        pipeline = payload["pipeline"]
        numeric_features = list(payload.get("numeric_features", []))
        categorical_features = list(payload.get("categorical_features", []))
    else:
        model_name = type(payload).__name__
        pipeline = payload
        numeric_features = []
        categorical_features = []

    return {
        "model_name": model_name,
        "model_path": str(model_path),
        "pipeline": pipeline,
        "numeric_features": numeric_features,
        "categorical_features": categorical_features,
    }


def risk_level_from_score(score: float) -> str:
    if score >= 0.9:
        return "critical"
    if score >= 0.75:
        return "high"
    if score >= 0.55:
        return "medium"
    return "low"


def merge_metadata(existing_metadata_json: str | None, extra: dict[str, Any]) -> str:
    merged: dict[str, Any] = {}
    if existing_metadata_json:
        try:
            parsed = json.loads(existing_metadata_json)
            if isinstance(parsed, dict):
                merged.update(parsed)
        except json.JSONDecodeError:
            pass
    merged.update(extra)
    return json.dumps(merged)


def build_scoring_features(
    account_history: list[dict[str, Any]],
    incoming_transaction: dict[str, Any],
) -> tuple[pd.DataFrame, dict[str, Any]]:
    records: list[dict[str, Any]] = []

    for row in account_history:
        records.append(
            {
                "account_id": str(row.get("account_id", incoming_transaction["account_id"])),
                "transaction_type": str(row.get("transaction_type", "p2p_transfer")),
                "amount": float(row.get("amount", 0.0)),
                "currency": str(row.get("currency", "USD")).upper(),
                "device_id": str(row.get("device_id") or "unknown"),
                "location": str(row.get("location") or "unknown"),
                "created_at": row.get("created_at"),
                "is_fraud": int(row.get("is_fraud", 0)),
                "source": "history",
            }
        )

    records.append(
        {
            "account_id": incoming_transaction["account_id"],
            "transaction_type": incoming_transaction["transaction_type"],
            "amount": float(incoming_transaction["amount"]),
            "currency": incoming_transaction["currency"],
            "device_id": str(incoming_transaction.get("device_id") or "unknown"),
            "location": str(incoming_transaction.get("location") or "unknown"),
            "created_at": incoming_transaction["created_at"],
            "is_fraud": 0,
            "source": "target",
        }
    )

    frame = pd.DataFrame(records)
    frame["created_at"] = pd.to_datetime(
        frame["created_at"],
        errors="coerce",
        utc=True,
        format="mixed",
    )
    frame = frame[frame["created_at"].notna()].copy()

    if frame.empty:
        raise APIError("Unable to build scoring features from transaction history.", 400)

    target_rows = frame[frame["source"] == "target"]
    if target_rows.empty:
        raise APIError("Unable to locate target transaction for scoring.", 400)

    target_timestamp = target_rows["created_at"].max()
    history_rows = frame[(frame["source"] == "history") & (frame["created_at"] <= target_timestamp)]
    frame = pd.concat([history_rows, target_rows], ignore_index=True)

    bundle = build_feature_frame(frame)
    if bundle.X.empty:
        raise APIError("Unable to compute scoring features.", 400)

    target_mask = bundle.frame["source"] == "target"
    target_feature_rows = bundle.X[target_mask]
    target_engineered_rows = bundle.frame[target_mask]
    if target_feature_rows.empty or target_engineered_rows.empty:
        raise APIError("Unable to compute target scoring row.", 400)

    model_input = target_feature_rows.tail(1).copy()
    engineered_row = target_engineered_rows.tail(1).iloc[0]
    key_features = {
        "amount": round(float(engineered_row["amount"]), 4),
        "amount_to_prior_avg_ratio": round(float(engineered_row["amount_to_prior_avg_ratio"]), 4),
        "seconds_since_prev_tx": round(float(engineered_row["seconds_since_prev_tx"]), 4),
        "tx_count_last_1h": round(float(engineered_row["tx_count_last_1h"]), 4),
        "tx_count_last_24h": round(float(engineered_row["tx_count_last_24h"]), 4),
        "device_change": int(engineered_row["device_change"]),
        "location_change": int(engineered_row["location_change"]),
    }
    return model_input, key_features


def build_alert_reason(key_features: dict[str, Any]) -> str:
    reasons: list[str] = []
    if float(key_features.get("amount_to_prior_avg_ratio", 0)) >= 3.0:
        reasons.append("amount exceeds account baseline")
    if float(key_features.get("tx_count_last_1h", 0)) >= 4:
        reasons.append("high transaction velocity in last hour")
    if int(key_features.get("device_change", 0)) == 1:
        reasons.append("device changed")
    if int(key_features.get("location_change", 0)) == 1:
        reasons.append("location changed")
    if float(key_features.get("seconds_since_prev_tx", 99999)) <= 120:
        reasons.append("rapid repeat transaction interval")

    return "; ".join(reasons) if reasons else "model risk pattern detected"


def create_app() -> Flask:
    app = Flask(__name__)
    init_db()
    model_context: dict[str, Any] | None = None
    model_error: str | None = None
    try:
        model_context = load_model_context()
    except Exception as exc:  # pragma: no cover - defensive startup path
        model_error = str(exc)

    app.config["MODEL_CONTEXT"] = model_context
    app.config["MODEL_ERROR"] = model_error

    @app.teardown_appcontext
    def _close_db(error: BaseException | None) -> None:
        close_connection(error)

    @app.errorhandler(APIError)
    def handle_api_error(error: APIError):
        return (
            jsonify(
                {
                    "error": error.message,
                    "details": error.details,
                }
            ),
            error.status_code,
        )

    @app.errorhandler(BadRequest)
    def handle_bad_request(error: BadRequest):
        return jsonify({"error": "Invalid JSON request body.", "details": {"reason": str(error)}}), 400

    @app.errorhandler(Exception)
    def handle_unexpected_error(error: Exception):
        if isinstance(error, HTTPException):
            return jsonify({"error": error.description}), error.code
        return jsonify({"error": "Internal server error."}), 500

    @app.get("/api/health")
    def health_check():
        ping_db()
        model_context = current_app.config.get("MODEL_CONTEXT")
        model_status = "loaded" if model_context else "unavailable"
        return jsonify(
            {
                "status": "ok",
                "service": "payguard-api",
                "database": "connected",
                "model_status": model_status,
                "model_name": (model_context or {}).get("model_name"),
                "model_path": (model_context or {}).get("model_path"),
                "model_error": current_app.config.get("MODEL_ERROR"),
                "timestamp": utc_now_iso(),
            }
        )

    @app.post("/api/transactions")
    def create_transaction():
        payload = request.get_json()
        transaction = validate_transaction_payload(payload)
        transaction_id = insert_transaction(transaction)

        return (
            jsonify(
                {
                    "status": "created",
                    "data": {
                        "id": transaction_id,
                        **transaction,
                    },
                }
            ),
            201,
        )

    @app.get("/api/transactions")
    def list_transactions():
        limit_raw = request.args.get("limit", "20")
        try:
            limit = int(limit_raw)
        except ValueError as exc:
            raise APIError("limit must be an integer between 1 and 100.", 400) from exc

        if not 1 <= limit <= 100:
            raise APIError("limit must be an integer between 1 and 100.", 400)

        account_id = request.args.get("account_id")
        items = fetch_transactions(limit=limit, account_id=account_id)

        return jsonify({"count": len(items), "data": items})

    @app.post("/api/score")
    def score_transaction():
        model_context = current_app.config.get("MODEL_CONTEXT")
        if not model_context:
            raise APIError(
                "Fraud model is not loaded. Train a model first with `python backend/train.py`.",
                503,
                {"model_error": current_app.config.get("MODEL_ERROR")},
            )

        payload = request.get_json()
        transaction = validate_transaction_payload(payload)

        account_history = fetch_account_history(
            account_id=transaction["account_id"],
            limit=5000,
        )

        model_input, key_features = build_scoring_features(account_history, transaction)

        pipeline = model_context["pipeline"]
        predicted_label = int(pipeline.predict(model_input)[0])
        if hasattr(pipeline, "predict_proba"):
            risk_score = float(pipeline.predict_proba(model_input)[0][1])
        else:
            risk_score = float(predicted_label)

        risk_level = risk_level_from_score(risk_score)
        reason = build_alert_reason(key_features)
        alert_status = "open" if (predicted_label == 1 or risk_score >= ALERT_OPEN_THRESHOLD) else "closed"
        alert_type = f"{risk_level}_risk"

        transaction["is_fraud"] = predicted_label
        transaction["fraud_score"] = risk_score
        transaction["metadata_json"] = merge_metadata(
            transaction.get("metadata_json"),
            {
                "source": "api_score",
                "model_name": model_context["model_name"],
                "risk_level": risk_level,
                "alert_type": alert_type,
            },
        )

        transaction_id = insert_transaction(transaction)
        alert_id = insert_alert(
            transaction_id=transaction_id,
            risk_score=risk_score,
            alert_type=alert_type,
            reason=reason,
            status=alert_status,
        )

        return (
            jsonify(
                {
                    "status": "scored",
                    "data": {
                        "transaction_id": transaction_id,
                        "alert_id": alert_id,
                        "predicted_label": predicted_label,
                        "risk_score": round(risk_score, 6),
                        "risk_level": risk_level,
                        "alert_status": alert_status,
                        "alert_type": alert_type,
                        "key_features": key_features,
                        "reason": reason,
                        "model_name": model_context["model_name"],
                    },
                }
            ),
            201,
        )

    @app.get("/api/alerts")
    def list_alerts():
        limit_raw = request.args.get("limit", "20")
        try:
            limit = int(limit_raw)
        except ValueError as exc:
            raise APIError("limit must be an integer between 1 and 200.", 400) from exc
        if not 1 <= limit <= 200:
            raise APIError("limit must be an integer between 1 and 200.", 400)

        status = request.args.get("status")
        if status is not None:
            status = status.strip().lower()
            if status not in {"open", "closed", "resolved"}:
                raise APIError("status must be one of: open, closed, resolved.", 400)

        min_risk_raw = request.args.get("min_risk")
        min_risk: float | None = None
        if min_risk_raw is not None:
            try:
                min_risk = float(min_risk_raw)
            except ValueError as exc:
                raise APIError("min_risk must be a number between 0 and 1.", 400) from exc
            if not 0 <= min_risk <= 1:
                raise APIError("min_risk must be a number between 0 and 1.", 400)

        items = fetch_alerts(limit=limit, status=status, min_risk=min_risk)
        return jsonify({"count": len(items), "data": items})

    @app.get("/api/metrics")
    def get_metrics():
        metrics = fetch_metrics()
        model_context = current_app.config.get("MODEL_CONTEXT")
        metrics["model_status"] = "loaded" if model_context else "unavailable"
        metrics["model_name"] = (model_context or {}).get("model_name")
        return jsonify(metrics)

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
