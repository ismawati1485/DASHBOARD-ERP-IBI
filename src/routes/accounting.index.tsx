import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/accounting/")({
  component: () => (
    <PlaceholderPage title="Accounting Overview" crumbs={[{ label: "Accounting" }]} />
  ),
});
