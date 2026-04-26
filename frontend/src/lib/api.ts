export const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") || "";

export function getApiUrl(path: string) {
  return `${API_BASE}${path}`;
}

// ── Types ──────────────────────────────────────────────────────────────────

export type MetricsResponse = {
  total_transactions: number;
  flagged_transactions: number;
  fraud_rate_percent: number;
  average_risk_score: number;
  total_alerts: number;
  open_alerts: number;
  high_risk_alerts: number;
  transactions_last_24h: number;
  alerts_last_24h: number;
  alert_type_breakdown: Record<string, number>;
  model_status: string;
  model_name: string | null;
};

export type AlertItem = {
  id: number;
  transaction_id: number;
  risk_score: number;
  alert_type: string;
  reason: string | null;
  status: string;
  created_at: string;
  resolved_at: string | null;
  account_id: string;
  transaction_type: string;
  amount: number;
  currency: string;
  device_id: string | null;
  location: string | null;
};

export type AlertDetail = AlertItem & {
  fraud_score: number | null;
  is_fraud: boolean;
  metadata_json: string | null;
  transaction_created_at: string;
};

export type TransactionItem = {
  id: number;
  account_id: string;
  transaction_type: string;
  amount: number;
  currency: string;
  device_id: string | null;
  location: string | null;
  created_at: string;
  is_fraud: boolean;
  fraud_score: number | null;
  inserted_at: string;
};

export type AccountProfile = {
  account_id: string;
  total_transactions: number;
  fraud_count: number;
  fraud_rate_percent: number;
  avg_amount: number;
  max_amount: number;
  avg_risk_score: number | null;
  first_transaction: string;
  last_transaction: string;
  total_alerts: number;
  open_alerts: number;
};

export type ScoreResponse = {
  transaction_id: number;
  alert_id: number;
  predicted_label: number;
  risk_score: number;
  risk_level: string;
  alert_status: string;
  alert_type: string;
  reason: string;
  model_name: string;
  key_features: {
    amount: number;
    amount_to_prior_avg_ratio: number;
    seconds_since_prev_tx: number;
    tx_count_last_1h: number;
    tx_count_last_24h: number;
    device_change: number;
    location_change: number;
  };
};

// ── Fetch helpers ──────────────────────────────────────────────────────────

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(getApiUrl(path), init);
  const body = await res.json();
  if (!res.ok) {
    throw new Error((body as { error?: string }).error || `HTTP ${res.status}`);
  }
  return body as T;
}

export async function fetchMetrics(): Promise<MetricsResponse> {
  return apiFetch<MetricsResponse>("/api/metrics");
}

export async function fetchAlerts(params?: {
  limit?: number;
  status?: string;
  min_risk?: number;
}): Promise<{ count: number; data: AlertItem[] }> {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.status) qs.set("status", params.status);
  if (params?.min_risk != null) qs.set("min_risk", String(params.min_risk));
  return apiFetch(`/api/alerts?${qs}`);
}

export async function fetchAlertById(id: number): Promise<{ data: AlertDetail }> {
  return apiFetch(`/api/alerts/${id}`);
}

export async function patchAlertStatus(
  id: number,
  status: "open" | "closed" | "resolved",
): Promise<void> {
  await apiFetch(`/api/alerts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export async function fetchTransactions(params?: {
  limit?: number;
  account_id?: string;
}): Promise<{ count: number; data: TransactionItem[] }> {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.account_id) qs.set("account_id", params.account_id);
  return apiFetch(`/api/transactions?${qs}`);
}

export async function fetchAccountProfile(accountId: string): Promise<{ data: AccountProfile }> {
  return apiFetch(`/api/accounts/${encodeURIComponent(accountId)}`);
}

export async function fetchAccountTransactions(
  accountId: string,
  params?: { limit?: number; offset?: number },
): Promise<{ count: number; data: TransactionItem[]; account_id: string }> {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.offset) qs.set("offset", String(params.offset));
  return apiFetch(`/api/accounts/${encodeURIComponent(accountId)}/transactions?${qs}`);
}

export async function scoreTransaction(payload: {
  account_id: string;
  transaction_type: string;
  amount: number;
  currency: string;
  device_id?: string;
  location?: string;
}): Promise<{ status: string; data: ScoreResponse }> {
  return apiFetch("/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// ── Formatting utils ───────────────────────────────────────────────────────

export function formatNumber(value: number | undefined | null): string {
  if (value == null || Number.isNaN(value)) return "--";
  return new Intl.NumberFormat().format(value);
}

export function formatPercent(value: number | undefined | null): string {
  if (value == null || Number.isNaN(value)) return "--";
  return `${value.toFixed(2)}%`;
}

export function formatTimestamp(value: string | null | undefined): string {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;
}

export function riskBadgeClass(score: number): string {
  if (score >= 0.9) return "rounded-full border-destructive/70 bg-destructive/15 text-destructive";
  if (score >= 0.75) return "rounded-full border-orange-500/70 bg-orange-500/15 text-orange-400";
  if (score >= 0.55) return "rounded-full border-yellow-500/70 bg-yellow-500/15 text-yellow-400";
  return "rounded-full border-border text-muted-foreground";
}

export function statusBadgeClass(status: string): string {
  if (status === "open") return "rounded-full border-primary/70 bg-primary/10 text-primary";
  if (status === "resolved") return "rounded-full border-border bg-muted/40 text-muted-foreground";
  return "rounded-full border-border text-muted-foreground";
}
