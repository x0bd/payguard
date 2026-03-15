import {
  startTransition,
  useDeferredValue,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MetricsResponse = {
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

type AlertItem = {
  id: number;
  transaction_id: number;
  risk_score: number;
  alert_type: string;
  reason: string | null;
  status: string;
  created_at: string;
  account_id: string;
  transaction_type: string;
  amount: number;
  currency: string;
  device_id: string | null;
  location: string | null;
};

type ScoreResponse = {
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

type ScoreForm = {
  account_id: string;
  transaction_type: string;
  amount: string;
  currency: string;
  device_id: string;
  location: string;
};

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") || "";
const ALERT_REFRESH_MS = 25000;

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
  threshold: { label: "Alert Threshold", color: "oklch(0.62 0 0)" },
} satisfies ChartConfig;

const typeChartConfig = {
  count: { label: "Alert Count", color: "oklch(0.83 0.18 154)" },
} satisfies ChartConfig;

function formatNumber(value: number | undefined) {
  if (value === undefined || Number.isNaN(value)) {
    return "--";
  }
  return new Intl.NumberFormat().format(value);
}

function formatPercent(value: number | undefined) {
  if (value === undefined || Number.isNaN(value)) {
    return "--";
  }
  return `${value.toFixed(2)}%`;
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getApiUrl(path: string) {
  return `${API_BASE}${path}`;
}

function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fetchDashboardRef = useRef<(background: boolean) => Promise<void>>(async () => {});
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeAlertTab, setActiveAlertTab] = useState("all");
  const [scoreForm, setScoreForm] = useState<ScoreForm>(initialForm);
  const [scoreResult, setScoreResult] = useState<ScoreResponse | null>(null);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [scoring, setScoring] = useState(false);
  const deferredAlerts = useDeferredValue(alerts);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".js-hero", { opacity: 0, y: 24, duration: 0.65 })
        .from(".js-stat", { opacity: 0, y: 18, duration: 0.45, stagger: 0.08 }, "-=0.25")
        .from(".js-panel", { opacity: 0, y: 18, duration: 0.55, stagger: 0.1 }, "-=0.25");
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  fetchDashboardRef.current = async (background: boolean) => {
    if (background) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const [metricsRes, alertsRes] = await Promise.all([
        fetch(getApiUrl("/api/metrics")),
        fetch(getApiUrl("/api/alerts?limit=60")),
      ]);

      if (!metricsRes.ok || !alertsRes.ok) {
        throw new Error("Unable to load dashboard data from API.");
      }

      const metricsJson = (await metricsRes.json()) as MetricsResponse;
      const alertsJson = (await alertsRes.json()) as { data: AlertItem[] };
      startTransition(() => {
        setMetrics(metricsJson);
        setAlerts(alertsJson.data || []);
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unexpected error while loading dashboard data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void fetchDashboardRef.current(false);
    const timer = window.setInterval(() => {
      void fetchDashboardRef.current(true);
    }, ALERT_REFRESH_MS);
    return () => window.clearInterval(timer);
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
      const response = await fetch(getApiUrl("/api/score"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_id: scoreForm.account_id.trim(),
          transaction_type: scoreForm.transaction_type,
          amount: parsedAmount,
          currency: scoreForm.currency,
          device_id: scoreForm.device_id.trim() || undefined,
          location: scoreForm.location.trim() || undefined,
        }),
      });

      const body = (await response.json()) as { data?: ScoreResponse; error?: string };
      if (!response.ok || !body.data) {
        throw new Error(body.error || "Scoring failed.");
      }

      startTransition(() => {
        setScoreResult(body.data as ScoreResponse);
      });
      await fetchDashboardRef.current(true);
    } catch (submitError) {
      setScoreError(submitError instanceof Error ? submitError.message : "Unexpected scoring error.");
    } finally {
      setScoring(false);
    }
  }

  const filteredAlerts = deferredAlerts.filter((item) => {
    if (activeAlertTab === "open") {
      return item.status === "open";
    }
    if (activeAlertTab === "high") {
      return item.risk_score >= 0.8;
    }
    return true;
  });

  const riskTrendData = deferredAlerts
    .slice()
    .reverse()
    .slice(-12)
    .map((item) => ({
      time: formatTimestamp(item.created_at),
      risk: Number(item.risk_score.toFixed(3)),
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
    <div ref={rootRef} className="app-shell relative min-h-screen overflow-hidden">
      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-8 md:px-8 md:py-10">
        <header className="js-hero space-y-6 rounded-3xl border border-border/70 bg-card/65 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge
              variant="outline"
              className="mono rounded-full border-border bg-background/70 tracking-[0.2em]"
            >
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
                onClick={() => {
                  void fetchDashboardRef.current(false);
                }}
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
                <span className="mt-1 block text-muted-foreground">Built for live mobile-money defense.</span>
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                Minimal visual surface, maximum operational signal. Monitor alerts, inspect risk movement, and
                test new transactions in one panel.
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
                    : `Tracking ${formatNumber(deferredAlerts.length)} recent alerts with automatic refresh every 25s.`}
                </p>
                <p className="mono text-xs text-primary">Endpoint: {API_BASE || "relative /api (via Vite proxy)"}</p>
              </CardContent>
            </Card>
          </div>
        </header>

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
                    <Area
                      type="monotone"
                      dataKey="risk"
                      stroke="var(--color-risk)"
                      fill="url(#riskFill)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="threshold"
                      stroke="var(--color-threshold)"
                      fill="transparent"
                      strokeDasharray="4 4"
                      strokeWidth={1.2}
                    />
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

        <section className="grid gap-3 xl:grid-cols-[1.15fr,0.85fr]">
          <Card className="js-panel rounded-2xl border-border/70 bg-card/60">
            <CardHeader>
              <CardDescription className="mono text-[11px] tracking-[0.16em] uppercase">
                Alerts Feed
              </CardDescription>
              <CardTitle className="text-xl tracking-[-0.02em]">Operational watchlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeAlertTab} onValueChange={setActiveAlertTab}>
                <TabsList
                  variant="line"
                  className="rounded-xl border border-border/70 bg-background/55 p-1"
                >
                  <TabsTrigger value="all" className="rounded-lg">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="open" className="rounded-lg">
                    Open
                  </TabsTrigger>
                  <TabsTrigger value="high" className="rounded-lg">
                    High Risk
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeAlertTab} className="mt-3">
                  <div className="max-h-[330px] overflow-y-auto rounded-xl border border-border/70">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Risk</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAlerts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                              {loading ? "Loading alerts..." : "No alerts match this filter."}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredAlerts.slice(0, 40).map((alert) => (
                            <TableRow key={alert.id}>
                              <TableCell className="mono">{alert.account_id}</TableCell>
                              <TableCell>{alert.alert_type}</TableCell>
                              <TableCell>{Number(alert.risk_score).toFixed(3)}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    alert.status === "open"
                                      ? "rounded-full border-primary/70 bg-primary/10 text-primary"
                                      : "rounded-full border-border text-muted-foreground"
                                  }
                                >
                                  {alert.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatTimestamp(alert.created_at)}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="js-panel rounded-2xl border-border/70 bg-card/60">
            <CardHeader>
              <CardDescription className="mono text-[11px] tracking-[0.16em] uppercase">
                Score Transaction
              </CardDescription>
              <CardTitle className="text-xl tracking-[-0.02em]">Live fraud prediction test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                className="grid gap-3"
                onSubmit={async (event) => {
                  event.preventDefault();
                  await submitScore();
                }}
              >
                <div className="grid gap-1.5">
                  <Label htmlFor="account_id" className="mono uppercase tracking-[0.12em]">
                    Account ID
                  </Label>
                  <Input
                    id="account_id"
                    className="rounded-xl"
                    value={scoreForm.account_id}
                    onChange={(event) =>
                      setScoreForm((current) => ({ ...current, account_id: event.target.value }))
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="transaction_type" className="mono uppercase tracking-[0.12em]">
                      Type
                    </Label>
                    <NativeSelect
                      id="transaction_type"
                      className="w-full rounded-xl"
                      value={scoreForm.transaction_type}
                      onChange={(event) =>
                        setScoreForm((current) => ({ ...current, transaction_type: event.target.value }))
                      }
                    >
                      <NativeSelectOption value="cash_in">cash_in</NativeSelectOption>
                      <NativeSelectOption value="cash_out">cash_out</NativeSelectOption>
                      <NativeSelectOption value="bill_payment">bill_payment</NativeSelectOption>
                      <NativeSelectOption value="p2p_transfer">p2p_transfer</NativeSelectOption>
                      <NativeSelectOption value="merchant_payment">merchant_payment</NativeSelectOption>
                    </NativeSelect>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="currency" className="mono uppercase tracking-[0.12em]">
                      Currency
                    </Label>
                    <NativeSelect
                      id="currency"
                      className="w-full rounded-xl"
                      value={scoreForm.currency}
                      onChange={(event) =>
                        setScoreForm((current) => ({ ...current, currency: event.target.value }))
                      }
                    >
                      <NativeSelectOption value="USD">USD</NativeSelectOption>
                      <NativeSelectOption value="ZWL">ZWL</NativeSelectOption>
                    </NativeSelect>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="amount" className="mono uppercase tracking-[0.12em]">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    className="rounded-xl"
                    value={scoreForm.amount}
                    onChange={(event) =>
                      setScoreForm((current) => ({ ...current, amount: event.target.value }))
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="device_id" className="mono uppercase tracking-[0.12em]">
                      Device ID
                    </Label>
                    <Input
                      id="device_id"
                      className="rounded-xl"
                      value={scoreForm.device_id}
                      onChange={(event) =>
                        setScoreForm((current) => ({ ...current, device_id: event.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="location" className="mono uppercase tracking-[0.12em]">
                      Location
                    </Label>
                    <Input
                      id="location"
                      className="rounded-xl"
                      value={scoreForm.location}
                      onChange={(event) =>
                        setScoreForm((current) => ({ ...current, location: event.target.value }))
                      }
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mono rounded-xl bg-primary text-primary-foreground uppercase tracking-[0.14em]"
                  disabled={scoring}
                >
                  <FiSend />
                  {scoring ? "Scoring..." : "Score Transaction"}
                </Button>
              </form>

              {scoreError ? (
                <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {scoreError}
                </div>
              ) : null}

              {scoreResult ? (
                <div className="space-y-2 rounded-xl border border-primary/35 bg-primary/8 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Latest Result
                    </p>
                    <Badge className="rounded-full bg-primary text-primary-foreground">
                      {scoreResult.risk_level}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground">
                    Risk Score: <span className="mono">{scoreResult.risk_score.toFixed(4)}</span>
                  </p>
                  <p className="text-sm text-foreground">Reason: {scoreResult.reason}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default App;
