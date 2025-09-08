import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  TrendingDown,
  Upload,
  Users,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  DollarSign,
  Building,
  MapPin,
  Activity,
  Target,
  Zap
} from "lucide-react";

const DealAnalytics = () => {
  const platformStats = {
    totalDeals: 1247,
    dealsToday: 23,
    totalUsers: 8934,
    activeUsers: 342,
    totalViews: 156789,
    totalSaves: 23456,
    responseRate: 68,
    avgDealSize: 425000
  };

  const trendingMarkets = [
    { city: "Austin, TX", deals: 156, growth: 23, avgPrice: 380000 },
    { city: "Tampa, FL", deals: 134, growth: 18, avgPrice: 295000 },
    { city: "Phoenix, AZ", deals: 121, growth: 15, avgPrice: 340000 },
    { city: "Nashville, TN", deals: 98, growth: 12, avgPrice: 315000 },
    { city: "Charlotte, NC", deals: 87, growth: 9, avgPrice: 285000 }
  ];

  const dealTypes = [
    { type: "Fix & Flip", count: 423, percentage: 34, color: "bg-accent-blue/20 text-accent-blue" },
    { type: "Buy & Hold", count: 389, percentage: 31, color: "bg-accent-green/20 text-accent-green" },
    { type: "Wholesale", count: 287, percentage: 23, color: "bg-warning/20 text-warning" },
    { type: "Commercial", count: 98, percentage: 8, color: "bg-destructive/20 text-destructive" },
    { type: "Notes", count: 50, percentage: 4, color: "bg-muted/20 text-muted-foreground" }
  ];

  const recentActivity = [
    { time: "2 min ago", action: "New deal uploaded", user: "Sarah Chen", deal: "Austin Duplex - $285K" },
    { time: "5 min ago", action: "Deal request posted", user: "Investment LLC", deal: "Looking for SFH in Dallas" },
    { time: "8 min ago", action: "Forum post created", user: "MarketPro", deal: "Cap Rate Trends Discussion" },
    { time: "12 min ago", action: "Deal saved", user: "FlipperJoe", deal: "Tampa Fix & Flip" },
    { time: "15 min ago", action: "Request response", user: "DealFinder", deal: "Phoenix Wholesale Lead" }
  ];

  const topPerformers = [
    { name: "Marcus Rodriguez", deals: 34, views: 15678, saves: 892, type: "Deal Uploader" },
    { name: "Investment Group LLC", requests: 12, responses: 156, success: 89, type: "Deal Seeker" },
    { name: "PropertyGuru", posts: 67, likes: 1234, replies: 456, type: "Forum Contributor" }
  ];

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Deal Analytics" subtitle="Platform insights, deal flow, and community statistics" />
        <main className="flex-1 overflow-y-auto p-6">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Deals</p>
                    <p className="text-2xl font-bold">{platformStats.totalDeals.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-xs text-success">
                      <TrendingUp className="h-3 w-3" />
                      +{platformStats.dealsToday} today
                    </div>
                  </div>
                  <div className="p-3 bg-accent-blue/20 rounded-full">
                    <Building className="h-6 w-6 text-accent-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">{platformStats.activeUsers}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      of {platformStats.totalUsers.toLocaleString()} total
                    </div>
                  </div>
                  <div className="p-3 bg-accent-green/20 rounded-full">
                    <Users className="h-6 w-6 text-accent-green" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">{(platformStats.totalViews/1000).toFixed(0)}K</p>
                    <div className="flex items-center gap-1 text-xs text-success">
                      <Eye className="h-3 w-3" />
                      +2.3K today
                    </div>
                  </div>
                  <div className="p-3 bg-warning/20 rounded-full">
                    <Eye className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold">{platformStats.responseRate}%</p>
                    <div className="flex items-center gap-1 text-xs text-success">
                      <TrendingUp className="h-3 w-3" />
                      +5% this week
                    </div>
                  </div>
                  <div className="p-3 bg-success/20 rounded-full">
                    <Target className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* Trending Markets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Markets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingMarkets.map((market, index) => (
                  <div key={market.city} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{market.city}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{market.deals} deals</span>
                          <span>${(market.avgPrice/1000)}K avg</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-success">
                        <TrendingUp className="h-3 w-3" />
                        <span className="font-semibold">+{market.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Deal Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Deal Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dealTypes.map((dealType) => (
                  <div key={dealType.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{dealType.type}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={dealType.color}>{dealType.count}</Badge>
                        <span className="text-sm text-muted-foreground">{dealType.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={dealType.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Live Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                    <div className="p-2 bg-primary/20 rounded-full">
                      {activity.action.includes('uploaded') && <Upload className="h-4 w-4 text-primary" />}
                      {activity.action.includes('request') && <MessageSquare className="h-4 w-4 text-primary" />}
                      {activity.action.includes('post') && <MessageSquare className="h-4 w-4 text-primary" />}
                      {activity.action.includes('saved') && <Heart className="h-4 w-4 text-primary" />}
                      {activity.action.includes('response') && <Zap className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by <span className="font-medium">{activity.user}</span> • {activity.deal}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Leaders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-accent-green/20 rounded-full">
                        <span className="font-semibold text-accent-green">{performer.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{performer.name}</h4>
                        <Badge variant="outline" className="text-xs">{performer.type}</Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      {performer.type === "Deal Uploader" && (
                        <div className="space-y-1">
                          <p className="font-semibold">{performer.deals} deals</p>
                          <p className="text-muted-foreground">{(performer.views/1000).toFixed(1)}K views</p>
                        </div>
                      )}
                      {performer.type === "Deal Seeker" && (
                        <div className="space-y-1">
                          <p className="font-semibold">{performer.requests} requests</p>
                          <p className="text-muted-foreground">{performer.success}% success</p>
                        </div>
                      )}
                      {performer.type === "Forum Contributor" && (
                        <div className="space-y-1">
                          <p className="font-semibold">{performer.posts} posts</p>
                          <p className="text-muted-foreground">{(performer.likes/1000).toFixed(1)}K likes</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

        </main>
      </div>
    </SidebarProvider>
  );
};

export default DealAnalytics;