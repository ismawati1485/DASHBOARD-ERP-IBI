import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ArrowDownRight, ArrowUpRight, Wallet, TrendingDown, TrendingUp, Clock } from "lucide-react";
import { financeKpi, cashflowChart, financeActivity, upcomingPayments } from "@/data/finance";
import { fmtIDR, fmtDateID } from "@/lib/format";

function FinanceOverview() {
  const k = financeKpi;
  const cards = [
    { label: "Total Dana Masuk", value: fmtIDR(k.totalDanaMasuk), trend: k.trends.masuk, icon: TrendingUp },
    { label: "Total Dana Keluar", value: fmtIDR(k.totalDanaKeluar), trend: k.trends.keluar, icon: TrendingDown, invert: true },
    { label: "Saldo Kas", value: fmtIDR(k.saldoKas), trend: k.trends.saldo, icon: Wallet },
    { label: "Pending Payment", value: fmtIDR(k.pendingPayment), trend: k.trends.pending, icon: Clock, invert: true },
  ];

  return (
    <div>
      <PageHeader
        title="Finance Overview"
        description="Ringkasan arus kas, pembayaran, dan aktivitas keuangan terkini."
        crumbs={[{ label: "Finance" }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const positive = c.invert ? c.trend < 0 : c.trend >= 0;
          const Arrow = positive ? ArrowUpRight : ArrowDownRight;
          return (
            <Card key={c.label} className="rounded-xl shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
                <c.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{c.value}</div>
                <div className={`mt-1 inline-flex items-center gap-1 text-xs ${positive ? "text-emerald-600" : "text-destructive"}`}>
                  <Arrow className="h-3 w-3" />
                  {Math.abs(c.trend).toFixed(1)}% vs bulan lalu
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Dana Masuk vs Dana Keluar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashflowChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip formatter={(v: number) => `${v} jt`} />
                  <Legend />
                  <Bar dataKey="masuk" name="Dana Masuk" fill="#4361EE" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="keluar" name="Dana Keluar" fill="#5B7CFA" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {upcomingPayments.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium">{p.supplier}</div>
                    <div className="text-xs text-muted-foreground">Jatuh tempo {fmtDateID(p.due)}</div>
                  </div>
                  <div className="text-sm font-semibold tabular-nums">{fmtIDR(p.amount)}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Finance Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {financeActivity.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{a.desc}</div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
                <Badge variant="outline">{a.type}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/finance/")({
  component: FinanceOverview,
});
