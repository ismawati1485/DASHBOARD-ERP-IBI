import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  slowMoving, topItemSalesInv, salesPerCategory, poVsReceiving, soVsInvoice, stockList, type StockStatus,
} from "@/data/inventory";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR, fmtDateID } from "@/lib/format";

const fmtNum = (n: number) => new Intl.NumberFormat("id-ID").format(n);
const PIE_COLORS = ["#4361EE", "#43b8d2", "#9442f2", "#ed39e4", "#5B7CFA", "#7C9CFF", "#1E3A8A"];

const statusVariant = (s: StockStatus): "default" | "secondary" | "destructive" => {
  if (s === "Safe") return "secondary";
  if (s === "Low Stock") return "default";
  return "destructive";
};

function InventoryPage() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);
  const slow = useMemo(() => filterByCompany(slowMoving, companyId), [companyId]);
  const tops = useMemo(() => filterByCompany(topItemSalesInv, companyId), [companyId]);
  const cats = useMemo(() => filterByCompany(salesPerCategory, companyId), [companyId]);
  const pos  = useMemo(() => filterByCompany(poVsReceiving, companyId), [companyId]);
  const so   = useMemo(() => filterByCompany(soVsInvoice, companyId), [companyId]);
  const stk  = useMemo(() => filterByCompany(stockList, companyId), [companyId]);

  const totalSales = cats.reduce((a, b) => a + b.totalSales, 0);
  const pieData = cats.map((c) => ({ ...c, percentage: totalSales ? +((c.totalSales / totalSales) * 100).toFixed(1) : 0 }));

  return (
    <div>
      <PageHeader
        title="Inventory Dashboard"
        description="Pantau pergerakan stok, kategori penjualan, dan status PO."
        crumbs={[{ label: "Dashboard", to: "/dashboard" }, { label: "Inventory" }]}
      />
      <FiltersBar><CompanyFilter value={companyId} onChange={setCompanyId} /></FiltersBar>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader><CardTitle className="text-base">Top Item Slow Moving</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Item Desc</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Total COGS</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {slow.map((i) => (
                  <TableRow key={i.itemDesc}>
                    <TableCell className="font-medium">{i.itemDesc}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtNum(i.qty)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(i.totalCogs)}</TableCell>
                  </TableRow>
                ))}
                {slow.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-sm text-muted-foreground py-6">Tidak ada data.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader><CardTitle className="text-base">Top Item Sales</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Item Desc</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Total Sales</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {tops.map((i) => (
                  <TableRow key={i.itemDesc}>
                    <TableCell className="font-medium">{i.itemDesc}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtNum(i.qty)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(i.totalSales)}</TableCell>
                  </TableRow>
                ))}
                {tops.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-sm text-muted-foreground py-6">Tidak ada data.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm">
          <CardHeader><CardTitle className="text-base">Sales per Category</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="totalSales" nameKey="category" innerRadius={50} outerRadius={90} paddingAngle={2}>
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number, _n, p) => [`${fmtIDR(v)} (${p.payload.percentage}%)`, p.payload.category]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1.5">
              {pieData.map((c, i) => (
                <div key={c.category} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="font-medium">{c.category}</span>
                  </div>
                  <span className="text-muted-foreground tabular-nums">{c.percentage}% · {fmtIDR(c.totalSales)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader><CardTitle className="text-base">PO Pending / Back Order vs PO Receiving per Category</CardTitle></CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="category" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="poPending" name="PO Pending" fill="#4361EE" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="backOrder" name="Back Order" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="poReceiving" name="PO Receiving" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 rounded-xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Perbandingan SO vs Sales Invoice per Category</CardTitle></CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={so}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="category" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="salesOrder" name="Sales Order" fill="#7da0eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="salesInvoice" name="Sales Invoice" fill="#4361EE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 rounded-xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Stock List</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">No</TableHead>
                  <TableHead>Item Code</TableHead>
                  <TableHead>Item Desc</TableHead>
                  <TableHead>Serial Code</TableHead>
                  <TableHead className="text-right">Qty Gudang</TableHead>
                  <TableHead className="text-right">Qty BO/SO</TableHead>
                  <TableHead className="text-right">Qty Siap Jual</TableHead>
                  <TableHead>Terakhir Masuk</TableHead>
                  <TableHead className="text-right">Umur Stok</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stk.map((s, idx) => (
                  <TableRow key={s.itemCode}>
                    <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                    <TableCell className="font-mono text-xs">{s.itemCode}</TableCell>
                    <TableCell className="font-medium">{s.itemDesc}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{s.serialCode}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtNum(s.qtyGudang)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtNum(s.qtyBoSo)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtNum(s.qtySiapJual)}</TableCell>
                    <TableCell className="text-muted-foreground">{fmtDateID(s.tanggalTerakhirMasuk)}</TableCell>
                    <TableCell className="text-right tabular-nums">{s.umurStok} hari</TableCell>
                    <TableCell>{s.category}</TableCell>
                    <TableCell>{s.unit}</TableCell>
                    <TableCell><Badge variant={statusVariant(s.statusStock)}>{s.statusStock}</Badge></TableCell>
                  </TableRow>
                ))}
                {stk.length === 0 && <TableRow><TableCell colSpan={12} className="text-center text-sm text-muted-foreground py-6">Tidak ada data.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/dashboard/inventory")({ component: InventoryPage });
