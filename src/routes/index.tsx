import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { getSession, getDashboardPath } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const s = getSession();
    navigate({ to: s ? getDashboardPath(s.role) : "/login" });
  }, [navigate]);
  return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Redirecting…</div>;
}
