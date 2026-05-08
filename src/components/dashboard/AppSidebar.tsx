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
    <Sidebar
  collapsible="icon"
  className="border-r border-slate-200 !bg-gradient-to-b !from-[#4361EE] !to-[#3651D4] text-white"
>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4361EE] text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-white">ERP Dashboard</span>
            <span className="text-xs text-blue-100">{workspace.label}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-100/80 uppercase tracking-wider text-[11px]"> {workspace.label}
        </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspace.items.map((item) => (
                <SidebarMenuItem key={item.url}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive(item.url)} 
                  tooltip={item.title} 
                  className="
                    rounded-xl transition-all duration-200
                    text-white/80 hover:bg-white/10 hover:text-white
                    data-[active=true]:bg-white 
                    data-[active=true]:text-[#4361EE] 
                    data-[active=true]:shadow-md
                    data-[active=true]:font-semibold
                  "
                >
                  <Link to={item.url}>
                    <item.icon className="h-5 w-5" />
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
            <div className="flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur border border-white/10">
              <div className="flex flex-col text-xs">
                <span className="font-medium text-white">
                  {session.username}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-blue-100 transition-all hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}