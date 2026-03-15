import json
from datetime import datetime, timezone
from typing import Any

from flask import Flask, jsonify, request
from werkzeug.exceptions import BadRequest, HTTPException

from db import close_connection, fetch_transactions, init_db, insert_transaction, ping_db


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

    return {
        "account_id": account_id,
        "transaction_type": transaction_type,
        "amount": amount,
        "currency": currency,
        "device_id": payload.get("device_id"),
        "location": payload.get("location"),
        "created_at": created_at,
        "is_fraud": is_fraud,
        "fraud_score": fraud_score,
        "metadata_json": metadata_json,
    }


def create_app() -> Flask:
    app = Flask(__name__)
    init_db()

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
        return jsonify(
            {
                "status": "ok",
                "service": "payguard-api",
                "database": "connected",
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

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
