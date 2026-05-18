import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { getStockStatus } from "@/lib/inventory-logic";

import {
  getTopStockItems,
  getSlowMovingItems,
  getStockSummary,
} from "@/lib/inventory-analytics";

import { PageHeader } from "@/components/dashboard/PageHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  CompanyFilter,
  DEFAULT_COMPANY,
} from "@/components/filters/CompanyFilter";

import { FiltersBar } from "@/components/filters/FiltersBar";

import { fmtIDR } from "@/lib/format";

import { getStockList } from "@/services/inventory";

type StockStatus =
  | "Safe"
  | "Low Stock"
  | "Critical"
  | "Out of Stock";

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

const LIMIT = 50;

const statusVariant = (
  s: StockStatus
): "default" | "secondary" | "destructive" => {
  if (s === "Safe") return "secondary";

  if (s === "Low Stock") return "default";

  return "destructive";
};

function InventoryPage() {

  const [companyId, setCompanyId] =
    useState(DEFAULT_COMPANY);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // REAL DATA
  const [stockList, setStockList] =
    useState<any[]>([]);

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // =========================
  // FETCH INVENTORY
  // =========================

  useEffect(() => {
    loadInventory(page, search);
  }, [page, search]);

  const loadInventory = async (
    currentPage = 1,
    currentSearch = ""
  ) => {

    try {

      setLoading(true);

      // API CALL
      const res =
        await getStockList(
          currentPage,
          LIMIT,
          currentSearch
        );

      console.log(
        "REAL INVENTORY:",
        res
      );

      // AMBIL ARRAY DATA
      const rows = res.data || [];

      // MAPPING
      const mapped = rows.map(
        (item: any) => ({

          kodeItem:
            item.kode_item,

          namaBarang:
            item.nama_barang,

          qtyGudang:
            item.qty_ready || 0,

          // PART NUMBER
          serialCode:
            item.part_number || "-",

          satuan:
            item.satuan || "-",

          hargaJual:
            item.harga_jual || 0,

          // QTY READY / SIAP JUAL
          qtySiapJual:
            item.qty_ready || 0,

          // QTY BACK ORDER SALES ORDER
          // BELUM ADA DARI API
          qtyBoSo:
            item.qty_bo_so || 0,

          // BELUM ADA DARI API
          lastStockIn:
            item.last_stock_in || "-",

          // BELUM ADA DARI API
          agingStock:
            item.aging_stock_days || "-",

          statusStock:
            getStockStatus(
              item.qty_ready || 0
            ),

        })
      );

      // SET DATA
      setStockList(mapped);

      // TOTAL PAGE
      setTotalPages(
        res.totalPages || 1
      );

    } catch (error) {

      console.error(
        "LOAD INVENTORY ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // REAL ANALYTICS
  // =========================

  // LOWEST STOCK
  const slow = useMemo(() => {
    return getSlowMovingItems(
      stockList
    );
  }, [stockList]);

  // HIGHEST STOCK
  const tops = useMemo(() => {
    return getTopStockItems(
      stockList
    );
  }, [stockList]);

  // STOCK STATUS SUMMARY
  const cats = useMemo(() => {
    return getStockSummary(
      stockList
    );
  }, [stockList]);

  // =========================
  // DUMMY DATA
  // TODO:
  // nanti ganti pakai API transaksi
  // =========================

  const pos = [
    {
      category: "Raw Material",
      poPending: 12,
      backOrder: 8,
      poReceiving: 15,
    },
    {
      category: "Chemical",
      poPending: 5,
      backOrder: 3,
      poReceiving: 7,
    },
    {
      category: "Packaging",
      poPending: 10,
      backOrder: 4,
      poReceiving: 9,
    },
  ];

  // TODO:
  // nanti ganti pakai API Sales Order & Invoice
  const so = [
    {
      category: "January",
      salesOrder: 120,
      salesInvoice: 110,
    },
    {
      category: "February",
      salesOrder: 140,
      salesInvoice: 135,
    },
    {
      category: "March",
      salesOrder: 180,
      salesInvoice: 160,
    },
  ];

  // =========================
  // FILTER STOCK LIST
  // =========================

  const filteredProducts =
    useMemo(() => {
      return stockList
        .filter((p: any) => {
          if (
            statusFilter === "all"
          )
            return true;

          return (
            p.statusStock ===
            statusFilter
          );
        })

        .filter((p: any) =>
          (p.namaBarang || "")
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );
    }, [
      stockList,
      search,
      statusFilter,
    ]);


  // PIE CHART

  const totalItems = cats.reduce(
    (a, b) => a + b.value,
    0
  );

  const pieData = cats.map((c) => ({
    ...c,

    percentage: totalItems
      ? +(
          (c.value / totalItems) *
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
          {
            label: "Dashboard",
            to: "/dashboard",
          },
          {
            label: "Inventory",
          },
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
                  <TableHead>
                    Item Desc
                  </TableHead>
                  <TableHead>
                      Category
                    </TableHead>
                  <TableHead className="text-right">
                    Qty
                  </TableHead>

                  <TableHead className="text-right">
                    Total COGS
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {slow.map((i: any) => (
                  <TableRow
                    key={i.itemDesc}
                  >
                    <TableCell className="font-medium">
                      {i.itemDesc}
                    </TableCell>

                    <TableCell className="text-right">
                      {fmtNum(i.qty)}
                    </TableCell>

                    <TableCell className="text-right">
                      {fmtIDR(
                        i.totalCogs
                      )}
                    </TableCell>
                  </TableRow>
                ))}
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
                  <TableHead>
                    Item Desc
                  </TableHead>

                  <TableHead className="text-right">
                    Qty
                  </TableHead>

                  <TableHead className="text-right">
                    Total Sales
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tops.map((i: any) => (
                  <TableRow
                    key={i.itemDesc}
                  >
                    <TableCell className="font-medium">
                      {i.itemDesc}
                    </TableCell>

                    <TableCell className="text-right">
                      {fmtNum(i.qty)}
                    </TableCell>

                    <TableCell className="text-right">
                      {fmtIDR(
                        i.totalSales
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* PIE CHART */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Stock Status Summary
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-72">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {pieData.map(
                      (_, i) => (
                        <Cell
                          key={i}
                          fill={
                            PIE_COLORS[
                              i %
                                PIE_COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(
                      v: number,
                      _n,
                      p: any
                    ) => [
                      `${fmtNum(
                        v
                      )} Items (${
                        p.payload
                          .percentage
                      }%)`,
                      p.payload.name,
                    ]}
                  />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* DETAIL */}
            <div className="mt-4 space-y-2">
              {pieData.map(
                (c, i) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-sm"
                        style={{
                          background:
                            PIE_COLORS[
                              i %
                                PIE_COLORS.length
                            ],
                        }}
                      />

                      <span className="font-medium">
                        {c.name}
                      </span>
                    </div>

                    <span className="text-muted-foreground">
                      {
                        c.percentage
                      }
                      % •{" "}
                      {fmtNum(
                        c.value
                      )}{" "}
                      Items
                    </span>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* PO VS RECEIVING */}
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
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="category" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="poPending"
                    fill="#4361EE"
                  />

                  <Bar
                    dataKey="backOrder"
                    fill="#F59E0B"
                  />

                  <Bar
                    dataKey="poReceiving"
                    fill="#10B981"
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
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="category" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="salesOrder"
                  fill="#7da0eb"
                />

                <Bar
                  dataKey="salesInvoice"
                  fill="#4361EE"
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
          {loading ? (
            <div className="py-10 text-center">
              Loading inventory...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      No
                    </TableHead>

                    <TableHead>
                      Item Code
                    </TableHead>

                    <TableHead>
                      Item Desc
                    </TableHead>

                    <TableHead>
                      Serial
                    </TableHead>

                    <TableHead className="text-right">
                      Qty Gudang
                    </TableHead>

                    <TableHead className="text-right">
                      Qty BO.SO
                    </TableHead>

                    <TableHead className="text-right">
                      Qty Siap Jual
                    </TableHead>

                    <TableHead>
                      Last Stock In
                    </TableHead>

                    <TableHead>
                      Aging Stock
                    </TableHead>

                    <TableHead>
                      Status
                    </TableHead>
                    
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {stockList.map(
                    (
                      s: any,
                      idx
                    ) => (
                      <TableRow
                        key={
                          s.kodeItem ||
                          idx
                        }
                      >
                        <TableCell>
                          {(page - 1) * LIMIT + idx + 1}
                        </TableCell>

                        <TableCell className="font-mono text-xs">
                          {
                            s.kodeItem
                          }
                        </TableCell>

                        <TableCell className="font-medium">
                          {
                            s.namaBarang
                          }
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {
                            s.serialCode
                          }
                        </TableCell>

                        <TableCell className="text-right">
                          {fmtNum(
                            s.qtyGudang
                          )}
                        </TableCell>

                      <TableCell className="text-right">
                        {fmtNum(s.qtyBoSo)}
                      </TableCell>

                      <TableCell className="text-right">
                        {fmtNum(
                          s.qtySiapJual
                          )}
                      </TableCell>

                      <TableCell>
                        {
                        s.lastStockIn
                        }
                      </TableCell>

                      <TableCell>
                        {fmtNum(
                          s.agingStock
                          )}
                      </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusVariant(
                              s.statusStock
                            )}
                          >
                            {
                              s.statusStock
                            }
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>

{/* PAGINATION */}
<div className="flex justify-end gap-2 mt-4">

  <Button
    variant="outline"
    disabled={page === 1}
    onClick={() => {

      const prev =
        page - 1;

      setPage(prev);

      loadInventory(
        prev,
        search
      );

    }}
  >
    Prev
  </Button>

  <div className="flex items-center px-3 text-sm">
    {page} / {totalPages}
  </div>

  <Button
    variant="outline"
    disabled={
      page === totalPages
    }
onClick={() => {
  setPage((p) => p + 1);
}}
  >
    Next
  </Button>

</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const Route =
  createFileRoute(
    "/dashboard/inventory"
  )({
    component: InventoryPage,
  });