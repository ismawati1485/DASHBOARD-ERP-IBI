import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  component: () => <DashboardLayout allowedRoles={["admin_sata", "admin_sales", "admin_logistik", "admin_produksi"]} />,
});
