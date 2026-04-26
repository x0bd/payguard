import { startTransition, useCallback, useEffect, useState } from "react";
import { FiRefreshCw, FiX } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [fraudFilter, setFraudFilter] = useState("all");

  const load = useCallback(async (bg: boolean) => {
    bg ? setRefreshing(true) : setLoading(true);
    try {
      const res = await fetchTransactions({ limit: PAGE_SIZE });
      startTransition(() => setTransactions(res.data || []));
    } catch {
      // keep stale
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load(false);
  }, [load]);

  const txTypes = [...new Set(transactions.map((t) => t.transaction_type))].sort();

  const filtered = transactions.filter((t) => {
    if (typeFilter !== "all" && t.transaction_type !== typeFilter) return false;
    if (fraudFilter === "flagged" && !t.is_fraud) return false;
    if (fraudFilter === "clean" && t.is_fraud) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        t.account_id.toLowerCase().includes(q) ||
        t.transaction_type.toLowerCase().includes(q) ||
        (t.location ?? "").toLowerCase().includes(q) ||
        (t.device_id ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const flaggedCount = transactions.filter((t) => t.is_fraud).length;

  return (
    <div className="flex flex-col gap-5 px-5 py-8 md:px-8 md:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Transactions
          </p>
          <h2 className="mt-0.5 text-2xl font-semibold tracking-[-0.03em]">
            Transaction Ledger
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono text-xs text-muted-foreground">
            {flaggedCount} flagged · {transactions.length} loaded
          </span>
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
              placeholder="Search account, location, device…"
              className="h-9 max-w-xs rounded-xl text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <NativeSelect
              className="h-9 w-44 rounded-xl text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <NativeSelectOption value="all">All types</NativeSelectOption>
              {txTypes.map((t) => (
                <NativeSelectOption key={t} value={t}>{t}</NativeSelectOption>
              ))}
            </NativeSelect>
            <NativeSelect
              className="h-9 w-36 rounded-xl text-sm"
              value={fraudFilter}
              onChange={(e) => setFraudFilter(e.target.value)}
            >
              <NativeSelectOption value="all">All transactions</NativeSelectOption>
              <NativeSelectOption value="flagged">Flagged only</NativeSelectOption>
              <NativeSelectOption value="clean">Clean only</NativeSelectOption>
            </NativeSelect>
            {(search || typeFilter !== "all" || fraudFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-xl text-xs text-muted-foreground"
                onClick={() => { setSearch(""); setTypeFilter("all"); setFraudFilter("all"); }}
              >
                <FiX className="text-xs" /> Clear
              </Button>
            )}
            <span className="mono ml-auto self-center text-xs text-muted-foreground">
              {filtered.length} shown
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl border-border/70 bg-card/60">
        <CardContent className="p-0">
          <div className="max-h-[70vh] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="pl-5">ID</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Fraud</TableHead>
                  <TableHead className="pr-5">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(10)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(8)].map((__, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-20 rounded-lg bg-muted/60" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                      No transactions match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/20">
                      <TableCell className="mono pl-5 text-xs text-muted-foreground">
                        #{tx.id}
                      </TableCell>
                      <TableCell className="mono text-sm">{tx.account_id}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {tx.transaction_type}
                      </TableCell>
                      <TableCell className="mono text-sm">
                        {formatCurrency(tx.amount, tx.currency)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {tx.location ?? "—"}
                      </TableCell>
                      <TableCell>
                        {tx.fraud_score != null ? (
                          <span className={[
                            "mono text-sm",
                            tx.fraud_score >= 0.75 ? "text-destructive" :
                            tx.fraud_score >= 0.55 ? "text-yellow-400" :
                            "text-muted-foreground",
                          ].join(" ")}>
                            {tx.fraud_score.toFixed(3)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50 text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={tx.is_fraud
                            ? "rounded-full border-destructive/70 bg-destructive/15 text-destructive text-xs"
                            : "rounded-full border-border text-muted-foreground text-xs"
                          }
                        >
                          {tx.is_fraud ? "fraud" : "clean"}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-5 whitespace-nowrap text-sm text-muted-foreground">
                        {formatTimestamp(tx.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {!loading && transactions.length === PAGE_SIZE && (
            <div className="border-t border-border/40 px-5 py-3 text-center">
              <p className="mono text-xs text-muted-foreground">
                Showing latest {PAGE_SIZE} transactions · use account lookup for full history
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
