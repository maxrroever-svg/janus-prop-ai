import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  Search, 
  Filter, 
  Download,
  User,
  Settings,
  Database,
  Zap,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock
} from "lucide-react";

const auditLogs = [
  {
    id: 1,
    timestamp: "2025-01-15 14:32:45",
    actor: "Demo User",
    action: "Deal Analysis Completed",
    resource: "1247 Atlantic Avenue",
    details: "Eden coordinated multi-agent analysis completed with 94% confidence",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome/120.0.0.0",
    severity: "info",
    category: "agent_activity"
  },
  {
    id: 2,
    timestamp: "2025-01-15 14:28:12",
    actor: "Orion Agent",
    action: "New Opportunity Detected",
    resource: "91-15 Corona Avenue",
    details: "Foreclosure filing detected, property flagged for immediate analysis",
    ipAddress: "System",
    userAgent: "Janus AI/1.0",
    severity: "warning",
    category: "data_ingestion"
  },
  {
    id: 3,
    timestamp: "2025-01-15 14:25:33",
    actor: "Demo User",
    action: "Settings Modified",
    resource: "Agent Configuration",
    details: "Updated Osiris minimum cap rate threshold from 7% to 8%",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome/120.0.0.0",
    severity: "info",
    category: "configuration"
  },
  {
    id: 4,
    timestamp: "2025-01-15 14:20:15",
    actor: "Atelius Agent",
    action: "Legal Risk Identified",
    resource: "156 MacDonough Street",
    details: "Outstanding lien of $23,000 discovered in title search",
    ipAddress: "System",
    userAgent: "Janus AI/1.0",
    severity: "error",
    category: "legal_review"
  },
  {
    id: 5,
    timestamp: "2025-01-15 14:15:47",
    actor: "Demo User",
    action: "Deal Saved to Portfolio",
    resource: "1567 Calle San Sebastián",
    details: "Property added to saved deals with high priority flag",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome/120.0.0.0",
    severity: "info",
    category: "portfolio_management"
  },
  {
    id: 6,
    timestamp: "2025-01-15 14:12:23",
    actor: "Valyria Agent",
    action: "Owner Contact Initiated",
    resource: "1247 Atlantic Avenue",
    details: "Automated outreach email sent to property owner (maria.rodriguez@email.com)",
    ipAddress: "System",
    userAgent: "Janus AI/1.0",
    severity: "info",
    category: "outreach"
  },
  {
    id: 7,
    timestamp: "2025-01-15 14:08:55",
    actor: "Nexus Agent",
    action: "Data Sync Error",
    resource: "County Records API",
    details: "Failed to retrieve tax lien data for Brooklyn County (Error: Timeout)",
    ipAddress: "System",
    userAgent: "Janus AI/1.0",
    severity: "error",
    category: "data_ingestion"
  },
  {
    id: 8,
    timestamp: "2025-01-15 14:05:12",
    actor: "Osiris Agent",
    action: "Financial Analysis Updated",
    resource: "1455 Webster Avenue",
    details: "ARV revised from $475K to $510K based on new comparable sales",
    ipAddress: "System",
    userAgent: "Janus AI/1.0",
    severity: "info",
    category: "underwriting"
  },
  {
    id: 9,
    timestamp: "2025-01-15 13:58:33",
    actor: "Demo User",
    action: "Login Successful",
    resource: "Dashboard Access",
    details: "User authenticated successfully via email/password",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome/120.0.0.0",
    severity: "info",
    category: "authentication"
  },
  {
    id: 10,
    timestamp: "2025-01-15 13:55:47",
    actor: "Celestia Agent",
    action: "Financing Options Analyzed",
    resource: "91-15 Corona Avenue",
    details: "Identified 3 lenders with favorable DSCR terms (1.25x minimum)",
    ipAddress: "System",
    userAgent: "Janus AI/1.0",
    severity: "info",
    category: "financing"
  }
];

const AuditLog = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error": return "bg-destructive/10 text-destructive border-destructive/20";
      case "warning": return "bg-warning/10 text-warning border-warning/20";
      case "info": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error": return <AlertTriangle className="w-4 h-4" />;
      case "warning": return <AlertTriangle className="w-4 h-4" />;
      case "info": return <CheckCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "agent_activity": return <Zap className="w-4 h-4" />;
      case "data_ingestion": return <Database className="w-4 h-4" />;
      case "configuration": return <Settings className="w-4 h-4" />;
      case "legal_review": return <Shield className="w-4 h-4" />;
      case "authentication": return <User className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="font-display text-2xl text-foreground mb-2">Audit Log</h1>
                <p className="text-muted-foreground">
                  Complete system activity log including user actions and agent operations
                </p>
              </div>

              {/* Audit Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Events</p>
                        <p className="text-2xl font-semibold text-foreground">{auditLogs.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Warnings</p>
                        <p className="text-2xl font-semibold text-foreground">
                          {auditLogs.filter(log => log.severity === 'warning').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive/10 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Errors</p>
                        <p className="text-2xl font-semibold text-foreground">
                          {auditLogs.filter(log => log.severity === 'error').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ice/10 rounded-lg">
                        <Zap className="w-5 h-5 text-ice" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Agent Actions</p>
                        <p className="text-2xl font-semibold text-foreground">
                          {auditLogs.filter(log => log.actor.includes('Agent')).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card className="glass mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search audit logs..."
                        className="pl-10"
                      />
                    </div>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="agent_activity">Agent Activity</SelectItem>
                        <SelectItem value="data_ingestion">Data Ingestion</SelectItem>
                        <SelectItem value="configuration">Configuration</SelectItem>
                        <SelectItem value="legal_review">Legal Review</SelectItem>
                        <SelectItem value="authentication">Authentication</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severity</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Audit Log Entries */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    System Activity Log
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-0 pb-6">
                  <ScrollArea className="h-[700px] px-6">
                    <div className="space-y-4">
                      {auditLogs.map((log, index) => (
                        <div key={log.id} className="space-y-3">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 shrink-0">
                              <div className={`p-2 rounded-lg ${getSeverityColor(log.severity)}`}>
                                {getSeverityIcon(log.severity)}
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className="shrink-0">
                                    {getCategoryIcon(log.category)}
                                    <span className="ml-1">{log.category.replace('_', ' ')}</span>
                                  </Badge>
                                  <span className="text-sm font-medium text-foreground">
                                    {log.actor}
                                  </span>
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
                                {log.resource && (
                                  <p className="text-xs text-ice mt-1">
                                    Resource: {log.resource}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>IP: {log.ipAddress}</span>
                                  <span className="truncate max-w-48">UA: {log.userAgent}</span>
                                </div>
                                <Badge className={getSeverityColor(log.severity)}>
                                  {log.severity}
                                </Badge>
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
                  
                  <div className="px-6 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Showing {auditLogs.length} of {auditLogs.length} entries
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>
                          Previous
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
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