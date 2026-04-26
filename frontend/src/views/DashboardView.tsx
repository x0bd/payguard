import {
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import {
  FiActivity,
  FiAlertTriangle,
  FiRefreshCw,
  FiSend,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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

const riskChartConfig = {
  risk: { label: "Risk Score", color: "oklch(0.83 0.18 154)" },
  threshold: { label: "Alert Threshold", color: "oklch(0.62 0 0)" },
} satisfies ChartConfig;

const typeChartConfig = {
  count: { label: "Alert Count", color: "oklch(0.83 0.18 154)" },
} satisfies ChartConfig;

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

export default function DashboardView() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fetchRef = useRef<(bg: boolean) => Promise<void>>(async () => {});
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scoreForm, setScoreForm] = useState<ScoreForm>(initialForm);
  const [scoreResult, setScoreResult] = useState<ScoreResponse | null>(null);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [scoring, setScoring] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".js-hero", { opacity: 0, y: 24, duration: 0.65 })
        .from(".js-stat", { opacity: 0, y: 18, duration: 0.45, stagger: 0.08 }, "-=0.25")
        .from(".js-panel", { opacity: 0, y: 18, duration: 0.55, stagger: 0.1 }, "-=0.25");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  fetchRef.current = async (bg: boolean) => {
    bg ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const [m, a] = await Promise.all([fetchMetrics(), fetchAlerts({ limit: 60 })]);
      startTransition(() => {
        setMetrics(m);
        setAlerts(a.data || []);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard data.");
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
      setScoreError(e instanceof Error ? e.message : "Unexpected scoring error.");
    } finally {
      setScoring(false);
    }
  }

  const riskTrendData = [...alerts]
    .reverse()
    .slice(-12)
    .map((a) => ({
      time: formatTimestamp(a.created_at),
      risk: Number(a.risk_score.toFixed(3)),
      threshold: 0.65,
    }));

  const typeBreakdownData =
    metrics && Object.keys(metrics.alert_type_breakdown || {}).length > 0
      ? Object.entries(metrics.alert_type_breakdown).map(([alertType, count]) => ({
          alertType,
          count,
        }))
      : [];

  const summaryCards = [
    {
      label: "Total Transactions",
      value: formatNumber(metrics?.total_transactions),
      detail: `+${formatNumber(metrics?.transactions_last_24h)} last 24h`,
      icon: FiActivity,
    },
    {
      label: "Fraud Rate",
      value: formatPercent(metrics?.fraud_rate_percent),
      detail: `${formatNumber(metrics?.flagged_transactions)} flagged`,
      icon: FiShield,
    },
    {
      label: "Open Alerts",
      value: formatNumber(metrics?.open_alerts),
      detail: `${formatNumber(metrics?.high_risk_alerts)} high risk`,
      icon: FiAlertTriangle,
    },
    {
      label: "Average Risk",
      value: metrics ? metrics.average_risk_score.toFixed(3) : "--",
      detail: `Model: ${metrics?.model_name || "unloaded"}`,
      icon: FiTrendingUp,
    },
  ];

  return (
    <div ref={rootRef} className="flex flex-col gap-5 px-5 py-8 md:px-8 md:py-10">
      {/* Header */}
      <header className="js-hero space-y-6 rounded-3xl border border-border/70 bg-card/65 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="outline" className="mono rounded-full border-border bg-background/70 tracking-[0.2em]">
            PAYGUARD / COMMAND CENTER
          </Badge>
          <div className="flex items-center gap-2">
            <Badge className="mono rounded-full bg-primary text-primary-foreground tracking-[0.12em]">
              {metrics?.model_status === "loaded" ? "MODEL ONLINE" : "MODEL OFFLINE"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="mono rounded-xl border-border px-3 text-[11px] uppercase"
              onClick={() => void fetchRef.current(false)}
              disabled={refreshing || loading}
            >
              <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-3">
            <h1 className="vercel-title text-balance text-4xl leading-[0.98] font-semibold tracking-[-0.04em] text-foreground md:text-6xl">
              Fraud Operations,
              <span className="mt-1 block text-muted-foreground">
                Built for live mobile-money defense.
              </span>
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Monitor alerts, inspect risk movement, and test new transactions in one panel.
            </p>
          </div>
          <Card className="rounded-2xl border-primary/35 bg-primary/8 shadow-none">
            <CardHeader>
              <CardDescription className="mono text-[11px] tracking-[0.14em] uppercase">
                Live API Status
              </CardDescription>
              <CardTitle className="text-xl tracking-[-0.02em]">
                {error ? "Action Needed" : "Healthy and streaming"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                {error
                  ? "Dashboard data could not be fetched. Check backend API availability."
                  : `Tracking ${alerts.length} recent alerts · auto-refresh every 25s.`}
              </p>
            </CardContent>
          </Card>
        </div>
      </header>

      {/* KPI cards */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <Card key={item.label} className="js-stat rounded-2xl border-border/70 bg-card/60">
            <CardHeader className="gap-2">
              <CardDescription className="mono flex items-center justify-between text-[11px] tracking-[0.15em] uppercase">
                {item.label}
                <item.icon className="text-primary" />
              </CardDescription>
              {loading ? (
                <Skeleton className="h-8 w-32 rounded-xl bg-muted/70" />
              ) : (
                <CardTitle className="text-3xl leading-none font-semibold tracking-[-0.03em]">
                  {item.value}
                </CardTitle>
              )}
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground">{item.detail}</CardContent>
          </Card>
        ))}
      </section>

      {/* Charts */}
      <section className="grid gap-3 xl:grid-cols-[1.2fr,0.8fr]">
        <Card className="js-panel rounded-2xl border-border/70 bg-card/60">
          <CardHeader>
            <CardDescription className="mono text-[11px] tracking-[0.16em] uppercase">
              Risk Trend
            </CardDescription>
            <CardTitle className="text-xl tracking-[-0.02em]">Recent scoring trajectory</CardTitle>
          </CardHeader>
          <CardContent>
            {riskTrendData.length === 0 ? (
              <div className="rounded-xl border border-border bg-background/45 p-6 text-sm text-muted-foreground">
                No risk trend data yet. Score transactions to populate this chart.
              </div>
            ) : (
              <ChartContainer config={riskChartConfig} className="h-64 w-full aspect-auto">
                <AreaChart data={riskTrendData}>
                  <defs>
                    <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-risk)" stopOpacity={0.32} />
                      <stop offset="95%" stopColor="var(--color-risk)" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="time" tickMargin={8} axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area type="monotone" dataKey="risk" stroke="var(--color-risk)" fill="url(#riskFill)" strokeWidth={2} />
                  <Area type="monotone" dataKey="threshold" stroke="var(--color-threshold)" fill="transparent" strokeDasharray="4 4" strokeWidth={1.2} />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="js-panel rounded-2xl border-border/70 bg-card/60">
          <CardHeader>
            <CardDescription className="mono text-[11px] tracking-[0.16em] uppercase">
              Alert Breakdown
            </CardDescription>
            <CardTitle className="text-xl tracking-[-0.02em]">Alert type distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {typeBreakdownData.length === 0 ? (
              <div className="rounded-xl border border-border bg-background/45 p-6 text-sm text-muted-foreground">
                Alert type metrics will appear after scoring begins.
              </div>
            ) : (
              <ChartContainer config={typeChartConfig} className="h-64 w-full aspect-auto">
                <BarChart data={typeBreakdownData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="alertType" tickMargin={8} axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="var(--color-count)" />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Score form */}
      <section className="js-panel">
        <Card className="rounded-2xl border-border/70 bg-card/60">
          <CardHeader>
            <CardDescription className="mono text-[11px] tracking-[0.16em] uppercase">
              Score Transaction
            </CardDescription>
            <CardTitle className="text-xl tracking-[-0.02em]">Live fraud prediction test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
              <form
                className="grid gap-3"
                onSubmit={async (e) => { e.preventDefault(); await submitScore(); }}
              >
                <div className="grid gap-1.5">
                  <Label htmlFor="account_id" className="mono uppercase tracking-[0.12em]">Account ID</Label>
                  <Input id="account_id" className="rounded-xl" value={scoreForm.account_id}
                    onChange={(e) => setScoreForm((s) => ({ ...s, account_id: e.target.value }))} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="transaction_type" className="mono uppercase tracking-[0.12em]">Type</Label>
                    <NativeSelect id="transaction_type" className="w-full rounded-xl" value={scoreForm.transaction_type}
                      onChange={(e) => setScoreForm((s) => ({ ...s, transaction_type: e.target.value }))}>
                      <NativeSelectOption value="cash_in">cash_in</NativeSelectOption>
                      <NativeSelectOption value="cash_out">cash_out</NativeSelectOption>
                      <NativeSelectOption value="bill_payment">bill_payment</NativeSelectOption>
                      <NativeSelectOption value="p2p_transfer">p2p_transfer</NativeSelectOption>
                      <NativeSelectOption value="merchant_payment">merchant_payment</NativeSelectOption>
                    </NativeSelect>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="currency" className="mono uppercase tracking-[0.12em]">Currency</Label>
                    <NativeSelect id="currency" className="w-full rounded-xl" value={scoreForm.currency}
                      onChange={(e) => setScoreForm((s) => ({ ...s, currency: e.target.value }))}>
                      <NativeSelectOption value="USD">USD</NativeSelectOption>
                      <NativeSelectOption value="ZWL">ZWL</NativeSelectOption>
                    </NativeSelect>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="amount" className="mono uppercase tracking-[0.12em]">Amount</Label>
                  <Input id="amount" type="number" step="0.01" className="rounded-xl" value={scoreForm.amount}
                    onChange={(e) => setScoreForm((s) => ({ ...s, amount: e.target.value }))} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="device_id" className="mono uppercase tracking-[0.12em]">Device ID</Label>
                    <Input id="device_id" className="rounded-xl" value={scoreForm.device_id}
                      onChange={(e) => setScoreForm((s) => ({ ...s, device_id: e.target.value }))} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="location" className="mono uppercase tracking-[0.12em]">Location</Label>
                    <Input id="location" className="rounded-xl" value={scoreForm.location}
                      onChange={(e) => setScoreForm((s) => ({ ...s, location: e.target.value }))} />
                  </div>
                </div>

                <Button type="submit" className="mono rounded-xl bg-primary text-primary-foreground uppercase tracking-[0.14em]" disabled={scoring}>
                  <FiSend />
                  {scoring ? "Scoring..." : "Score Transaction"}
                </Button>

                {scoreError && (
                  <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                    {scoreError}
                  </div>
                )}
              </form>

              {/* Result panel */}
              <div className="flex flex-col gap-3">
                {scoreResult ? (
                  <div className="space-y-3 rounded-2xl border border-primary/35 bg-primary/8 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Result</p>
                      <Badge className="rounded-full bg-primary text-primary-foreground">{scoreResult.risk_level}</Badge>
                    </div>
                    <p className="text-2xl font-semibold tracking-[-0.03em]">
                      {scoreResult.risk_score.toFixed(4)}
                    </p>
                    <p className="text-sm text-muted-foreground">{scoreResult.reason}</p>
                    <div className="border-t border-border/50 pt-3 grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs">
                      {Object.entries(scoreResult.key_features).map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-2">
                          <span className="text-muted-foreground truncate">{k.replace(/_/g, " ")}</span>
                          <span className="mono text-foreground">{typeof v === "number" ? v.toFixed(3) : v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-center rounded-2xl border border-border/50 bg-background/30 p-6 text-sm text-muted-foreground">
                    Submit a transaction to see the risk score and feature breakdown.
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
