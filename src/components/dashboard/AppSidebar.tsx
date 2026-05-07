import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LogOut, Building2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { WorkspaceConfig } from "@/data/menus";
import { logout, getSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

export function AppSidebar({ workspace }: { workspace: WorkspaceConfig }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const session = getSession();

  const isActive = (url: string) =>
    url === workspace.basePath ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">ERP Dashboard</span>
            <span className="text-xs text-muted-foreground">{workspace.label}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{workspace.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspace.items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2 group-data-[collapsible=icon]:hidden">
          {session && (
            <div className="flex items-center justify-between rounded-md border bg-card p-2">
              <div className="flex flex-col text-xs">
                <span className="font-medium">{session.username}</span>
                <Badge variant="secondary" className="mt-1 w-fit text-[10px] capitalize">
                  {session.role}
                </Badge>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
