from __future__ import annotations

import argparse
import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import joblib
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from ml.features import build_feature_frame, load_transactions

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DATASET_PATH = ROOT_DIR / "data" / "transactions.csv"
DEFAULT_MODELS_DIR = ROOT_DIR / "models"


@dataclass
class ModelResult:
    model_name: str
    precision: float
    recall: float
    f1: float
    roc_auc: float
    train_rows: int
    test_rows: int


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Train fraud detection models for PayGuard.")
    parser.add_argument(
        "--dataset",
        type=Path,
        default=DEFAULT_DATASET_PATH,
        help=f"Path to training dataset CSV (default: {DEFAULT_DATASET_PATH})",
    )
    parser.add_argument(
        "--models-dir",
        type=Path,
        default=DEFAULT_MODELS_DIR,
        help=f"Directory to save trained model artifacts (default: {DEFAULT_MODELS_DIR})",
    )
    parser.add_argument("--test-size", type=float, default=0.2, help="Test split ratio (default: 0.2)")
    parser.add_argument("--random-seed", type=int, default=42, help="Random seed (default: 42)")
    return parser.parse_args()


def _build_preprocessor(numeric_features: list[str], categorical_features: list[str]) -> ColumnTransformer:
    return ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numeric_features),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features),
        ],
        remainder="drop",
    )


def _evaluate_model(model: Pipeline, X_test, y_test) -> tuple[dict[str, float], Any]:
    y_pred = model.predict(X_test)
    if hasattr(model, "predict_proba"):
        y_score = model.predict_proba(X_test)[:, 1]
    else:
        y_score = y_pred

    metrics = {
        "precision": float(precision_score(y_test, y_pred, zero_division=0)),
        "recall": float(recall_score(y_test, y_pred, zero_division=0)),
        "f1": float(f1_score(y_test, y_pred, zero_division=0)),
        "roc_auc": float(roc_auc_score(y_test, y_score)),
    }
    return metrics, y_score


def train_models(dataset_path: Path, models_dir: Path, test_size: float, random_seed: int) -> dict[str, Any]:
    raw = load_transactions(dataset_path)
    bundle = build_feature_frame(raw)

    X_train, X_test, y_train, y_test = train_test_split(
        bundle.X,
        bundle.y,
        test_size=test_size,
        random_state=random_seed,
        stratify=bundle.y,
    )

    logistic_model = Pipeline(
        steps=[
            ("prep", _build_preprocessor(bundle.numeric_features, bundle.categorical_features)),
            (
                "model",
                LogisticRegression(
                    solver="lbfgs",
                    max_iter=1000,
                    class_weight="balanced",
                    random_state=random_seed,
                ),
            ),
        ]
    )

    random_forest_model = Pipeline(
        steps=[
            ("prep", _build_preprocessor(bundle.numeric_features, bundle.categorical_features)),
            (
                "model",
                RandomForestClassifier(
                    n_estimators=240,
                    max_depth=18,
                    min_samples_leaf=2,
                    class_weight="balanced_subsample",
                    random_state=random_seed,
                    n_jobs=-1,
                ),
            ),
        ]
    )

    candidates: dict[str, Pipeline] = {
        "logistic_regression": logistic_model,
        "random_forest": random_forest_model,
    }

    results: dict[str, ModelResult] = {}
    fitted_models: dict[str, Pipeline] = {}

    for name, pipeline in candidates.items():
        pipeline.fit(X_train, y_train)
        metrics, _ = _evaluate_model(pipeline, X_test, y_test)
        results[name] = ModelResult(
            model_name=name,
            precision=metrics["precision"],
            recall=metrics["recall"],
            f1=metrics["f1"],
            roc_auc=metrics["roc_auc"],
            train_rows=len(X_train),
            test_rows=len(X_test),
        )
        fitted_models[name] = pipeline

    ranked = sorted(
        results.values(),
        key=lambda item: (item.roc_auc, item.f1, item.recall),
        reverse=True,
    )
    best_result = ranked[0]
    best_model = fitted_models[best_result.model_name]

    models_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    model_payload = {
        "model_name": best_result.model_name,
        "trained_at_utc": datetime.now(timezone.utc).isoformat(),
        "numeric_features": bundle.numeric_features,
        "categorical_features": bundle.categorical_features,
        "pipeline": best_model,
    }

    best_model_path = models_dir / "fraud_model.joblib"
    versioned_model_path = models_dir / f"fraud_model_{best_result.model_name}_{timestamp}.joblib"
    joblib.dump(model_payload, best_model_path)
    joblib.dump(model_payload, versioned_model_path)

    report = {
        "selected_model": asdict(best_result),
        "all_models": [asdict(result) for result in ranked],
        "dataset": {
            "path": str(dataset_path),
            "rows": int(len(bundle.frame)),
            "fraud_rows": int(bundle.y.sum()),
            "fraud_rate_percent": float((bundle.y.mean()) * 100.0),
        },
        "feature_summary": {
            "numeric_features": bundle.numeric_features,
            "categorical_features": bundle.categorical_features,
        },
        "artifacts": {
            "best_model_path": str(best_model_path),
            "versioned_model_path": str(versioned_model_path),
        },
    }

    report_path = models_dir / "training_report.json"
    with report_path.open("w", encoding="utf-8") as handle:
        json.dump(report, handle, indent=2)

    return report


def main() -> None:
    args = parse_args()
    report = train_models(
        dataset_path=args.dataset,
        models_dir=args.models_dir,
        test_size=args.test_size,
        random_seed=args.random_seed,
    )

    selected = report["selected_model"]
    dataset = report["dataset"]
    artifacts = report["artifacts"]

    print("=== Training Summary ===")
    print(f"dataset_rows: {dataset['rows']}")
    print(f"fraud_rate_percent: {dataset['fraud_rate_percent']:.2f}")
    print(f"selected_model: {selected['model_name']}")
    print(f"precision: {selected['precision']:.4f}")
    print(f"recall: {selected['recall']:.4f}")
    print(f"f1: {selected['f1']:.4f}")
    print(f"roc_auc: {selected['roc_auc']:.4f}")
    print(f"best_model_path: {artifacts['best_model_path']}")
    print(f"versioned_model_path: {artifacts['versioned_model_path']}")
    print(f"report_path: {Path(args.models_dir) / 'training_report.json'}")


if __name__ == "__main__":
    main()
