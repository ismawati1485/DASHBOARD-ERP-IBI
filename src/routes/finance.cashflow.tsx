import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/finance/cashflow")({
  component: () => (
    <PlaceholderPage title="Cashflow" crumbs={[{ label: "Finance", to: "/finance" }, { label: "Cashflow" }]} />
  ),
});
