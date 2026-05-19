{/*
import type { CompanyId } from "./company";

export type TaxKpi = {
  companyId: CompanyId;
  ppnKeluaran: number;
  ppnMasukan: number;
  pphTerutang: number;
  totalFaktur: number;
};

export const taxKpiByCompany: TaxKpi[] = [
  { companyId: "ibi1", ppnKeluaran: 480_000_000, ppnMasukan: 320_000_000, pphTerutang: 145_000_000, totalFaktur: 320 },
  { companyId: "ibi2", ppnKeluaran: 360_000_000, ppnMasukan: 240_000_000, pphTerutang: 110_000_000, totalFaktur: 240 },
  { companyId: "sak",  ppnKeluaran: 220_000_000, ppnMasukan: 150_000_000, pphTerutang: 65_000_000,  totalFaktur: 145 },
  { companyId: "msg",  ppnKeluaran: 180_000_000, ppnMasukan: 120_000_000, pphTerutang: 52_000_000,  totalFaktur: 120 },
  { companyId: "abm",  ppnKeluaran: 140_000_000, ppnMasukan: 95_000_000,  pphTerutang: 41_000_000,  totalFaktur: 96 },
  { companyId: "bkj",  ppnKeluaran: 110_000_000, ppnMasukan: 70_000_000,  pphTerutang: 32_000_000,  totalFaktur: 84 },
  { companyId: "ttet", ppnKeluaran: 85_000_000,  ppnMasukan: 55_000_000,  pphTerutang: 24_000_000,  totalFaktur: 60 },
];

export type TaxTrendRow = {
  companyId: CompanyId;
  bulan: string;
  ppn: number;
  pph: number;
  dept: "DB001" | "DB002";
};

const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
function gen(companyId: CompanyId, base: number, dept: "DB001" | "DB002"): TaxTrendRow[] {
  return months.map((b, i) => ({
    companyId,
    bulan: b,
    dept,
    ppn: Math.round(base + i * 6 + (dept === "DB001" ? 8 : 0)),
    pph: Math.round(base * 0.35 + i * 2 + (dept === "DB002" ? 3 : 0)),
  }));
}
export const taxTrend: TaxTrendRow[] = [
  ...gen("ibi1", 80, "DB001"),
  ...gen("ibi1", 60, "DB002"),
  ...gen("ibi2", 65, "DB001"),
  ...gen("ibi2", 50, "DB002"),
  ...gen("sak",  40, "DB001"),
  ...gen("msg",  35, "DB001"),
  ...gen("abm",  30, "DB001"),
  ...gen("bkj",  25, "DB001"),
  ...gen("ttet", 20, "DB001"),
];

export type TaxActivity = {
  id: number;
  companyId: CompanyId;
  desc: string;
  time: string;
  type: "Faktur" | "Reminder" | "Lapor";
};

export const taxActivity: TaxActivity[] = [
  { id: 1, companyId: "ibi1", desc: "Faktur Pajak Keluaran #FK-2031 diterbitkan", time: "10 menit lalu", type: "Faktur" },
  { id: 2, companyId: "ibi1", desc: "Reminder PPh 23 jatuh tempo 10 Juni", time: "1 jam lalu", type: "Reminder" },
  { id: 3, companyId: "ibi2", desc: "Lapor SPT Masa PPN periode Mei terkirim", time: "3 jam lalu", type: "Lapor" },
  { id: 4, companyId: "sak",  desc: "Faktur Masukan #FM-1042 dikreditkan", time: "Kemarin", type: "Faktur" },
  { id: 5, companyId: "msg",  desc: "Reminder pembayaran PPh Final", time: "2 hari lalu", type: "Reminder" },
  { id: 6, companyId: "abm",  desc: "Lapor PPh 21 Karyawan terkirim", time: "3 hari lalu", type: "Lapor" },
];

export type PpnRow = {
  companyId: CompanyId;
  dept: string;
  ppnKeluaran: number;
  ppnMasukan: number;
  jumlahFaktur: number;
};

export const ppnRows: PpnRow[] = [
  { companyId: "ibi1", dept: "DB001 - Pabrik A", ppnKeluaran: 280_000_000, ppnMasukan: 195_000_000, jumlahFaktur: 142 },
  { companyId: "ibi1", dept: "DB001 - Pabrik B", ppnKeluaran: 200_000_000, ppnMasukan: 215_000_000, jumlahFaktur: 110 },
  { companyId: "ibi2", dept: "DB002 - Distribusi", ppnKeluaran: 220_000_000, ppnMasukan: 150_000_000, jumlahFaktur: 124 },
  { companyId: "ibi2", dept: "DB002 - Retail", ppnKeluaran: 140_000_000, ppnMasukan: 90_000_000, jumlahFaktur: 88 },
  { companyId: "sak",  dept: "SAK - Produksi", ppnKeluaran: 220_000_000, ppnMasukan: 240_000_000, jumlahFaktur: 96 },
  { companyId: "msg",  dept: "MSG - Galvalum", ppnKeluaran: 180_000_000, ppnMasukan: 120_000_000, jumlahFaktur: 80 },
  { companyId: "abm",  dept: "ABM - Bajatama", ppnKeluaran: 140_000_000, ppnMasukan: 95_000_000, jumlahFaktur: 64 },
];

export type PphStatus = "Lapor" | "Pending" | "Overdue";

export type PphRow = {
  companyId: CompanyId;
  coaBiaya: string;
  coaPph: string;
  pphTerutang: number;
  lawanTransaksi: string;
  npwp: string;
  status: PphStatus;
};

export const pphRows: PphRow[] = [
  { companyId: "ibi1", coaBiaya: "5101 - Sewa Gudang", coaPph: "2103 - PPh 23", pphTerutang: 4_500_000,  lawanTransaksi: "PT Properti Indo", npwp: "01.234.567.8-901.000", status: "Lapor" },
  { companyId: "ibi1", coaBiaya: "5202 - Jasa Konsultan", coaPph: "2103 - PPh 23", pphTerutang: 7_800_000, lawanTransaksi: "CV Mitra Konsultindo", npwp: "02.345.678.9-012.000", status: "Pending" },
  { companyId: "ibi2", coaBiaya: "5301 - Iklan", coaPph: "2104 - PPh 4(2)", pphTerutang: 3_200_000, lawanTransaksi: "Agensi Kreatif", npwp: "03.456.789.0-123.000", status: "Overdue" },
  { companyId: "sak",  coaBiaya: "5401 - Maintenance", coaPph: "2103 - PPh 23", pphTerutang: 2_100_000, lawanTransaksi: "PT Service Mesin", npwp: "04.567.890.1-234.000", status: "Lapor" },
  { companyId: "msg",  coaBiaya: "5102 - Listrik", coaPph: "2105 - PPh Final", pphTerutang: 1_800_000, lawanTransaksi: "PLN", npwp: "05.678.901.2-345.000", status: "Lapor" },
  { companyId: "abm",  coaBiaya: "5202 - Jasa Audit", coaPph: "2103 - PPh 23", pphTerutang: 5_400_000, lawanTransaksi: "KAP Sejahtera", npwp: "06.789.012.3-456.000", status: "Pending" },
  { companyId: "bkj",  coaBiaya: "5601 - Royalti", coaPph: "2104 - PPh 4(2)", pphTerutang: 6_200_000, lawanTransaksi: "PT Lisensi Indo", npwp: "07.890.123.4-567.000", status: "Overdue" },
  { companyId: "ttet", coaBiaya: "5301 - Promosi", coaPph: "2103 - PPh 23", pphTerutang: 2_800_000, lawanTransaksi: "Media Cetak", npwp: "08.901.234.5-678.000", status: "Lapor" },
];

*/}