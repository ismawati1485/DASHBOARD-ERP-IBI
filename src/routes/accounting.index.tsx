import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { DollarSign, TrendingDown, TrendingUp, Receipt, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { accountingKpiByCompany, profitTrend, costRealization, recentActivity } from "@/data/accounting";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { MonthFilter, DEFAULT_MONTH, filterByMonth } from "@/components/filters/MonthFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR } from "@/lib/format";

function AccountingOverview() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);
  const [month, setMonth] = useState(DEFAULT_MONTH);

  const k = useMemo(() => {
    const rows = filterByCompany(accountingKpiByCompany, companyId);
    const sum = (key: keyof typeof rows[number]) => rows.reduce((a, b) => a + (b[key] as number), 0);
    const trendAvg = (key: "revenue" | "cost" | "profit" | "outstanding") =>
      rows.length ? rows.reduce((a, b) => a + b.trends[key], 0) / rows.length : 0;
    return {
      totalRevenue: sum("totalRevenue"),
      totalCost: sum("totalCost"),
      netProfit: sum("netProfit"),
      outstandingInvoice: sum("outstandingInvoice"),
      trends: { revenue: trendAvg("revenue"), cost: trendAvg("cost"), profit: trendAvg("profit"), outstanding: trendAvg("outstanding") },
    };
  }, [companyId]);

  const trend = useMemo(() => {
    const rows = filterByMonth(filterByCompany(profitTrend, companyId), month);
    const grouped: Record<string, { bulan: string; profit: number }> = {};
    rows.forEach((r) => { grouped[r.bulan] ??= { bulan: r.bulan, profit: 0 }; grouped[r.bulan].profit += r.profit; });
    const order = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    return order.map((b) => grouped[b]).filter(Boolean);
  }, [companyId, month]);

  const costs = useMemo(() => filterByMonth(filterByCompany(costRealization, companyId), month), [companyId, month]);
  const acts = useMemo(() => filterByCompany(recentActivity, companyId), [companyId]);

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
      <FiltersBar>
        <CompanyFilter value={companyId} onChange={setCompanyId} />
        <MonthFilter value={month} onChange={setMonth} />
      </FiltersBar>

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
          <CardHeader><CardTitle className="text-base">Profit Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
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
          <CardHeader><CardTitle className="text-base">Cost Realization</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {costs.map((c) => {
              const pct = (c.realisasi / c.target) * 100;
              return (
                <div key={`${c.companyId}-${c.kategori}`}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{c.kategori}</span>
                    <span className="tabular-nums text-muted-foreground">{pct.toFixed(0)}%</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                  <div className="mt-1 text-xs text-muted-foreground">{fmtIDR(c.realisasi)} / {fmtIDR(c.target)}</div>
                </div>
              );
            })}
            {costs.length === 0 && <p className="text-sm text-muted-foreground">Tidak ada data.</p>}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Recent Accounting Activity</CardTitle></CardHeader>
        <CardContent>
          <ul className="divide-y">
            {acts.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{a.desc}</div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
                <Badge variant="outline">{a.type}</Badge>
              </li>
            ))}
            {acts.length === 0 && <li className="py-3 text-sm text-muted-foreground">Tidak ada aktivitas.</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/accounting/")({ component: AccountingOverview });
