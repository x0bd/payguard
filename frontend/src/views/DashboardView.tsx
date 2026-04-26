import {
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";
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
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchMetrics,
  fetchAlerts,
  scoreTransaction,
  formatNumber,
  formatPercent,
  formatTimestamp,
  type MetricsResponse,
  type AlertItem,
  type ScoreResponse,
} from "@/lib/api";

// ── KPI card ────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  direction,
  icon: Icon,
  loading,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaLabel?: string;
  direction?: "up" | "down" | "neutral";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  loading?: boolean;
}) {
  const deltaColor =
    direction === "up"
      ? "text-primary"
      : direction === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <Icon size={14} className="text-muted-foreground/60" />
      </div>

      {loading ? (
        <Skeleton className="h-9 w-32 rounded-lg bg-muted" />
      ) : (
        <p className="text-4xl font-semibold tracking-tight leading-none text-foreground">
          {value}
        </p>
      )}

      {delta && (
        <div className="flex items-center gap-1.5">
          {direction === "up" && <FiArrowUp size={11} className={deltaColor} />}
          {direction === "down" && <FiArrowDown size={11} className={deltaColor} />}
          <span className={`text-xs font-medium ${deltaColor}`}>{delta}</span>
          {deltaLabel && (
            <span className="text-xs text-muted-foreground">{deltaLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Score form ───────────────────────────────────────────────────────────────

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

const riskChartConfig = {
  risk: { label: "Risk Score", color: "oklch(0.83 0.18 154)" },
  threshold: { label: "Threshold", color: "oklch(0.55 0 0)" },
} satisfies ChartConfig;

// ── Main view ────────────────────────────────────────────────────────────────

export default function DashboardView() {
  const fetchRef = useRef<(bg: boolean) => Promise<void>>(async () => {});
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [scoreForm, setScoreForm] = useState<ScoreForm>(initialForm);
  const [scoreResult, setScoreResult] = useState<ScoreResponse | null>(null);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [scoring, setScoring] = useState(false);

  fetchRef.current = async (bg: boolean) => {
    bg ? setRefreshing(true) : setLoading(true);
    try {
      const [m, a] = await Promise.all([fetchMetrics(), fetchAlerts({ limit: 60 })]);
      startTransition(() => {
        setMetrics(m);
        setAlerts(a.data || []);
      });
    } catch {
      // keep stale
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void fetchRef.current(false);
    const t = window.setInterval(() => void fetchRef.current(true), 25000);
    return () => window.clearInterval(t);
  }, []);

  async function submitScore() {
    setScoring(true);
    setScoreError(null);
    const parsedAmount = Number(scoreForm.amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      setScoreError("Enter a valid non-negative amount.");
      setScoring(false);
      return;
    }
    try {
      const res = await scoreTransaction({
        account_id: scoreForm.account_id.trim(),
        transaction_type: scoreForm.transaction_type,
        amount: parsedAmount,
        currency: scoreForm.currency,
        device_id: scoreForm.device_id.trim() || undefined,
        location: scoreForm.location.trim() || undefined,
      });
      startTransition(() => setScoreResult(res.data));
      await fetchRef.current(true);
    } catch (e) {
      setScoreError(e instanceof Error ? e.message : "Scoring failed.");
    } finally {
      setScoring(false);
    }
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
    ? Object.entries(metrics.alert_type_breakdown)
        .sort((a, b) => b[1] - a[1])
    : [];
  const totalByType = typeBreakdown.reduce((s, [, c]) => s + c, 0);

  const riskLevelColor = (level: string) => {
    if (level === "critical") return "text-destructive";
    if (level === "high")     return "text-orange-400";
    if (level === "medium")   return "text-yellow-400";
    return "text-primary";
  };

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-350">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-foreground">Fraud Operations</h1>
          {metrics && !loading && (
            <span className="mono rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              {formatNumber(metrics.total_transactions)} transactions
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                metrics?.model_status === "loaded" ? "bg-primary" : "bg-destructive",
              ].join(" ")}
            />
            <span className="text-xs text-muted-foreground">
              {metrics?.model_status === "loaded" ? "Model online" : "Model offline"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-lg px-3 text-xs"
            onClick={() => void fetchRef.current(false)}
            disabled={refreshing || loading}
          >
            <FiRefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </header>

      {/* ── KPI row ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <KpiCard
          label="Total Transactions"
          icon={FiActivity}
          value={formatNumber(metrics?.total_transactions)}
          delta={`+${formatNumber(metrics?.transactions_last_24h)}`}
          deltaLabel="last 24 h"
          direction="up"
          loading={loading}
        />
        <KpiCard
          label="Fraud Rate"
          icon={FiShield}
          value={formatPercent(metrics?.fraud_rate_percent)}
          delta={formatNumber(metrics?.flagged_transactions)}
          deltaLabel="flagged"
          direction="down"
          loading={loading}
        />
        <KpiCard
          label="Open Alerts"
          icon={FiAlertTriangle}
          value={formatNumber(metrics?.open_alerts)}
          delta={formatNumber(metrics?.high_risk_alerts)}
          deltaLabel="high risk"
          direction={(metrics?.high_risk_alerts ?? 0) > 0 ? "down" : "neutral"}
          loading={loading}
        />
        <KpiCard
          label="Avg Risk Score"
          icon={FiTrendingUp}
          value={metrics ? metrics.average_risk_score.toFixed(3) : "--"}
          delta={metrics?.model_name ?? undefined}
          direction="neutral"
          loading={loading}
        />
      </div>

      {/* ── Charts row ──────────────────────────────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[3fr_2fr]">

        {/* Risk Trend */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Risk Trend
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight">
              {metrics ? metrics.average_risk_score.toFixed(3) : "--"}
            </span>
            <span className="text-sm text-muted-foreground">avg risk score</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatNumber(metrics?.total_alerts)} total alerts recorded
          </p>

          <div className="mt-6">
            {riskTrendData.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                Score transactions to populate this chart
              </div>
            ) : (
              <ChartContainer config={riskChartConfig} className="h-40 w-full aspect-auto">
                <AreaChart data={riskTrendData}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-risk)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-risk)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="oklch(0.25 0 0)" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 1]} hide />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    type="monotone"
                    dataKey="risk"
                    stroke="var(--color-risk)"
                    strokeWidth={1.5}
                    fill="url(#riskGrad)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="threshold"
                    stroke="var(--color-threshold)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    fill="transparent"
                    dot={false}
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </div>
        </div>

        {/* Alert Breakdown */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Alert Distribution
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight">
              {formatNumber(metrics?.total_alerts)}
            </span>
            <span className="text-sm text-muted-foreground">total alerts</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatNumber(metrics?.open_alerts)} currently open
          </p>

          <div className="mt-6 space-y-4">
            {typeBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground">No alerts yet.</p>
            ) : (
              typeBreakdown.map(([type, count]) => {
                const pct = totalByType > 0 ? (count / totalByType) * 100 : 0;
                return (
                  <div key={type} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{type}</span>
                      <span className="mono text-xs font-medium text-foreground">{count}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── Score transaction ────────────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Score Transaction
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Submit a transaction to get a live fraud risk score.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={async (e) => { e.preventDefault(); await submitScore(); }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="s_account" className="text-xs text-muted-foreground">Account ID</Label>
              <Input
                id="s_account"
                className="h-9 rounded-lg bg-background text-sm"
                value={scoreForm.account_id}
                onChange={e => setScoreForm(s => ({ ...s, account_id: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="s_type" className="text-xs text-muted-foreground">Type</Label>
                <NativeSelect
                  id="s_type"
                  className="h-9 w-full rounded-lg bg-background text-sm"
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
                <Label htmlFor="s_currency" className="text-xs text-muted-foreground">Currency</Label>
                <NativeSelect
                  id="s_currency"
                  className="h-9 w-full rounded-lg bg-background text-sm"
                  value={scoreForm.currency}
                  onChange={e => setScoreForm(s => ({ ...s, currency: e.target.value }))}
                >
                  <NativeSelectOption value="USD">USD</NativeSelectOption>
                  <NativeSelectOption value="ZWL">ZWL</NativeSelectOption>
                </NativeSelect>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="s_amount" className="text-xs text-muted-foreground">Amount</Label>
              <Input
                id="s_amount"
                type="number"
                step="0.01"
                className="h-9 rounded-lg bg-background text-sm"
                value={scoreForm.amount}
                onChange={e => setScoreForm(s => ({ ...s, amount: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="s_device" className="text-xs text-muted-foreground">Device ID</Label>
                <Input
                  id="s_device"
                  className="h-9 rounded-lg bg-background text-sm"
                  value={scoreForm.device_id}
                  onChange={e => setScoreForm(s => ({ ...s, device_id: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s_location" className="text-xs text-muted-foreground">Location</Label>
                <Input
                  id="s_location"
                  className="h-9 rounded-lg bg-background text-sm"
                  value={scoreForm.location}
                  onChange={e => setScoreForm(s => ({ ...s, location: e.target.value }))}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-9 gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              disabled={scoring}
            >
              <FiSend size={13} />
              {scoring ? "Scoring…" : "Score Transaction"}
            </Button>

            {scoreError && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/8 px-3 py-2 text-xs text-destructive">
                {scoreError}
              </p>
            )}
          </form>

          {/* Result panel */}
          {scoreResult ? (
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
                  Result
                </p>
                <div className="flex items-baseline gap-3">
                  <span className={`text-5xl font-semibold tracking-tight ${riskLevelColor(scoreResult.risk_level)}`}>
                    {scoreResult.risk_score.toFixed(4)}
                  </span>
                  <Badge
                    variant="outline"
                    className={[
                      "rounded-md text-xs",
                      scoreResult.risk_level === "critical" && "border-destructive/50 bg-destructive/10 text-destructive",
                      scoreResult.risk_level === "high"     && "border-orange-500/50 bg-orange-500/10 text-orange-400",
                      scoreResult.risk_level === "medium"   && "border-yellow-500/50 bg-yellow-500/10 text-yellow-400",
                      scoreResult.risk_level === "low"      && "border-primary/50 bg-primary/10 text-primary",
                    ].filter(Boolean).join(" ")}
                  >
                    {scoreResult.risk_level}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{scoreResult.reason}</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
                  Key Signals
                </p>
                <div className="space-y-2">
                  {Object.entries(scoreResult.key_features).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{k.replace(/_/g, " ")}</span>
                      <span className="mono text-xs font-medium text-foreground">
                        {typeof v === "number" ? v.toFixed(3) : String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-40 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
              Submit a transaction to see results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
