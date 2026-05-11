import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { daftarTugas, type TaskStatus } from "@/data/finance";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
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

function getDaysLeft(date: string) {
  const today = new Date();
  const due = new Date(date);
  const diff = due.getTime() - today.getTime();
  return Math.ceil(diff / (1000*60*60*24));
}

function daysBadge(days: number) {
  if (days <= 7) {
    return "bg-rose-100 text-rose-700 hover:bg-rose-100";
  }

  if (days <= 14) {
    return "bg-amber-100 text-amber-700 hover:bg-amber-100";
  }

  return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
}
function DaftarTugasPage() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);
  const tasks = useMemo(() => filterByCompany(daftarTugas, companyId), [companyId]);
  const counts = tasks.reduce((acc, t) => ({ ...acc, [t.status]: (acc[t.status] ?? 0) + 1 }), {} as Record<TaskStatus, number>);
  const summary: TaskStatus[] = ["Upcoming", "Urgent", "Overdue", "Paid"];

  return (
    <div>
      <PageHeader
        title="Daftar Tugas"
        description="Daftar reminder pembayaran dan jatuh tempo supplier."
        crumbs={[{ label: "Finance", to: "/finance" }, { label: "Daftar Tugas" }]}
      />
      <FiltersBar><CompanyFilter value={companyId} onChange={setCompanyId} /></FiltersBar>

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
                {tasks.map((t) => {
                  const daysLeft = getDaysLeft(t.jatuhTempo);
                  return ( 
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.supplier}</TableCell>
                    <TableCell><Badge variant="outline">{t.group}</Badge></TableCell>
                    <TableCell>{fmtDateID(t.tanggal)}</TableCell>
                    <TableCell className={dueClass(t.status)}>
                    <div className="flex items-center gap-2">
                      <span>{fmtDateID(t.jatuhTempo)}</span>
                      <Badge className={daysBadge(daysLeft)}>
                        {daysLeft} Hari
                      </Badge>
                    </div>
                  </TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(t.total)}</TableCell>
                    <TableCell><Badge className={statusClass[t.status]}>{t.status}</Badge></TableCell>
                  </TableRow>
                )})}
                {tasks.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-6">Tidak ada tugas.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/finance/daftar-tugas")({ component: DaftarTugasPage });
