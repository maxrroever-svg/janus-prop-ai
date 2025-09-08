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
      ? "bg-accent/10 text-accent border-r-2 border-accent" 
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";

  return (
    <Sidebar className={`sidebar ${collapsed ? "w-16" : "w-64"}`} collapsible="icon">
      <SidebarContent className="sidebar-content">
        <div className="p-3 border-b border-border/30">
          <h2 className={`font-display text-[10px] font-medium text-muted-foreground ${collapsed ? "sr-only" : ""}`}>
            Janus Consumer
          </h2>
        </div>
        
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