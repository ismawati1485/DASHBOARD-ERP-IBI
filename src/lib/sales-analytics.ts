export function getTotalSales(data: any[]) {
  return data.reduce(
    (total, item) =>
      total + (item.grandTotal || 0),
    0
  );
}

export function getTopCustomers(data: any[]) {
  const grouped: Record<string, number> = {};

  data.forEach((item) => {
    const customer =
      item.customerName || "Unknown";

    grouped[customer] =
      (grouped[customer] || 0) +
      (item.grandTotal || 0);
  });

  return Object.entries(grouped)
    .map(([customer, total]) => ({
      customer,
      total,
    }))
    .sort(
      (a, b) => b.total - a.total
    )
    .slice(0, 5);
}

export function getTopSalesman(
  data: any[],
  salesmanMap: Record<string, string>
) {
  const grouped: Record<string, number> = {};

  data.forEach((item) => {
    const kodeSales =
      item.kodeSales || "Unknown";

    grouped[kodeSales] =
      (grouped[kodeSales] || 0) +
      (item.grandTotal || 0);
  });

  return Object.entries(grouped)
    .map(([kodeSales, total]) => ({
      kodeSales,

      salesmanName:
        salesmanMap[kodeSales] ||
        kodeSales,

      total,
    }))
    .sort(
      (a, b) => b.total - a.total
    )
    .slice(0, 5);
}