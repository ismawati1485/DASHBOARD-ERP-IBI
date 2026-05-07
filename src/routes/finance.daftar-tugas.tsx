import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/finance/daftar-tugas")({
  component: () => (
    <PlaceholderPage title="Daftar Tugas" crumbs={[{ label: "Finance", to: "/finance" }, { label: "Daftar Tugas" }]} />
  ),
});
