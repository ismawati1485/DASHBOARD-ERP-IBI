import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { danaKeluar, danaMasuk, type CashflowRow } from "@/data/finance";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR } from "@/lib/format";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

type Tone = "good" | "warn" | "bad";
const toneClass: Record<Tone, string> = {
  good: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  warn: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  bad: "bg-rose-100 text-rose-700 hover:bg-rose-100",
};

const PIE_COLORS = ["#4361EE",   "#4895EF","#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA"];

function tone(pct: number, kind: "achievement" | "cost"): Tone {
  if (kind === "achievement") {
    if (pct >= 100) return "good";
    if (pct >= 90) return "warn";
    return "bad";
  }
  if (pct >= 100) return "bad";
  if (pct >= 90) return "warn";
  return "good";
}

function CashflowPieChart({title, rows}: {title: string; rows: CashflowRow[]}) {
  const chartData = rows.map((r) => ({name: r.dept, value: r.realisasi}));

  return (
    <Card className ="rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
              >
                {chartData.map((_, index) =>(
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(value: number) => fmtIDR(value)} />
            <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function CashflowTable({ title, rows, partyLabel, kind }: { title: string; rows: CashflowRow[]; partyLabel: string; kind: "achievement" | "cost" }) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dept</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>{partyLabel}</TableHead>
                <TableHead>Group</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="text-right">Realisasi</TableHead>
                <TableHead className="w-48">% Tercapai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => {
                const pct = (r.realisasi / r.target) * 100;
                const t = tone(pct, kind);
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{r.dept}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.party}</TableCell>
                    <TableCell><Badge variant="outline">{r.group}</Badge></TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(r.target)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(r.realisasi)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={Math.min(pct, 120)} className="h-2 flex-1" />
                        <Badge className={toneClass[t]}>{pct.toFixed(0)}%</Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {rows.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-6">Tidak ada data.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function CashflowPage() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);
  const keluar = useMemo(() => filterByCompany(danaKeluar, companyId), [companyId]);
  const masuk  = useMemo(() => filterByCompany(danaMasuk, companyId), [companyId]);

  return (
    <div>
      <PageHeader
        title="Cashflow"
        description="Realisasi dana keluar & masuk per departemen dan grup."
        crumbs={[{ label: "Finance", to: "/finance" }, { label: "Cashflow" }]}
      />
      <FiltersBar><CompanyFilter value={companyId} onChange={setCompanyId} /></FiltersBar>

<div className="grid gap-4">
  <div className="grid gap-4 lg:grid-cols-2">
    <CashflowPieChart
      title="Analisis Dana Keluar"
      rows={keluar}
    />

    <CashflowTable
      title="Dana Keluar"
      rows={keluar}
      partyLabel="Supplier"
      kind="cost"
    />
  </div>

  <div className="grid gap-4 lg:grid-cols-2">
    <CashflowPieChart
      title="Analisis Dana Masuk"
      rows={masuk}
    />

    <CashflowTable
      title="Dana Masuk"
      rows={masuk}
      partyLabel="Customer"
      kind="achievement"
    />
  </div>
</div>
      </div>
  );
}

export const Route = createFileRoute("/finance/cashflow")({ component: CashflowPage });
