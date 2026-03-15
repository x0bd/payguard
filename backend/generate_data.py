from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_PATH = ROOT_DIR / "data" / "transactions.csv"

TRANSACTION_TYPES = [
    "cash_in",
    "cash_out",
    "bill_payment",
    "p2p_transfer",
    "merchant_payment",
]
TRANSACTION_TYPE_WEIGHTS = [0.12, 0.26, 0.16, 0.32, 0.14]

LOCATIONS = [
    "Harare",
    "Bulawayo",
    "Mutare",
    "Gweru",
    "Masvingo",
    "Chinhoyi",
    "Kadoma",
    "Kwekwe",
    "Lusaka",
    "Kitwe",
]

CURRENCIES = ["USD", "ZWL"]
CURRENCY_WEIGHTS = [0.72, 0.28]


@dataclass
class AccountProfile:
    account_id: str
    home_location: str
    primary_device: str
    daily_tx_lambda: float
    avg_amount: float


class TransactionGenerator:
    def __init__(self, n_accounts: int, days: int, seed: int):
        self.n_accounts = n_accounts
        self.days = days
        self.seed = seed
        self.rng = np.random.default_rng(seed)

    def _build_profiles(self) -> list[AccountProfile]:
        profiles: list[AccountProfile] = []
        for idx in range(1, self.n_accounts + 1):
            account_id = f"ZW-EC-{idx:05d}"
            home_location = str(self.rng.choice(LOCATIONS))
            primary_device = f"dev-{self.rng.integers(10_000, 99_999)}"
            daily_tx_lambda = float(self.rng.uniform(2.4, 8.2))
            avg_amount = float(self.rng.uniform(4.0, 120.0))
            profiles.append(
                AccountProfile(
                    account_id=account_id,
                    home_location=home_location,
                    primary_device=primary_device,
                    daily_tx_lambda=daily_tx_lambda,
                    avg_amount=avg_amount,
                )
            )
        return profiles

    def _random_timestamp(self, start: datetime, end: datetime) -> str:
        span_seconds = int((end - start).total_seconds())
        offset = int(self.rng.integers(0, max(1, span_seconds)))
        ts = start + timedelta(seconds=offset)
        return ts.isoformat()

    def generate_normal_transactions(self) -> pd.DataFrame:
        profiles = self._build_profiles()
        start = datetime.now(timezone.utc) - timedelta(days=self.days)
        end = datetime.now(timezone.utc)

        rows: list[dict[str, Any]] = []

        for profile in profiles:
            tx_count = int(self.rng.poisson(profile.daily_tx_lambda * self.days))
            tx_count = max(tx_count, 1)

            for _ in range(tx_count):
                transaction_type = str(self.rng.choice(TRANSACTION_TYPES, p=TRANSACTION_TYPE_WEIGHTS))
                base_amount = float(self.rng.lognormal(mean=np.log(profile.avg_amount + 1.0), sigma=0.55))
                type_multiplier = {
                    "cash_in": 0.95,
                    "cash_out": 1.15,
                    "bill_payment": 1.25,
                    "p2p_transfer": 1.0,
                    "merchant_payment": 0.82,
                }[transaction_type]
                amount = round(max(0.35, base_amount * type_multiplier), 2)

                use_primary_device = bool(self.rng.random() < 0.93)
                device_id = profile.primary_device if use_primary_device else f"dev-{self.rng.integers(10_000, 99_999)}"

                use_home_location = bool(self.rng.random() < 0.90)
                location = profile.home_location if use_home_location else str(self.rng.choice(LOCATIONS))

                rows.append(
                    {
                        "account_id": profile.account_id,
                        "transaction_type": transaction_type,
                        "amount": amount,
                        "currency": str(self.rng.choice(CURRENCIES, p=CURRENCY_WEIGHTS)),
                        "device_id": device_id,
                        "location": location,
                        "created_at": self._random_timestamp(start, end),
                        "is_fraud": 0,
                        "fraud_score": round(float(self.rng.uniform(0.01, 0.18)), 4),
                        "fraud_pattern": "none",
                    }
                )

        return pd.DataFrame(rows)

    def inject_amount_spike_fraud(self, df: pd.DataFrame, ratio: float = 0.012) -> pd.DataFrame:
        eligible_idx = df.index[df["is_fraud"] == 0].to_numpy()
        n_targets = max(1, int(len(df) * ratio))
        if len(eligible_idx) == 0:
            return df

        selected_idx = self.rng.choice(eligible_idx, size=min(n_targets, len(eligible_idx)), replace=False)
        median_by_account = df.groupby("account_id")["amount"].median().to_dict()

        for idx in selected_idx:
            account_id = df.at[idx, "account_id"]
            median_amount = float(median_by_account.get(account_id, 40.0))
            spike = median_amount * float(self.rng.uniform(4.5, 11.5)) + float(self.rng.uniform(60, 420))
            df.at[idx, "amount"] = round(spike, 2)
            df.at[idx, "is_fraud"] = 1
            df.at[idx, "fraud_score"] = round(float(self.rng.uniform(0.82, 0.99)), 4)
            df.at[idx, "fraud_pattern"] = "amount_spike"
        return df

    def inject_device_location_change_fraud(self, df: pd.DataFrame, ratio: float = 0.01) -> pd.DataFrame:
        eligible_idx = df.index[df["is_fraud"] == 0].to_numpy()
        n_targets = max(1, int(len(df) * ratio))
        if len(eligible_idx) == 0:
            return df

        selected_idx = self.rng.choice(eligible_idx, size=min(n_targets, len(eligible_idx)), replace=False)
        for idx in selected_idx:
            current_location = str(df.at[idx, "location"])
            candidate_locations = [location for location in LOCATIONS if location != current_location]
            df.at[idx, "device_id"] = f"dev-{self.rng.integers(100_000, 999_999)}"
            df.at[idx, "location"] = str(self.rng.choice(candidate_locations))
            df.at[idx, "is_fraud"] = 1
            df.at[idx, "fraud_score"] = round(float(self.rng.uniform(0.74, 0.95)), 4)
            df.at[idx, "fraud_pattern"] = "device_location_change"
        return df

    def inject_rapid_burst_fraud(self, df: pd.DataFrame, account_ratio: float = 0.05) -> pd.DataFrame:
        burst_rows: list[dict[str, Any]] = []
        unique_accounts = df["account_id"].unique()
        if len(unique_accounts) == 0:
            return df

        n_accounts = max(1, int(len(unique_accounts) * account_ratio))
        selected_accounts = self.rng.choice(unique_accounts, size=min(n_accounts, len(unique_accounts)), replace=False)

        for account_id in selected_accounts:
            account_df = df[df["account_id"] == account_id]
            if account_df.empty:
                continue

            anchor_row = account_df.sample(1, random_state=int(self.rng.integers(0, 1_000_000))).iloc[0]
            anchor_time = datetime.fromisoformat(str(anchor_row["created_at"]))
            account_median_amount = float(account_df["amount"].median())
            burst_size = int(self.rng.integers(5, 13))

            for _ in range(burst_size):
                burst_rows.append(
                    {
                        "account_id": account_id,
                        "transaction_type": "p2p_transfer",
                        "amount": round(max(0.4, account_median_amount * float(self.rng.uniform(0.7, 1.6))), 2),
                        "currency": str(self.rng.choice(CURRENCIES, p=CURRENCY_WEIGHTS)),
                        "device_id": f"dev-{self.rng.integers(100_000, 999_999)}",
                        "location": str(self.rng.choice(LOCATIONS)),
                        "created_at": (
                            anchor_time + timedelta(seconds=int(self.rng.integers(5, 420)))
                        ).isoformat(),
                        "is_fraud": 1,
                        "fraud_score": round(float(self.rng.uniform(0.78, 0.98)), 4),
                        "fraud_pattern": "rapid_burst",
                    }
                )

        if burst_rows:
            burst_df = pd.DataFrame(burst_rows)
            df = pd.concat([df, burst_df], ignore_index=True)
        return df

    def generate_dataset(self) -> pd.DataFrame:
        df = self.generate_normal_transactions()
        df = self.inject_amount_spike_fraud(df)
        df = self.inject_device_location_change_fraud(df)
        df = self.inject_rapid_burst_fraud(df)

        df["metadata_json"] = df.apply(
            lambda row: json.dumps(
                {
                    "source": "synthetic_generator",
                    "fraud_pattern": row["fraud_pattern"],
                    "seed": self.seed,
                }
            ),
            axis=1,
        )

        df["is_fraud"] = df["is_fraud"].astype(int)
        df["fraud_score"] = pd.to_numeric(df["fraud_score"], errors="coerce").fillna(0).round(4)
        df["amount"] = pd.to_numeric(df["amount"], errors="coerce").fillna(0).round(2)

        df = df.sort_values("created_at").reset_index(drop=True)

        ordered_columns = [
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
            "fraud_pattern",
        ]
        return df[ordered_columns]


