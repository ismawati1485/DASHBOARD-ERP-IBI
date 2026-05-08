// this is the route for the accounting dashboard, it will check if the user is logged in and has the correct role to access the page, if not it will redirect to the login page or the correct dashboard page based on the users role
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/accounting")({
  component: () => <DashboardLayout allowedRoles={["accounting"]} />,
});
