import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ppnRows, pphRows, type PphStatus } from "@/data/tax";
import { CompanyFilter, DEFAULT_COMPANY, filterByCompany } from "@/components/filters/CompanyFilter";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR } from "@/lib/format";

const pphStatusClass: Record<PphStatus, string> = {
  Lapor: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  Pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Overdue: "bg-rose-100 text-rose-700 hover:bg-rose-100",
};

function LaporanPajakPage() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);
  const [q, setQ] = useState("");

  const ppn = useMemo(() => filterByCompany(ppnRows, companyId), [companyId]);
  const pph = useMemo(() => {
    const rows = filterByCompany(pphRows, companyId);
    const s = q.toLowerCase().trim();
    return s ? rows.filter((r) =>
      r.coaBiaya.toLowerCase().includes(s) ||
      r.coaPph.toLowerCase().includes(s) ||
      r.lawanTransaksi.toLowerCase().includes(s) ||
      r.npwp.includes(s),
    ) : rows;
  }, [companyId, q]);

  return (
    <div>
      <PageHeader
        title="Laporan Pajak"
        description="Perhitungan PPN dan PPh terutang per departemen dan transaksi."
        crumbs={[{ label: "Tax", to: "/tax" }, { label: "Laporan Pajak" }]}
      />
      <FiltersBar><CompanyFilter value={companyId} onChange={setCompanyId} /></FiltersBar>

      <Card className="rounded-xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Perhitungan PPN</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dept</TableHead>
                  <TableHead className="text-right">PPN Keluaran</TableHead>
                  <TableHead className="text-right">PPN Masukan</TableHead>
                  <TableHead className="text-right">Jumlah Faktur</TableHead>
                  <TableHead className="text-right">Selisih</TableHead>
                  <TableHead className="text-right">PPN Terutang</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ppn.map((r, i) => {
                  const selisih = r.ppnKeluaran - r.ppnMasukan;
                  const terutang = Math.max(selisih, 0);
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{r.dept}</TableCell>
                      <TableCell className="text-right tabular-nums">{fmtIDR(r.ppnKeluaran)}</TableCell>
                      <TableCell className="text-right tabular-nums">{fmtIDR(r.ppnMasukan)}</TableCell>
                      <TableCell className="text-right tabular-nums">{r.jumlahFaktur}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={selisih >= 0
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"}>
                          {fmtIDR(selisih)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-semibold">{fmtIDR(terutang)}</TableCell>
                    </TableRow>
                  );
                })}
                {ppn.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-6">Tidak ada data.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-xl shadow-sm">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base">Perhitungan PPh</CardTitle>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari COA / lawan transaksi / NPWP..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>COA Biaya</TableHead>
                  <TableHead>COA PPh</TableHead>
                  <TableHead className="text-right">PPh Terutang</TableHead>
                  <TableHead>Lawan Transaksi</TableHead>
                  <TableHead>NPWP</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pph.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{r.coaBiaya}</TableCell>
                    <TableCell>{r.coaPph}</TableCell>
                    <TableCell className="text-right tabular-nums">{fmtIDR(r.pphTerutang)}</TableCell>
                    <TableCell>{r.lawanTransaksi}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{r.npwp}</TableCell>
                    <TableCell><Badge className={pphStatusClass[r.status]}>{r.status}</Badge></TableCell>
                  </TableRow>
                ))}
                {pph.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-6">Tidak ada data.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/tax/laporan-pajak")({ component: LaporanPajakPage });
