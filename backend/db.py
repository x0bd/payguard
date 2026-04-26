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


def fetch_account_history(
    account_id: str,
    before_created_at: str | None = None,
    limit: int = 5000,
) -> list[dict[str, Any]]:
    conn = get_connection()
    rows = conn.execute(
        """
        SELECT
            account_id,
            transaction_type,
            amount,
            currency,
            device_id,
            location,
            created_at,
            is_fraud
        FROM transactions
        WHERE account_id = ?
        ORDER BY created_at DESC, id DESC
        LIMIT ?
        """,
        (account_id, limit),
    ).fetchall()

    items = [dict(row) for row in rows]
    items.reverse()
    for item in items:
        item["is_fraud"] = int(item["is_fraud"])
    return items


def insert_alert(
    transaction_id: int,
    risk_score: float,
    alert_type: str,
    reason: str | None,
    status: str = "open",
) -> int:
    conn = get_connection()
    cursor = conn.execute(
        """
        INSERT INTO alerts (
            transaction_id,
            risk_score,
            alert_type,
            reason,
            status
        ) VALUES (?, ?, ?, ?, ?)
        """,
        (transaction_id, risk_score, alert_type, reason, status),
    )
    conn.commit()
    return int(cursor.lastrowid)


def fetch_alerts(
    limit: int = 20,
    status: str | None = None,
    min_risk: float | None = None,
) -> list[dict[str, Any]]:
    conn = get_connection()
    conditions: list[str] = []
    params: list[Any] = []

    if status:
        conditions.append("a.status = ?")
        params.append(status)
    if min_risk is not None:
        conditions.append("a.risk_score >= ?")
        params.append(min_risk)

    where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""

    rows = conn.execute(
        f"""
        SELECT
            a.id,
            a.transaction_id,
            a.risk_score,
            a.alert_type,
            a.reason,
            a.status,
            a.created_at,
            a.resolved_at,
            t.account_id,
            t.transaction_type,
            t.amount,
            t.currency,
            t.device_id,
            t.location
        FROM alerts a
        JOIN transactions t ON t.id = a.transaction_id
        {where_clause}
        ORDER BY a.created_at DESC, a.id DESC
        LIMIT ?
        """,
        (*params, limit),
    ).fetchall()

    return [dict(row) for row in rows]


def fetch_alert_by_id(alert_id: int) -> dict[str, Any] | None:
    conn = get_connection()
    row = conn.execute(
        """
        SELECT
            a.id,
            a.transaction_id,
            a.risk_score,
            a.alert_type,
            a.reason,
            a.status,
            a.created_at,
            a.resolved_at,
            t.account_id,
            t.transaction_type,
            t.amount,
            t.currency,
            t.device_id,
            t.location,
            t.fraud_score,
            t.is_fraud,
            t.metadata_json,
            t.created_at AS transaction_created_at
        FROM alerts a
        JOIN transactions t ON t.id = a.transaction_id
        WHERE a.id = ?
        """,
        (alert_id,),
    ).fetchone()
    if row is None:
        return None
    item = dict(row)
    item["is_fraud"] = bool(item["is_fraud"])
    return item


def update_alert_status(alert_id: int, status: str, resolved_at: str | None = None) -> bool:
    conn = get_connection()
    cursor = conn.execute(
        "UPDATE alerts SET status = ?, resolved_at = ? WHERE id = ?",
        (status, resolved_at, alert_id),
    )
    conn.commit()
    return cursor.rowcount > 0


