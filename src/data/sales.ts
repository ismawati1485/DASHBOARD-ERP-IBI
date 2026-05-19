
{/*
  import type { CompanyId } from "./company";

export type SalesKpi = {
  companyId: CompanyId;
  totalPenjualan: number;
  target: number;
};

export const salesKpiByCompany: SalesKpi[] = [
  { companyId: "ibi1", totalPenjualan: 1_250_000_000, target: 1_500_000_000 },
  { companyId: "ibi2", totalPenjualan: 980_000_000, target: 1_200_000_000 },
  { companyId: "sak", totalPenjualan: 720_000_000, target: 800_000_000 },
  { companyId: "msg", totalPenjualan: 540_000_000, target: 600_000_000 },
  { companyId: "abm", totalPenjualan: 480_000_000, target: 520_000_000 },
  { companyId: "bkj", totalPenjualan: 380_000_000, target: 450_000_000 },
  { companyId: "ttet", totalPenjualan: 290_000_000, target: 350_000_000 },
];

export const topItemSales: {
  companyId: CompanyId;
  itemDesc: string;
  qty: number;
  totalPenjualan: number;
}[] = [
  {
    companyId: "ibi1",
    itemDesc: "Semen Portland 50kg",
    qty: 12500,
    totalPenjualan: 875_000_000,
  },
  {
    companyId: "ibi1",
    itemDesc: "Besi Beton 12mm",
    qty: 8200,
    totalPenjualan: 612_000_000,
  },
  {
    companyId: "ibi2",
    itemDesc: "Pasir Cor 1m³",
    qty: 5400,
    totalPenjualan: 432_000_000,
  },
  {
    companyId: "sak",
    itemDesc: "Batu Split 1/2",
    qty: 4100,
    totalPenjualan: 308_000_000,
  },
  {
    companyId: "msg",
    itemDesc: "Bata Ringan AAC",
    qty: 3800,
    totalPenjualan: 285_000_000,
  },
  {
    companyId: "abm",
    itemDesc: "Galvalum 0.35mm",
    qty: 3200,
    totalPenjualan: 240_000_000,
  },
  {
    companyId: "bkj",
    itemDesc: "Genteng Metal",
    qty: 2400,
    totalPenjualan: 180_000_000,
  },
];

export const topSalesman: {
  companyId: CompanyId;
  salesmanName: string;
  totalPenjualan: number;
}[] = [
  {
    companyId: "ibi1",
    salesmanName: "Budi Santoso",
    totalPenjualan: 850_000_000,
  },
  {
    companyId: "ibi1",
    salesmanName: "Andi Wijaya",
    totalPenjualan: 720_000_000,
  },
  {
    companyId: "ibi1",
    salesmanName: "Rina Kartika",
    totalPenjualan: 680_000_000,
  },
  {
    companyId: "ibi2",
    salesmanName: "Dewi Lestari",
    totalPenjualan: 590_000_000,
  },
  {
    companyId: "sak",
    salesmanName: "Fajar Nugroho",
    totalPenjualan: 470_000_000,
  },
];

export const topLostSales: {
  companyId: CompanyId;
  customerName: string;
  totalPenjualan: number;
  alasan: string;
}[] = [
  {
    companyId: "ibi1",
    customerName: "PT Mitra Bangun",
    totalPenjualan: 145_000_000,
    alasan: "Harga Tinggi",
  },
  {
    companyId: "ibi1",
    customerName: "CV Karya Sentosa",
    totalPenjualan: 98_000_000,
    alasan: "Stok Kosong",
  },
  {
    companyId: "ibi2",
    customerName: "PT Cipta Graha",
    totalPenjualan: 86_000_000,
    alasan: "Pengiriman Lama",
  },
  {
    companyId: "sak",
    customerName: "UD Sumber Rejeki",
    totalPenjualan: 72_000_000,
    alasan: "Kompetitor",
  },
  {
    companyId: "msg",
    customerName: "PT Anugerah Jaya",
    totalPenjualan: 64_000_000,
    alasan: "Harga Tinggi",
  },
];

export const topDrivers: {
  companyId: CompanyId;
  driverName: string;
  totalTonase: number;
}[] = [
  {
    companyId: "ibi1",
    driverName: "Budi Santoso",
    totalTonase: 1240,
  },
  {
    companyId: "ibi1",
    driverName: "Agus Wijaya",
    totalTonase: 1180,
  },
  {
    companyId: "ibi2",
    driverName: "Slamet Riyadi",
    totalTonase: 1095,
  },
  {
    companyId: "sak",
    driverName: "Joko Susilo",
    totalTonase: 980,
  },
  {
    companyId: "msg",
    driverName: "Hendra Kurniawan",
    totalTonase: 875,
  },
];

export const trenPenjualan: {
  companyId: CompanyId;
  bulan: string;
  DB001: number;
  DB002: number;
}[] = (() => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const seeds: { id: CompanyId; base: number }[] = [
    { id: "ibi1", base: 95 },
    { id: "ibi2", base: 78 },
    { id: "sak", base: 60 },
    { id: "msg", base: 50 },
    { id: "abm", base: 42 },
    { id: "bkj", base: 35 },
    { id: "ttet", base: 28 },
  ];

  return seeds.flatMap((s) =>
    months.map((b, i) => ({
      companyId: s.id,
      bulan: b,
      DB001: s.base + i * 6,
      DB002: Math.round(s.base * 0.82) + i * 5,
    }))
  );
})();

*/}