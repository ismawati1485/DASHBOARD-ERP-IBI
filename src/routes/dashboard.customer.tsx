import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/dashboard/customer")({
  component: () => (
    <PlaceholderPage title="Customer" crumbs={[{ label: "Dashboard", to: "/dashboard" }, { label: "Customer" }]} />
  ),
});
