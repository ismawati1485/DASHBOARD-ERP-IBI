import { useEffect, useState, type ReactNode } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { getSession, type Role, getDashboardPath } from "@/lib/auth";
import { workspaceForRole } from "@/data/menus";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DashboardLayout({ allowedRoles, children }: { allowedRoles: Role[]; children?: ReactNode }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate({ to: "/login" });
      return;
    }
    if (!allowedRoles.includes(s.role)) {
      navigate({ to: getDashboardPath(s.role) });
      return;
    }
    setRole(s.role);
    setReady(true);
  }, [navigate, allowedRoles]);

  if (!ready || !role) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  }

  const workspace = workspaceForRole(role);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar workspace={workspace} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6">
            <SidebarTrigger />
            <div className="relative hidden flex-1 max-w-md md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-9" />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative rounded-md p-2 hover:bg-accent">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children ?? <Outlet />}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// this is the main layout for the dashboard, it will check if the user is logged in and has the correct role to access the page, if not it will redirect to the login page or the correct dashboard page based on the users role