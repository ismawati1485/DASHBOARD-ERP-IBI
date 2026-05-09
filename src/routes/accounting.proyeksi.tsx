import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { trenLabaRugi, proyeksiBep, proyeksiBiaya, proyeksiLabaRugi, type ProyeksiRow } from "@/data/accounting";
import { fmtIDR } from "@/lib/format";

type Tone = "good" | "warn" | "bad";
const toneClass: Record<Tone, string> = {
  good: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  warn: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  bad: "bg-rose-100 text-rose-700 hover:bg-rose-100",
};

// kind=achievement: high pct = good. kind=cost: high pct = bad.
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

function ProyeksiTable({ title, rows, kind }: { title: string; rows: ProyeksiRow[]; kind: "achievement" | "cost" }) {
  const targetLabel = title.includes("Biaya") ? "Biaya" : title.includes("BEP") ? "BEP" : "Proyeksi";
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dept</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">{targetLabel}</TableHead>
              <TableHead className="text-right">Realisasi</TableHead>
              <TableHead className="w-48">% Tercapai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => {
              const pct = (r.realisasi / r.target) * 100;
              const t = tone(pct, kind);
              return (
                <TableRow key={r.dept + r.name}>
                  <TableCell className="font-medium">{r.dept}</TableCell>
                  <TableCell>{r.name}</TableCell>
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ProyeksiPage() {
  return (
    <div>
      <PageHeader
        title="Proyeksi"
        description="Proyeksi BEP, biaya, dan laba rugi terhadap realisasi."
        crumbs={[{ label: "Accounting", to: "/accounting" }, { label: "Proyeksi" }]}
      />

      <Card className="mb-6 rounded-xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Trend Laba Rugi per Tahun</CardTitle></CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trenLabaRugi}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="tahun" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip formatter={(v: number) => `${v} jt`} />
                <Legend />
                <Line type="monotone" dataKey="DB001" stroke="#4361EE" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="DB002" stroke="#5B7CFA" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <ProyeksiTable title="Proyeksi BEP" rows={proyeksiBep} kind="achievement" />
        <ProyeksiTable title="Proyeksi Biaya" rows={proyeksiBiaya} kind="cost" />
        <ProyeksiTable title="Proyeksi Laba Rugi" rows={proyeksiLabaRugi} kind="achievement" />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/accounting/proyeksi")({
  component: ProyeksiPage,
});
