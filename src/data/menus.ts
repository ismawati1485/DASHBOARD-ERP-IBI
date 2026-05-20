  import {
  BarChart3,
  Users,
  Package,
  Factory,
  TrendingUp,
  FileText,
  Receipt,
  Wallet,
  ListChecks,
  LayoutDashboard,
} from "lucide-react";
import type { Role } from "@/lib/auth";

export type MenuItem = { title: string; url: string; icon: React.ComponentType<{ className?: string }> };

export type WorkspaceConfig = {
  label: string;
  basePath: string;
  items: MenuItem[];
};

export const OPERATION_WORKSPACE: WorkspaceConfig = {
  label: "Operations",
  basePath: "/dashboard",
  items: [
    { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
    { title: "Sales", url: "/dashboard/sales", icon: BarChart3 },
    { title: "Customer", url: "/dashboard/customer", icon: Users },
    { title: "Inventory", url: "/dashboard/inventory", icon: Package },
    { title: "Production", url: "/dashboard/production", icon: Factory },
  ],
};

export const ACCOUNTING_WORKSPACE: WorkspaceConfig = {
  label: "Accounting",
  basePath: "/accounting",
  items: [
    { title: "Overview", url: "/accounting", icon: LayoutDashboard },
    { title: "Proyeksi", url: "/accounting/proyeksi", icon: TrendingUp },
    { title: "Laporan", url: "/accounting/laporan", icon: FileText },
  ],
};

export const TAX_WORKSPACE: WorkspaceConfig = {
  label: "Tax",
  basePath: "/tax",
  items: [
    { title: "Overview", url: "/tax", icon: LayoutDashboard },
    { title: "Laporan Pajak", url: "/tax/laporan-pajak", icon: Receipt },
  ],
};

export const FINANCE_WORKSPACE: WorkspaceConfig ={
  label: "Finance",
  basePath: "/finance",
  items: [
    { title: "Overview", url: "/finance", icon: LayoutDashboard },
    { title: "Cashflow", url: "/finance/cashflow", icon: Wallet },
    { title: "Daftar Tugas", url: "/finance/daftar-tugas", icon: ListChecks },
  ],  
};

export const MANAGER_WORKSPACE: WorkspaceConfig = {
  label: "ERP Dashboard",
  basePath: "/dashboard",
  items: [

    // OPERATIONS
    { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
    { title: "Sales", url: "/dashboard/sales", icon: BarChart3 },
    { title: "Customer", url: "/dashboard/customer", icon: Users },
    { title: "Inventory", url: "/dashboard/inventory", icon: Package },
    { title: "Production", url: "/dashboard/production", icon: Factory },

    // ACCOUNTING
    { title: "Accounting Overview", url: "/accounting", icon: LayoutDashboard },
    { title: "Accounting Proyeksi", url: "/accounting/proyeksi", icon: TrendingUp },
    { title: "Accounting Laporan", url: "/accounting/laporan", icon: FileText },

    // FINANCE
    { title: "Finance Overview", url: "/finance", icon: LayoutDashboard },
    { title: "Cashflow", url: "/finance/cashflow", icon: Wallet },
    { title: "Daftar Tugas", url: "/finance/daftar-tugas", icon: ListChecks },

    // TAX
    { title: "Tax Overview", url: "/tax", icon: LayoutDashboard },
    { title: "Laporan Pajak", url: "/tax/laporan-pajak", icon: Receipt },
  ],
};

export function workspaceForRole(role: Role): WorkspaceConfig {
    // GLOBAL AKSES
  if (role === "manager" || role === "super_admin") {
    return MANAGER_WORKSPACE;
  } 

  // ACCOUNTING
  if (role === "admin_accounting") {
    return ACCOUNTING_WORKSPACE;
  }

  // TAX
  if (role === "admin_tax") {
    return TAX_WORKSPACE;
  }

  // FINANCE
  if (role === "admin_finance") {
    return FINANCE_WORKSPACE;
  }

  // DEFAULT → OPERATIONS
  return OPERATION_WORKSPACE;

}
