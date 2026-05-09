import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { daftarTugas, type TaskStatus } from "@/data/finance";
import { fmtIDR, fmtDateID } from "@/lib/format";

const statusClass: Record<TaskStatus, string> = {
  Upcoming: "bg-sky-100 text-sky-700 hover:bg-sky-100",
  Urgent: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Overdue: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  Paid: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
};

function dueClass(status: TaskStatus) {
  if (status === "Overdue") return "text-rose-600 font-semibold";
  if (status === "Urgent") return "text-amber-600 font-semibold";
  return "text-foreground";
}

function DaftarTugasPage() {
  const counts = daftarTugas.reduce(
    (acc, t) => ({ ...acc, [t.status]: (acc[t.status] ?? 0) + 1 }),
    {} as Record<TaskStatus, number>,
  );
  const summary: TaskStatus[] = ["Upcoming", "Urgent", "Overdue", "Paid"];

  return (
    <div>
      <PageHeader
        title="Daftar Tugas"
        description="Daftar reminder pembayaran dan jatuh tempo supplier."
        crumbs={[{ label: "Finance", to: "/finance" }, { label: "Daftar Tugas" }]}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <Card key={s} className="rounded-xl shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s}</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{counts[s] ?? 0}</div>
              <div className="mt-1"><Badge className={statusClass[s]}>{s}</Badge></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Payment Reminder</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jatuh Tempo</TableHead>
                  <TableHead className="text-right">Total Tagihan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {daftarTugas.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.supplier}</TableCell>
                    <TableCell><Badge variant="outline">{t.group}</Badge></TableCell>
                    <TableCell>{fmtDateID(t.tanggal)}</TableCell>
                    <TableCell className={dueClass(t.status)}>{fmtDateID(t.jatuhTempo)}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(t.total)}</TableCell>
                    <TableCell><Badge className={statusClass[t.status]}>{t.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/finance/daftar-tugas")({
  component: DaftarTugasPage,
});
