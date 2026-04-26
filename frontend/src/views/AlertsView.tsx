import { startTransition, useCallback, useEffect, useState } from "react";
import { FiCheck, FiChevronDown, FiMinus, FiRefreshCw, FiX } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchAlerts,
  fetchAlertById,
  patchAlertStatus,
  formatTimestamp,
  formatCurrency,
  riskBadgeClass,
  statusBadgeClass,
  type AlertItem,
  type AlertDetail,
} from "@/lib/api";

// ── Shared badge components ─────────────────────────────────────────────────

function RiskBadge({ score }: { score: number }) {
  const label = score >= 0.9 ? "critical" : score >= 0.75 ? "high" : score >= 0.55 ? "medium" : "low";
  return (
    <Badge variant="outline" className={riskBadgeClass(score)}>
      {score.toFixed(3)} · {label}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={statusBadgeClass(status)}>
      {status}
    </Badge>
  );
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/40 py-2 last:border-0">
      <span className="mono shrink-0 text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
        {label}
      </span>
      <span className="break-all text-right text-sm text-foreground">{value}</span>
    </div>
  );
}

// ── Alert detail drawer ─────────────────────────────────────────────────────

type DrawerProps = {
  alertId: number | null;
  onClose: () => void;
  onStatusChange: (id: number, status: "open" | "closed" | "resolved") => void;
};

