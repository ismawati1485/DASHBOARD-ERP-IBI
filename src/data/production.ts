export type ProductionByItem = {
  item: string;
  gudang: string;
  totalProduksi: number;
  totalCogm: number;
};

export const productionByItem: ProductionByItem[] = [
  { item: "Steel Bar 12mm", gudang: "GD-Jakarta", totalProduksi: 12500, totalCogm: 1250000000 },
  { item: "Steel Bar 10mm", gudang: "GD-Jakarta", totalProduksi: 10800, totalCogm: 980000000 },
  { item: "Wire Mesh M8", gudang: "GD-Surabaya", totalProduksi: 8400, totalCogm: 720000000 },
  { item: "Coil Plate 2mm", gudang: "GD-Surabaya", totalProduksi: 9600, totalCogm: 1100000000 },
  { item: "Hollow 40x40", gudang: "GD-Bandung", totalProduksi: 7200, totalCogm: 640000000 },
  { item: "Pipe Galvanis 1\"", gudang: "GD-Bandung", totalProduksi: 6800, totalCogm: 580000000 },
  { item: "Plate SPHC 3mm", gudang: "GD-Semarang", totalProduksi: 5400, totalCogm: 510000000 },
];

export type RealizationSlice = {
  name: string;
  value: number;
};

const planProduksi = 50000;
const realisasi = 42500;
const unfinished = 3200;
const avalan = 2100;
const waste = 2200;

export const realizationData: RealizationSlice[] = [
  { name: "Plan Produksi", value: planProduksi },
  { name: "Realisasi", value: realisasi },
  { name: "Unfinished", value: unfinished },
  { name: "Avalan", value: avalan },
  { name: "Waste", value: waste },
];

export const wastePercentage = +((waste / planProduksi) * 100).toFixed(2);

export type ProductionAnalysisRow = {
  noMesin: string;
  item: string;
  description: string;
  jumlahWo: number;
  tonase: number;
  cogm: number;
  estimasiTkl: number;
  estimasiWaktu: string;
};

export const productionAnalysis: ProductionAnalysisRow[] = [
  { noMesin: "MSN-001", item: "SB-12", description: "Steel Bar 12mm", jumlahWo: 24, tonase: 125.4, cogm: 1250000000, estimasiTkl: 18, estimasiWaktu: "7 jam" },
  { noMesin: "MSN-002", item: "SB-10", description: "Steel Bar 10mm", jumlahWo: 21, tonase: 108.2, cogm: 980000000, estimasiTkl: 16, estimasiWaktu: "6 jam" },
  { noMesin: "MSN-003", item: "WM-08", description: "Wire Mesh M8", jumlahWo: 18, tonase: 84.6, cogm: 720000000, estimasiTkl: 14, estimasiWaktu: "5 jam" },
  { noMesin: "MSN-004", item: "CP-02", description: "Coil Plate 2mm", jumlahWo: 22, tonase: 96.8, cogm: 1100000000, estimasiTkl: 17, estimasiWaktu: "7 jam" },
  { noMesin: "MSN-005", item: "HL-40", description: "Hollow 40x40", jumlahWo: 16, tonase: 72.0, cogm: 640000000, estimasiTkl: 12, estimasiWaktu: "4 jam" },
  { noMesin: "MSN-006", item: "PG-01", description: "Pipe Galvanis 1\"", jumlahWo: 15, tonase: 68.4, cogm: 580000000, estimasiTkl: 11, estimasiWaktu: "4 jam" },
  { noMesin: "MSN-007", item: "PL-03", description: "Plate SPHC 3mm", jumlahWo: 12, tonase: 54.2, cogm: 510000000, estimasiTkl: 10, estimasiWaktu: "4 jam" },
];
