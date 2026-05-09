import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { Receipt, FileText, Wallet, Calculator } from "lucide-react";
import { taxKpiByCompany, taxTrend, taxActivity } from "@/data/tax";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR } from "@/lib/format";

const PIE_COLORS = ["#4361EE", "#5B7CFA"];

function TaxOverview() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);

  const k = useMemo(() => {
    const rows = filterByCompany(taxKpiByCompany, companyId);
    return {
      ppnKeluaran: rows.reduce((a, b) => a + b.ppnKeluaran, 0),
      ppnMasukan: rows.reduce((a, b) => a + b.ppnMasukan, 0),
      pphTerutang: rows.reduce((a, b) => a + b.pphTerutang, 0),
      totalFaktur: rows.reduce((a, b) => a + b.totalFaktur, 0),
    };
  }, [companyId]);

  const pie = [
    { name: "PPN Keluaran", value: k.ppnKeluaran },
    { name: "PPN Masukan", value: k.ppnMasukan },
  ];

  const trend = useMemo(() => {
    const rows = filterByCompany(taxTrend, companyId);
    const order = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    const grouped: Record<string, { bulan: string; "PPN DB001": number; "PPN DB002": number; "PPh DB001": number; "PPh DB002": number }> = {};
    rows.forEach((r) => {
      grouped[r.bulan] ??= { bulan: r.bulan, "PPN DB001": 0, "PPN DB002": 0, "PPh DB001": 0, "PPh DB002": 0 };
      grouped[r.bulan][`PPN ${r.dept}`] += r.ppn;
      grouped[r.bulan][`PPh ${r.dept}`] += r.pph;
    });
    return order.map((b) => grouped[b]).filter(Boolean);
  }, [companyId]);

  const acts = useMemo(() => filterByCompany(taxActivity, companyId), [companyId]);

  const cards = [
    { label: "Total PPN Keluaran", value: fmtIDR(k.ppnKeluaran), icon: Receipt },
    { label: "Total PPN Masukan", value: fmtIDR(k.ppnMasukan), icon: Wallet },
    { label: "Total PPh Terutang", value: fmtIDR(k.pphTerutang), icon: Calculator },
    { label: "Total Faktur Pajak", value: k.totalFaktur.toLocaleString("id-ID"), icon: FileText },
  ];

  return (
    <div>
      <PageHeader
        title="Tax Overview"
        description="Ringkasan kewajiban pajak: PPN, PPh, dan faktur pajak."
        crumbs={[{ label: "Tax" }]}
      />
      <FiltersBar><CompanyFilter value={companyId} onChange={setCompanyId} /></FiltersBar>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="rounded-xl shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-semibold">{c.value}</div></CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm">
          <CardHeader><CardTitle className="text-base">PPN Masukan vs PPN Keluaran</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {pie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => fmtIDR(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Tren PPN dan PPh Terutang</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip formatter={(v: number) => `${v} jt`} />
                  <Legend />
                  <Bar dataKey="PPN DB001" fill="#4361EE" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="PPN DB002" fill="#5B7CFA" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="PPh DB001" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="PPh DB002" fill="#7C9CFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Recent Tax Activity</CardTitle></CardHeader>
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
            {acts.length === 0 && <li className="py-3 text-sm text-muted-foreground">Tidak ada aktivitas pajak.</li>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/tax/")({ component: TaxOverview });
