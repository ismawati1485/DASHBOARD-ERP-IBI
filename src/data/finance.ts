import type { CompanyId } from "./company";

export type FinanceKpi = {
  companyId: CompanyId;
  totalDanaMasuk: number;
  totalDanaKeluar: number;
  saldoKas: number;
  pendingPayment: number;
  trends: { masuk: number; keluar: number; saldo: number; pending: number };
};

export const financeKpiByCompany: FinanceKpi[] = [
  { companyId: "ibi1", totalDanaMasuk: 3_280_000_000, totalDanaKeluar: 2_410_000_000, saldoKas: 1_540_000_000, pendingPayment: 615_000_000, trends: { masuk: 9.2, keluar: 4.8, saldo: 6.5, pending: -3.4 } },
  { companyId: "ibi2", totalDanaMasuk: 2_120_000_000, totalDanaKeluar: 1_580_000_000, saldoKas: 980_000_000,   pendingPayment: 420_000_000, trends: { masuk: 7.4, keluar: 3.6, saldo: 5.2, pending: -2.1 } },
  { companyId: "sak",  totalDanaMasuk: 1_350_000_000, totalDanaKeluar: 980_000_000,   saldoKas: 640_000_000,   pendingPayment: 280_000_000, trends: { masuk: 5.6, keluar: 2.8, saldo: 4.0, pending: -1.2 } },
  { companyId: "msg",  totalDanaMasuk: 980_000_000,   totalDanaKeluar: 720_000_000,   saldoKas: 480_000_000,   pendingPayment: 180_000_000, trends: { masuk: 4.1, keluar: 2.0, saldo: 3.2, pending: -0.5 } },
];

export const cashflowChart: { companyId: CompanyId; bulan: string; masuk: number; keluar: number }[] = (() => {
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu"];
  const seeds: { id: CompanyId; bm: number; bk: number }[] = [
    { id: "ibi1", bm: 240, bk: 180 },
    { id: "ibi2", bm: 180, bk: 130 },
    { id: "sak",  bm: 120, bk: 90 },
    { id: "msg",  bm: 95,  bk: 70 },
  ];
  return seeds.flatMap((s) => months.map((b, i) => ({
    companyId: s.id, bulan: b,
    masuk: s.bm + i * 22, keluar: s.bk + i * 16,
  })));
})();

export const financeActivity: { id: number; companyId: CompanyId; desc: string; time: string; type: string }[] = [
  { id: 1, companyId: "ibi1", desc: "Transfer ke Supplier PT Sinar Baja", time: "5 menit lalu", type: "Outflow" },
  { id: 2, companyId: "ibi1", desc: "Penerimaan pembayaran Customer A", time: "30 menit lalu", type: "Inflow" },
  { id: 3, companyId: "ibi2", desc: "Approval pembayaran sewa kantor", time: "2 jam lalu", type: "Approval" },
  { id: 4, companyId: "sak",  desc: "Reconcile rekening Mandiri", time: "Kemarin", type: "Bank" },
  { id: 5, companyId: "msg",  desc: "Pelunasan invoice INV-99821", time: "2 hari lalu", type: "Inflow" },
];

export const upcomingPayments: { id: number; companyId: CompanyId; supplier: string; amount: number; due: string }[] = [
  { id: 1, companyId: "ibi1", supplier: "PT Sinar Baja", amount: 145_000_000, due: "2026-05-12" },
  { id: 2, companyId: "ibi1", supplier: "PT Logistik Cepat", amount: 78_000_000, due: "2026-05-14" },
  { id: 3, companyId: "ibi2", supplier: "CV Mitra Sejahtera", amount: 52_000_000, due: "2026-05-15" },
  { id: 4, companyId: "sak",  supplier: "PT Kemasan Prima", amount: 96_000_000, due: "2026-05-18" },
];

export type CashflowRow = {
  companyId: CompanyId;
  dept: string;
  name: string;
  party: string;
  group: string;
  target: number;
  realisasi: number;
};

