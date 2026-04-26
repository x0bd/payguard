import { startTransition, useCallback, useEffect, useState } from "react";
import { FiCheck, FiChevronDown, FiMinus, FiRefreshCw, FiX } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

// ── Shared badges ────────────────────────────────────────────────────────────

function RiskBadge({ score }: { score: number }) {
  const label = score >= 0.9 ? "critical" : score >= 0.75 ? "high" : score >= 0.55 ? "medium" : "low";
  return (
    <Badge variant="outline" className={`rounded-md text-[11px] ${riskBadgeClass(score)}`}>
      {score.toFixed(3)} · {label}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={`rounded-md text-[11px] ${statusBadgeClass(status)}`}>
      {status}
    </Badge>
  );
}

// ── Detail row ───────────────────────────────────────────────────────────────

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/30 py-2.5 last:border-0">
      <span className="mono shrink-0 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="break-all text-right text-xs text-foreground">{value}</span>
    </div>
  );
}

// ── Alert drawer ─────────────────────────────────────────────────────────────

function AlertDrawer({
  alertId,
  onClose,
  onStatusChange,
}: {
  alertId: number | null;
  onClose: () => void;
  onStatusChange: (id: number, status: "open" | "closed" | "resolved") => void;
}) {
  const [detail, setDetail] = useState<AlertDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (alertId == null) { setDetail(null); return; }
    setLoading(true);
    fetchAlertById(alertId)
      .then(r => setDetail(r.data))
      .catch(() => setDetail(null))
      .finally(() => setLoading(false));
  }, [alertId]);

  async function handleStatus(status: "open" | "closed" | "resolved") {
    if (!detail) return;
    setUpdating(true);
    try {
      await patchAlertStatus(detail.id, status);
      setDetail(d => d ? { ...d, status } : d);
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
    <Sheet open={alertId != null} onOpenChange={open => { if (!open) onClose(); }}>
      <SheetContent className="w-full max-w-md overflow-y-auto border-border bg-card p-0">

        {/* Drawer header */}
        <SheetHeader className="border-b border-border p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle className="text-sm font-semibold tracking-tight">
                Alert #{alertId}
              </SheetTitle>
              <SheetDescription className="mono mt-0.5 text-[10px] uppercase tracking-widest">
                Transaction detail
              </SheetDescription>
            </div>
            {detail && !loading && (
              <div className="flex gap-2">
                {detail.status === "open" ? (
                  <>
                    <Button size="sm" variant="outline"
                      className="h-7 rounded-lg px-2.5 text-xs gap-1"
                      disabled={updating}
                      onClick={() => void handleStatus("resolved")}
                    >
                      <FiCheck size={11} className="text-primary" /> Resolve
                    </Button>
                    <Button size="sm" variant="outline"
                      className="h-7 rounded-lg px-2.5 text-xs gap-1"
                      disabled={updating}
                      onClick={() => void handleStatus("closed")}
                    >
                      <FiMinus size={11} /> Dismiss
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline"
                    className="h-7 rounded-lg px-2.5 text-xs"
                    disabled={updating}
                    onClick={() => void handleStatus("open")}
                  >
                    Reopen
                  </Button>
                )}
              </div>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6 p-5">
          {loading ? (
            <div className="space-y-2.5">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full rounded-md bg-muted" />
              ))}
            </div>
          ) : detail ? (
            <>
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <RiskBadge score={detail.risk_score} />
                <StatusBadge status={detail.status} />
                <Badge variant="outline" className="rounded-md border-border text-[11px] text-muted-foreground">
                  {detail.alert_type}
                </Badge>
              </div>

              {detail.reason && (
                <p className="rounded-lg border border-border/50 bg-background/60 px-3 py-2.5 text-xs text-muted-foreground">
                  {detail.reason}
                </p>
              )}

              {/* Alert info */}
              <div>
                <p className="mono mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Alert
                </p>
                <MetaRow label="ID" value={`#${detail.id}`} />
                <MetaRow label="Created" value={formatTimestamp(detail.created_at)} />
                {detail.resolved_at && (
                  <MetaRow label="Resolved" value={formatTimestamp(detail.resolved_at)} />
                )}
              </div>

              {/* Transaction info */}
              <div>
                <p className="mono mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Transaction
                </p>
                <MetaRow label="Txn ID"  value={`#${detail.transaction_id}`} />
                <MetaRow label="Account" value={<span className="mono">{detail.account_id}</span>} />
                <MetaRow label="Type"    value={detail.transaction_type} />
                <MetaRow label="Amount"  value={<span className="mono">{formatCurrency(detail.amount, detail.currency)}</span>} />
                <MetaRow label="Date"    value={formatTimestamp(detail.transaction_created_at)} />
                {detail.device_id  && <MetaRow label="Device"   value={<span className="mono">{detail.device_id}</span>} />}
                {detail.location   && <MetaRow label="Location" value={detail.location} />}
                <MetaRow
                  label="Flag"
                  value={
                    <Badge variant="outline" className={`rounded-md text-[11px] ${
                      detail.is_fraud
                        ? "border-destructive/50 bg-destructive/10 text-destructive"
                        : "border-border text-muted-foreground"
                    }`}>
                      {detail.is_fraud ? "flagged" : "clean"}
                    </Badge>
                  }
                />
                {detail.fraud_score != null && (
                  <MetaRow label="Score" value={<span className="mono">{detail.fraud_score.toFixed(6)}</span>} />
                )}
              </div>

              {/* Metadata */}
              {parsedMeta && Object.keys(parsedMeta).length > 0 && (
                <div>
                  <p className="mono mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Metadata
                  </p>
                  {Object.entries(parsedMeta).map(([k, v]) => (
                    <MetaRow key={k} label={k.replace(/_/g, " ")} value={<span className="mono">{String(v)}</span>} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-xs text-muted-foreground">Could not load alert details.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Main view ────────────────────────────────────────────────────────────────

export default function AlertsView() {
  const [alerts, setAlerts]     = useState<AlertItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter]     = useState("all");

  const load = useCallback(async (bg: boolean) => {
    bg ? setRefreshing(true) : setLoading(true);
    try {
      const res = await fetchAlerts({ limit: 200 });
      startTransition(() => setAlerts(res.data || []));
    } catch { /* keep stale */ }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => {
    void load(false);
    const t = window.setInterval(() => void load(true), 30000);
    return () => window.clearInterval(t);
  }, [load]);

  function handleStatusChange(id: number, status: "open" | "closed" | "resolved") {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  async function quickStatus(id: number, status: "open" | "closed" | "resolved") {
    await patchAlertStatus(id, status);
    handleStatusChange(id, status);
  }

  const alertTypes = [...new Set(alerts.map(a => a.alert_type))].sort();

  const filtered = alerts.filter(a => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (typeFilter !== "all"   && a.alert_type !== typeFilter) return false;
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

  const openCount = alerts.filter(a => a.status === "open").length;

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-350">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-foreground">Alerts</h1>
          {openCount > 0 && (
            <span className="mono rounded-md border border-primary/40 bg-primary/8 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
              {openCount} open
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 rounded-lg px-3 text-xs"
          onClick={() => void load(false)}
          disabled={refreshing || loading}
        >
          <FiRefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search account, type, reason…"
          className="h-8 w-56 rounded-lg bg-card text-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <NativeSelect
          className="h-8 w-34 rounded-lg bg-card text-xs"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <NativeSelectOption value="all">All statuses</NativeSelectOption>
          <NativeSelectOption value="open">Open</NativeSelectOption>
          <NativeSelectOption value="resolved">Resolved</NativeSelectOption>
          <NativeSelectOption value="closed">Closed</NativeSelectOption>
        </NativeSelect>
        <NativeSelect
          className="h-8 w-38 rounded-lg bg-card text-xs"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <NativeSelectOption value="all">All types</NativeSelectOption>
          {alertTypes.map(t => (
            <NativeSelectOption key={t} value={t}>{t}</NativeSelectOption>
          ))}
        </NativeSelect>
        {(search || statusFilter !== "all" || typeFilter !== "all") && (
          <button
            type="button"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => { setSearch(""); setStatusFilter("all"); setTypeFilter("all"); }}
          >
            <FiX size={11} /> Clear
          </button>
        )}
        <span className="mono ml-auto text-[11px] text-muted-foreground">
          {filtered.length} / {alerts.length}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Account</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Type</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Amount</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Risk</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Time</TableHead>
                <TableHead className="pr-5 text-right text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(8)].map((_, i) => (
                  <TableRow key={i} className="border-border">
                    {[...Array(7)].map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-3.5 w-20 rounded-md bg-muted" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow className="border-border">
                  <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                    No alerts match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(alert => (
                  <TableRow
                    key={alert.id}
                    className="cursor-pointer border-border transition-colors hover:bg-muted/20"
                    onClick={() => setSelectedId(alert.id)}
                  >
                    <TableCell className="mono pl-5 text-xs">{alert.account_id}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{alert.alert_type}</TableCell>
                    <TableCell className="mono text-xs">{formatCurrency(alert.amount, alert.currency)}</TableCell>
                    <TableCell><RiskBadge score={alert.risk_score} /></TableCell>
                    <TableCell><StatusBadge status={alert.status} /></TableCell>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatTimestamp(alert.created_at)}
                    </TableCell>
                    <TableCell className="pr-5 text-right" onClick={e => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="mono inline-flex h-7 cursor-pointer items-center gap-1 rounded-lg bg-transparent px-2.5 text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                          Actions <FiChevronDown size={10} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-border bg-card">
                          <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => setSelectedId(alert.id)}>
                            View details
                          </DropdownMenuItem>
                          {alert.status === "open" ? (
                            <>
                              <DropdownMenuItem className="cursor-pointer gap-2 text-xs text-primary" onClick={() => void quickStatus(alert.id, "resolved")}>
                                <FiCheck size={11} /> Mark resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer gap-2 text-xs" onClick={() => void quickStatus(alert.id, "closed")}>
                                <FiMinus size={11} /> Dismiss
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => void quickStatus(alert.id, "open")}>
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
      </div>

      <AlertDrawer
        alertId={selectedId}
        onClose={() => setSelectedId(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
