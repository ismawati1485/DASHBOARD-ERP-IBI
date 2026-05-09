import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { topCustomers, customerSegments } from "@/data/customer";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR, fmtDateID } from "@/lib/format";

const BAR_COLORS = ["#4361EE", "#5B7CFA", "#7C9CFF", "#9DB5FF", "#BFD0FF", "#D6E1FF"];

function CustomerPage() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);
  const customers = useMemo(() => filterByCompany(topCustomers, companyId), [companyId]);

  const segments = useMemo(() => {
    const rows = filterByCompany(customerSegments, companyId);
    if (companyId !== "all") return rows;
    // merge: average across companies
    const map: Record<string, number[]> = {};
    rows.forEach((r) => { (map[r.tipe] ??= []).push(r.percentage); });
    return Object.entries(map).map(([tipe, vals]) => ({
      tipe, percentage: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
    }));
  }, [companyId]);

  return (
    <div>
      <PageHeader
        title="Customer Dashboard"
        description="Analisis customer terbaik dan distribusi segmen pelanggan."
        crumbs={[{ label: "Dashboard", to: "/dashboard" }, { label: "Customer" }]}
      />
      <FiltersBar><CompanyFilter value={companyId} onChange={setCompanyId} /></FiltersBar>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Top Customer</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead className="text-right">Jumlah Nota</TableHead>
                  <TableHead className="text-right">Total Penjualan</TableHead>
                  <TableHead className="text-right">Last Ordered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((c) => (
                  <TableRow key={c.customerName}>
                    <TableCell className="font-medium">{c.customerName}</TableCell>
                    <TableCell className="text-right tabular-nums">{c.jumlahNota}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(c.totalPenjualan)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{fmtDateID(c.lastOrdered)}</TableCell>
                  </TableRow>
                ))}
                {customers.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-6">Tidak ada data.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader><CardTitle className="text-base">Customer Segment</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={segments} layout="vertical" margin={{ left: 16, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                  <XAxis type="number" stroke="#64748B" fontSize={12} unit="%" />
                  <YAxis dataKey="tipe" type="category" stroke="#64748B" fontSize={12} width={90} />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
                    {segments.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/dashboard/customer")({ component: CustomerPage });
