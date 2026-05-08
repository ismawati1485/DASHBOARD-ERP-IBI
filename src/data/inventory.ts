import type { CompanyId } from "./company";

export const slowMoving = [
  {
    companyId: "ibi1" as CompanyId,
    itemDesc: "Pipa PVC 4 inch",
    qty: 320,
    totalCogs: 48000000,
  },
  {
    companyId: "sak" as CompanyId,
    itemDesc: "Keramik 60x60 Glossy",
    qty: 280,
    totalCogs: 42000000,
  },
  {
    companyId: "msg" as CompanyId,
    itemDesc: "Cat Tembok 25kg",
    qty: 210,
    totalCogs: 31500000,
  },
  {
    companyId: "bkj" as CompanyId,
    itemDesc: "Genteng Metal",
    qty: 180,
    totalCogs: 27000000,
  },
  {
    companyId: "ibi2" as CompanyId,
    itemDesc: "Triplek 12mm",
    qty: 150,
    totalCogs: 22500000,
  },
];

export const topItemSalesInv = [
  {
    companyId: "ibi1" as CompanyId,
    itemDesc: "Semen Portland 50kg",
    qty: 12500,
    totalSales: 875000000,
  },
  {
    companyId: "sak" as CompanyId,
    itemDesc: "Besi Beton 12mm",
    qty: 8200,
    totalSales: 612000000,
  },
  {
    companyId: "msg" as CompanyId,
    itemDesc: "Pasir Cor 1m³",
    qty: 5400,
    totalSales: 432000000,
  },
  {
    companyId: "abm" as CompanyId,
    itemDesc: "Batu Split 1/2",
    qty: 4100,
    totalSales: 308000000,
  },
  {
    companyId: "ibi2" as CompanyId,
    itemDesc: "Bata Ringan AAC",
    qty: 3800,
    totalSales: 285000000,
  },
];

export const salesPerCategory = [
  {
    companyId: "ibi1" as CompanyId,
    category: "JADI",
    totalSales: 850000000,
  },
  {
    companyId: "sak" as CompanyId,
    category: "COIL",
    totalSales: 620000000,
  },
  {
    companyId: "msg" as CompanyId,
    category: "BMT",
    totalSales: 480000000,
  },
  {
    companyId: "abm" as CompanyId,
    category: "TCT",
    totalSales: 390000000,
  },
  {
    companyId: "ibi2" as CompanyId,
    category: "IPS",
    totalSales: 310000000,
  },
  {
    companyId: "bkj" as CompanyId,
    category: "IRS",
    totalSales: 240000000,
  },
  {
    companyId: "ttet" as CompanyId,
    category: "SHEET",
    totalSales: 180000000,
  },
];

export const poVsReceiving = [
  {
    companyId: "ibi1" as CompanyId,
    category: "JADI",
    poPending: 120,
    backOrder: 45,
    poReceiving: 280,
  },
  {
    companyId: "sak" as CompanyId,
    category: "COIL",
    poPending: 95,
    backOrder: 30,
    poReceiving: 210,
  },
  {
    companyId: "msg" as CompanyId,
    category: "BMT",
    poPending: 80,
    backOrder: 25,
    poReceiving: 175,
  },
  {
    companyId: "abm" as CompanyId,
    category: "TCT",
    poPending: 60,
    backOrder: 18,
    poReceiving: 140,
  },
];

export const soVsInvoice = [
  {
    companyId: "ibi1" as CompanyId,
    category: "JADI",
    salesOrder: 320,
    salesInvoice: 295,
  },
  {
    companyId: "sak" as CompanyId,
    category: "COIL",
    salesOrder: 260,
    salesInvoice: 240,
  },
  {
    companyId: "msg" as CompanyId,
    category: "BMT",
    salesOrder: 210,
    salesInvoice: 195,
  },
  {
    companyId: "abm" as CompanyId,
    category: "TCT",
    salesOrder: 170,
    salesInvoice: 158,
  },
];

export type StockStatus = "Safe" | "Low Stock" | "Critical";

export const stockList: {
  companyId: CompanyId;
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
  {
    companyId: "ibi1",
    itemCode: "ITM-0001",
    itemDesc: "Semen Portland 50kg",
    serialCode: "SN-A001",
    qtyGudang: 1200,
    qtyBoSo: 200,
    qtySiapJual: 1000,
    tanggalTerakhirMasuk: "2026-04-22",
    umurStok: 16,
    category: "JADI",
    unit: "Sak",
    statusStock: "Safe",
  },
  {
    companyId: "sak",
    itemCode: "ITM-0002",
    itemDesc: "Besi Beton 12mm",
    serialCode: "SN-A002",
    qtyGudang: 540,
    qtyBoSo: 120,
    qtySiapJual: 420,
    tanggalTerakhirMasuk: "2026-04-18",
    umurStok: 20,
    category: "COIL",
    unit: "Btg",
    statusStock: "Safe",
  },
  {
    companyId: "msg",
    itemCode: "ITM-0003",
    itemDesc: "Pasir Cor 1m³",
    serialCode: "SN-A003",
    qtyGudang: 90,
    qtyBoSo: 60,
    qtySiapJual: 30,
    tanggalTerakhirMasuk: "2026-04-10",
    umurStok: 28,
    category: "BMT",
    unit: "m³",
    statusStock: "Low Stock",
  },
  {
    companyId: "abm",
    itemCode: "ITM-0004",
    itemDesc: "Batu Split 1/2",
    serialCode: "SN-A004",
    qtyGudang: 45,
    qtyBoSo: 40,
    qtySiapJual: 5,
    tanggalTerakhirMasuk: "2026-03-30",
    umurStok: 39,
    category: "BMT",
    unit: "m³",
    statusStock: "Critical",
  },
  {
    companyId: "ibi2",
    itemCode: "ITM-0005",
    itemDesc: "Bata Ringan AAC",
    serialCode: "SN-A005",
    qtyGudang: 720,
    qtyBoSo: 100,
    qtySiapJual: 620,
    tanggalTerakhirMasuk: "2026-04-25",
    umurStok: 13,
    category: "TCT",
    unit: "Pcs",
    statusStock: "Safe",
  },
];
