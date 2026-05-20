import type { CompanyId } from "./company";

export type AccountingKpi = {
  companyId: CompanyId;
  totalRevenue: number;
  totalCost: number;
  netProfit: number;
  outstandingInvoice: number;
  trends: { revenue: number; cost: number; profit: number; outstanding: number };
};

export const accountingKpiByCompany: AccountingKpi[] = [
  { companyId: "ibi1", totalRevenue: 4_850_000_000, totalCost: 3_120_000_000, netProfit: 1_730_000_000, outstandingInvoice: 720_000_000, trends: { revenue: 8.4, cost: 3.1, profit: 12.6, outstanding: -4.2 } },
  { companyId: "ibi2", totalRevenue: 3_120_000_000, totalCost: 2_080_000_000, netProfit: 1_040_000_000, outstandingInvoice: 510_000_000, trends: { revenue: 6.2, cost: 2.5, profit: 9.4,  outstanding: -2.1 } },
  { companyId: "sak",  totalRevenue: 1_950_000_000, totalCost: 1_280_000_000, netProfit: 670_000_000,   outstandingInvoice: 320_000_000, trends: { revenue: 5.1, cost: 4.0, profit: 7.2,  outstanding: -1.8 } },
  { companyId: "msg",  totalRevenue: 1_420_000_000, totalCost: 980_000_000,   netProfit: 440_000_000,   outstandingInvoice: 210_000_000, trends: { revenue: 4.4, cost: 3.5, profit: 5.6,  outstanding: -0.8 } },
  { companyId: "abm",  totalRevenue: 1_180_000_000, totalCost: 820_000_000,   netProfit: 360_000_000,   outstandingInvoice: 180_000_000, trends: { revenue: 3.2, cost: 2.1, profit: 4.8,  outstanding: 1.2  } },
  { companyId: "bkj",  totalRevenue: 980_000_000,   totalCost: 690_000_000,   netProfit: 290_000_000,   outstandingInvoice: 140_000_000, trends: { revenue: 2.5, cost: 1.8, profit: 3.6,  outstanding: 0.4  } },
  { companyId: "ttet", totalRevenue: 720_000_000,   totalCost: 510_000_000,   netProfit: 210_000_000,   outstandingInvoice: 95_000_000,  trends: { revenue: 1.8, cost: 1.2, profit: 2.4,  outstanding: -0.3 } },
];

export type ProfitTrendRow = { companyId: CompanyId; bulan: string; profit: number };

export const profitTrend: ProfitTrendRow[] = (() => {
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  const seeds: { id: CompanyId; base: number }[] = [
    { id: "ibi1", base: 120 }, { id: "ibi2", base: 90 },
    { id: "sak", base: 65 }, { id: "msg", base: 50 },
    { id: "abm", base: 42 }, { id: "bkj", base: 36 }, { id: "ttet", base: 28 },
  ];
  return seeds.flatMap((s) => months.map((b, i) => ({ companyId: s.id, bulan: b, profit: s.base + i * 12 })));
})();

export const costRealization: { companyId: CompanyId; bulan: string; kategori: string; target: number; realisasi: number }[] = [
  { companyId: "ibi1", bulan: "Mei", kategori: "Operasional", target: 1_200_000_000, realisasi: 980_000_000 },
  { companyId: "ibi1", bulan: "Mei", kategori: "Produksi",    target: 1_500_000_000, realisasi: 1_420_000_000 },
  { companyId: "ibi1", bulan: "Mei", kategori: "Marketing",   target: 400_000_000,   realisasi: 365_000_000 },
  { companyId: "ibi1", bulan: "Mei", kategori: "Admin",       target: 300_000_000,   realisasi: 280_000_000 },
  { companyId: "ibi2", bulan: "Mei", kategori: "Operasional", target: 850_000_000,   realisasi: 720_000_000 },
  { companyId: "ibi2", bulan: "Mei", kategori: "Produksi",    target: 1_050_000_000, realisasi: 980_000_000 },
  { companyId: "sak",  bulan: "Mei", kategori: "Produksi",    target: 720_000_000,   realisasi: 690_000_000 },
];

export const recentActivity: { id: number; companyId: CompanyId; desc: string; time: string; type: string }[] = [
  { id: 1, companyId: "ibi1", desc: "Posting Jurnal Penjualan #JV-1042", time: "10 menit lalu", type: "Jurnal" },
  { id: 2, companyId: "ibi1", desc: "Approval Invoice AP #AP-2231", time: "1 jam lalu", type: "AP" },
  { id: 3, companyId: "ibi2", desc: "Tutup buku periode Oktober", time: "3 jam lalu", type: "Closing" },
  { id: 4, companyId: "sak",  desc: "Reconcile bank BCA", time: "Kemarin", type: "Bank" },
  { id: 5, companyId: "msg",  desc: "Posting depresiasi aset tetap", time: "2 hari lalu", type: "Aset" },
];

