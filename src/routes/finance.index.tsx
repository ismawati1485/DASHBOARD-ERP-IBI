import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/finance/")({
  component: () => <PlaceholderPage title="Finance Overview" crumbs={[{ label: "Finance" }]} />,
});
