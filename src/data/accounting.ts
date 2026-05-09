export const accountingKpi = {
  totalRevenue: 4_850_000_000,
  totalCost: 3_120_000_000,
  netProfit: 1_730_000_000,
  outstandingInvoice: 720_000_000,
  trends: { revenue: 8.4, cost: 3.1, profit: 12.6, outstanding: -4.2 },
};

export const profitTrend = [
  { bulan: "Jan", profit: 120 },
  { bulan: "Feb", profit: 145 },
  { bulan: "Mar", profit: 132 },
  { bulan: "Apr", profit: 168 },
  { bulan: "Mei", profit: 178 },
  { bulan: "Jun", profit: 195 },
  { bulan: "Jul", profit: 210 },
  { bulan: "Agu", profit: 232 },
];

export const costRealization = [
  { kategori: "Operasional", target: 1_200_000_000, realisasi: 980_000_000 },
  { kategori: "Produksi", target: 1_500_000_000, realisasi: 1_420_000_000 },
  { kategori: "Marketing", target: 400_000_000, realisasi: 365_000_000 },
  { kategori: "Admin", target: 300_000_000, realisasi: 280_000_000 },
];

export const recentActivity = [
  { id: 1, desc: "Posting Jurnal Penjualan #JV-1042", time: "10 menit lalu", type: "Jurnal" },
  { id: 2, desc: "Approval Invoice AP #AP-2231", time: "1 jam lalu", type: "AP" },
  { id: 3, desc: "Tutup buku periode Oktober", time: "3 jam lalu", type: "Closing" },
  { id: 4, desc: "Reconcile bank BCA", time: "Kemarin", type: "Bank" },
  { id: 5, desc: "Posting depresiasi aset tetap", time: "2 hari lalu", type: "Aset" },
];

export const trenLabaRugi = [
  { tahun: "2020", DB001: 820, DB002: 690 },
  { tahun: "2021", DB001: 940, DB002: 760 },
  { tahun: "2022", DB001: 1050, DB002: 880 },
  { tahun: "2023", DB001: 1180, DB002: 970 },
  { tahun: "2024", DB001: 1320, DB002: 1090 },
  { tahun: "2025", DB001: 1480, DB002: 1210 },
];

export type ProyeksiRow = {
  dept: string;
  name: string;
  target: number;
  realisasi: number;
};

export const proyeksiBep: ProyeksiRow[] = [
  { dept: "DB001", name: "BEP Pabrik A", target: 1_000_000_000, realisasi: 1_010_000_000 },
  { dept: "DB001", name: "BEP Pabrik B", target: 800_000_000, realisasi: 740_000_000 },
  { dept: "DB002", name: "BEP Distribusi", target: 600_000_000, realisasi: 510_000_000 },
  { dept: "DB002", name: "BEP Retail", target: 450_000_000, realisasi: 320_000_000 },
];

export const proyeksiBiaya: ProyeksiRow[] = [
  { dept: "DB001", name: "Biaya Operasional", target: 500_000_000, realisasi: 430_000_000 },
  { dept: "DB001", name: "Biaya Produksi", target: 800_000_000, realisasi: 760_000_000 },
  { dept: "DB002", name: "Biaya Marketing", target: 200_000_000, realisasi: 205_000_000 },
  { dept: "DB002", name: "Biaya Admin", target: 150_000_000, realisasi: 140_000_000 },
];

export const proyeksiLabaRugi: ProyeksiRow[] = [
  { dept: "DB001", name: "Laba Pabrik A", target: 600_000_000, realisasi: 615_000_000 },
  { dept: "DB001", name: "Laba Pabrik B", target: 450_000_000, realisasi: 410_000_000 },
  { dept: "DB002", name: "Laba Distribusi", target: 320_000_000, realisasi: 240_000_000 },
  { dept: "DB002", name: "Laba Retail", target: 180_000_000, realisasi: 185_000_000 },
];

export type ArApRow = {
  deptAr: string;
  sisaAr: number;
  deptAp: string;
  sisaAp: number;
  status: "Lancar" | "Jatuh Tempo" | "Overdue";
};

export const arVsAp: ArApRow[] = [
  { deptAr: "DB001 - Pabrik A", sisaAr: 320_000_000, deptAp: "DB001 - Supplier Bahan", sisaAp: 210_000_000, status: "Lancar" },
  { deptAr: "DB001 - Pabrik B", sisaAr: 180_000_000, deptAp: "DB001 - Supplier Mesin", sisaAp: 95_000_000, status: "Jatuh Tempo" },
  { deptAr: "DB002 - Distribusi", sisaAr: 240_000_000, deptAp: "DB002 - Logistik", sisaAp: 150_000_000, status: "Lancar" },
  { deptAr: "DB002 - Retail", sisaAr: 95_000_000, deptAp: "DB002 - Sewa Toko", sisaAp: 60_000_000, status: "Overdue" },
  { deptAr: "DB001 - Proyek", sisaAr: 410_000_000, deptAp: "DB001 - Subkontraktor", sisaAp: 280_000_000, status: "Jatuh Tempo" },
  { deptAr: "DB002 - Online", sisaAr: 75_000_000, deptAp: "DB002 - Marketplace Fee", sisaAp: 32_000_000, status: "Lancar" },
];
