import { useState } from "react";
import { FiArrowDown, FiSearch, FiUser } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  fetchAccountProfile,
  fetchAccountTransactions,
  formatTimestamp,
  formatCurrency,
  type AccountProfile,
  type TransactionItem,
} from "@/lib/api";

// ── Stat card (same KPI pattern as Dashboard) ────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  danger,
}: {
  label: string;
  value: string;
  sub?: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`text-4xl font-semibold tracking-tight leading-none ${danger ? "text-destructive" : "text-foreground"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

// ── Main view ────────────────────────────────────────────────────────────────

const PAGE = 50;

export default function AccountsView() {
  const [query, setQuery]             = useState("");
  const [searching, setSearching]     = useState(false);
  const [profile, setProfile]         = useState<AccountProfile | null>(null);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [notFound, setNotFound]       = useState(false);
  const [loadingTx, setLoadingTx]     = useState(false);
  const [txOffset, setTxOffset]       = useState(0);
  const [hasMore, setHasMore]         = useState(false);

  async function search(accountId: string) {
    const id = accountId.trim();
    if (!id) return;
    setSearching(true);
    setNotFound(false);
    setProfile(null);
    setTransactions([]);
    setTxOffset(0);

    try {
      const [profileRes, txRes] = await Promise.all([
        fetchAccountProfile(id),
        fetchAccountTransactions(id, { limit: PAGE, offset: 0 }),
      ]);
      setProfile(profileRes.data);
      setTransactions(txRes.data);
      setTxOffset(PAGE);
      setHasMore(txRes.data.length === PAGE);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
        setNotFound(true);
      }
    } finally {
      setSearching(false);
    }
  }

  async function loadMore() {
    if (!profile) return;
    setLoadingTx(true);
    try {
      const res = await fetchAccountTransactions(profile.account_id, { limit: PAGE, offset: txOffset });
      setTransactions(prev => [...prev, ...res.data]);
      setTxOffset(o => o + PAGE);
      setHasMore(res.data.length === PAGE);
    } finally {
      setLoadingTx(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-350">

      {/* Header */}
      <div>
        <h1 className="text-sm font-semibold text-foreground">Account Lookup</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Enter an account ID to view its full transaction history and risk profile.
        </p>
      </div>

      {/* Search bar */}
      <form
        className="flex items-center gap-2"
        onSubmit={e => { e.preventDefault(); void search(query); }}
      >
        <Input
          className="h-9 max-w-sm rounded-lg bg-card text-sm"
          placeholder="e.g. ZW-EC-00001"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          className="h-9 gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium px-4"
          disabled={searching || !query.trim()}
        >
          <FiSearch size={13} />
          {searching ? "Searching…" : "Lookup"}
        </Button>
      </form>

      {/* Not found */}
      {notFound && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card py-12 text-center">
          <FiUser size={20} className="text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No account found for <span className="mono text-foreground">{query}</span>
          </p>
        </div>
      )}

      {/* Skeleton */}
      {searching && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl bg-muted/60" />
          ))}
        </div>
      )}

      {/* Profile */}
      {profile && !searching && (
        <>
          {/* Identity bar */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <FiUser size={14} className="text-primary" />
            </div>
            <div>
              <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground">Account</p>
              <p className="text-sm font-semibold tracking-tight">{profile.account_id}</p>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              {profile.open_alerts > 0 && (
                <Badge className="rounded-md bg-primary text-[11px] text-primary-foreground">
                  {profile.open_alerts} open alert{profile.open_alerts !== 1 ? "s" : ""}
                </Badge>
              )}
              {profile.fraud_rate_percent > 5 && (
                <Badge variant="outline" className="rounded-md border-destructive/50 bg-destructive/10 text-[11px] text-destructive">
                  <FiArrowDown size={10} className="mr-1" />
                  High risk account
                </Badge>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Transactions"
              value={profile.total_transactions.toLocaleString()}
              sub={`Since ${formatTimestamp(profile.first_transaction)}`}
            />
            <StatCard
              label="Fraud Rate"
              value={`${profile.fraud_rate_percent.toFixed(2)}%`}
              sub={`${profile.fraud_count} flagged`}
              danger={profile.fraud_rate_percent > 5}
            />
            <StatCard
              label="Avg Amount"
              value={profile.avg_amount?.toFixed(2) ?? "--"}
              sub={`Max: ${profile.max_amount?.toFixed(2) ?? "--"}`}
            />
            <StatCard
              label="Avg Risk Score"
              value={profile.avg_risk_score != null ? profile.avg_risk_score.toFixed(4) : "--"}
              sub={`${profile.total_alerts} total alerts`}
              danger={(profile.avg_risk_score ?? 0) > 0.65}
            />
          </div>

          {/* Timeline header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Transaction History
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Last active: {formatTimestamp(profile.last_transaction)}
              </p>
            </div>
            <span className="mono text-[11px] text-muted-foreground">{transactions.length} loaded</span>
          </div>

          {/* Transaction table */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="max-h-[60vh] overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-card">
                  <TableRow className="border-border hover:bg-transparent">
                    {["ID", "Type", "Amount", "Location", "Risk", "Fraud", "Date"].map(h => (
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
                  {transactions.length === 0 ? (
                    <TableRow className="border-border">
                      <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map(tx => (
                      <TableRow key={tx.id} className="border-border transition-colors hover:bg-muted/20">
                        <TableCell className="mono pl-5 text-[11px] text-muted-foreground">#{tx.id}</TableCell>
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
            {hasMore && (
              <div className="border-t border-border p-4 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg px-4 text-xs"
                  onClick={() => void loadMore()}
                  disabled={loadingTx}
                >
                  {loadingTx ? "Loading…" : "Load more"}
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
