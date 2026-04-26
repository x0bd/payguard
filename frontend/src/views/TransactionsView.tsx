import { startTransition, useCallback, useEffect, useState } from "react";
import { FiRefreshCw, FiX } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  fetchTransactions,
  formatTimestamp,
  formatCurrency,
  type TransactionItem,
} from "@/lib/api";

const PAGE_SIZE = 100;

export default function TransactionsView() {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading]           = useState(true);
  const [refreshing, setRefreshing]     = useState(false);
  const [search, setSearch]             = useState("");
  const [typeFilter, setTypeFilter]     = useState("all");
  const [fraudFilter, setFraudFilter]   = useState("all");

  const load = useCallback(async (bg: boolean) => {
    bg ? setRefreshing(true) : setLoading(true);
    try {
      const res = await fetchTransactions({ limit: PAGE_SIZE });
      startTransition(() => setTransactions(res.data || []));
    } catch { /* keep stale */ }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => { void load(false); }, [load]);

  const txTypes = [...new Set(transactions.map(t => t.transaction_type))].sort();

  const filtered = transactions.filter(t => {
    if (typeFilter !== "all"  && t.transaction_type !== typeFilter) return false;
    if (fraudFilter === "flagged" && !t.is_fraud)  return false;
    if (fraudFilter === "clean"   &&  t.is_fraud)  return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        t.account_id.toLowerCase().includes(q) ||
        t.transaction_type.toLowerCase().includes(q) ||
        (t.location  ?? "").toLowerCase().includes(q) ||
        (t.device_id ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const flaggedCount = transactions.filter(t => t.is_fraud).length;

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-350">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-foreground">Transactions</h1>
          <span className="mono rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            {transactions.length} loaded
          </span>
          {flaggedCount > 0 && (
            <span className="mono rounded-md border border-destructive/40 bg-destructive/8 px-2 py-0.5 text-[10px] uppercase tracking-widest text-destructive">
              {flaggedCount} flagged
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
          placeholder="Search account, location, device…"
          className="h-8 w-56 rounded-lg bg-card text-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <NativeSelect
          className="h-8 w-40 rounded-lg bg-card text-xs"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <NativeSelectOption value="all">All types</NativeSelectOption>
          {txTypes.map(t => (
            <NativeSelectOption key={t} value={t}>{t}</NativeSelectOption>
          ))}
        </NativeSelect>
        <NativeSelect
          className="h-8 w-36 rounded-lg bg-card text-xs"
          value={fraudFilter}
          onChange={e => setFraudFilter(e.target.value)}
        >
          <NativeSelectOption value="all">All</NativeSelectOption>
          <NativeSelectOption value="flagged">Flagged only</NativeSelectOption>
          <NativeSelectOption value="clean">Clean only</NativeSelectOption>
        </NativeSelect>
        {(search || typeFilter !== "all" || fraudFilter !== "all") && (
          <button
            type="button"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => { setSearch(""); setTypeFilter("all"); setFraudFilter("all"); }}
          >
            <FiX size={11} /> Clear
          </button>
        )}
        <span className="mono ml-auto text-[11px] text-muted-foreground">{filtered.length} shown</span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="max-h-[70vh] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card">
              <TableRow className="border-border hover:bg-transparent">
                {["ID", "Account", "Type", "Amount", "Location", "Risk", "Fraud", "Date"].map(h => (
                  <TableHead
                    key={h}
                    className={`text-[11px] font-medium uppercase tracking-widest text-muted-foreground ${h === "ID" ? "pl-5" : ""} ${h === "Date" ? "pr-5" : ""}`}
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(10)].map((_, i) => (
                  <TableRow key={i} className="border-border">
                    {[...Array(8)].map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-3.5 w-20 rounded-md bg-muted" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow className="border-border">
                  <TableCell colSpan={8} className="py-12 text-center text-sm text-muted-foreground">
                    No transactions match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(tx => (
                  <TableRow key={tx.id} className="border-border transition-colors hover:bg-muted/20">
                    <TableCell className="mono pl-5 text-[11px] text-muted-foreground">#{tx.id}</TableCell>
                    <TableCell className="mono text-xs">{tx.account_id}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{tx.transaction_type}</TableCell>
                    <TableCell className="mono text-xs">{formatCurrency(tx.amount, tx.currency)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{tx.location ?? "—"}</TableCell>
                    <TableCell>
                      {tx.fraud_score != null ? (
                        <span className={[
                          "mono text-xs font-medium",
                          tx.fraud_score >= 0.75 ? "text-destructive" :
                          tx.fraud_score >= 0.55 ? "text-yellow-400" :
                          "text-muted-foreground",
                        ].join(" ")}>
                          {tx.fraud_score.toFixed(3)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground/40">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`rounded-md text-[11px] ${
                          tx.is_fraud
                            ? "border-destructive/50 bg-destructive/10 text-destructive"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {tx.is_fraud ? "fraud" : "clean"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5 whitespace-nowrap text-xs text-muted-foreground">
                      {formatTimestamp(tx.created_at)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {!loading && transactions.length === PAGE_SIZE && (
          <div className="border-t border-border px-5 py-3">
            <p className="mono text-[11px] text-muted-foreground">
              Showing latest {PAGE_SIZE} transactions · use Account Lookup for full history
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
