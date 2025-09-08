import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Target,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Shield,
  Zap,
  TrendingUp,
  CheckSquare,
  Database,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { name: "Deal Canvas", href: "/investor", icon: Home },
  { name: "Janus Deal Feed", href: "/investor/feed", icon: Zap },
  { name: "Active Deals", href: "/investor/deals", icon: TrendingUp },
  { name: "Plans", href: "/investor/plans", icon: CheckSquare },
  { name: "Intelligence", href: "/investor/intelligence", icon: BarChart3 },
  { name: "IC Memos", href: "/investor/memos", icon: FileText },
  { name: "Outreach", href: "/investor/outreach", icon: MessageSquare },
  { name: "Portfolio", href: "/investor/portfolio", icon: Target },
  { name: "Data Lake", href: "/investor/data-lake", icon: Database },
  { name: "AI Assistant", href: "/investor/assistant", icon: MessageSquare },
];

const bottomNavigation = [
  { name: "Settings", href: "/investor/settings", icon: Settings },
  { name: "Audit Log", href: "/investor/audit", icon: Shield },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  const isActive = (path: string) => {
    if (path === "/investor") {
      return location.pathname === "/investor";
    }
    return location.pathname.startsWith(path);
  };

  const getNavClass = (path: string) => 
    isActive(path) 
      ? "bg-primary/10 text-primary border-r-2 border-primary" 
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";

  return (
    <Sidebar className={`sidebar dashboard-sidebar ${collapsed ? "w-16" : "w-64"}`} collapsible="icon">
      <SidebarContent className="sidebar-content">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.href} className={getNavClass(item.href)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.name}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.href} className={getNavClass(item.href)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.name}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}