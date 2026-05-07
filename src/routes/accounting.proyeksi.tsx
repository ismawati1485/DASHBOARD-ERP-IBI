import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/accounting/proyeksi")({
  component: () => (
    <PlaceholderPage title="Proyeksi" crumbs={[{ label: "Accounting", to: "/accounting" }, { label: "Proyeksi" }]} />
  ),
});