export const danaKeluar: CashflowRow[] = [
  { companyId: "ibi1", dept: "DB001", name: "Pembelian Bahan Baku", party: "PT Sinar Baja", group: "Material", target: 500_000_000, realisasi: 430_000_000 },
  { companyId: "ibi1", dept: "DB001", name: "Biaya Mesin", party: "PT Mesin Jaya", group: "Capex", target: 250_000_000, realisasi: 255_000_000 },
  { companyId: "ibi2", dept: "DB002", name: "Logistik", party: "PT Cepat Sampai", group: "Operasional", target: 180_000_000, realisasi: 162_000_000 },
  { companyId: "ibi2", dept: "DB002", name: "Marketing", party: "Agensi Kreatif", group: "Promosi", target: 120_000_000, realisasi: 110_000_000 },
  { companyId: "sak",  dept: "DB001", name: "Sewa Gudang", party: "PT Properti Indo", group: "Operasional", target: 90_000_000, realisasi: 90_000_000 },
];

export const danaMasuk: CashflowRow[] = [
  { companyId: "ibi1", dept: "DB001", name: "Penjualan Pabrik A", party: "PT Bangun Jaya", group: "Wholesale", target: 700_000_000, realisasi: 720_000_000 },
  { companyId: "ibi1", dept: "DB001", name: "Penjualan Pabrik B", party: "PT Karya Mandiri", group: "Project", target: 500_000_000, realisasi: 460_000_000 },
  { companyId: "ibi2", dept: "DB002", name: "Distribusi Retail", party: "Toko Subur", group: "Retail", target: 400_000_000, realisasi: 320_000_000 },
  { companyId: "ibi2", dept: "DB002", name: "Online Sales", party: "Marketplace", group: "Retail", target: 250_000_000, realisasi: 260_000_000 },
  { companyId: "sak",  dept: "DB001", name: "Project Konstruksi", party: "PT Konstruksi Hebat", group: "Project", target: 600_000_000, realisasi: 540_000_000 },
];

export type TaskStatus = "Upcoming" | "Urgent" | "Overdue" | "Paid";

export const daftarTugas: { id: number; companyId: CompanyId; supplier: string; group: string; tanggal: string; jatuhTempo: string; total: number; status: TaskStatus }[] = [
  { id: 1, companyId: "ibi1", supplier: "PT Sinar Baja", group: "Material", tanggal: "2026-04-22", jatuhTempo: "2026-05-12", total: 145_000_000, status: "Upcoming" },
  { id: 2, companyId: "ibi1", supplier: "PT Logistik Cepat", group: "Operasional", tanggal: "2026-04-25", jatuhTempo: "2026-05-10", total: 78_000_000, status: "Urgent" },
  { id: 3, companyId: "ibi2", supplier: "CV Mitra Sejahtera", group: "Operasional", tanggal: "2026-04-15", jatuhTempo: "2026-05-05", total: 52_000_000, status: "Overdue" },
  { id: 4, companyId: "ibi2", supplier: "PT Kemasan Prima", group: "Material", tanggal: "2026-04-30", jatuhTempo: "2026-05-18", total: 96_000_000, status: "Upcoming" },
  { id: 5, companyId: "sak",  supplier: "PT Mesin Jaya", group: "Capex", tanggal: "2026-04-01", jatuhTempo: "2026-05-01", total: 220_000_000, status: "Paid" },
  { id: 6, companyId: "msg",  supplier: "Agensi Kreatif", group: "Promosi", tanggal: "2026-04-28", jatuhTempo: "2026-05-09", total: 35_000_000, status: "Urgent" },
  { id: 7, companyId: "abm",  supplier: "PT Properti Indo", group: "Sewa", tanggal: "2026-04-10", jatuhTempo: "2026-05-02", total: 90_000_000, status: "Overdue" },
];
