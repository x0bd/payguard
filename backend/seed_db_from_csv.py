from __future__ import annotations

import argparse
import json
import sqlite3
from pathlib import Path
from typing import Any

import pandas as pd

from db import get_db_path, init_db

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_CSV_PATH = ROOT_DIR / "data" / "transactions.csv"

REQUIRED_COLUMNS = [
    "account_id",
    "transaction_type",
    "amount",
    "currency",
    "device_id",
    "location",
    "created_at",
    "is_fraud",
    "fraud_score",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Seed SQLite transactions from a CSV file.")
    parser.add_argument(
        "--csv",
        type=Path,
        default=DEFAULT_CSV_PATH,
        help=f"Path to CSV input file (default: {DEFAULT_CSV_PATH})",
    )
    parser.add_argument("--truncate", action="store_true", help="Clear existing transactions and alerts before seeding.")
    parser.add_argument("--batch-size", type=int, default=2000, help="Batch size for SQLite inserts.")
    return parser.parse_args()


def _to_metadata_json(row: pd.Series) -> str:
    value = row.get("metadata_json")
    if isinstance(value, str) and value.strip():
        return value
    fallback = {"source": "csv_seed", "fraud_pattern": row.get("fraud_pattern", "unknown")}
    return json.dumps(fallback)


def load_transactions(csv_path: Path) -> pd.DataFrame:
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV file not found: {csv_path}")

    df = pd.read_csv(csv_path)
    missing = [column for column in REQUIRED_COLUMNS if column not in df.columns]
    if missing:
        raise ValueError(f"CSV is missing required columns: {missing}")

    cleaned = df.copy()
    cleaned["account_id"] = cleaned["account_id"].astype(str).str.strip()
    cleaned["transaction_type"] = cleaned["transaction_type"].astype(str).str.strip()
    cleaned["currency"] = cleaned["currency"].astype(str).str.upper().str.strip().replace("", "USD")
    cleaned["device_id"] = cleaned["device_id"].fillna("").astype(str)
    cleaned["location"] = cleaned["location"].fillna("").astype(str)

    cleaned["amount"] = pd.to_numeric(cleaned["amount"], errors="coerce")
    cleaned["is_fraud"] = pd.to_numeric(cleaned["is_fraud"], errors="coerce").fillna(0).astype(int).clip(0, 1)
    cleaned["fraud_score"] = pd.to_numeric(cleaned["fraud_score"], errors="coerce").clip(0, 1)

    created_at = pd.to_datetime(cleaned["created_at"], errors="coerce", utc=True)
    if created_at.isna().any():
        invalid_count = int(created_at.isna().sum())
        raise ValueError(f"CSV contains {invalid_count} rows with invalid created_at timestamps.")
    cleaned["created_at"] = created_at.dt.strftime("%Y-%m-%dT%H:%M:%S%z")

    cleaned = cleaned.dropna(subset=["amount"])
    cleaned = cleaned[cleaned["amount"] >= 0]

    cleaned["metadata_json"] = cleaned.apply(_to_metadata_json, axis=1)

    ordered = cleaned[
        [
            "account_id",
            "transaction_type",
            "amount",
            "currency",
            "device_id",
            "location",
            "created_at",
            "is_fraud",
            "fraud_score",
            "metadata_json",
        ]
    ].copy()

    return ordered


def seed_transactions(df: pd.DataFrame, truncate: bool, batch_size: int) -> dict[str, Any]:
    init_db()
    db_path = get_db_path()
    inserted = 0

    with sqlite3.connect(db_path) as conn:
        conn.execute("PRAGMA foreign_keys = ON;")

        if truncate:
            conn.execute("DELETE FROM alerts;")
            conn.execute("DELETE FROM transactions;")
            conn.commit()

        rows = [
            (
                row["account_id"],
                row["transaction_type"],
                float(row["amount"]),
                row["currency"],
                row["device_id"] or None,
                row["location"] or None,
                row["created_at"],
                int(row["is_fraud"]),
                float(row["fraud_score"]) if pd.notna(row["fraud_score"]) else None,
                row["metadata_json"],
            )
            for _, row in df.iterrows()
        ]

        insert_sql = """
            INSERT INTO transactions (
                account_id,
                transaction_type,
                amount,
                currency,
                device_id,
                location,
                created_at,
                is_fraud,
                fraud_score,
                metadata_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """

        for start in range(0, len(rows), batch_size):
            chunk = rows[start : start + batch_size]
            conn.executemany(insert_sql, chunk)
            inserted += len(chunk)
        conn.commit()

        total_count = int(conn.execute("SELECT COUNT(*) FROM transactions;").fetchone()[0])
        fraud_count = int(conn.execute("SELECT COUNT(*) FROM transactions WHERE is_fraud = 1;").fetchone()[0])

    return {
        "inserted_rows": inserted,
        "total_rows_in_db": total_count,
        "fraud_rows_in_db": fraud_count,
        "db_path": str(db_path),
    }


def main() -> None:
    args = parse_args()
    transactions = load_transactions(args.csv)
    result = seed_transactions(transactions, truncate=args.truncate, batch_size=args.batch_size)

    fraud_rate = (
        (result["fraud_rows_in_db"] / result["total_rows_in_db"]) * 100 if result["total_rows_in_db"] else 0.0
    )
    print(f"seed_source_csv: {args.csv}")
    print(f"inserted_rows: {result['inserted_rows']}")
    print(f"total_rows_in_db: {result['total_rows_in_db']}")
    print(f"fraud_rows_in_db: {result['fraud_rows_in_db']}")
    print(f"fraud_rate_percent: {fraud_rate:.2f}")
    print(f"db_path: {result['db_path']}")


if __name__ == "__main__":
    main()
