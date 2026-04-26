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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  fetchAlertById,
  fetchAlerts,
  formatCurrency,
  formatTimestamp,
  patchAlertStatus,
  type AlertDetail,
  type AlertItem,
} from "@/lib/api";

// ── Risk helpers ─────────────────────────────────────────────────────────────

function riskStyle(score: number) {
  if (score >= 0.9) return { dot: "bg-red-500",    badge: "border-red-200 bg-red-50 text-red-700",       label: "critical" };
  if (score >= 0.75) return { dot: "bg-orange-500", badge: "border-orange-200 bg-orange-50 text-orange-700", label: "high" };
  if (score >= 0.55) return { dot: "bg-amber-500",  badge: "border-amber-200 bg-amber-50 text-amber-700",   label: "medium" };
  return               { dot: "bg-green-500",  badge: "border-green-200 bg-green-50 text-green-700",    label: "low" };
}

function statusStyle(status: string) {
  if (status === "open")     return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "resolved") return "border-green-200 bg-green-50 text-green-700";
  return "border-zinc-200 bg-zinc-50 text-zinc-500";
}

// ── Drawer meta row ───────────────────────────────────────────────────────────

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-zinc-100 py-2.5 last:border-0">
      <span className="mono shrink-0 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="break-all text-right text-xs text-foreground">{value}</span>
    </div>
  );
}

// ── Alert detail drawer ───────────────────────────────────────────────────────

