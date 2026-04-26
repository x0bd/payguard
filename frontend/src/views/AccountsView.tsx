import { useState } from "react";
import { FiSearch, FiUser, FiAlertTriangle, FiArrowDown } from "react-icons/fi";
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

const PAGE = 50;

function StatCard({
  label,
  value,
  sub,
  danger,
  accentColor,
}: {
  label: string;
  value: string;
  sub?: string;
  danger?: boolean;
  accentColor?: string;
}) {
  return (
    <div
      className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
      style={accentColor ? { borderLeftWidth: 3, borderLeftColor: accentColor } : undefined}
    >
      <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`text-3xl font-semibold tracking-tight leading-none ${danger ? "text-red-600" : "text-foreground"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default function AccountsView() {
  const [query, setQuery]               = useState("");
  const [searching, setSearching]       = useState(false);
  const [profile, setProfile]           = useState<AccountProfile | null>(null);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [notFound, setNotFound]         = useState(false);
  const [loadingTx, setLoadingTx]       = useState(false);
  const [txOffset, setTxOffset]         = useState(0);
  const [hasMore, setHasMore]           = useState(false);

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
        <h1 className="text-[13px] font-semibold text-foreground">Account Lookup</h1>
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
          className="h-8 max-w-sm rounded-lg bg-card text-xs shadow-none"
          placeholder="e.g. ZW-EC-00001"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          size="sm"
          className="h-8 gap-1.5 rounded-lg px-3 text-xs font-medium"
          disabled={searching || !query.trim()}
        >
          <FiSearch size={11} />
          {searching ? "Searching…" : "Lookup"}
        </Button>
      </form>

      {/* Not found */}
      {notFound && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-16 text-center">
          <FiUser size={20} className="text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            No account found for <span className="mono font-medium text-foreground">{query}</span>
          </p>
        </div>
      )}

      {/* Skeleton while searching */}
      {searching && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl bg-zinc-100" />
          ))}
        </div>
      )}

      {/* Profile */}
      {profile && !searching && (
        <>
          {/* Identity bar */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <FiUser size={14} className="text-primary" />
            </div>
            <div>
              <p className="mono text-[10px] uppercase tracking-widest text-muted-foreground">Account</p>
              <p className="text-sm font-semibold tracking-tight">{profile.account_id}</p>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              {profile.open_alerts > 0 && (
                <Badge className="rounded-md bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-medium">
                  <FiAlertTriangle size={10} className="mr-1" />
                  {profile.open_alerts} open alert{profile.open_alerts !== 1 ? "s" : ""}
                </Badge>
              )}
              {profile.fraud_rate_percent > 5 && (
                <Badge variant="outline" className="rounded-md border-red-200 bg-red-50 text-[11px] font-medium text-red-700">
                  <FiArrowDown size={10} className="mr-1" />
                  High risk
                </Badge>
              )}
            </div>
          </div>

          {/* KPI stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Transactions"
              value={profile.total_transactions.toLocaleString()}
              sub={`Since ${formatTimestamp(profile.first_transaction)}`}
              accentColor="oklch(0.48 0.16 155)"
            />
            <StatCard
              label="Fraud Rate"
              value={`${profile.fraud_rate_percent.toFixed(2)}%`}
              sub={`${profile.fraud_count} flagged`}
              danger={profile.fraud_rate_percent > 5}
              accentColor={profile.fraud_rate_percent > 5 ? "oklch(0.577 0.245 27.325)" : "oklch(0.65 0.18 50)"}
            />
            <StatCard
              label="Avg Amount"
              value={profile.avg_amount != null ? `$${profile.avg_amount.toFixed(2)}` : "--"}
              sub={profile.max_amount != null ? `Max: $${profile.max_amount.toFixed(2)}` : undefined}
              accentColor="oklch(0.7 0.15 200)"
            />
            <StatCard
              label="Avg Risk Score"
              value={profile.avg_risk_score != null ? profile.avg_risk_score.toFixed(4) : "--"}
              sub={`${profile.total_alerts} total alerts`}
              danger={(profile.avg_risk_score ?? 0) > 0.65}
              accentColor={(profile.avg_risk_score ?? 0) > 0.65 ? "oklch(0.65 0.18 50)" : "oklch(0.6 0.12 280)"}
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
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <div className="max-h-[60vh] overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow className="border-zinc-100 hover:bg-transparent">
                    {[
                      { h: "ID",       cls: "pl-5" },
                      { h: "Type",     cls: "" },
                      { h: "Amount",   cls: "" },
                      { h: "Location", cls: "" },
                      { h: "Risk",     cls: "" },
                      { h: "Fraud",    cls: "" },
                      { h: "Date",     cls: "pr-5" },
                    ].map(({ h, cls }) => (
                      <TableHead
                        key={h}
                        className={`bg-zinc-50/90 text-[11px] font-medium uppercase tracking-widest text-muted-foreground ${cls}`}
                      >
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow className="border-zinc-100">
                      <TableCell colSpan={7} className="py-14 text-center text-sm text-muted-foreground">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map(tx => (
                      <TableRow key={tx.id} className="border-zinc-100 transition-colors hover:bg-zinc-50">
                        <TableCell className="mono pl-5 text-[11px] text-muted-foreground">#{tx.id}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{tx.transaction_type}</TableCell>
                        <TableCell className="mono text-xs">{formatCurrency(tx.amount, tx.currency)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{tx.location ?? "—"}</TableCell>
                        <TableCell>
                          {tx.fraud_score != null ? (
                            <span className={[
                              "mono text-xs font-medium",
                              tx.fraud_score >= 0.75 ? "text-red-600"   :
                              tx.fraud_score >= 0.55 ? "text-amber-600" : "text-muted-foreground",
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
                            className={`rounded-md text-[11px] font-medium ${
                              tx.is_fraud
                                ? "border-red-200 bg-red-50 text-red-700"
                                : "border-zinc-200 bg-zinc-50 text-zinc-500"
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
              <div className="border-t border-zinc-100 p-4 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg px-4 text-xs shadow-none"
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
