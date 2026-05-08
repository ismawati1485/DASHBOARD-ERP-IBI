export const slowMoving = [
  { itemDesc: "Pipa PVC 4 inch", qty: 320, totalCogs: 48000000 },
  { itemDesc: "Keramik 60x60 Glossy", qty: 280, totalCogs: 42000000 },
  { itemDesc: "Cat Tembok 25kg", qty: 210, totalCogs: 31500000 },
  { itemDesc: "Genteng Metal", qty: 180, totalCogs: 27000000 },
  { itemDesc: "Triplek 12mm", qty: 150, totalCogs: 22500000 },
];

export const topItemSalesInv = [
  { itemDesc: "Semen Portland 50kg", qty: 12500, totalSales: 875000000 },
  { itemDesc: "Besi Beton 12mm", qty: 8200, totalSales: 612000000 },
  { itemDesc: "Pasir Cor 1m³", qty: 5400, totalSales: 432000000 },
  { itemDesc: "Batu Split 1/2", qty: 4100, totalSales: 308000000 },
  { itemDesc: "Bata Ringan AAC", qty: 3800, totalSales: 285000000 },
];

export const salesPerCategory = [
  { category: "JADI", totalSales: 850000000 },
  { category: "COIL", totalSales: 620000000 },
  { category: "BMT", totalSales: 480000000 },
  { category: "TCT", totalSales: 390000000 },
  { category: "IPS", totalSales: 310000000 },
  { category: "IRS", totalSales: 240000000 },
  { category: "SHEET", totalSales: 180000000 },
];

export const poVsReceiving = [
  { category: "JADI", poPending: 120, backOrder: 45, poReceiving: 280 },
  { category: "COIL", poPending: 95, backOrder: 30, poReceiving: 210 },
  { category: "BMT", poPending: 80, backOrder: 25, poReceiving: 175 },
  { category: "TCT", poPending: 60, backOrder: 18, poReceiving: 140 },
  { category: "IPS", poPending: 50, backOrder: 12, poReceiving: 110 },
  { category: "IRS", poPending: 40, backOrder: 10, poReceiving: 90 },
  { category: "SHEET", poPending: 30, backOrder: 8, poReceiving: 70 },
];

export const soVsInvoice = [
  { category: "JADI", salesOrder: 320, salesInvoice: 295 },
  { category: "COIL", salesOrder: 260, salesInvoice: 240 },
  { category: "BMT", salesOrder: 210, salesInvoice: 195 },
  { category: "TCT", salesOrder: 170, salesInvoice: 158 },
  { category: "IPS", salesOrder: 140, salesInvoice: 128 },
  { category: "IRS", salesOrder: 110, salesInvoice: 100 },
  { category: "SHEET", salesOrder: 85, salesInvoice: 78 },
];

export type StockStatus = "Safe" | "Low Stock" | "Critical";

export const stockList: {
  itemCode: string;
  itemDesc: string;
  serialCode: string;
  qtyGudang: number;
  qtyBoSo: number;
  qtySiapJual: number;
  tanggalTerakhirMasuk: string;
  umurStok: number;
  category: string;
  unit: string;
  statusStock: StockStatus;
}[] = [
  { itemCode: "ITM-0001", itemDesc: "Semen Portland 50kg", serialCode: "SN-A001", qtyGudang: 1200, qtyBoSo: 200, qtySiapJual: 1000, tanggalTerakhirMasuk: "2026-04-22", umurStok: 16, category: "JADI", unit: "Sak", statusStock: "Safe" },
  { itemCode: "ITM-0002", itemDesc: "Besi Beton 12mm", serialCode: "SN-A002", qtyGudang: 540, qtyBoSo: 120, qtySiapJual: 420, tanggalTerakhirMasuk: "2026-04-18", umurStok: 20, category: "COIL", unit: "Btg", statusStock: "Safe" },
  { itemCode: "ITM-0003", itemDesc: "Pasir Cor 1m³", serialCode: "SN-A003", qtyGudang: 90, qtyBoSo: 60, qtySiapJual: 30, tanggalTerakhirMasuk: "2026-04-10", umurStok: 28, category: "BMT", unit: "m³", statusStock: "Low Stock" },
  { itemCode: "ITM-0004", itemDesc: "Batu Split 1/2", serialCode: "SN-A004", qtyGudang: 45, qtyBoSo: 40, qtySiapJual: 5, tanggalTerakhirMasuk: "2026-03-30", umurStok: 39, category: "BMT", unit: "m³", statusStock: "Critical" },
  { itemCode: "ITM-0005", itemDesc: "Bata Ringan AAC", serialCode: "SN-A005", qtyGudang: 720, qtyBoSo: 100, qtySiapJual: 620, tanggalTerakhirMasuk: "2026-04-25", umurStok: 13, category: "TCT", unit: "Pcs", statusStock: "Safe" },
  { itemCode: "ITM-0006", itemDesc: "Pipa PVC 4 inch", serialCode: "SN-A006", qtyGudang: 80, qtyBoSo: 50, qtySiapJual: 30, tanggalTerakhirMasuk: "2026-04-05", umurStok: 33, category: "IPS", unit: "Btg", statusStock: "Low Stock" },
  { itemCode: "ITM-0007", itemDesc: "Keramik 60x60 Glossy", serialCode: "SN-A007", qtyGudang: 320, qtyBoSo: 60, qtySiapJual: 260, tanggalTerakhirMasuk: "2026-04-20", umurStok: 18, category: "IRS", unit: "Dus", statusStock: "Safe" },
  { itemCode: "ITM-0008", itemDesc: "Cat Tembok 25kg", serialCode: "SN-A008", qtyGudang: 30, qtyBoSo: 28, qtySiapJual: 2, tanggalTerakhirMasuk: "2026-03-15", umurStok: 54, category: "SHEET", unit: "Klg", statusStock: "Critical" },
  { itemCode: "ITM-0009", itemDesc: "Genteng Metal", serialCode: "SN-A009", qtyGudang: 410, qtyBoSo: 90, qtySiapJual: 320, tanggalTerakhirMasuk: "2026-04-12", umurStok: 26, category: "SHEET", unit: "Lbr", statusStock: "Safe" },
  { itemCode: "ITM-0010", itemDesc: "Triplek 12mm", serialCode: "SN-A010", qtyGudang: 110, qtyBoSo: 70, qtySiapJual: 40, tanggalTerakhirMasuk: "2026-04-02", umurStok: 36, category: "JADI", unit: "Lbr", statusStock: "Low Stock" },
];
