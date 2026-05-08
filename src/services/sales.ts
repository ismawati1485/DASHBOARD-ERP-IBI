import {
  salesKpi,
  salesPie,
  topItemSales,
  topLostSales,
  topDrivers,
  trenPenjualan,
} from "@/data/sales";

export async function getSalesDashboard() {
  return {
    salesKpi,
    salesPie,
    topItemSales,
    topLostSales,
    topDrivers,
    trenPenjualan,
  };
}