export const trenLabaRugi: { companyId: CompanyId; tahun: string; DB001: number; DB002: number }[] = (() => {
  const years = ["2020","2021","2022","2023","2024","2025"];
  const seeds: { id: CompanyId; base1: number; base2: number }[] = [
    { id: "ibi1", base1: 820, base2: 690 },
    { id: "ibi2", base1: 620, base2: 480 },
    { id: "sak",  base1: 420, base2: 310 },
    { id: "msg",  base1: 320, base2: 240 },
  ];
  return seeds.flatMap((s) => years.map((y, i) => ({ companyId: s.id, tahun: y, DB001: s.base1 + i * 130, DB002: s.base2 + i * 100 })));
})();

export type ProyeksiRow = {
  companyId: CompanyId;
  bulan: string;
  dept: string;
  name: string;
  target: number;
  realisasi: number;
};

export const proyeksiBep: ProyeksiRow[] = [
  { companyId: "ibi1", bulan: "Mei", dept: "DB001", name: "BEP Pabrik A", target: 1_000_000_000, realisasi: 1_010_000_000 },
  { companyId: "ibi1", bulan: "Mei", dept: "DB001", name: "BEP Pabrik B", target: 800_000_000,   realisasi: 740_000_000 },
  { companyId: "ibi2", bulan: "Mei", dept: "DB002", name: "BEP Distribusi", target: 600_000_000, realisasi: 510_000_000 },
  { companyId: "ibi2", bulan: "Mei", dept: "DB002", name: "BEP Retail", target: 450_000_000,    realisasi: 320_000_000 },
  { companyId: "sak",  bulan: "Mei", dept: "DB001", name: "BEP Produksi SAK", target: 700_000_000, realisasi: 690_000_000 },
];

export const proyeksiBiaya: ProyeksiRow[] = [
  { companyId: "ibi1", bulan: "Mei", dept: "DB001", name: "Biaya Operasional", target: 500_000_000, realisasi: 430_000_000 },
  { companyId: "ibi1", bulan: "Mei", dept: "DB001", name: "Biaya Produksi", target: 800_000_000, realisasi: 760_000_000 },
  { companyId: "ibi2", bulan: "Mei", dept: "DB002", name: "Biaya Marketing", target: 200_000_000, realisasi: 205_000_000 },
  { companyId: "ibi2", bulan: "Mei", dept: "DB002", name: "Biaya Admin", target: 150_000_000, realisasi: 140_000_000 },
];

export const proyeksiLabaRugi: ProyeksiRow[] = [
  { companyId: "ibi1", bulan: "Mei", dept: "DB001", name: "Laba Pabrik A", target: 600_000_000, realisasi: 615_000_000 },
  { companyId: "ibi1", bulan: "Mei", dept: "DB001", name: "Laba Pabrik B", target: 450_000_000, realisasi: 410_000_000 },
  { companyId: "ibi2", bulan: "Mei", dept: "DB002", name: "Laba Distribusi", target: 320_000_000, realisasi: 240_000_000 },
  { companyId: "ibi2", bulan: "Mei", dept: "DB002", name: "Laba Retail", target: 180_000_000, realisasi: 185_000_000 },
];

export type ArApRow = {
  companyId: CompanyId;
  deptAr: string;
  sisaAr: number;
  deptAp: string;
  sisaAp: number;
  status: "Lancar" | "Jatuh Tempo" | "Overdue";
};

export const arVsAp: ArApRow[] = [
  { companyId: "ibi1", deptAr: "DB001 - Pabrik A", sisaAr: 320_000_000, deptAp: "DB001 - Supplier Bahan", sisaAp: 210_000_000, status: "Lancar" },
  { companyId: "ibi1", deptAr: "DB001 - Pabrik B", sisaAr: 180_000_000, deptAp: "DB001 - Supplier Mesin", sisaAp: 95_000_000, status: "Jatuh Tempo" },
  { companyId: "ibi2", deptAr: "DB002 - Distribusi", sisaAr: 240_000_000, deptAp: "DB002 - Logistik", sisaAp: 150_000_000, status: "Lancar" },
  { companyId: "ibi2", deptAr: "DB002 - Retail", sisaAr: 95_000_000, deptAp: "DB002 - Sewa Toko", sisaAp: 60_000_000, status: "Overdue" },
  { companyId: "sak",  deptAr: "SAK - Proyek", sisaAr: 410_000_000, deptAp: "SAK - Subkontraktor", sisaAp: 280_000_000, status: "Jatuh Tempo" },
  { companyId: "msg",  deptAr: "MSG - Online", sisaAr: 75_000_000, deptAp: "MSG - Marketplace Fee", sisaAp: 32_000_000, status: "Lancar" },
];
