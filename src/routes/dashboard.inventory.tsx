import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/inventory")({
  component: () => (
    <PlaceholderPage title="Inventory" crumbs={[{ label: "Dashboard", to: "/dashboard" }, { label: "Inventory" }]} />
  ),
});