function AlertDrawer({ alertId, onClose, onStatusChange }: DrawerProps) {
  const [detail, setDetail] = useState<AlertDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (alertId == null) { setDetail(null); return; }
    setLoading(true);
    fetchAlertById(alertId)
      .then((r) => setDetail(r.data))
      .catch(() => setDetail(null))
      .finally(() => setLoading(false));
  }, [alertId]);

  async function handleStatus(status: "open" | "closed" | "resolved") {
    if (!detail) return;
    setUpdating(true);
    try {
      await patchAlertStatus(detail.id, status);
      setDetail((d) => (d ? { ...d, status } : d));
      onStatusChange(detail.id, status);
    } finally {
      setUpdating(false);
    }
  }

  let parsedMeta: Record<string, string> | null = null;
  if (detail?.metadata_json) {
    try { parsedMeta = JSON.parse(detail.metadata_json) as Record<string, string>; } catch {}
  }

  return (
    <Sheet open={alertId != null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full max-w-lg overflow-y-auto border-border/70 bg-sidebar p-0">
        <SheetHeader className="border-b border-border/70 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle className="tracking-[-0.02em]">Alert #{alertId}</SheetTitle>
              <SheetDescription className="mono mt-1 text-[11px] tracking-[0.12em] uppercase">
                Transaction detail
              </SheetDescription>
            </div>
            {detail && !loading && (
              <div className="flex gap-2">
                {detail.status === "open" ? (
                  <>
                    <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5"
                      disabled={updating} onClick={() => void handleStatus("resolved")}>
                      <FiCheck className="text-primary" /> Resolve
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5"
                      disabled={updating} onClick={() => void handleStatus("closed")}>
                      <FiMinus /> Dismiss
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" className="rounded-xl text-xs"
                    disabled={updating} onClick={() => void handleStatus("open")}>
                    Reopen
                  </Button>
                )}
              </div>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6 p-6">
          {loading ? (
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full rounded-lg bg-muted/60" />
              ))}
            </div>
          ) : detail ? (
            <>
              <div className="flex flex-wrap gap-2">
                <RiskBadge score={detail.risk_score} />
                <StatusBadge status={detail.status} />
                <Badge variant="outline" className="rounded-full border-border text-muted-foreground">
                  {detail.alert_type}
                </Badge>
              </div>

              {detail.reason && (
                <div className="rounded-xl border border-border/50 bg-background/40 p-3 text-sm text-muted-foreground">
                  {detail.reason}
                </div>
              )}

              <div>
                <p className="mono mb-2 text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  Alert Info
                </p>
                <MetaRow label="Alert ID" value={`#${detail.id}`} />
                <MetaRow label="Created" value={formatTimestamp(detail.created_at)} />
                {detail.resolved_at && (
                  <MetaRow label="Resolved" value={formatTimestamp(detail.resolved_at)} />
                )}
              </div>

              <div>
                <p className="mono mb-2 text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  Transaction
                </p>
                <MetaRow label="Txn ID" value={`#${detail.transaction_id}`} />
                <MetaRow label="Account" value={<span className="mono">{detail.account_id}</span>} />
                <MetaRow label="Type" value={detail.transaction_type} />
                <MetaRow label="Amount" value={<span className="mono">{formatCurrency(detail.amount, detail.currency)}</span>} />
                <MetaRow label="Date" value={formatTimestamp(detail.transaction_created_at)} />
                {detail.device_id && <MetaRow label="Device" value={<span className="mono">{detail.device_id}</span>} />}
                {detail.location && <MetaRow label="Location" value={detail.location} />}
                <MetaRow
                  label="Fraud flag"
                  value={
                    <Badge variant="outline" className={detail.is_fraud
                      ? "rounded-full border-destructive/70 bg-destructive/15 text-destructive"
                      : "rounded-full border-border text-muted-foreground"
                    }>
                      {detail.is_fraud ? "flagged" : "clean"}
                    </Badge>
                  }
                />
                {detail.fraud_score != null && (
                  <MetaRow label="Model score" value={<span className="mono">{detail.fraud_score.toFixed(6)}</span>} />
                )}
              </div>

              {parsedMeta && Object.keys(parsedMeta).length > 0 && (
                <div>
                  <p className="mono mb-2 text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                    Metadata
                  </p>
                  {Object.entries(parsedMeta).map(([k, v]) => (
                    <MetaRow key={k} label={k.replace(/_/g, " ")} value={<span className="mono">{String(v)}</span>} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Could not load alert details.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Main view ───────────────────────────────────────────────────────────────

export default function AlertsView() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const load = useCallback(async (bg: boolean) => {
    bg ? setRefreshing(true) : setLoading(true);
    try {
      const res = await fetchAlerts({ limit: 200 });
      startTransition(() => setAlerts(res.data || []));
    } catch {
      // keep stale
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load(false);
    const t = window.setInterval(() => void load(true), 30000);
    return () => window.clearInterval(t);
  }, [load]);

  function handleStatusChange(id: number, status: "open" | "closed" | "resolved") {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  async function quickStatus(id: number, status: "open" | "closed" | "resolved") {
    await patchAlertStatus(id, status);
    handleStatusChange(id, status);
  }

  const alertTypes = [...new Set(alerts.map((a) => a.alert_type))].sort();

  const filtered = alerts.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (typeFilter !== "all" && a.alert_type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        a.account_id.toLowerCase().includes(q) ||
        a.alert_type.toLowerCase().includes(q) ||
        (a.reason ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openCount = alerts.filter((a) => a.status === "open").length;

  return (
    <div className="flex flex-col gap-5 px-5 py-8 md:px-8 md:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Alerts Feed
          </p>
          <h2 className="mt-0.5 text-2xl font-semibold tracking-[-0.03em]">
            Operational Watchlist
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {openCount > 0 && (
            <Badge className="mono rounded-full bg-primary text-primary-foreground tracking-widest">
              {openCount} open
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mono rounded-xl border-border px-3 text-[11px] uppercase"
            onClick={() => void load(false)}
            disabled={refreshing || loading}
          >
            <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl border-border/70 bg-card/60">
        <CardContent className="pt-5">
          <div className="flex flex-wrap gap-3">
            <Input
              placeholder="Search account, type, reason…"
              className="h-9 max-w-xs rounded-xl text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <NativeSelect
              className="h-9 w-36 rounded-xl text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <NativeSelectOption value="all">All statuses</NativeSelectOption>
              <NativeSelectOption value="open">Open</NativeSelectOption>
              <NativeSelectOption value="resolved">Resolved</NativeSelectOption>
              <NativeSelectOption value="closed">Closed</NativeSelectOption>
            </NativeSelect>
            <NativeSelect
              className="h-9 w-40 rounded-xl text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <NativeSelectOption value="all">All types</NativeSelectOption>
              {alertTypes.map((t) => (
                <NativeSelectOption key={t} value={t}>{t}</NativeSelectOption>
              ))}
            </NativeSelect>
            {(search || statusFilter !== "all" || typeFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-xl text-xs text-muted-foreground"
                onClick={() => { setSearch(""); setStatusFilter("all"); setTypeFilter("all"); }}
              >
                <FiX className="text-xs" /> Clear
              </Button>
            )}
            <span className="mono ml-auto self-center text-xs text-muted-foreground">
              {filtered.length} / {alerts.length} alerts
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl border-border/70 bg-card/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Account</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="pr-5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(8)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(7)].map((__, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-20 rounded-lg bg-muted/60" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                      No alerts match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((alert) => (
                    <TableRow
                      key={alert.id}
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => setSelectedId(alert.id)}
                    >
                      <TableCell className="mono pl-5 text-sm">{alert.account_id}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{alert.alert_type}</TableCell>
                      <TableCell className="mono text-sm">
                        {formatCurrency(alert.amount, alert.currency)}
                      </TableCell>
                      <TableCell><RiskBadge score={alert.risk_score} /></TableCell>
                      <TableCell><StatusBadge status={alert.status} /></TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {formatTimestamp(alert.created_at)}
                      </TableCell>
                      <TableCell
                        className="pr-5 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mono h-7 gap-1 rounded-xl px-2 text-[11px] uppercase"
                            >
                              Actions <FiChevronDown className="text-xs" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl border-border/70 bg-sidebar">
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-sm"
                              onClick={() => setSelectedId(alert.id)}
                            >
                              View details
                            </DropdownMenuItem>
                            {alert.status === "open" ? (
                              <>
                                <DropdownMenuItem
                                  className="cursor-pointer gap-2 text-sm text-primary"
                                  onClick={() => void quickStatus(alert.id, "resolved")}
                                >
                                  <FiCheck /> Mark resolved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer gap-2 text-sm"
                                  onClick={() => void quickStatus(alert.id, "closed")}
                                >
                                  <FiMinus /> Dismiss
                                </DropdownMenuItem>
                              </>
                            ) : (
                              <DropdownMenuItem
                                className="cursor-pointer gap-2 text-sm"
                                onClick={() => void quickStatus(alert.id, "open")}
                              >
                                Reopen
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDrawer
        alertId={selectedId}
        onClose={() => setSelectedId(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
