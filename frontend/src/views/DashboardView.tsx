import { startTransition, useEffect, useRef, useState } from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiArrowDown,
  FiArrowUp,
  FiRefreshCw,
  FiSend,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchAlerts,
  fetchMetrics,
  formatNumber,
  formatPercent,
  formatTimestamp,
  scoreTransaction,
  type AlertItem,
  type MetricsResponse,
  type ScoreResponse,
} from "@/lib/api";

// ── Chart config ─────────────────────────────────────────────────────────────

const riskChartConfig = {
  risk:      { label: "Risk Score", color: "oklch(0.48 0.16 155)" },
  threshold: { label: "Threshold",  color: "oklch(0.7 0 0)" },
} satisfies ChartConfig;

// ── Alert type → colour mapping ───────────────────────────────────────────────

const ALERT_COLORS: Record<string, { bar: string; text: string; bg: string }> = {
  critical_risk: { bar: "#dc2626", text: "text-red-600",    bg: "bg-red-100"    },
  high_risk:     { bar: "#ea580c", text: "text-orange-600", bg: "bg-orange-100" },
  medium_risk:   { bar: "#ca8a04", text: "text-amber-600",  bg: "bg-amber-100"  },
  low_risk:      { bar: "#16a34a", text: "text-green-600",  bg: "bg-green-100"  },
};
function alertColor(type: string) {
  return ALERT_COLORS[type] ?? { bar: "#6b7280", text: "text-zinc-500", bg: "bg-zinc-100" };
}

