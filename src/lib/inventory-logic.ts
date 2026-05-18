export function getStockStatus(qty: number) {
  if (qty <= 0) return "Out of Stock";

  if (qty < 50) return "Critical";

  if (qty < 100) return "Low Stock";

  return "Safe";
}