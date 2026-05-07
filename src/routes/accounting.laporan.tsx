import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/accounting/laporan")({
  component: () => (
    <PlaceholderPage title="Laporan" crumbs={[{ label: "Accounting", to: "/accounting" }, { label: "Laporan" }]} />
  ),
});
