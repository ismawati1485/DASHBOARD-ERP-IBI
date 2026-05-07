import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/tax/laporan-pajak")({
  component: () => (
    <PlaceholderPage title="Laporan Pajak" crumbs={[{ label: "Tax", to: "/tax" }, { label: "Laporan Pajak" }]} />
  ),
});