// ── KPI card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  direction,
  accentColor,
  icon: Icon,
  loading,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaLabel?: string;
  direction?: "up-good" | "up-bad" | "neutral";
  accentColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  loading?: boolean;
}) {
  const deltaClass =
    direction === "up-good" ? "text-green-600" :
    direction === "up-bad"  ? "text-red-600"   :
    "text-zinc-400";

  const Arrow =
    direction === "up-good" ? FiArrowUp :
    direction === "up-bad"  ? FiArrowDown : null;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <Icon size={13} className="text-muted-foreground/50" />
      </div>

      {loading ? (
        <Skeleton className="h-9 w-28 rounded-lg bg-zinc-100" />
      ) : (
        <p className="text-4xl font-semibold tracking-tight leading-none text-foreground">
          {value}
        </p>
      )}

      {delta && (
        <div className="mt-4 flex items-center gap-1.5">
          {Arrow && <Arrow size={11} className={deltaClass} />}
          <span className={`text-xs font-medium ${deltaClass}`}>{delta}</span>
          {deltaLabel && (
            <span className="text-xs text-muted-foreground">{deltaLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Score form types ──────────────────────────────────────────────────────────

type ScoreForm = {
  account_id: string;
  transaction_type: string;
  amount: string;
  currency: string;
  device_id: string;
  location: string;
};

const initialForm: ScoreForm = {
  account_id: "ZW-EC-00001",
  transaction_type: "cash_out",
  amount: "980.45",
  currency: "USD",
  device_id: "dev-999991",
  location: "Lusaka",
};

// ── Main view ─────────────────────────────────────────────────────────────────

export default function DashboardView() {
  const fetchRef = useRef<(bg: boolean) => Promise<void>>(async () => {});
  const [metrics, setMetrics]     = useState<MetricsResponse | null>(null);
  const [alerts, setAlerts]       = useState<AlertItem[]>([]);
  const [loading, setLoading]     = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [scoreForm, setScoreForm] = useState<ScoreForm>(initialForm);
  const [scoreResult, setScoreResult] = useState<ScoreResponse | null>(null);
  const [scoreError, setScoreError]   = useState<string | null>(null);
  const [scoring, setScoring]         = useState(false);

  fetchRef.current = async (bg: boolean) => {
    bg ? setRefreshing(true) : setLoading(true);
    try {
      const [m, a] = await Promise.all([fetchMetrics(), fetchAlerts({ limit: 60 })]);
      startTransition(() => { setMetrics(m); setAlerts(a.data || []); });
    } catch { /* keep stale */ }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => {
    void fetchRef.current(false);
    const t = window.setInterval(() => void fetchRef.current(true), 25000);
    return () => window.clearInterval(t);
  }, []);

  async function submitScore() {
    setScoring(true);
    setScoreError(null);
    const amount = Number(scoreForm.amount);
    if (!Number.isFinite(amount) || amount < 0) {
      setScoreError("Enter a valid non-negative amount.");
      setScoring(false);
      return;
    }
    try {
      const res = await scoreTransaction({
        account_id: scoreForm.account_id.trim(),
        transaction_type: scoreForm.transaction_type,
        amount,
        currency: scoreForm.currency,
        device_id: scoreForm.device_id.trim() || undefined,
        location: scoreForm.location.trim() || undefined,
      });
      startTransition(() => setScoreResult(res.data));
      await fetchRef.current(true);
    } catch (e) {
      setScoreError(e instanceof Error ? e.message : "Scoring failed.");
    } finally { setScoring(false); }
  }

  const riskTrendData = [...alerts]
    .reverse()
    .slice(-14)
    .map((a, i) => ({
      i,
      time: formatTimestamp(a.created_at),
      risk: Number(a.risk_score.toFixed(3)),
      threshold: 0.65,
    }));

  const typeBreakdown = metrics
    ? Object.entries(metrics.alert_type_breakdown).sort((a, b) => b[1] - a[1])
    : [];
  const totalByType = typeBreakdown.reduce((s, [, c]) => s + c, 0);

  const scoreLevelStyle = (level: string) => ({
    critical: { text: "text-red-600",    badge: "border-red-200 bg-red-50 text-red-700"    },
    high:     { text: "text-orange-600", badge: "border-orange-200 bg-orange-50 text-orange-700" },
    medium:   { text: "text-amber-600",  badge: "border-amber-200 bg-amber-50 text-amber-700"  },
    low:      { text: "text-green-600",  badge: "border-green-200 bg-green-50 text-green-700"  },
  }[level] ?? { text: "text-zinc-700", badge: "border-zinc-200 bg-zinc-50 text-zinc-700" });

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">

      {/* ── Page header ─────────────────────────────────────────── */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-[13px] font-semibold text-foreground">Fraud Operations</h1>
          {metrics && !loading && (
            <span className="mono rounded-md border border-border bg-muted px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              {formatNumber(metrics.total_transactions)} transactions
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={[
              "h-1.5 w-1.5 rounded-full",
              metrics?.model_status === "loaded" ? "bg-green-500 status-dot-live" : "bg-red-500",
            ].join(" ")} />
            <span className="text-[11px] text-muted-foreground">
              {metrics?.model_status === "loaded"
                ? `${metrics.model_name ?? "model"} online`
                : "Model offline"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-lg px-3 text-xs font-medium shadow-none"
            onClick={() => void fetchRef.current(false)}
            disabled={refreshing || loading}
          >
            <FiRefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </header>

      {/* ── KPI row ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <KpiCard
          label="Total Transactions"
          icon={FiActivity}
          value={formatNumber(metrics?.total_transactions)}
          delta={`+${formatNumber(metrics?.transactions_last_24h)}`}
          deltaLabel="last 24 h"
          direction="up-good"
          accentColor="#16a34a"
          loading={loading}
        />
        <KpiCard
          label="Fraud Rate"
          icon={FiShield}
          value={formatPercent(metrics?.fraud_rate_percent)}
          delta={formatNumber(metrics?.flagged_transactions)}
          deltaLabel="flagged"
          direction="up-bad"
          accentColor="#dc2626"
          loading={loading}
        />
        <KpiCard
          label="Open Alerts"
          icon={FiAlertTriangle}
          value={formatNumber(metrics?.open_alerts)}
          delta={formatNumber(metrics?.high_risk_alerts)}
          deltaLabel="high risk"
          direction={(metrics?.high_risk_alerts ?? 0) > 0 ? "up-bad" : "neutral"}
          accentColor="#ea580c"
          loading={loading}
        />
        <KpiCard
          label="Avg Risk Score"
          icon={FiTrendingUp}
          value={metrics ? metrics.average_risk_score.toFixed(3) : "--"}
          delta={metrics?.model_name ?? undefined}
          direction="neutral"
          accentColor="#ca8a04"
          loading={loading}
        />
      </div>

      {/* ── Charts row ──────────────────────────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[3fr_2fr]">

        {/* Risk Trend */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Risk Trend
          </p>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-4xl font-semibold tracking-tight text-foreground">
              {metrics ? metrics.average_risk_score.toFixed(3) : "--"}
            </span>
            <span className="text-sm text-muted-foreground">avg risk score</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatNumber(metrics?.total_alerts)} alerts recorded ·{" "}
            {formatNumber(metrics?.alerts_last_24h)} in last 24 h
          </p>

          <div className="mt-6">
            {riskTrendData.length === 0 ? (
              <div className="flex h-44 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                Score transactions to populate this chart
              </div>
            ) : (
              <ChartContainer config={riskChartConfig} className="h-44 w-full aspect-auto">
                <AreaChart data={riskTrendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="var(--color-risk)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="var(--color-risk)" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 1]} hide />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    type="monotone" dataKey="risk"
                    stroke="var(--color-risk)" strokeWidth={1.8}
                    fill="url(#riskGrad)" dot={false} activeDot={{ r: 3 }}
                  />
                  <Area
                    type="monotone" dataKey="threshold"
                    stroke="var(--color-threshold)" strokeWidth={1}
                    strokeDasharray="5 4" fill="transparent" dot={false}
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </div>
        </div>

        {/* Alert Breakdown */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Alert Distribution
          </p>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-4xl font-semibold tracking-tight text-foreground">
              {formatNumber(metrics?.total_alerts)}
            </span>
            <span className="text-sm text-muted-foreground">total alerts</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatNumber(metrics?.open_alerts)} open ·{" "}
            {formatNumber(metrics?.high_risk_alerts)} high risk
          </p>

          <div className="mt-6 space-y-4">
            {typeBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground">No alerts yet.</p>
            ) : (
              typeBreakdown.map(([type, count]) => {
                const pct = totalByType > 0 ? (count / totalByType) * 100 : 0;
                const col = alertColor(type);
                return (
                  <div key={type} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${col.text}`}>
                        {type.replace("_", " ")}
                      </span>
                      <span className="mono text-xs font-semibold text-foreground">{count}</span>
                    </div>
                    <div className={`h-1.5 overflow-hidden rounded-full ${col.bg}`}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: col.bar }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── Score transaction ────────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-card shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        {/* Card header */}
        <div className="border-b border-border px-6 py-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Score Transaction
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Submit a transaction to get a live fraud risk prediction.
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-border">
          {/* Form */}
          <form
            className="space-y-4 p-6"
            onSubmit={async e => { e.preventDefault(); await submitScore(); }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="s_account" className="text-xs font-medium text-muted-foreground">
                Account ID
              </Label>
              <Input
                id="s_account"
                className="h-9 rounded-lg bg-muted/50 text-sm border-border"
                value={scoreForm.account_id}
                onChange={e => setScoreForm(s => ({ ...s, account_id: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="s_type" className="text-xs font-medium text-muted-foreground">
                  Type
                </Label>
                <NativeSelect
                  id="s_type"
                  className="h-9 w-full rounded-lg bg-muted/50 text-sm border-border"
                  value={scoreForm.transaction_type}
                  onChange={e => setScoreForm(s => ({ ...s, transaction_type: e.target.value }))}
                >
                  <NativeSelectOption value="cash_in">cash_in</NativeSelectOption>
                  <NativeSelectOption value="cash_out">cash_out</NativeSelectOption>
                  <NativeSelectOption value="bill_payment">bill_payment</NativeSelectOption>
                  <NativeSelectOption value="p2p_transfer">p2p_transfer</NativeSelectOption>
                  <NativeSelectOption value="merchant_payment">merchant_payment</NativeSelectOption>
                </NativeSelect>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s_currency" className="text-xs font-medium text-muted-foreground">
                  Currency
                </Label>
                <NativeSelect
                  id="s_currency"
                  className="h-9 w-full rounded-lg bg-muted/50 text-sm border-border"
                  value={scoreForm.currency}
                  onChange={e => setScoreForm(s => ({ ...s, currency: e.target.value }))}
                >
                  <NativeSelectOption value="USD">USD</NativeSelectOption>
                  <NativeSelectOption value="ZWL">ZWL</NativeSelectOption>
                </NativeSelect>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="s_amount" className="text-xs font-medium text-muted-foreground">
                Amount
              </Label>
              <Input
                id="s_amount"
                type="number"
                step="0.01"
                className="h-9 rounded-lg bg-muted/50 text-sm border-border"
                value={scoreForm.amount}
                onChange={e => setScoreForm(s => ({ ...s, amount: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="s_device" className="text-xs font-medium text-muted-foreground">
                  Device ID
                </Label>
                <Input
                  id="s_device"
                  className="h-9 rounded-lg bg-muted/50 text-sm border-border"
                  value={scoreForm.device_id}
                  onChange={e => setScoreForm(s => ({ ...s, device_id: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s_location" className="text-xs font-medium text-muted-foreground">
                  Location
                </Label>
                <Input
                  id="s_location"
                  className="h-9 rounded-lg bg-muted/50 text-sm border-border"
                  value={scoreForm.location}
                  onChange={e => setScoreForm(s => ({ ...s, location: e.target.value }))}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-9 gap-2 rounded-lg text-sm font-medium"
              disabled={scoring}
            >
              <FiSend size={12} />
              {scoring ? "Scoring…" : "Score Transaction"}
            </Button>

            {scoreError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {scoreError}
              </p>
            )}
          </form>

          {/* Result panel */}
          <div className="p-6">
            {scoreResult ? (() => {
              const s = scoreLevelStyle(scoreResult.risk_level);
              return (
                <div className="flex h-full flex-col gap-5">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
                      Result
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className={`text-5xl font-bold tracking-tight ${s.text}`}>
                        {scoreResult.risk_score.toFixed(4)}
                      </span>
                      <Badge variant="outline" className={`rounded-md text-xs font-medium ${s.badge}`}>
                        {scoreResult.risk_level}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {scoreResult.reason}
                    </p>
                  </div>

                  <div className="border-t border-border pt-4 flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
                      Key Signals
                    </p>
                    <div className="space-y-2.5">
                      {Object.entries(scoreResult.key_features).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between gap-4">
                          <span className="text-xs text-muted-foreground truncate">
                            {k.replace(/_/g, " ")}
                          </span>
                          <span className="mono text-xs font-medium text-foreground shrink-0">
                            {typeof v === "number" ? v.toFixed(3) : String(v)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="flex h-full min-h-52 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border text-center">
                <FiShield size={20} className="text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  Submit a transaction to see the risk score
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