function AlertDrawer({
  alertId,
  onClose,
  onStatusChange,
}: {
  alertId: number | null;
  onClose: () => void;
  onStatusChange: (id: number, status: "open" | "closed" | "resolved") => void;
}) {
  const [detail, setDetail]   = useState<AlertDetail | null>(null);
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
    } finally { setUpdating(false); }
  }

  let parsedMeta: Record<string, string> | null = null;
  if (detail?.metadata_json) {
    try { parsedMeta = JSON.parse(detail.metadata_json) as Record<string, string>; } catch {}
  }

  const rs = detail ? riskStyle(detail.risk_score) : null;

  return (
    <Sheet open={alertId != null} onOpenChange={open => { if (!open) onClose(); }}>
      <SheetContent className="w-full max-w-md overflow-y-auto border-l border-border bg-white p-0">
        <SheetHeader className="border-b border-zinc-100 p-5">
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
              <div className="flex shrink-0 gap-1.5">
                {detail.status === "open" ? (
                  <>
                    <Button size="sm" variant="outline"
                      className="h-7 rounded-lg border-green-200 bg-green-50 px-2.5 text-xs text-green-700 hover:bg-green-100"
                      disabled={updating} onClick={() => void handleStatus("resolved")}
                    >
                      <FiCheck size={11} /> Resolve
                    </Button>
                    <Button size="sm" variant="outline"
                      className="h-7 rounded-lg px-2.5 text-xs"
                      disabled={updating} onClick={() => void handleStatus("closed")}
                    >
                      <FiMinus size={11} /> Dismiss
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline"
                    className="h-7 rounded-lg px-2.5 text-xs"
                    disabled={updating} onClick={() => void handleStatus("open")}
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
                <Skeleton key={i} className="h-4 w-full rounded-md bg-zinc-100" />
              ))}
            </div>
          ) : detail ? (
            <>
              {/* Status row */}
              <div className="flex flex-wrap items-center gap-2">
                {rs && (
                  <Badge variant="outline" className={`rounded-md text-[11px] ${rs.badge}`}>
                    <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${rs.dot}`} />
                    {detail.risk_score.toFixed(3)} · {rs.label}
                  </Badge>
                )}
                <Badge variant="outline" className={`rounded-md text-[11px] ${statusStyle(detail.status)}`}>
                  {detail.status}
                </Badge>
                <Badge variant="outline" className="rounded-md border-zinc-200 bg-zinc-50 text-[11px] text-zinc-500">
                  {detail.alert_type}
                </Badge>
              </div>

              {detail.reason && (
                <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
                  {detail.reason}
                </p>
              )}

              <div>
                <p className="mono mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Alert
                </p>
                <MetaRow label="ID"      value={`#${detail.id}`} />
                <MetaRow label="Created" value={formatTimestamp(detail.created_at)} />
                {detail.resolved_at && (
                  <MetaRow label="Resolved" value={formatTimestamp(detail.resolved_at)} />
                )}
              </div>

              <div>
                <p className="mono mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Transaction
                </p>
                <MetaRow label="Txn ID"  value={`#${detail.transaction_id}`} />
                <MetaRow label="Account" value={<span className="mono">{detail.account_id}</span>} />
                <MetaRow label="Type"    value={detail.transaction_type} />
                <MetaRow label="Amount"  value={<span className="mono">{formatCurrency(detail.amount, detail.currency)}</span>} />
                <MetaRow label="Date"    value={formatTimestamp(detail.transaction_created_at)} />
                {detail.device_id && <MetaRow label="Device"   value={<span className="mono">{detail.device_id}</span>} />}
                {detail.location  && <MetaRow label="Location" value={detail.location} />}
                <MetaRow
                  label="Flag"
                  value={
                    <Badge variant="outline" className={`rounded-md text-[11px] ${
                      detail.is_fraud
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-zinc-200 bg-zinc-50 text-zinc-500"
                    }`}>
                      {detail.is_fraud ? "flagged" : "clean"}
                    </Badge>
                  }
                />
                {detail.fraud_score != null && (
                  <MetaRow label="Score" value={<span className="mono">{detail.fraud_score.toFixed(6)}</span>} />
                )}
              </div>

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

// ── Main view ─────────────────────────────────────────────────────────────────

export default function AlertsView() {
  const [alerts, setAlerts]         = useState<AlertItem[]>([]);
  const [loading, setLoading]       = useState(true);
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
  const openCount  = alerts.filter(a => a.status === "open").length;

  const filtered = alerts.filter(a => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (typeFilter   !== "all" && a.alert_type !== typeFilter) return false;
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

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-[13px] font-semibold text-foreground">Alerts</h1>
          {openCount > 0 && (
            <span className="mono rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] uppercase tracking-widest text-blue-700">
              {openCount} open
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 rounded-lg px-3 text-xs font-medium shadow-none"
          onClick={() => void load(false)}
          disabled={refreshing || loading}
        >
          <FiRefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search account, type, reason…"
          className="h-8 w-60 rounded-lg bg-card text-xs shadow-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <NativeSelect
          className="h-8 w-36 rounded-lg bg-card text-xs shadow-none"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <NativeSelectOption value="all">All statuses</NativeSelectOption>
          <NativeSelectOption value="open">Open</NativeSelectOption>
          <NativeSelectOption value="resolved">Resolved</NativeSelectOption>
          <NativeSelectOption value="closed">Closed</NativeSelectOption>
        </NativeSelect>
        <NativeSelect
          className="h-8 w-40 rounded-lg bg-card text-xs shadow-none"
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
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-100 hover:bg-transparent">
                {[
                  { h: "Account",  cls: "pl-5" },
                  { h: "Type",     cls: "" },
                  { h: "Amount",   cls: "" },
                  { h: "Risk",     cls: "" },
                  { h: "Status",   cls: "" },
                  { h: "Time",     cls: "" },
                  { h: "Actions",  cls: "pr-5 text-right" },
                ].map(({ h, cls }) => (
                  <TableHead key={h} className={`bg-zinc-50/70 text-[11px] font-medium uppercase tracking-widest text-muted-foreground ${cls}`}>
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(8)].map((_, i) => (
                  <TableRow key={i} className="border-zinc-100">
                    {[...Array(7)].map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-3.5 w-20 rounded-md bg-zinc-100" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow className="border-zinc-100">
                  <TableCell colSpan={7} className="py-14 text-center text-sm text-muted-foreground">
                    No alerts match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(alert => {
                  const rs = riskStyle(alert.risk_score);
                  return (
                    <TableRow
                      key={alert.id}
                      className="cursor-pointer border-zinc-100 transition-colors hover:bg-zinc-50"
                      onClick={() => setSelectedId(alert.id)}
                    >
                      <TableCell className="mono pl-5 text-xs font-medium">{alert.account_id}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{alert.alert_type}</TableCell>
                      <TableCell className="mono text-xs">{formatCurrency(alert.amount, alert.currency)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${rs.dot}`} />
                          <span className="mono text-xs text-foreground">{alert.risk_score.toFixed(3)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`rounded-md text-[11px] ${statusStyle(alert.status)}`}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {formatTimestamp(alert.created_at)}
                      </TableCell>
                      <TableCell className="pr-5 text-right" onClick={e => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="mono inline-flex h-7 cursor-pointer items-center gap-1 rounded-lg px-2.5 text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-zinc-100 hover:text-foreground">
                            Actions <FiChevronDown size={10} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl border-zinc-200 bg-white shadow-md">
                            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => setSelectedId(alert.id)}>
                              View details
                            </DropdownMenuItem>
                            {alert.status === "open" ? (
                              <>
                                <DropdownMenuItem
                                  className="cursor-pointer gap-2 text-xs text-green-700"
                                  onClick={() => void quickStatus(alert.id, "resolved")}
                                >
                                  <FiCheck size={11} /> Mark resolved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer gap-2 text-xs"
                                  onClick={() => void quickStatus(alert.id, "closed")}
                                >
                                  <FiMinus size={11} /> Dismiss
                                </DropdownMenuItem>
                              </>
                            ) : (
                              <DropdownMenuItem
                                className="cursor-pointer text-xs"
                                onClick={() => void quickStatus(alert.id, "open")}
                              >
                                Reopen
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
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
