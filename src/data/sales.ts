export const salesKpi = {
  totalPenjualan: 1250000000,
  target: 1500000000,
  get realisasi() {
    return this.totalPenjualan - this.target;
  },
  get persenTercapai() {
    return (this.totalPenjualan / this.target) * 100;
  },
};

export const salesPie = [
  { name: "Tercapai", value: 1250000000 },
  { name: "Sisa Target", value: 250000000 },
];

export const topItemSales = [
  { itemDesc: "Semen Portland 50kg", qty: 12500, totalPenjualan: 875000000 },
  { itemDesc: "Besi Beton 12mm", qty: 8200, totalPenjualan: 612000000 },
  { itemDesc: "Pasir Cor 1m³", qty: 5400, totalPenjualan: 432000000 },
  { itemDesc: "Batu Split 1/2", qty: 4100, totalPenjualan: 308000000 },
  { itemDesc: "Bata Ringan AAC", qty: 3800, totalPenjualan: 285000000 },
];

export const topLostSales = [
  { customerName: "PT Mitra Bangun", totalPenjualan: 145000000, alasan: "Harga Tinggi" },
  { customerName: "CV Karya Sentosa", totalPenjualan: 98000000, alasan: "Stok Kosong" },
  { customerName: "PT Cipta Graha", totalPenjualan: 86000000, alasan: "Pengiriman Lama" },
  { customerName: "UD Sumber Rejeki", totalPenjualan: 72000000, alasan: "Kompetitor" },
  { customerName: "PT Anugerah Jaya", totalPenjualan: 64000000, alasan: "Harga Tinggi" },
];

export const topDrivers = [
  { driverName: "Budi Santoso", totalTonase: 1240 },
  { driverName: "Agus Wijaya", totalTonase: 1180 },
  { driverName: "Slamet Riyadi", totalTonase: 1095 },
  { driverName: "Joko Susilo", totalTonase: 980 },
  { driverName: "Hendra Kurniawan", totalTonase: 875 },
];

export const trenPenjualan = [
  { bulan: "Jan", DB001: 95, DB002: 78 },
  { bulan: "Feb", DB001: 102, DB002: 84 },
  { bulan: "Mar", DB001: 118, DB002: 91 },
  { bulan: "Apr", DB001: 110, DB002: 96 },
  { bulan: "May", DB001: 125, DB002: 108 },
  { bulan: "Jun", DB001: 132, DB002: 115 },
  { bulan: "Jul", DB001: 128, DB002: 122 },
  { bulan: "Aug", DB001: 140, DB002: 130 },
  { bulan: "Sep", DB001: 152, DB002: 138 },
  { bulan: "Oct", DB001: 148, DB002: 142 },
  { bulan: "Nov", DB001: 160, DB002: 150 },
  { bulan: "Dec", DB001: 175, DB002: 162 },
];
