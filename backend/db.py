import os
import sqlite3
from pathlib import Path
from typing import Any

from flask import g

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DB_PATH = ROOT_DIR / "data" / "payguard.db"

SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id TEXT NOT NULL,
    transaction_type TEXT NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    currency TEXT NOT NULL,
    device_id TEXT,
    location TEXT,
    created_at TEXT NOT NULL,
    is_fraud INTEGER NOT NULL DEFAULT 0 CHECK (is_fraud IN (0, 1)),
    fraud_score REAL,
    metadata_json TEXT,
    inserted_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id INTEGER NOT NULL,
    risk_score REAL NOT NULL,
    alert_type TEXT NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    resolved_at TEXT,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS model_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model_name TEXT NOT NULL,
    model_version TEXT,
    metrics_json TEXT,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
"""


def get_db_path() -> Path:
    configured = os.getenv("PAYGUARD_DB_PATH", str(DEFAULT_DB_PATH))
    return Path(configured)


def init_db() -> None:
    db_path = get_db_path()
    db_path.parent.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(db_path) as conn:
        conn.execute("PRAGMA foreign_keys = ON;")
        conn.executescript(SCHEMA_SQL)
        conn.commit()


def get_connection() -> sqlite3.Connection:
    conn = g.get("db_connection")
    if conn is None:
        db_path = get_db_path()
        db_path.parent.mkdir(parents=True, exist_ok=True)

        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON;")
        g.db_connection = conn
    return conn


def close_connection(_error: BaseException | None = None) -> None:
    conn = g.pop("db_connection", None)
    if conn is not None:
        conn.close()


def ping_db() -> bool:
    conn = get_connection()
    conn.execute("SELECT 1;").fetchone()
    return True


def insert_transaction(payload: dict[str, Any]) -> int:
    conn = get_connection()
    cursor = conn.execute(
        """
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
        """,
        (
            payload["account_id"],
            payload["transaction_type"],
            payload["amount"],
            payload["currency"],
            payload.get("device_id"),
            payload.get("location"),
            payload["created_at"],
            payload["is_fraud"],
            payload.get("fraud_score"),
            payload.get("metadata_json"),
        ),
    )
    conn.commit()
    return int(cursor.lastrowid)


def fetch_transactions(limit: int = 20, account_id: str | None = None) -> list[dict[str, Any]]:
    conn = get_connection()
    if account_id:
        rows = conn.execute(
            """
            SELECT
                id, account_id, transaction_type, amount, currency, device_id,
                location, created_at, is_fraud, fraud_score, metadata_json, inserted_at
            FROM transactions
            WHERE account_id = ?
            ORDER BY created_at DESC, id DESC
            LIMIT ?
            """,
            (account_id, limit),
        ).fetchall()
    else:
        rows = conn.execute(
            """
            SELECT
                id, account_id, transaction_type, amount, currency, device_id,
                location, created_at, is_fraud, fraud_score, metadata_json, inserted_at
            FROM transactions
            ORDER BY created_at DESC, id DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()

    items = [dict(row) for row in rows]
    for item in items:
        item["is_fraud"] = bool(item["is_fraud"])
    return items
