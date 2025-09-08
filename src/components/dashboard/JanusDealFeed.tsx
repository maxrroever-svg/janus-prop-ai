import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload,
  Search,
  MessageSquare,
  TrendingUp,
  Building,
  DollarSign,
  AlertTriangle,
  BarChart3,
  MapPin,
  Clock,
  Eye,
  Heart,
  Send,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  RefreshCw,
  Bell,
  Bookmark,
  Users
} from "lucide-react";

interface Deal {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  price: number;
  arv: number;
  capRate: number;
  roi: number;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
  status: "active" | "under-contract" | "closed";
  images: string[];
  type: "single-family" | "multi-family" | "commercial" | "land";
  dealType: "wholesale" | "fix-flip" | "rental" | "note";
  views: number;
  saved: number;
}

interface DealRequest {
  id: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  propertyType: string;
  requestedBy: string;
  requestedAt: string;
  responses: number;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: number;
  likes: number;
  category: string;
}

interface MarketData {
  metric: string;
  current: number;
  previous: number;
  change: number;
  trend: "up" | "down" | "stable";
}

const mockDeals: Deal[] = [
  {
    id: "1",
    title: "BRRRR Opportunity - Distressed SFH",
    address: "1247 Oak Street",
    city: "Austin",
    state: "TX",
    price: 185000,
    arv: 290000,
    capRate: 8.2,
    roi: 22.5,
    description: "Excellent BRRRR opportunity in growing Austin neighborhood. Property needs cosmetic rehab estimated at $35K. Strong rental market with $2,800/month rent potential.",
    uploadedBy: "Marcus Chen",
    uploadedAt: "2 hours ago",
    status: "active",
    images: ["/api/placeholder/400/300"],
    type: "single-family",
    dealType: "fix-flip",
    views: 47,
    saved: 12
  },
  {
    id: "2", 
    title: "Cash Flow King - 4-Unit Multifamily",
    address: "892 Pine Avenue",
    city: "Tampa",
    state: "FL",
    price: 420000,
    arv: 480000,
    capRate: 9.1,
    roi: 18.7,
    description: "Fully occupied 4-unit building in desirable Tampa neighborhood. Current rents below market - immediate upside potential of $400/month total.",
    uploadedBy: "Sarah Rodriguez",
    uploadedAt: "5 hours ago", 
    status: "active",
    images: ["/api/placeholder/400/300"],
    type: "multi-family",
    dealType: "rental",
    views: 89,
    saved: 23
  }
];

const mockRequests: DealRequest[] = [
  {
    id: "1",
    title: "Looking for Fix & Flip Opportunities",
    description: "Seeking distressed properties in Austin metro for fix and flip. Budget up to $200K purchase price, prefer SFH with good bones.",
    budget: 200000,
    location: "Austin, TX Metro",
    propertyType: "Single Family",
    requestedBy: "Investment Group LLC",
    requestedAt: "3 hours ago",
    responses: 7
  }
];

const mockForumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Austin Market Update - Cap Rates Trending Down",
    content: "Seeing cap rates compress in Austin submarkets. Class B properties now trading at 5.5-6.5%. Thoughts on sustainability?",
    author: "MarketAnalyst",
    createdAt: "2 hours ago",
    replies: 15,
    likes: 23,
    category: "Market Analysis"
  }
];

const marketMetrics: MarketData[] = [
  { metric: "National Cap Rate", current: 6.2, previous: 6.5, change: -0.3, trend: "down" },
  { metric: "Interest Rates (30yr)", current: 7.1, previous: 6.8, change: 0.3, trend: "up" },
  { metric: "Home Price Index", current: 312, previous: 298, change: 14, trend: "up" }
];

