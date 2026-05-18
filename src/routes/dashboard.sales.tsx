import { createFileRoute } from "@tanstack/react-router";
import {
  useMemo,
  useState,
  useEffect,
} from "react";

import { getSalesman } from "@/services/salesman";
import { getSalesInvoices } from "@/services/sales-invoice";

import { PageHeader } from "@/components/dashboard/PageHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  TrendingUp,
  Target,
  DollarSign,
  Percent,
} from "lucide-react";

import {
  topItemSales,
  topLostSales,
  topDrivers,
} from "@/data/sales";

import {
  CompanyFilter,
  DEFAULT_COMPANY,
} from "@/components/filters/CompanyFilter";

import { FiltersBar } from "@/components/filters/FiltersBar";

import { fmtIDR } from "@/lib/format";

import {
  getTotalSales,
  getTopCustomers,
  getTopSalesman,
} from "@/lib/sales-analytics";

// =========================
// CONSTANTS
// =========================

const PIE_COLORS = [
  "#4361EE",
  "#7da0eb",
];

const MONTH_ORDER = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const alasanVariant = (
  a: string
):
  | "default"
  | "secondary"
  | "destructive"
  | "outline" => {
  if (a === "Harga Tinggi")
    return "destructive";

  if (a === "Stok Kosong")
    return "secondary";

  return "outline";
};

