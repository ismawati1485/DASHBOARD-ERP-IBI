import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { arVsAp, type ArApRow } from "@/data/accounting";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { MonthFilter, DEFAULT_MONTH } from "@/components/filters/MonthFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR } from "@/lib/format";

const statusClass: Record<ArApRow["status"], string> = {
  Lancar: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  "Jatuh Tempo": "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Overdue: "bg-rose-100 text-rose-700 hover:bg-rose-100",
};

function LaporanPage() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);
  const [month, setMonth] = useState(DEFAULT_MONTH);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const rows = filterByCompany(arVsAp, companyId);
    const s = q.toLowerCase().trim();
    return s ? rows.filter((r) => r.deptAr.toLowerCase().includes(s) || r.deptAp.toLowerCase().includes(s)) : rows;
  }, [companyId, q]);

  return (
    <div>
      <PageHeader
        title="Laporan"
        description="Laporan akuntansi: piutang (AR) vs hutang (AP) per departemen."
        crumbs={[{ label: "Accounting", to: "/accounting" }, { label: "Laporan" }]}
      />
      <FiltersBar>
        <CompanyFilter value={companyId} onChange={setCompanyId} />
        <MonthFilter value={month} onChange={setMonth} />
      </FiltersBar>

      <Card className="rounded-xl shadow-sm">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base">AR vs AP</CardTitle>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari departemen..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dept Name AR</TableHead>
                  <TableHead className="text-right">Sisa Tagihan AR</TableHead>
                  <TableHead>Dept Name AP</TableHead>
                  <TableHead className="text-right">Sisa Tagihan AP</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{r.deptAr}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(r.sisaAr)}</TableCell>
                    <TableCell className="font-medium">{r.deptAp}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(r.sisaAp)}</TableCell>
                    <TableCell><Badge className={statusClass[r.status]}>{r.status}</Badge></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="py-6 text-center text-sm text-muted-foreground">Tidak ada data.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/accounting/laporan")({ component: LaporanPage });