export function JanusDealFeed() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [uploadForm, setUploadForm] = useState({
    title: "",
    address: "",
    city: "",
    state: "",
    price: "",
    arv: "",
    description: "",
    type: "single-family",
    dealType: "wholesale"
  });

  const getStatusBadge = (status: string) => {
    const colors = {
      "active": "bg-success/20 text-success border-success/30",
      "under-contract": "bg-warning/20 text-warning border-warning/30", 
      "closed": "bg-muted/20 text-muted-foreground border-muted/30"
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <ArrowUp className="h-3 w-3 text-success" />;
    if (trend === "down") return <ArrowDown className="h-3 w-3 text-destructive" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">Janus Deal Feed</h3>
          <p className="text-sm text-muted-foreground">Real estate alpha network - Find, share, and discuss deals</p>
        </div>
        <Badge className="bg-accent/20 text-accent border-accent/30">Bloomberg for Real Estate</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="marketplace" className="text-xs">
            <Building className="h-4 w-4 mr-1" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="upload" className="text-xs">
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="requests" className="text-xs">
            <Search className="h-4 w-4 mr-1" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="forums" className="text-xs">
            <MessageSquare className="h-4 w-4 mr-1" />
            Forums
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="text-xs">
            <BarChart3 className="h-4 w-4 mr-1" />
            Intelligence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Community Deals</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4">
            {mockDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold text-sm">{deal.title}</h5>
                        <Badge className={getStatusBadge(deal.status)}>{deal.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {deal.city}, {deal.state}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {deal.uploadedBy}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        {deal.views}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-3 w-3 mr-1" />
                        {deal.saved}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-semibold text-sm">${(deal.price/1000)}K</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">ARV</p>
                      <p className="font-semibold text-sm">${(deal.arv/1000)}K</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Cap Rate</p>
                      <p className="font-semibold text-sm">{deal.capRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">ROI</p>
                      <p className="font-semibold text-sm text-success">{deal.roi}%</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{deal.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">{deal.type}</Badge>
                      <Badge variant="outline" className="text-xs">{deal.dealType}</Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm">
                        <Send className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Share a Deal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deal Title</label>
                  <Input
                    placeholder="BRRRR Opportunity..."
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type</label>
                  <select 
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={uploadForm.type}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="single-family">Single Family</option>
                    <option value="multi-family">Multi Family</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="Address"
                  value={uploadForm.address}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, address: e.target.value }))}
                />
                <Input
                  placeholder="City"
                  value={uploadForm.city}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, city: e.target.value }))}
                />
                <Input
                  placeholder="State"
                  value={uploadForm.state}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, state: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Purchase Price"
                  value={uploadForm.price}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, price: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="ARV"
                  value={uploadForm.arv}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, arv: e.target.value }))}
                />
              </div>
              
              <Textarea
                placeholder="Deal description..."
                rows={3}
                value={uploadForm.description}
                onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
              />
              
              <Button className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Deal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <div className="grid gap-4">
            {mockRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-sm">{request.title}</h5>
                    <Badge variant="outline" className="text-xs">{request.responses} responses</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ${(request.budget/1000)}K
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {request.location}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{request.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">by {request.requestedBy}</span>
                    <Button size="sm">
                      <Send className="h-3 w-3 mr-1" />
                      Respond
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forums" className="space-y-4">
          <div className="grid gap-4">
            {mockForumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold text-sm">{post.title}</h5>
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>by {post.author}</span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.replies}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {marketMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <h6 className="text-xs font-medium text-muted-foreground">{metric.metric}</h6>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-bold">{metric.current}{metric.metric.includes('Rate') ? '%' : ''}</p>
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="h-4 w-4" />
                <h5 className="font-semibold text-sm">Market Alerts</h5>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                    <div>
                      <h6 className="font-semibold text-warning text-sm">Interest Rate Alert</h6>
                      <p className="text-xs text-muted-foreground">Rates increased 0.3% this week - lock in pending deals</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <h6 className="font-semibold text-success text-sm">Opportunity Alert</h6>
                      <p className="text-xs text-muted-foreground">Austin cap rates compressed - good time to refinance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}