import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/")({
  component: () => (
    <PlaceholderPage
      title="Overview"
      description="Operational overview across sales, customers, inventory and production."
      crumbs={[{ label: "Dashboard" }]}
    />
  ),
});
