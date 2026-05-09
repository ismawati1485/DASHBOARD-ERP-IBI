import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { DollarSign, TrendingDown, TrendingUp, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { accountingKpi, profitTrend, costRealization, recentActivity } from "@/data/accounting";
import { fmtIDR } from "@/lib/format";

function AccountingOverview() {
  const k = accountingKpi;
  const cards = [
    { label: "Total Revenue", value: fmtIDR(k.totalRevenue), trend: k.trends.revenue, icon: DollarSign },
    { label: "Total Cost", value: fmtIDR(k.totalCost), trend: k.trends.cost, icon: TrendingDown, invert: true },
    { label: "Net Profit", value: fmtIDR(k.netProfit), trend: k.trends.profit, icon: TrendingUp },
    { label: "Outstanding Invoice", value: fmtIDR(k.outstandingInvoice), trend: k.trends.outstanding, icon: Receipt, invert: true },
  ];

  return (
    <div>
      <PageHeader
        title="Accounting Overview"
        description="Ringkasan keuangan, profitabilitas, dan aktivitas akuntansi terkini."
        crumbs={[{ label: "Accounting" }]}
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
            <CardTitle className="text-base">Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip formatter={(v: number) => `${v} jt`} />
                  <Line type="monotone" dataKey="profit" stroke="#4361EE" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Cost Realization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {costRealization.map((c) => {
              const pct = (c.realisasi / c.target) * 100;
              return (
                <div key={c.kategori}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{c.kategori}</span>
                    <span className="tabular-nums text-muted-foreground">{pct.toFixed(0)}%</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {fmtIDR(c.realisasi)} / {fmtIDR(c.target)}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Recent Accounting Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {recentActivity.map((a) => (
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

export const Route = createFileRoute("/accounting/")({
  component: AccountingOverview,
});
