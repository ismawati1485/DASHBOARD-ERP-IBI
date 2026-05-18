export function getTopStockItems(
  data: any[]
) {
  return [...data]
    .sort(
      (a, b) =>
        (b.qtyGudang || 0) -
        (a.qtyGudang || 0)
    )
    .slice(0, 5);
}

export function getSlowMovingItems(
  data: any[]
) {
  return [...data]
    .sort(
      (a, b) =>
        (a.qtyGudang || 0) -
        (b.qtyGudang || 0)
    )
    .slice(0, 5);
}

export function getStockSummary(
  data: any[]
) {
  const summary: Record<
    string,
    number
  > = {
    Safe: 0,
    "Low Stock": 0,
    Critical: 0,
    "Out of Stock": 0,
  };

  data.forEach((item) => {
    const status =
      item.statusStock as keyof typeof summary;

    if (
      summary[status] !== undefined
    ) {
      summary[status]++;
    }
  });

  return Object.entries(summary).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
}