function SalesPage() {
  const [companyId, setCompanyId] =
    useState(DEFAULT_COMPANY);

  // =========================
  // REAL API DATA
  // =========================

  const [salesData, setSalesData] =
    useState<any[]>([]);

  const [salesmanData, setSalesmanData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setLoading(true);

      const invoices =
        await getSalesInvoices();

      const salesmans =
        await getSalesman();

      console.log(
        "REAL SALES:",
        invoices
      );

      console.log(
        "SALESMAN:",
        salesmans
      );

      setSalesData(invoices);

      setSalesmanData(salesmans);
    } catch (error) {
      console.error(
        "LOAD SALES ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SALESMAN MAP
  // =========================

  const salesmanMap = useMemo(() => {
    return Object.fromEntries(
      salesmanData.map((s: any) => [
        s.kodeSales,
        s.namaSales,
      ])
    );
  }, [salesmanData]);

  // =========================
  // REAL ANALYTICS
  // =========================

  const totalSales = useMemo(() => {
    return getTotalSales(
      salesData
    );
  }, [salesData]);

  const topCustomers = useMemo(() => {
    return getTopCustomers(
      salesData
    );
  }, [salesData]);

  const topSalesmanData =
    useMemo(() => {
      return getTopSalesman(
        salesData,
        salesmanMap
      );
    }, [
      salesData,
      salesmanMap,
    ]);

  // =========================
  // KPI
  // =========================

  // TODO:
  // nanti target ambil dari API target sales
  const target = 500000000;

  const persen = target
    ? (totalSales / target) * 100
    : 0;

  const realisasi =
    totalSales - target;

  const kpis = [
    {
      label: "Total Penjualan",
      value: fmtIDR(totalSales),
      icon: DollarSign,
    },

    {
      label: "Target",
      value: fmtIDR(target),
      icon: Target,
    },

    {
      label: "Realisasi",
      value: fmtIDR(realisasi),
      icon: TrendingUp,

      accent:
        realisasi < 0
          ? "text-destructive"
          : "text-emerald-600",
    },

    {
      label: "% Tercapai",
      value: `${persen.toFixed(
        1
      )}%`,
      icon: Percent,
      accent: "text-primary",
    },
  ];

  // =========================
  // PIE CHART
  // =========================

  const pieData = [
    {
      name: "Tercapai",
      value: totalSales,
    },

    {
      name: "Sisa Target",
      value: Math.max(
        target - totalSales,
        0
      ),
    },
  ];

  // =========================
  // SALES TREND
  // =========================

  const trendData = useMemo(() => {
    const grouped: Record<
      string,
      number
    > = {};

    salesData.forEach((item: any) => {
      const date = new Date(
        item.tglFaktur
      );

      const bulan =
        date.toLocaleString(
          "id-ID",
          {
            month: "short",
          }
        );

      grouped[bulan] =
        (grouped[bulan] || 0) +
        (item.grandTotal || 0);
    });

    return Object.entries(grouped)
      .map(([bulan, total]) => ({
        bulan,
        total,
      }))

      .sort(
        (a, b) =>
          MONTH_ORDER.indexOf(
            a.bulan
          ) -
          MONTH_ORDER.indexOf(
            b.bulan
          )
      );
  }, [salesData]);

  // =========================
  // DUMMY DATA
  // TODO:
  // ganti API asli nanti
  // =========================

  const itemRows =
    topItemSales;

  const lostRows =
    topLostSales;

  const driverRows =
    topDrivers;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-6">
        Loading sales dashboard...
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Sales Dashboard"
        description="Ringkasan kinerja penjualan, target, dan tren bisnis."
        crumbs={[
          {
            label: "Dashboard",
            to: "/dashboard",
          },

          {
            label: "Sales",
          },
        ]}
      />

      <FiltersBar>
        <CompanyFilter
          value={companyId}
          onChange={setCompanyId}
        />
      </FiltersBar>

      {/* KPI */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {kpis.map((k) => (
            <Card
              key={k.label}
              className="rounded-xl shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {k.label}
                </CardTitle>

                <k.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div
                  className={`text-2xl font-semibold ${
                    k.accent ?? ""
                  }`}
                >
                  {k.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* PIE CHART */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Pencapaian Target
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-56">
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
                    outerRadius={80}
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
                      v: number
                    ) =>
                      fmtIDR(v)
                    }
                  />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SALES TREND */}
      <Card className="mt-6 rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">
            Tren Penjualan
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={trendData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="bulan"
                />

                <YAxis
                  tickFormatter={(
                    value
                  ) =>
                    new Intl.NumberFormat(
                      "id-ID"
                    ).format(value)
                  }
                />

                <Tooltip
                  formatter={(
                    value: number
                  ) =>
                    fmtIDR(value)
                  }
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#4361EE"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* TOP CUSTOMER & TOP SALESMAN */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* TOP CUSTOMER */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Top Customer
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Customer
                  </TableHead>

                  <TableHead className="text-right">
                    Total Sales
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {topCustomers.map(
                  (c) => (
                    <TableRow
                      key={
                        c.customer
                      }
                    >
                      <TableCell className="font-medium">
                        {
                          c.customer
                        }
                      </TableCell>

                      <TableCell className="text-right">
                        {fmtIDR(
                          c.total
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}

                {topCustomers.length ===
                  0 && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center py-6"
                    >
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* TOP SALESMAN */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Top Salesman
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Salesman
                  </TableHead>

                  <TableHead className="text-right">
                    Total Sales
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {topSalesmanData.map(
                  (s) => (
                    <TableRow
                      key={
                        s.kodeSales
                      }
                    >
                      <TableCell className="font-medium">
                        {
                          s.salesmanName
                        }
                      </TableCell>

                      <TableCell className="text-right">
                        {fmtIDR(
                          s.total
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}

                {topSalesmanData.length ===
                  0 && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center py-6"
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

      {/* DUMMY TABLES */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* TOP DRIVER */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Top Driver
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Driver Name
                  </TableHead>

                  <TableHead className="text-right">
                    Total Tonase
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {driverRows.map(
                  (d) => (
                    <TableRow
                      key={
                        d.driverName
                      }
                    >
                      <TableCell className="font-medium">
                        {
                          d.driverName
                        }
                      </TableCell>

                      <TableCell className="text-right">
                        {d.totalTonase.toLocaleString(
                          "id-ID"
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* LOST SALES */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Top Lost Sales
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Customer
                  </TableHead>

                  <TableHead className="text-right">
                    Total
                  </TableHead>

                  <TableHead>
                    Alasan
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {lostRows.map(
                  (l) => (
                    <TableRow
                      key={
                        l.customerName
                      }
                    >
                      <TableCell className="font-medium">
                        {
                          l.customerName
                        }
                      </TableCell>

                      <TableCell className="text-right">
                        {fmtIDR(
                          l.totalPenjualan
                        )}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={alasanVariant(
                            l.alasan
                          )}
                        >
                          {
                            l.alasan
                          }
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const Route =
  createFileRoute(
    "/dashboard/sales"
  )({
    component: SalesPage,
  });