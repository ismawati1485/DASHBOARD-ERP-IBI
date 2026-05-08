import { createFileRoute } from "@tanstack/react-router";
import {
  Package,
  ShoppingCart,
  Users,
  Factory,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500">
          Operational overview across sales, customers, inventory and production.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-500">Total Sales</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                Rp 12.4B
              </h2>
              <p className="mt-1 text-xs text-green-600">
                +12.5% from last month
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3">
              <ShoppingCart className="h-6 w-6 text-[#4361EE]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-500">Customers</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                1,248
              </h2>
              <p className="mt-1 text-xs text-green-600">
                +8.2% active customers
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3">
              <Users className="h-6 w-6 text-[#4361EE]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-500">Inventory</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                3,520
              </h2>
              <p className="mt-1 text-xs text-yellow-600">
                24 low stock items
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3">
              <Package className="h-6 w-6 text-[#4361EE]" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-500">Production</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                89%
              </h2>
              <p className="mt-1 text-xs text-green-600">
                Production target achieved
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-3">
              <Factory className="h-6 w-6 text-[#4361EE]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-800">
              Business Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Total Revenue</span>
              <span className="font-semibold text-slate-800">
                Rp 18.2B
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Total Orders</span>
              <span className="font-semibold text-slate-800">
                4,280 Orders
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Production Efficiency</span>
              <span className="font-semibold text-green-600">
                92%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Inventory Health</span>
              <span className="font-semibold text-yellow-600">
                Moderate
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <TrendingUp className="h-5 w-5 text-[#4361EE]" />
              Recent Activities
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              Sales target reached 87% this month.
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              New customer registered from DB002 region.
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              Inventory stock updated for Coil category.
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              Production waste reduced by 6%.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}