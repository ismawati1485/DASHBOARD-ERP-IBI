import {
  salesKpiByCompany,
  topItemSales,
  topLostSales,
  topDrivers,
  trenPenjualan,
} from "@/data/sales";

export async function getSalesDashboard() {
  return {
    salesKpiByCompany,
    topItemSales,
    topLostSales,
    topDrivers,
    trenPenjualan,
  };
}
