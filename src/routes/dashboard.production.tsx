import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { UploadDropzone } from "@/components/dashboard/UploadDropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  productionByItem, realizationData, wastePercentage, productionAnalysis,
} from "@/data/production";

{/* Format Currency */}
const fmtIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const fmtNum = (n: number) => new Intl.NumberFormat("id-ID").format(n);
{/* Colors for Pie Chart */}
const PIE_COLORS = ["#4361EE",   "#4895EF","#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA"];

{/* Production Dashboard Page Component */}
function ProductionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Production Dashboard"
        description="Monitor realisasi produksi, COGM, dan analisis mesin produksi."
        crumbs={[{ label: "Dashboard", to: "/dashboard" }, { label: "Production" }]}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Total Produksi per Item dan Gudang</CardTitle>
            <p className="text-xs text-muted-foreground">
              Total Produksi vs Total COGM — periode 1 tahun
            </p>
          </CardHeader>

          {/* Production Bar Chart */}
          <CardContent>
            <div className="h-[340px] w-full">
              <ResponsiveContainer>
                <BarChart data={productionByItem} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="item"
                    tick={{ fontSize: 11 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${(v / 1_000_000_000).toFixed(1)}B`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) =>
                      name === "Total COGM" ? fmtIDR(value) : fmtNum(value)
                    }
                    labelFormatter={(label, payload) => {
                      const g = payload?.[0]?.payload?.gudang;
                      return `${label}${g ? ` • ${g}` : ""}`;
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="totalProduksi" name="Total Produksi" fill="#4361EE" radius={[6, 6, 0, 0]} />
                  <Bar yAxisId="right" dataKey="totalCogm" name="Total COGM" fill="#1E3A8A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

{/* Production Realization Pie Chart */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Production Realization Summary</CardTitle>
            <p className="text-xs text-muted-foreground">
              % Waste: <span className="font-semibold text-foreground">{wastePercentage}%</span>
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={realizationData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {realizationData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => fmtNum(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {realizationData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between rounded-md bg-muted/40 px-2 py-1.5">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-sm"
                      style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    {d.name}
                  </span>
                  <span className="font-medium tabular-nums">{fmtNum(d.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
{/* Production Analysis Table */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Production Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No Mesin</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Jumlah WO</TableHead>
                <TableHead className="text-right">Tonase</TableHead>
                <TableHead className="text-right">COGM</TableHead>
                <TableHead className="text-right">Estimasi TKL</TableHead>
                <TableHead className="text-right">Estimasi Waktu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionAnalysis.map((r) => (
                <TableRow key={r.noMesin}>
                  <TableCell className="font-medium">{r.noMesin}</TableCell>
                  <TableCell>{r.item}</TableCell>
                  <TableCell className="text-muted-foreground">{r.description}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.jumlahWo}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.tonase.toFixed(1)} t</TableCell>
                  <TableCell className="text-right tabular-nums">{fmtIDR(r.cogm)}</TableCell>
                  <TableCell className="text-right tabular-nums">{(r.estimasiTkl)} Orang </TableCell>
                  <TableCell className="text-right">{r.estimasiWaktu}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UploadDropzone />
    </div>
  );
}

export const Route = createFileRoute("/dashboard/production")({
  component: ProductionPage,
});
