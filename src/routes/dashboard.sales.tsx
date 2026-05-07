import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/sales")({
  component: () => (
    <PlaceholderPage title="Sales" crumbs={[{ label: "Dashboard", to: "/dashboard" }, { label: "Sales" }]} />
  ),
});
