from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import numpy as np
import pandas as pd

REQUIRED_COLUMNS = [
    "account_id",
    "transaction_type",
    "amount",
    "currency",
    "device_id",
    "location",
    "created_at",
    "is_fraud",
]


@dataclass
class FeatureBundle:
    X: pd.DataFrame
    y: pd.Series
    frame: pd.DataFrame
    numeric_features: list[str]
    categorical_features: list[str]


def load_transactions(csv_path: Path) -> pd.DataFrame:
    if not csv_path.exists():
        raise FileNotFoundError(f"Dataset file not found: {csv_path}")

    df = pd.read_csv(csv_path)
    missing = [column for column in REQUIRED_COLUMNS if column not in df.columns]
    if missing:
        raise ValueError(f"Dataset is missing required columns: {missing}")

    clean = df.copy()
    clean["account_id"] = clean["account_id"].astype(str).str.strip()
    clean["transaction_type"] = clean["transaction_type"].astype(str).str.strip().fillna("unknown")
    clean["currency"] = clean["currency"].astype(str).str.strip().str.upper().replace("", "USD")
    clean["device_id"] = clean["device_id"].fillna("unknown").astype(str).str.strip()
    clean["location"] = clean["location"].fillna("unknown").astype(str).str.strip()

    clean["amount"] = pd.to_numeric(clean["amount"], errors="coerce")
    clean["is_fraud"] = pd.to_numeric(clean["is_fraud"], errors="coerce").fillna(0).astype(int).clip(0, 1)

    created_at = pd.to_datetime(clean["created_at"], errors="coerce", utc=True)
    clean = clean[created_at.notna()].copy()
    clean["created_at"] = created_at[created_at.notna()]

    clean = clean[clean["amount"].notna()].copy()
    clean = clean[clean["amount"] >= 0].copy()
    clean.reset_index(drop=True, inplace=True)
    return clean


def _rolling_prior_count(df: pd.DataFrame, window: str) -> pd.Series:
    counts = pd.Series(index=df.index, dtype=float)
    grouped = df.groupby("account_id", sort=False)

    for _, group in grouped:
        local = group.sort_values("created_at")
        local_counts = (
            local.set_index("created_at")["amount"].rolling(window).count().shift(1).fillna(0)
        )
        counts.loc[local.index] = local_counts.to_numpy()

    return counts.fillna(0.0)


def build_feature_frame(df: pd.DataFrame) -> FeatureBundle:
    frame = df.sort_values(["account_id", "created_at"]).reset_index(drop=True).copy()
    grouped = frame.groupby("account_id", sort=False)

    frame["hour"] = frame["created_at"].dt.hour.astype(int)
    frame["day_of_week"] = frame["created_at"].dt.dayofweek.astype(int)
    frame["is_weekend"] = frame["day_of_week"].isin([5, 6]).astype(int)
    frame["is_night"] = frame["hour"].isin([0, 1, 2, 3, 4, 5]).astype(int)

    frame["amount_log"] = np.log1p(frame["amount"])
    frame["account_prior_tx_count"] = grouped.cumcount().astype(float)

    frame["account_prior_amount_sum"] = grouped["amount"].cumsum() - frame["amount"]
    global_median_amount = float(frame["amount"].median())
    frame["account_prior_avg_amount"] = np.where(
        frame["account_prior_tx_count"] > 0,
        frame["account_prior_amount_sum"] / frame["account_prior_tx_count"],
        global_median_amount,
    )
    frame["amount_to_prior_avg_ratio"] = frame["amount"] / (frame["account_prior_avg_amount"] + 1e-6)
    frame["amount_delta_from_prior_avg"] = frame["amount"] - frame["account_prior_avg_amount"]

    frame["account_age_hours"] = (
        frame["created_at"] - grouped["created_at"].transform("min")
    ).dt.total_seconds() / 3600.0
    frame["seconds_since_prev_tx"] = grouped["created_at"].diff().dt.total_seconds().fillna(86400.0)
    frame["seconds_since_prev_tx"] = frame["seconds_since_prev_tx"].clip(lower=0.0, upper=86400.0 * 30)

    previous_device = grouped["device_id"].shift(1)
    previous_location = grouped["location"].shift(1)
    frame["device_change"] = (
        (frame["account_prior_tx_count"] > 0) & (frame["device_id"] != previous_device)
    ).astype(int)
    frame["location_change"] = (
        (frame["account_prior_tx_count"] > 0) & (frame["location"] != previous_location)
    ).astype(int)

    frame["tx_count_last_1h"] = _rolling_prior_count(frame, "1h")
    frame["tx_count_last_24h"] = _rolling_prior_count(frame, "24h")

    numeric_features = [
        "amount",
        "amount_log",
        "hour",
        "day_of_week",
        "is_weekend",
        "is_night",
        "account_prior_tx_count",
        "account_prior_avg_amount",
        "amount_to_prior_avg_ratio",
        "amount_delta_from_prior_avg",
        "account_age_hours",
        "seconds_since_prev_tx",
        "tx_count_last_1h",
        "tx_count_last_24h",
        "device_change",
        "location_change",
    ]

    categorical_features = [
        "transaction_type",
        "currency",
        "location",
    ]

    for column in numeric_features:
        frame[column] = pd.to_numeric(frame[column], errors="coerce").fillna(0.0)

    X = frame[numeric_features + categorical_features].copy()
    y = frame["is_fraud"].astype(int).copy()

    return FeatureBundle(
        X=X,
        y=y,
        frame=frame,
        numeric_features=numeric_features,
        categorical_features=categorical_features,
    )

