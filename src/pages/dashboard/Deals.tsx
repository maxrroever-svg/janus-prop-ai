import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
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
  Brain,
  Globe,
  Users,
  Star,
  Calendar,
  Zap,
  LineChart,
  Award,
  Briefcase,
  Calculator,
  MapPin,
  Clock,
  Target,
  Eye,
  Heart,
  Send,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  X,
  RefreshCw,
  Bell,
  Bookmark
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
  },
  {
    id: "3",
    title: "Note Opportunity - 1st Lien Position",
    address: "Performing Note Portfolio",
    city: "Phoenix",
    state: "AZ",
    price: 75000,
    arv: 125000,
    capRate: 0,
    roi: 35.2,
    description: "Performing note secured by SFH valued at $165K. Borrower current, 8% interest rate, 15 years remaining. Great passive income opportunity.",
    uploadedBy: "David Kim", 
    uploadedAt: "1 day ago",
    status: "under-contract",
    images: ["/api/placeholder/400/300"],
    type: "single-family",
    dealType: "note",
    views: 34,
    saved: 8
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
  },
  {
    id: "2", 
    title: "Multifamily Cash Flow Properties Wanted",
    description: "Looking for cash-flowing multifamily properties (5+ units) in secondary markets. Strong preference for value-add opportunities.",
    budget: 750000,
    location: "Southeast US",
    propertyType: "Multifamily",
    requestedBy: "Real Estate Fund",
    requestedAt: "1 day ago", 
    responses: 12
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
  },
  {
    id: "2",
    title: "Best Lenders for BRRRR Deals in 2024?",
    content: "Looking for recommendations on lenders who are BRRRR-friendly in current market. Portfolio lenders preferred.",
    author: "FlipperPro",
    createdAt: "6 hours ago", 
    replies: 28,
    likes: 41,
    category: "Financing"
  },
  {
    id: "3",
    title: "Tax Lien Investing - Warning Signs to Watch",
    content: "Been doing tax lien investing for 5 years. Here are the red flags I've learned to avoid...",
    author: "TaxLienGuru",
    createdAt: "1 day ago",
    replies: 34,
    likes: 67,
    category: "Investment Strategy"
  }
];

const marketMetrics: MarketData[] = [
  { metric: "National Cap Rate", current: 6.2, previous: 6.5, change: -0.3, trend: "down" },
  { metric: "Interest Rates (30yr)", current: 7.1, previous: 6.8, change: 0.3, trend: "up" },
  { metric: "Home Price Index", current: 312, previous: 298, change: 14, trend: "up" },
  { metric: "Rental Yield", current: 5.8, previous: 5.9, change: -0.1, trend: "down" },
  { metric: "Days on Market", current: 28, previous: 32, change: -4, trend: "down" },
  { metric: "Inventory Months", current: 3.2, previous: 3.8, change: -0.6, trend: "down" }
];

