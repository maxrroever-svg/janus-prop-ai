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
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const navigation = [
  { name: "Deal Canvas", href: "/investor", icon: Home },
  { name: "Active Deals", href: "/investor/deals", icon: TrendingUp },
  { name: "Plans", href: "/investor/plans", icon: CheckSquare },
  { name: "Intelligence", href: "/investor/intelligence", icon: BarChart3 },
  { name: "IC Memos", href: "/investor/memos", icon: FileText },
  { name: "Outreach", href: "/investor/outreach", icon: MessageSquare },
  { name: "Portfolio", href: "/investor/portfolio", icon: Target },
  { name: "Data Lake", href: "/investor/data-lake", icon: Database },
  { name: "AI Assistant", href: "/investor/assistant", icon: MessageSquare },
];

const dealFeedSubnav = [
  { name: "Upload Deals", href: "/investor/upload", icon: Upload },
  { name: "Deal Requests", href: "/investor/requests", icon: Search },
  { name: "Forums", href: "/investor/forums", icon: MessageSquare },
  { name: "Deal Analytics", href: "/investor/analytics", icon: BarChart3 },
];

const bottomNavigation = [
  { name: "Settings", href: "/investor/settings", icon: Settings },
  { name: "Audit Log", href: "/investor/audit", icon: Shield },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [dealFeedOpen, setDealFeedOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === "/investor") {
      return location.pathname === "/investor";
    }
    return location.pathname.startsWith(path);
  };

  const isDealFeedActive = dealFeedSubnav.some(item => isActive(item.href));

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
              
              {/* Deal Feed Collapsible Section */}
              <SidebarMenuItem>
                <Collapsible open={dealFeedOpen} onOpenChange={setDealFeedOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      className={`${isDealFeedActive ? 'bg-accent-green/10 text-accent-green border-r-2 border-accent-green' : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'} w-full justify-between`}
                    >
                      <div className="flex items-center">
                        <Zap className="h-4 w-4" />
                        {!collapsed && <span>Deal Feed</span>}
                      </div>
                      {!collapsed && (
                        dealFeedOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {dealFeedSubnav.map((item) => (
                      <SidebarMenuItem key={item.name} className="ml-4">
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.href} 
                            className={`${getNavClass(item.href)} ${isActive(item.href) ? 'active' : ''} text-sm`}
                          >
                             <item.icon className="h-3 w-3" />
                             {!collapsed && <span className="text-sm">{item.name}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
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