export const financeKpi = {
  totalDanaMasuk: 3_280_000_000,
  totalDanaKeluar: 2_410_000_000,
  saldoKas: 1_540_000_000,
  pendingPayment: 615_000_000,
  trends: { masuk: 9.2, keluar: 4.8, saldo: 6.5, pending: -3.4 },
};

export const cashflowChart = [
  { bulan: "Jan", masuk: 240, keluar: 180 },
  { bulan: "Feb", masuk: 280, keluar: 200 },
  { bulan: "Mar", masuk: 310, keluar: 220 },
  { bulan: "Apr", masuk: 290, keluar: 245 },
  { bulan: "Mei", masuk: 340, keluar: 260 },
  { bulan: "Jun", masuk: 360, keluar: 270 },
  { bulan: "Jul", masuk: 395, keluar: 290 },
  { bulan: "Agu", masuk: 410, keluar: 305 },
];

export const financeActivity = [
  { id: 1, desc: "Transfer ke Supplier PT Sinar Baja", time: "5 menit lalu", type: "Outflow" },
  { id: 2, desc: "Penerimaan pembayaran Customer A", time: "30 menit lalu", type: "Inflow" },
  { id: 3, desc: "Approval pembayaran sewa kantor", time: "2 jam lalu", type: "Approval" },
  { id: 4, desc: "Reconcile rekening Mandiri", time: "Kemarin", type: "Bank" },
  { id: 5, desc: "Pelunasan invoice INV-99821", time: "2 hari lalu", type: "Inflow" },
];

export const upcomingPayments = [
  { id: 1, supplier: "PT Sinar Baja", amount: 145_000_000, due: "2026-05-12" },
  { id: 2, supplier: "PT Logistik Cepat", amount: 78_000_000, due: "2026-05-14" },
  { id: 3, supplier: "CV Mitra Sejahtera", amount: 52_000_000, due: "2026-05-15" },
  { id: 4, supplier: "PT Kemasan Prima", amount: 96_000_000, due: "2026-05-18" },
];

export type CashflowRow = {
  dept: string;
  name: string;
  party: string;
  group: string;
  target: number;
  realisasi: number;
};

export const danaKeluar: CashflowRow[] = [
  { dept: "DB001", name: "Pembelian Bahan Baku", party: "PT Sinar Baja", group: "Material", target: 500_000_000, realisasi: 430_000_000 },
  { dept: "DB001", name: "Biaya Mesin", party: "PT Mesin Jaya", group: "Capex", target: 250_000_000, realisasi: 255_000_000 },
  { dept: "DB002", name: "Logistik", party: "PT Cepat Sampai", group: "Operasional", target: 180_000_000, realisasi: 162_000_000 },
  { dept: "DB002", name: "Marketing", party: "Agensi Kreatif", group: "Promosi", target: 120_000_000, realisasi: 110_000_000 },
  { dept: "DB001", name: "Sewa Gudang", party: "PT Properti Indo", group: "Operasional", target: 90_000_000, realisasi: 90_000_000 },
];

export const danaMasuk: CashflowRow[] = [
  { dept: "DB001", name: "Penjualan Pabrik A", party: "PT Bangun Jaya", group: "Wholesale", target: 700_000_000, realisasi: 720_000_000 },
  { dept: "DB001", name: "Penjualan Pabrik B", party: "PT Karya Mandiri", group: "Project", target: 500_000_000, realisasi: 460_000_000 },
  { dept: "DB002", name: "Distribusi Retail", party: "Toko Subur", group: "Retail", target: 400_000_000, realisasi: 320_000_000 },
  { dept: "DB002", name: "Online Sales", party: "Marketplace", group: "Retail", target: 250_000_000, realisasi: 260_000_000 },
  { dept: "DB001", name: "Project Konstruksi", party: "PT Konstruksi Hebat", group: "Project", target: 600_000_000, realisasi: 540_000_000 },
];

export type TaskStatus = "Upcoming" | "Urgent" | "Overdue" | "Paid";

export const daftarTugas: { id: number; supplier: string; group: string; tanggal: string; jatuhTempo: string; total: number; status: TaskStatus }[] = [
  { id: 1, supplier: "PT Sinar Baja", group: "Material", tanggal: "2026-04-22", jatuhTempo: "2026-05-12", total: 145_000_000, status: "Upcoming" },
  { id: 2, supplier: "PT Logistik Cepat", group: "Operasional", tanggal: "2026-04-25", jatuhTempo: "2026-05-10", total: 78_000_000, status: "Urgent" },
  { id: 3, supplier: "CV Mitra Sejahtera", group: "Operasional", tanggal: "2026-04-15", jatuhTempo: "2026-05-05", total: 52_000_000, status: "Overdue" },
  { id: 4, supplier: "PT Kemasan Prima", group: "Material", tanggal: "2026-04-30", jatuhTempo: "2026-05-18", total: 96_000_000, status: "Upcoming" },
  { id: 5, supplier: "PT Mesin Jaya", group: "Capex", tanggal: "2026-04-01", jatuhTempo: "2026-05-01", total: 220_000_000, status: "Paid" },
  { id: 6, supplier: "Agensi Kreatif", group: "Promosi", tanggal: "2026-04-28", jatuhTempo: "2026-05-09", total: 35_000_000, status: "Urgent" },
  { id: 7, supplier: "PT Properti Indo", group: "Sewa", tanggal: "2026-04-10", jatuhTempo: "2026-05-02", total: 90_000_000, status: "Overdue" },
];
