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
} from "@/components/ui/sidebar-simple";

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
  
  const isActive = (path: string) => {
    if (path === "/investor") {
      return location.pathname === "/investor";
    }
    return location.pathname.startsWith(path);
  };

  const getNavClass = (path: string) => 
    isActive(path) 
      ? "bg-accent-green/10 text-accent-green border-r-2 border-accent-green" 
      : "text-muted-foreground hover:text-foreground hover:bg-accent-blue/10";

  return (
    <Sidebar className="sidebar dashboard-sidebar">
      <SidebarContent className="sidebar-content">
        <SidebarGroup className="sidebar-group">
          <SidebarGroupLabel className="sidebar-group-label">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="sidebar-menu">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name} className="sidebar-menu-item">
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href} 
                      className={`sidebar-menu-button ${getNavClass(item.href)} ${isActive(item.href) ? 'active' : ''}`}
                    >
                       <item.icon className="h-4 w-4" />
                       <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="sidebar-group mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="sidebar-menu">
              {bottomNavigation.map((item) => (
                <SidebarMenuItem key={item.name} className="sidebar-menu-item">
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href} 
                      className={`sidebar-menu-button ${getNavClass(item.href)} ${isActive(item.href) ? 'active' : ''}`}
                    >
                       <item.icon className="h-4 w-4" />
                       <span>{item.name}</span>
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