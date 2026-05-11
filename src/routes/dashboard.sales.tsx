import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { TrendingUp, Target, DollarSign, Percent } from "lucide-react";
import { salesKpiByCompany, topItemSales, topLostSales, topDrivers, trenPenjualan, topSalesman} from "@/data/sales";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR } from "@/lib/format";

const PIE_COLORS = ["#4361EE", "#7da0eb"];
const alasanVariant = (a: string): "default" | "secondary" | "destructive" | "outline" => {
  if (a === "Harga Tinggi") return "destructive";
  if (a === "Stok Kosong") return "secondary";
  return "outline";
};

function SalesPage() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);

  const kpi = useMemo(() => {
    const rows = filterByCompany(salesKpiByCompany, companyId);
    const totalPenjualan = rows.reduce((a, b) => a + b.totalPenjualan, 0);
    const target = rows.reduce((a, b) => a + b.target, 0);
    return { totalPenjualan, target, realisasi: totalPenjualan - target, persen: target ? (totalPenjualan / target) * 100 : 0 };
  }, [companyId]);

  const itemRows = useMemo(() => filterByCompany(topItemSales, companyId), [companyId]);
  const lostRows = useMemo(() => filterByCompany(topLostSales, companyId), [companyId]);
  const driverRows = useMemo(() => filterByCompany(topDrivers, companyId), [companyId]);
  const salesmanRows = useMemo(() => filterByCompany(topSalesman, companyId), [companyId]);

  const trenRows = useMemo(() => {
    const rows = filterByCompany(trenPenjualan, companyId);
    const grouped: Record<string, { bulan: string; DB001: number; DB002: number }> = {};
    rows.forEach((r) => {
      grouped[r.bulan] ??= { bulan: r.bulan, DB001: 0, DB002: 0 };
      grouped[r.bulan].DB001 += r.DB001;
      grouped[r.bulan].DB002 += r.DB002;
    });
    const order = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    return order.map((b) => grouped[b]).filter(Boolean);
  }, [companyId]);

  const pieData = [
    { name: "Tercapai", value: kpi.totalPenjualan },
    { name: "Sisa Target", value: Math.max(kpi.target - kpi.totalPenjualan, 0) },
  ];

  const kpis = [
    { label: "Total Penjualan", value: fmtIDR(kpi.totalPenjualan), icon: DollarSign },
    { label: "Target", value: fmtIDR(kpi.target), icon: Target },
    { label: "Realisasi", value: fmtIDR(kpi.realisasi), icon: TrendingUp, accent: kpi.realisasi < 0 ? "text-destructive" : "text-emerald-600" },
    { label: "% Tercapai", value: `${kpi.persen.toFixed(1)}%`, icon: Percent, accent: "text-primary" },
  ];

  return (
    <div>
      <PageHeader
        title="Sales Dashboard"
        description="Ringkasan kinerja penjualan, target, dan tren bisnis."
        crumbs={[{ label: "Dashboard", to: "/dashboard" }, { label: "Sales" }]}
      />
      <FiltersBar><CompanyFilter value={companyId} onChange={setCompanyId} /></FiltersBar>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {kpis.map((k) => (
            <Card key={k.label} className="rounded-xl shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{k.label}</CardTitle>
                <k.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent><div className={`text-2xl font-semibold ${k.accent ?? ""}`}>{k.value}</div></CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-xl shadow-sm">
          <CardHeader><CardTitle className="text-base">Pencapaian Target</CardTitle></CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => fmtIDR(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Tren Penjualan per Tahun</CardTitle></CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trenRows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="bulan" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="DB001" stroke="#4361EE" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="DB002" stroke="#5B7CFA" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
{/* Top Item Sales */}
{/* Top Item Sales & Top Salesman */}
<div className="mt-6 grid gap-4 lg:grid-cols-2">
  <Card className="rounded-xl shadow-sm">
    <CardHeader>
      <CardTitle className="text-base">Top Item Sales</CardTitle>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Desc</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">
              Total Penjualan
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {itemRows.map((it) => (
            <TableRow key={it.itemDesc}>
              <TableCell className="font-medium">
                {it.itemDesc}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {it.qty.toLocaleString("id-ID")}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {fmtIDR(it.totalPenjualan)}
              </TableCell>
            </TableRow>
          ))}

          {itemRows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-sm text-muted-foreground py-6"
              >
                Tidak ada data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>

  <Card className="rounded-xl shadow-sm">
    <CardHeader>
      <CardTitle className="text-base">Top Salesman</CardTitle>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Salesman Name</TableHead>
            <TableHead className="text-right">
              Total Penjualan
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {salesmanRows.map((s) => (
            <TableRow key={s.salesmanName}>
              <TableCell className="font-medium">
                {s.salesmanName}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {fmtIDR(s.totalPenjualan)}
              </TableCell>
            </TableRow>
          ))}

          {salesmanRows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-sm text-muted-foreground py-6"
              >
                Tidak ada data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</div>

{/* Top Driver & Top Lost Sales */}
<div className="mt-6 grid gap-4 lg:grid-cols-2">
  <Card className="rounded-xl shadow-sm">
    <CardHeader>
      <CardTitle className="text-base">Top Driver</CardTitle>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver Name</TableHead>
            <TableHead className="text-right">
              Total Tonase (ton)
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {driverRows.map((d) => (
            <TableRow key={d.driverName}>
              <TableCell className="font-medium">
                {d.driverName}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {d.totalTonase.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          ))}

          {driverRows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-sm text-muted-foreground py-6"
              >
                Tidak ada data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>

  <Card className="rounded-xl shadow-sm">
    <CardHeader>
      <CardTitle className="text-base">Top Lost Sales</CardTitle>
    </CardHeader>

    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead className="text-right">
              Total Penjualan
            </TableHead>
            <TableHead>Indikator Alasan</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {lostRows.map((l) => (
            <TableRow key={l.customerName}>
              <TableCell className="font-medium">
                {l.customerName}
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {fmtIDR(l.totalPenjualan)}
              </TableCell>

              <TableCell>
                <Badge variant={alasanVariant(l.alasan)}>
                  {l.alasan}
                </Badge>
              </TableCell>
            </TableRow>
          ))}

          {lostRows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-sm text-muted-foreground py-6"
              >
                Tidak ada data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</div>
</div>

  );
}
export const Route = createFileRoute("/dashboard/sales")({ component: SalesPage });

