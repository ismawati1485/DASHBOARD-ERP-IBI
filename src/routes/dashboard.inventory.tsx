import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  slowMoving,
  topItemSalesInv,
  salesPerCategory,
  poVsReceiving,
  soVsInvoice,
  stockList,
  type StockStatus,
} from "@/data/inventory";

import {
  CompanyFilter,
  DEFAULT_COMPANY,
  filterByCompany,
} from "@/components/filters/CompanyFilter";

import { FiltersBar } from "@/components/filters/FiltersBar";
import { fmtIDR, fmtDateID } from "@/lib/format";

const fmtNum = (n: number) =>
  new Intl.NumberFormat("id-ID").format(n);

const PIE_COLORS = [
  "#4361EE",
  "#43b8d2",
  "#9442f2",
  "#ed39e4",
  "#5B7CFA",
  "#7C9CFF",
  "#1E3A8A",
];

const statusVariant = (
  s: StockStatus
): "default" | "secondary" | "destructive" => {
  if (s === "Safe") return "secondary";

  if (s === "Low Stock")
    return "default";

  return "destructive";
};

function InventoryPage() {
  const [companyId, setCompanyId] = useState(DEFAULT_COMPANY);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const slow = useMemo(
    () => filterByCompany(slowMoving, companyId),
    [companyId]
  );

  const tops = useMemo(
    () => filterByCompany(topItemSalesInv, companyId),
    [companyId]
  );

  const cats = useMemo(
    () => filterByCompany(salesPerCategory, companyId),
    [companyId]
  );

  const pos = useMemo(
    () => filterByCompany(poVsReceiving, companyId),
    [companyId]
  );

  const so = useMemo(
    () => filterByCompany(soVsInvoice, companyId),
    [companyId]
  );

  const stk = useMemo(
    () => filterByCompany(stockList, companyId),
    [companyId]
  );

  // FILTER SEARCH + STATUS
  const filteredProducts = useMemo(() => {
    return stk
      .filter((p) => {
        if (statusFilter === "all") return true;
        return p.statusStock === statusFilter;
      })
      .filter((p) =>
        p.itemDesc.toLowerCase().includes(search.toLowerCase())
      );
  }, [stk, search, statusFilter]);

  // PAGINATION
  const ITEMS_PER_PAGE = 10;

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;

    return filteredProducts.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredProducts, page]);

  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  // PIE CHART
  const totalSales = cats.reduce(
    (a, b) => a + b.totalSales,
    0
  );

  const pieData = cats.map((c) => ({
    ...c,
    percentage: totalSales
      ? +(
          (c.totalSales / totalSales) *
          100
        ).toFixed(1)
      : 0,
  }));

  return (
    <div>
      <PageHeader
        title="Inventory Dashboard"
        description="Pantau pergerakan stok, kategori penjualan, dan status PO."
        crumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Inventory" },
        ]}
      />

      <FiltersBar>
        <div className="flex flex-wrap items-center gap-3">
          <CompanyFilter
            value={companyId}
            onChange={setCompanyId}
          />
        </div>
      </FiltersBar>

      {/* TOP TABLES */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Top Item Slow Moving
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Desc</TableHead>
                  <TableHead className="text-right">
                    Qty
                  </TableHead>
                  <TableHead className="text-right">
                    Total COGS
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {slow.map((i) => (
                  <TableRow key={i.itemDesc}>
                    <TableCell className="font-medium">
                      {i.itemDesc}
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {fmtNum(i.qty)}
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {fmtIDR(i.totalCogs)}
                    </TableCell>
                  </TableRow>
                ))}

                {slow.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-sm text-muted-foreground py-6"
                    >
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Top Item Sales
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Desc</TableHead>
                  <TableHead className="text-right">
                    Qty
                  </TableHead>
                  <TableHead className="text-right">
                    Total Sales
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tops.map((i) => (
                  <TableRow key={i.itemDesc}>
                    <TableCell className="font-medium">
                      {i.itemDesc}
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {fmtNum(i.qty)}
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {fmtIDR(i.totalSales)}
                    </TableCell>
                  </TableRow>
                ))}

                {tops.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-sm text-muted-foreground py-6"
                    >
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Sales per Category
            </CardTitle>
          </CardHeader>

        <CardContent>
          <div className="h-72">
            <ResponsiveContainer
            width="100%"
            height="100%" >
      <PieChart>
        <Pie
          data={pieData}
          dataKey="totalSales"
          nameKey="category"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={2}
        >
          {pieData.map((_, i) => (
            <Cell
              key={i}
              fill={
                PIE_COLORS[
                  i % PIE_COLORS.length
                ]
              }
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(
            v: number,
            _n,
            p: any
          ) => [
            `${fmtIDR(v)} (${p.payload.percentage}%)`,
            p.payload.category,
          ]}
        />

        {/* INI YANG KURANG */}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* KETERANGAN CATEGORY */}
  <div className="mt-4 space-y-2">
    {pieData.map((c, i) => (
      <div
        key={c.category}
        className="flex items-center justify-between text-sm"
      >
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{
              background:
                PIE_COLORS[
                  i % PIE_COLORS.length
                ],
            }}
          />

          <span className="font-medium">
            {c.category}
          </span>
        </div>

        <span className="text-muted-foreground">
          {c.percentage}% •{" "}
          {fmtIDR(c.totalSales)}
        </span>
      </div>
    ))}
  </div>
</CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">
              PO Pending / Back Order vs PO Receiving
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={pos}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E2E8F0"
                  />

                  <XAxis
                    dataKey="category"
                    stroke="#64748B"
                    fontSize={12}
                  />

                  <YAxis
                    stroke="#64748B"
                    fontSize={12}
                  />

                  <Tooltip />
                  <Legend />

                  <Bar
                    dataKey="poPending"
                    name="PO Pending"
                    fill="#4361EE"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="backOrder"
                    name="Back Order"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="poReceiving"
                    name="PO Receiving"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SO VS INVOICE */}
      <Card className="mt-4 rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">
            Perbandingan SO vs Sales Invoice
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={so}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="category"
                  stroke="#64748B"
                  fontSize={12}
                />

                <YAxis
                  stroke="#64748B"
                  fontSize={12}
                />

                <Tooltip />
                <Legend />

                <Bar
                  dataKey="salesOrder"
                  name="Sales Order"
                  fill="#7da0eb"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="salesInvoice"
                  name="Sales Invoice"
                  fill="#4361EE"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* STOCK LIST */}
      <Card className="mt-4 rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">
            Stock List
          </CardTitle>

          <div className="flex flex-wrap items-center gap-3">
            <Input
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-[250px]"
          />

          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Status
              </SelectItem>

              <SelectItem value="Safe">
                Safe
              </SelectItem>

              <SelectItem value="Low Stock">
                Low Stock
              </SelectItem>

              <SelectItem value="Critical">
                Critical
              </SelectItem>

              <SelectItem value="Out of Stock">
                Out of Stock
              </SelectItem>
            </SelectContent>
          </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Item Code</TableHead>
                  <TableHead>Item Desc</TableHead>
                  <TableHead>Serial</TableHead>
                  <TableHead className="text-right">
                    Qty Gudang
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedProducts.map((s, idx) => (
                  <TableRow key={s.itemCode}>
                    <TableCell>
                      {(page - 1) * ITEMS_PER_PAGE +
                        idx +
                        1}
                    </TableCell>

                    <TableCell className="font-mono text-xs">
                      {s.itemCode}
                    </TableCell>

                    <TableCell className="font-medium">
                      {s.itemDesc}
                    </TableCell>

                    <TableCell className="font-mono text-xs">
                      {s.serialCode}
                    </TableCell>

                    <TableCell className="text-right tabular-nums">
                      {fmtNum(s.qtyGudang)}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={statusVariant(
                          s.statusStock
                        )}
                      >
                        {s.statusStock}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}

                {paginatedProducts.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-sm text-muted-foreground py-6"
                    >
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* PAGINATION */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() =>
                  setPage((p) => p - 1)
                }
              >
                Prev
              </Button>

              <div className="flex items-center px-3 text-sm text-muted-foreground">
                {page} / {totalPages || 1}
              </div>

              <Button
                variant="outline"
                disabled={
                  page === totalPages ||
                  totalPages === 0
                }
                onClick={() =>
                  setPage((p) => p + 1)
                }
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute(
  "/dashboard/inventory"
)({
  component: InventoryPage,
});