def fetch_account_profile(account_id: str) -> dict[str, Any] | None:
    conn = get_connection()
    tx_row = conn.execute(
        """
        SELECT
            COUNT(*) AS total_transactions,
            SUM(is_fraud) AS fraud_count,
            ROUND(AVG(amount), 4) AS avg_amount,
            ROUND(MAX(amount), 4) AS max_amount,
            MIN(created_at) AS first_transaction,
            MAX(created_at) AS last_transaction,
            ROUND(AVG(CASE WHEN fraud_score IS NOT NULL THEN fraud_score END), 4) AS avg_risk_score
        FROM transactions
        WHERE account_id = ?
        """,
        (account_id,),
    ).fetchone()

    if tx_row is None or tx_row["total_transactions"] == 0:
        return None

    alert_row = conn.execute(
        """
        SELECT
            COUNT(*) AS total_alerts,
            SUM(CASE WHEN a.status = 'open' THEN 1 ELSE 0 END) AS open_alerts
        FROM alerts a
        JOIN transactions t ON t.id = a.transaction_id
        WHERE t.account_id = ?
        """,
        (account_id,),
    ).fetchone()

    profile = dict(tx_row)
    profile["account_id"] = account_id
    profile["fraud_count"] = int(profile.get("fraud_count") or 0)
    total = profile["total_transactions"]
    profile["fraud_rate_percent"] = round(profile["fraud_count"] / total * 100, 4) if total else 0.0
    profile["total_alerts"] = int(alert_row["total_alerts"] or 0) if alert_row else 0
    profile["open_alerts"] = int(alert_row["open_alerts"] or 0) if alert_row else 0
    return profile


def fetch_account_transactions(
    account_id: str,
    limit: int = 50,
    offset: int = 0,
) -> list[dict[str, Any]]:
    conn = get_connection()
    rows = conn.execute(
        """
        SELECT
            id, account_id, transaction_type, amount, currency, device_id,
            location, created_at, is_fraud, fraud_score, inserted_at
        FROM transactions
        WHERE account_id = ?
        ORDER BY created_at DESC, id DESC
        LIMIT ? OFFSET ?
        """,
        (account_id, limit, offset),
    ).fetchall()
    items = [dict(row) for row in rows]
    for item in items:
        item["is_fraud"] = bool(item["is_fraud"])
    return items


def fetch_metrics() -> dict[str, Any]:
    conn = get_connection()

    total_transactions = int(conn.execute("SELECT COUNT(*) FROM transactions;").fetchone()[0])
    flagged_transactions = int(
        conn.execute("SELECT COUNT(*) FROM transactions WHERE is_fraud = 1;").fetchone()[0]
    )
    average_risk_score = conn.execute(
        "SELECT AVG(fraud_score) FROM transactions WHERE fraud_score IS NOT NULL;"
    ).fetchone()[0]

    total_alerts = int(conn.execute("SELECT COUNT(*) FROM alerts;").fetchone()[0])
    open_alerts = int(conn.execute("SELECT COUNT(*) FROM alerts WHERE status = 'open';").fetchone()[0])
    high_risk_alerts = int(
        conn.execute("SELECT COUNT(*) FROM alerts WHERE risk_score >= 0.8;").fetchone()[0]
    )

    tx_last_24h = int(
        conn.execute(
            "SELECT COUNT(*) FROM transactions WHERE datetime(created_at) >= datetime('now', '-24 hours');"
        ).fetchone()[0]
    )
    alerts_last_24h = int(
        conn.execute(
            "SELECT COUNT(*) FROM alerts WHERE datetime(created_at) >= datetime('now', '-24 hours');"
        ).fetchone()[0]
    )

    alert_type_rows = conn.execute(
        "SELECT alert_type, COUNT(*) AS count FROM alerts GROUP BY alert_type ORDER BY count DESC;"
    ).fetchall()
    alert_type_breakdown = {str(row["alert_type"]): int(row["count"]) for row in alert_type_rows}

    fraud_rate_percent = (flagged_transactions / total_transactions * 100.0) if total_transactions else 0.0

    return {
        "total_transactions": total_transactions,
        "flagged_transactions": flagged_transactions,
        "fraud_rate_percent": round(fraud_rate_percent, 4),
        "average_risk_score": round(float(average_risk_score or 0.0), 4),
        "total_alerts": total_alerts,
        "open_alerts": open_alerts,
        "high_risk_alerts": high_risk_alerts,
        "transactions_last_24h": tx_last_24h,
        "alerts_last_24h": alerts_last_24h,
        "alert_type_breakdown": alert_type_breakdown,
    }
