import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Activity, 
  Globe, 
  Building, 
  MapPin, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Wifi,
  WifiOff
} from "lucide-react";

const dataFeeds = [
  {
    name: "MLS Data Stream",
    status: "active",
    type: "real-time",
    lastUpdate: "2 minutes ago",
    records: "2.4M properties",
    icon: Building,
    coverage: "National"
  },
  {
    name: "Property Records",
    status: "active", 
    type: "batch",
    lastUpdate: "1 hour ago",
    records: "18.7M records",
    icon: Database,
    coverage: "50 States"
  },
  {
    name: "Market Analytics",
    status: "active",
    type: "real-time", 
    lastUpdate: "5 minutes ago",
    records: "847K transactions",
    icon: TrendingUp,
    coverage: "Major Markets"
  },
  {
    name: "Demographics Data",
    status: "syncing",
    type: "batch",
    lastUpdate: "3 hours ago", 
    records: "15.2M census blocks",
    icon: MapPin,
    coverage: "National"
  },
  {
    name: "Zoning & Permits",
    status: "active",
    type: "daily",
    lastUpdate: "12 hours ago",
    records: "3.1M permits",
    icon: Globe,
    coverage: "Metro Areas"
  },
  {
    name: "Crime Statistics",
    status: "maintenance",
    type: "weekly",
    lastUpdate: "2 days ago",
    records: "890K incidents",
    icon: AlertCircle,
    coverage: "Urban Areas"
  }
];

const analytics = [
  {
    metric: "Data Ingestion Rate",
    value: "847 GB/hour",
    change: "+12%",
    trend: "up"
  },
  {
    metric: "API Response Time", 
    value: "127ms avg",
    change: "-8%",
    trend: "down"
  },
  {
    metric: "Data Accuracy",
    value: "99.7%",
    change: "+0.1%", 
    trend: "up"
  },
  {
    metric: "Coverage Completeness",
    value: "94.2%",
    change: "+2.3%",
    trend: "up"
  }
];

export function DataLakeSection() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4 text-success" />;
      case "syncing": return <Clock className="w-4 h-4 text-warning animate-pulse" />;
      case "maintenance": return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <WifiOff className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "syncing": return "bg-warning/10 text-warning border-warning/20";
      case "maintenance": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-3 h-3 text-success" />
    ) : (
      <TrendingUp className="w-3 h-3 text-success rotate-180" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl text-foreground mb-2">Data Lake</h1>
        <p className="text-muted-foreground">
          Real estate data feeds, analytics, and infrastructure monitoring
        </p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {analytics.map((item, index) => (
          <Card key={index} className="institutional-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{item.metric}</p>
                {getTrendIcon(item.trend)}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-foreground">{item.value}</p>
                <span className={`text-xs ${item.trend === 'up' ? 'text-success' : 'text-success'}`}>
                  {item.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Feeds Status */}
      <Card className="institutional-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Data Feed Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {dataFeeds.map((feed, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border/30 rounded-lg bg-background/50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feed.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{feed.name}</h3>
                      {getStatusIcon(feed.status)}
                      <Badge className={getStatusBadge(feed.status)}>
                        {feed.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{feed.records}</span>
                      <span>•</span>
                      <span>{feed.coverage}</span>
                      <span>•</span>
                      <span>Last: {feed.lastUpdate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {feed.type}
                  </Badge>
                  <Button size="sm" variant="ghost">
                    <Activity className="w-4 h-4 mr-2" />
                    Monitor
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-success" />
              Processing Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Jobs</span>
                <span className="font-semibold text-foreground">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Queue Length</span>
                <span className="font-semibold text-foreground">1,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Processing Rate</span>
                <span className="font-semibold text-foreground">12.3K/min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Error Rate</span>
                <span className="font-semibold text-success">0.03%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-ice" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Uptime</span>
                <span className="font-semibold text-success">99.97%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database Health</span>
                <span className="font-semibold text-success">Optimal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cache Hit Rate</span>
                <span className="font-semibold text-foreground">94.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="font-semibold text-foreground">847 TB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="institutional-card">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Database className="w-4 h-4 mr-2" />
              Refresh All Feeds
            </Button>
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              View Logs
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics Dashboard
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}