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
  Upload,
  Search,
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
} from "@/components/ui/sidebar-simple";

const navigation = [
  { name: "Deal Canvas", href: "/investor", icon: Home },
  { name: "Active Deals", href: "/investor/deals", icon: TrendingUp },
  { name: "Deal Feed", href: "/investor/deal-feed", icon: Zap },
  { name: "Plans", href: "/investor/plans", icon: CheckSquare },
  { name: "Intelligence", href: "/investor/intelligence", icon: BarChart3 },
  { name: "IC Memos", href: "/investor/memos", icon: FileText },
  { name: "Outreach", href: "/investor/outreach", icon: MessageSquare },
  { name: "Portfolio", href: "/investor/portfolio", icon: Target },
  { name: "Due Diligence", href: "/investor/due-diligence", icon: FileText },
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
      ? "bg-accent-green/10 text-accent-green border-r-2 border-accent-green" 
      : "text-muted-foreground hover:text-foreground hover:bg-accent/10";

  return (
    <Sidebar>
      <SidebarContent>
        <div className="h-16 flex items-center px-4 border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h2 className={`font-display text-sm font-semibold text-foreground glow-text ${collapsed ? "sr-only" : ""}`}>
            Janus Investor
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href} 
                      className={`${getNavClass(item.href)} ${isActive(item.href) ? 'active' : ''}`}
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

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href} 
                      className={`${getNavClass(item.href)} ${isActive(item.href) ? 'active' : ''}`}
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