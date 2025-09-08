import { NavLink, useLocation } from "react-router-dom";
import {
  Search,
  MessageSquare,
  FileText,
  CreditCard,
  Home,
  Shield,
  Settings,
  Database,
  MapPin,
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
  { name: "Smart Search", href: "/consumer", icon: Search },
  { name: "Property Analysis", href: "/consumer/analysis", icon: FileText },
  { name: "Map View", href: "/consumer/map", icon: MapPin },
  { name: "Underwriting", href: "/consumer/underwriting", icon: FileText },
  { name: "Financing", href: "/consumer/financing", icon: CreditCard },
  { name: "Closing Room", href: "/consumer/closing", icon: Home },
  { name: "Outreach", href: "/consumer/outreach", icon: MessageSquare },
  { name: "Ownership", href: "/consumer/ownership", icon: Shield },
  { name: "Data Lake", href: "/consumer/data-lake", icon: Database },
  { name: "AI Assistant", href: "/consumer/assistant", icon: MessageSquare },
];

const bottomNavigation = [
  { name: "Settings", href: "/consumer/settings", icon: Settings },
  { name: "Audit Log", href: "/consumer/audit", icon: Shield },
];

export function ConsumerSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  const isActive = (path: string) => {
    if (path === "/consumer") {
      return location.pathname === "/consumer";
    }
    return location.pathname.startsWith(path);
  };

  const getNavClass = (path: string) => 
    isActive(path) 
      ? "bg-accent-green/10 text-accent-green border-r-2 border-accent-green" 
      : "text-muted-foreground hover:text-foreground hover:bg-accent-blue/10";

  return (
    <Sidebar className="sidebar" collapsible="icon" data-state={collapsed ? "collapsed" : "expanded"}>
      <SidebarContent className="sidebar-content">
        <div className="sidebar-header p-3 border-b border-border/30">
          <h2 className={`sidebar-title font-display text-[10px] font-medium text-muted-foreground ${collapsed ? "sr-only" : ""}`}>
            Janus Consumer
          </h2>
        </div>
        
        <SidebarGroup className="sidebar-group">
          <SidebarGroupLabel className={`sidebar-group-label ${collapsed ? "sr-only" : ""}`}>
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
                      {!collapsed && <span>{item.name}</span>}
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