const Deals = () => {
  const [mainView, setMainView] = useState<"marketplace" | "upload" | "requests" | "forums" | "intelligence">("marketplace");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
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
  const [requestForm, setRequestForm] = useState({
    title: "",
    description: "", 
    budget: "",
    location: "",
    propertyType: "Single Family"
  });

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "General Discussion"
  });

  const handleUploadDeal = () => {
    // Handle deal upload logic
    console.log("Uploading deal:", uploadForm);
  };

  const handleCreateRequest = () => {
    // Handle request creation logic  
    console.log("Creating request:", requestForm);
  };

  const handleCreatePost = () => {
    // Handle forum post creation
    console.log("Creating post:", newPost);
  };

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
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Janus Deal Feed" subtitle="Real estate alpha network - Find, share, and discuss deals" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Main Navigation */}
            <div className="flex flex-wrap gap-2 bg-muted/20 p-1 rounded-lg w-fit">
              {[
                { key: "marketplace", label: "Deal Marketplace", icon: Building },
                { key: "upload", label: "Upload Deal", icon: Upload },
                { key: "requests", label: "Deal Requests", icon: Search },
                { key: "forums", label: "Forums", icon: MessageSquare },
                { key: "intelligence", label: "Market Intelligence", icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setMainView(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                    mainView === tab.key 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            {mainView === "marketplace" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Deal Marketplace</h2>
                    <p className="text-muted-foreground">Browse and discover investment opportunities shared by the community</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {mockDeals.map((deal) => (
                    <Card key={deal.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedDeal(deal)}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">{deal.title}</CardTitle>
                              <Badge className={getStatusBadge(deal.status)}>{deal.status}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {deal.address}, {deal.city}, {deal.state}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {deal.uploadedAt}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {deal.uploadedBy}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              {deal.views}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              {deal.saved}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Purchase Price</p>
                            <p className="text-lg font-semibold">${deal.price.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">ARV</p>
                            <p className="text-lg font-semibold">${deal.arv.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Cap Rate</p>
                            <p className="text-lg font-semibold">{deal.capRate}%</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">ROI</p>
                            <p className="text-lg font-semibold text-success">{deal.roi}%</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{deal.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Badge variant="outline">{deal.type}</Badge>
                            <Badge variant="outline">{deal.dealType}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Bookmark className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {mainView === "upload" && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Upload Deal</h2>
                  <p className="text-muted-foreground">Share investment opportunities with the community</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Deal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Deal Title</label>
                        <Input
                          placeholder="e.g., BRRRR Opportunity - Distressed SFH"
                          value={uploadForm.title}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Property Type</label>
                        <select 
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          value={uploadForm.type}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value }))}
                        >
                          <option value="single-family">Single Family</option>
                          <option value="multi-family">Multi Family</option>
                          <option value="commercial">Commercial</option>
                          <option value="land">Land</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input
                          placeholder="1247 Oak Street"
                          value={uploadForm.address}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, address: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">City</label>
                        <Input
                          placeholder="Austin"
                          value={uploadForm.city}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">State</label>
                        <Input
                          placeholder="TX"
                          value={uploadForm.state}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, state: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Purchase Price</label>
                        <Input
                          type="number"
                          placeholder="185000"
                          value={uploadForm.price}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, price: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">ARV</label>
                        <Input
                          type="number"
                          placeholder="290000"
                          value={uploadForm.arv}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, arv: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Deal Type</label>
                        <select 
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          value={uploadForm.dealType}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, dealType: e.target.value }))}
                        >
                          <option value="wholesale">Wholesale</option>
                          <option value="fix-flip">Fix & Flip</option>
                          <option value="rental">Rental</option>
                          <option value="note">Note</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Detailed description of the investment opportunity..."
                        rows={4}
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Property Photos</label>
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Drop images here or click to browse</p>
                      </div>
                    </div>

                    <Button onClick={handleUploadDeal} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Deal
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {mainView === "requests" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Deal Requests</h2>
                    <p className="text-muted-foreground">Post what you're looking for - let the community find deals for you</p>
                  </div>
                  <Button onClick={() => setMainView("upload")}>
                    <Send className="h-4 w-4 mr-2" />
                    Post Request
                  </Button>
                </div>

                {/* Request Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Post a Deal Request</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Request Title</label>
                        <Input
                          placeholder="e.g., Looking for Fix & Flip Opportunities"
                          value={requestForm.title}
                          onChange={(e) => setRequestForm(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Budget</label>
                        <Input
                          type="number"
                          placeholder="200000"
                          value={requestForm.budget}
                          onChange={(e) => setRequestForm(prev => ({ ...prev, budget: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          placeholder="Austin, TX Metro"
                          value={requestForm.location}
                          onChange={(e) => setRequestForm(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Property Type</label>
                        <select 
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          value={requestForm.propertyType}
                          onChange={(e) => setRequestForm(prev => ({ ...prev, propertyType: e.target.value }))}
                        >
                          <option value="Single Family">Single Family</option>
                          <option value="Multifamily">Multifamily</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Land">Land</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Describe what you're looking for in detail..."
                        rows={3}
                        value={requestForm.description}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <Button onClick={handleCreateRequest}>
                      <Send className="h-4 w-4 mr-2" />
                      Post Request
                    </Button>
                  </CardContent>
                </Card>

                {/* Existing Requests */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Active Requests</h3>
                  {mockRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold">{request.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                Budget: ${request.budget.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {request.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {request.propertyType}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{request.responses} responses</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{request.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>by {request.requestedBy}</span>
                            <span>•</span>
                            <span>{request.requestedAt}</span>
                          </div>
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Respond
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {mainView === "forums" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Deal Forums</h2>
                    <p className="text-muted-foreground">Discuss strategies, share insights, and learn from the community</p>
                  </div>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>

                {/* New Post Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Start a Discussion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          placeholder="e.g., Austin Market Update - Cap Rates Trending Down"
                          value={newPost.title}
                          onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select 
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          value={newPost.category}
                          onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="General Discussion">General Discussion</option>
                          <option value="Market Analysis">Market Analysis</option>
                          <option value="Financing">Financing</option>
                          <option value="Investment Strategy">Investment Strategy</option>
                          <option value="Legal & Tax">Legal & Tax</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content</label>
                      <Textarea
                        placeholder="Share your thoughts, questions, or insights..."
                        rows={4}
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      />
                    </div>
                    <Button onClick={handleCreatePost}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Post Discussion
                    </Button>
                  </CardContent>
                </Card>

                {/* Forum Posts */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Discussions</h3>
                  {mockForumPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{post.title}</h4>
                              <Badge variant="outline" className="text-xs">{post.category}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>by {post.author}</span>
                              <span>•</span>
                              <span>{post.createdAt}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
                        <p className="text-sm text-muted-foreground">{post.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {mainView === "intelligence" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Market Intelligence</h2>
                  <p className="text-muted-foreground">Real-time market data and analytics powered by Janus AI</p>
                </div>

                {/* Key Market Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {marketMetrics.map((metric) => (
                    <Card key={metric.metric}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-muted-foreground">{metric.metric}</h3>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold">{metric.current}{metric.metric.includes('Rate') || metric.metric.includes('Yield') ? '%' : ''}</p>
                          <div className="flex items-center gap-1 text-sm">
                            <span className={metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}>
                              {metric.change > 0 ? '+' : ''}{metric.change}{metric.metric.includes('Rate') || metric.metric.includes('Yield') ? '%' : ''}
                            </span>
                            <span className="text-muted-foreground">vs prev</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Market Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Market Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-warning">Interest Rate Alert</h4>
                          <p className="text-sm text-muted-foreground">30-year mortgage rates have increased 0.3% in the past week. Consider locking in rates for pending acquisitions.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-success">Opportunity Alert</h4>
                          <p className="text-sm text-muted-foreground">Cap rates in Austin have compressed 0.2%. Good time to sell stabilized assets or refinance.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hot Markets */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Trending Markets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { city: "Austin, TX", growth: "+8.2%", reason: "Tech job growth", deals: 47 },
                        { city: "Tampa, FL", growth: "+6.8%", reason: "Population influx", deals: 31 },
                        { city: "Phoenix, AZ", growth: "+5.9%", reason: "Affordability play", deals: 28 }
                      ].map((market) => (
                        <div key={market.city} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <h4 className="font-semibold">{market.city}</h4>
                            <p className="text-sm text-muted-foreground">{market.reason}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-success">{market.growth}</p>
                            <p className="text-xs text-muted-foreground">{market.deals} active deals</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Deals;