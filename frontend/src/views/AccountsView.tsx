import { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  formatNumber,
  formatPercent,
  type AccountProfile,
  type TransactionItem,
} from "@/lib/api";

function StatCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
      <p className="mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{label}</p>
      <p
        className={[
          "mt-1 text-2xl font-semibold tracking-[-0.03em]",
          highlight ? "text-destructive" : "text-foreground",
        ].join(" ")}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default function AccountsView() {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [loadingTx, setLoadingTx] = useState(false);
  const [txOffset, setTxOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const PAGE = 50;

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
      const res = await fetchAccountTransactions(profile.account_id, {
        limit: PAGE,
        offset: txOffset,
      });
      setTransactions((prev) => [...prev, ...res.data]);
      setTxOffset((o) => o + PAGE);
      setHasMore(res.data.length === PAGE);
    } finally {
      setLoadingTx(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 px-5 py-8 md:px-8 md:py-10">
      {/* Header */}
      <div>
        <p className="mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          Accounts
        </p>
        <h2 className="mt-0.5 text-2xl font-semibold tracking-[-0.03em]">Account Lookup</h2>
      </div>

      {/* Search */}
      <Card className="rounded-2xl border-border/70 bg-card/60">
        <CardHeader>
          <CardDescription className="mono text-[11px] tracking-[0.14em] uppercase">
            Search by Account ID
          </CardDescription>
          <CardTitle className="text-lg tracking-[-0.02em]">
            Enter an account ID to view its full transaction history and risk profile.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void search(query);
            }}
          >
            <Input
              className="rounded-xl max-w-sm"
              placeholder="e.g. ZW-EC-00001"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="mono rounded-xl bg-primary text-primary-foreground uppercase tracking-[0.12em] gap-2"
              disabled={searching || !query.trim()}
            >
              <FiSearch />
              {searching ? "Searching…" : "Lookup"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Not found */}
      {notFound && (
        <div className="rounded-2xl border border-border/70 bg-card/60 p-6 text-center text-muted-foreground">
          <FiUser className="mx-auto mb-2 text-2xl opacity-40" />
          <p className="text-sm">
            No account found for <span className="mono text-foreground">{query}</span>.
          </p>
        </div>
      )}

      {/* Skeleton while searching */}
      {searching && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl bg-muted/60" />
          ))}
        </div>
      )}

      {/* Profile */}
      {profile && !searching && (
        <>
          {/* Account identity bar */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border/70 bg-card/60 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <FiUser className="text-primary" />
            </div>
            <div>
              <p className="mono text-xs tracking-[0.14em] uppercase text-muted-foreground">
                Account
              </p>
              <p className="font-semibold tracking-[-0.02em]">{profile.account_id}</p>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              {profile.open_alerts > 0 && (
                <Badge className="rounded-full bg-primary text-primary-foreground">
                  {profile.open_alerts} open alert{profile.open_alerts !== 1 ? "s" : ""}
                </Badge>
              )}
              {profile.fraud_rate_percent > 5 && (
                <Badge variant="outline" className="rounded-full border-destructive/70 bg-destructive/15 text-destructive">
                  High risk account
                </Badge>
              )}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Transactions"
              value={formatNumber(profile.total_transactions)}
              sub={`Since ${formatTimestamp(profile.first_transaction)}`}
            />
            <StatCard
              label="Fraud Rate"
              value={formatPercent(profile.fraud_rate_percent)}
              sub={`${formatNumber(profile.fraud_count)} flagged`}
              highlight={profile.fraud_rate_percent > 5}
            />
            <StatCard
              label="Avg Amount"
              value={`${profile.avg_amount?.toFixed(2) ?? "--"}`}
              sub={`Max: ${profile.max_amount?.toFixed(2) ?? "--"}`}
            />
            <StatCard
              label="Avg Risk Score"
              value={profile.avg_risk_score != null ? profile.avg_risk_score.toFixed(4) : "--"}
              sub={`${formatNumber(profile.total_alerts)} total alerts`}
              highlight={(profile.avg_risk_score ?? 0) > 0.65}
            />
          </div>

          {/* Timeline label */}
          <div className="flex items-center justify-between">
            <div>
              <p className="mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                Transaction History
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Last active: {formatTimestamp(profile.last_transaction)}
              </p>
            </div>
            <span className="mono text-xs text-muted-foreground">{transactions.length} loaded</span>
          </div>

          {/* Transaction table */}
          <Card className="rounded-2xl border-border/70 bg-card/60">
            <CardContent className="p-0">
              <div className="max-h-[60vh] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm">
                    <TableRow>
                      <TableHead className="pl-5">ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Fraud</TableHead>
                      <TableHead className="pr-5">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                          No transactions found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      transactions.map((tx) => (
                        <TableRow key={tx.id} className="hover:bg-muted/20">
                          <TableCell className="mono pl-5 text-xs text-muted-foreground">
                            #{tx.id}
                          </TableCell>
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
                              <span
                                className={[
                                  "mono text-sm",
                                  tx.fraud_score >= 0.75
                                    ? "text-destructive"
                                    : tx.fraud_score >= 0.55
                                      ? "text-yellow-400"
                                      : "text-muted-foreground",
                                ].join(" ")}
                              >
                                {tx.fraud_score.toFixed(3)}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground/50">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                tx.is_fraud
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

              {hasMore && (
                <div className="border-t border-border/40 p-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mono rounded-xl text-[11px] uppercase"
                    onClick={() => void loadMore()}
                    disabled={loadingTx}
                  >
                    {loadingTx ? "Loading…" : "Load more"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
