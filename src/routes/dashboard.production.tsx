import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/production")({
  component: () => (
    <PlaceholderPage title="Production" crumbs={[{ label: "Dashboard", to: "/dashboard" }, { label: "Production" }]} />
  ),
});
