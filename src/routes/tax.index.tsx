import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/tax/")({
  component: () => <PlaceholderPage title="Tax Overview" crumbs={[{ label: "Tax" }]} />,
});
