import {
  slowMoving,
  topItemSalesInv,
  salesPerCategory,
  poVsReceiving,
  soVsInvoice,
  stockList,
} from "@/data/inventory";

export async function getSlowMovingItems() {
  return slowMoving;
}

export async function getTopItemSales() {
  return topItemSalesInv;
}

export async function getSalesPerCategory() {
  return salesPerCategory;
}

export async function getPOvsReceiving() {
  return poVsReceiving;
}

export async function getSOvsInvoice() {
  return soVsInvoice;
}

export async function getStockList() {
  return stockList;
}