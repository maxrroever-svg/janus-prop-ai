import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Search, 
  FileText, 
  CreditCard,
  Home,
  Users,
  CheckCircle,
  Clock,
  Zap,
  Bot
} from "lucide-react";

const agents = [
  {
    name: "Lead Agent",
    status: "active",
    description: "Supervises and coordinates all consumer agents",
    lastAction: "Coordinated property analysis pipeline",
    icon: Users,
    color: "text-primary"
  },
  {
    name: "Search Agent", 
    status: "active",
    description: "Finds properties matching your criteria",
    lastAction: "Scanned 247 new listings in Brooklyn",
    icon: Search,
    color: "text-success"
  },
  {
    name: "Property Analysis Agent",
    status: "idle", 
    description: "Analyzes neighborhoods, crime, and building details",
    lastAction: "Completed analysis for 1247 Atlantic Ave",
    icon: FileText,
    color: "text-warning"
  },
  {
    name: "Underwriting Agent",
    status: "active",
    description: "Generates bank-ready underwriting memos", 
    lastAction: "Created underwriting memo for saved property",
    icon: Shield,
    color: "text-ice"
  },
  {
    name: "Financing Agent",
    status: "idle",
    description: "Compares rates and manages pre-approvals",
    lastAction: "Updated mortgage rates comparison", 
    icon: CreditCard,
    color: "text-purple-400"
  },
  {
    name: "Closing Agent",
    status: "idle",
    description: "Tracks closing timeline and requirements",
    lastAction: "No active closings", 
    icon: Home,
    color: "text-orange-400"
  },
  {
    name: "Ownership Agent",
    status: "idle",
    description: "Manages post-purchase alerts and maintenance",
    lastAction: "No properties owned",
    icon: CheckCircle,
    color: "text-green-400"
  }
];

const auditLogs = [
  {
    id: 1,
    timestamp: "2025-01-15 14:32:45",
    agent: "Search Agent",
    action: "Property Match Found",
    details: "Found 3 new properties matching your Brooklyn criteria (2-4 bedrooms, $600K-$900K)",
    category: "search_activity"
  },
  {
    id: 2,
    timestamp: "2025-01-15 14:28:12", 
    agent: "Property Analysis Agent",
    action: "Neighborhood Analysis Completed",
    details: "Analyzed 1247 Atlantic Avenue - Safety score: 7.2/10, School rating: 8/10",
    category: "analysis_activity"
  },
  {
    id: 3,
    timestamp: "2025-01-15 14:25:33",
    agent: "Lead Agent", 
    action: "Search Criteria Updated",
    details: "Updated price range from $500K-$800K to $600K-$900K based on market analysis",
    category: "configuration"
  },
  {
    id: 4,
    timestamp: "2025-01-15 14:20:15",
    agent: "Underwriting Agent",
    action: "Memo Generated", 
    details: "Created underwriting memo for 1189 Atlantic Ave - Loan-to-value: 80%, DSCR: 1.45",
    category: "underwriting"
  },
  {
    id: 5,
    timestamp: "2025-01-15 14:15:47",
    agent: "Financing Agent",
    action: "Rate Update",
    details: "30-year fixed rates updated: Best rate 6.45% (Chase), Avg rate 6.72%",
    category: "financing"
  },
  {
    id: 6,
    timestamp: "2025-01-15 14:12:23", 
    agent: "Search Agent",
    action: "Watchlist Alert",
    details: "Price drop alert: 1301 Pacific St reduced from $810K to $795K (-$15K)",
    category: "search_activity"
  },
  {
    id: 7,
    timestamp: "2025-01-15 14:08:55",
    agent: "Property Analysis Agent", 
    action: "Crime Data Updated",
    details: "Refreshed Bedford-Stuyvesant crime statistics from NYPD CompStat database",
    category: "analysis_activity"  
  },
  {
    id: 8,
    timestamp: "2025-01-15 14:05:12",
    agent: "Lead Agent",
    action: "User Login",
    details: "Demo user authenticated successfully - Session started",
    category: "authentication"
  }
];

const AuditLog = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "idle": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Zap className="w-3 h-3" />;
      case "idle": return <Clock className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <ConsumerHeader title="Audit Log" subtitle="Track system activity and agent operations" />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

              {/* AI Agents Status */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    AI Agents Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map((agent, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <agent.icon className={`w-4 h-4 ${agent.color}`} />
                            <span className="font-medium text-sm text-foreground">{agent.name}</span>
                          </div>
                          <Badge className={getStatusColor(agent.status)}>
                            {getStatusIcon(agent.status)}
                            <span className="ml-1 capitalize">{agent.status}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {agent.description}
                        </p>
                        
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Last Action:</span> {agent.lastAction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Activity Log
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-0 pb-6">
                  <ScrollArea className="h-[500px] px-6">
                    <div className="space-y-4">
                      {auditLogs.map((log, index) => (
                        <div key={log.id} className="space-y-3">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 shrink-0">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Bot className="w-4 h-4 text-primary" />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">
                                    {log.agent}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  {log.timestamp}
                                </div>
                              </div>
                              
                              <div>
                                <p className="font-medium text-sm text-foreground mb-1">
                                  {log.action}
                                </p>
                                <p className="text-sm text-muted-foreground break-words">
                                  {log.details}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {index < auditLogs.length - 1 && (
                            <Separator className="opacity-30" />
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AuditLog;