def print_validation_summary(df: pd.DataFrame) -> None:
    total = len(df)
    fraud_count = int(df["is_fraud"].sum())
    fraud_rate = (fraud_count / total) * 100 if total else 0.0
    pattern_counts = df[df["is_fraud"] == 1]["fraud_pattern"].value_counts().to_dict()

    print("=== Dataset Validation Summary ===")
    print(f"rows: {total}")
    print(f"fraud_rows: {fraud_count}")
    print(f"fraud_rate_percent: {fraud_rate:.2f}")
    print(f"accounts: {df['account_id'].nunique()}")
    print(f"amount_min: {df['amount'].min():.2f}")
    print(f"amount_max: {df['amount'].max():.2f}")
    print(f"amount_mean: {df['amount'].mean():.2f}")
    print(f"fraud_pattern_breakdown: {pattern_counts}")

    if fraud_rate < 2.0 or fraud_rate > 20.0:
        print("warning: fraud class balance is outside the typical 2%-20% target range.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate synthetic mobile-money transactions.")
    parser.add_argument("--accounts", type=int, default=420, help="Number of unique accounts to simulate.")
    parser.add_argument("--days", type=int, default=45, help="Number of historical days to simulate.")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducible generation.")
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT_PATH,
        help=f"Output CSV path (default: {DEFAULT_OUTPUT_PATH})",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    generator = TransactionGenerator(n_accounts=args.accounts, days=args.days, seed=args.seed)
    dataset = generator.generate_dataset()

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    dataset.to_csv(output_path, index=False)

    print(f"dataset_saved_to: {output_path}")
    print_validation_summary(dataset)


if __name__ == "__main__":
    main()
