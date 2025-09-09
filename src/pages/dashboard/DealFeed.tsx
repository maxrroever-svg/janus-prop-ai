import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Search, 
  MessageSquare, 
  BarChart3,
  Plus,
  MapPin,
  DollarSign,
  Building,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Filter,
  SortAsc,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const DealFeed = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const mockDeals = [
    {
      id: 1,
      title: "Luxury Multifamily - Downtown Austin",
      location: "Austin, TX",
      price: "$2,850,000",
      capRate: "7.2%",
      type: "Multifamily",
      units: 24,
      postedBy: "John M.",
      postedDate: "2 hours ago",
      status: "Available",
      views: 127,
      interested: 8,
      description: "Prime downtown location with excellent cash flow potential."
    },
    {
      id: 2,
      title: "BRRRR Opportunity - Emerging Neighborhood",
      location: "Tampa, FL",
      price: "$185,000",
      capRate: "12.5%",
      type: "Single Family",
      units: 1,
      postedBy: "Sarah K.",
      postedDate: "4 hours ago",
      status: "Under Review",
      views: 89,
      interested: 15,
      description: "Perfect for BRRRR strategy with $50K renovation potential."
    },
    {
      id: 3,
      title: "Commercial Plaza - High Traffic",
      location: "Phoenix, AZ",
      price: "$4,200,000",
      capRate: "6.8%",
      type: "Commercial",
      units: 8,
      postedBy: "Michael R.",
      postedDate: "1 day ago",
      status: "Available",
      views: 234,
      interested: 12,
      description: "Established tenants with long-term leases in growing area."
    }
  ];

  const mockRequests = [
    {
      id: 1,
      title: "Looking for BRRRR Properties in Austin",
      budget: "$150K - $300K",
      location: "Austin, TX area",
      requester: "David L.",
      posted: "3 hours ago",
      responses: 7,
      status: "Active",
      criteria: "Single-family homes needing light renovation"
    },
    {
      id: 2,
      title: "Multifamily Investment Partner Needed",
      budget: "$1M - $5M",
      location: "Southeast Markets",
      requester: "Lisa M.",
      posted: "1 day ago",
      responses: 12,
      status: "Active",
      criteria: "50+ units, value-add opportunities"
    }
  ];

  const mockForumPosts = [
    {
      id: 1,
      title: "Austin Market Outlook - Q4 2024",
      author: "MarketExpert",
      posted: "2 hours ago",
      replies: 23,
      category: "Market Analysis",
      excerpt: "Seeing strong fundamentals in Austin with tech migration continuing..."
    },
    {
      id: 2,
      title: "BRRRR Strategy Success Story",
      author: "PropertyGuru",
      posted: "5 hours ago",
      replies: 41,
      category: "Success Stories",
      excerpt: "Just completed my 15th BRRRR deal. Here's what I learned..."
    }
  ];

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Deal Feed" subtitle="Community-driven deal marketplace and intelligence" />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Main Navigation Tabs */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 bg-muted/20 p-1 rounded-lg w-fit">
              {[
                { key: "marketplace", label: "Deal Marketplace", icon: Building },
                { key: "upload", label: "Upload Deal", icon: Upload },
                { key: "requests", label: "Deal Requests", icon: Search },
                { key: "forums", label: "Forums", icon: MessageSquare },
                { key: "analytics", label: "Market Analytics", icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === tab.key 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "marketplace" && (
              <div className="space-y-6">
                {/* Filters and Search */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Input 
                    placeholder="Search deals..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                  />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="multifamily">Multifamily</SelectItem>
                      <SelectItem value="single-family">Single Family</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <SortAsc className="h-4 w-4 mr-2" />
                    Sort by Date
                  </Button>
                </div>

                {/* Deal Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {mockDeals.map((deal) => (
                    <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{deal.title}</CardTitle>
                            <div className="flex items-center text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {deal.location}
                            </div>
                          </div>
                          <Badge variant={deal.status === "Available" ? "default" : "secondary"}>
                            {deal.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Price</div>
                            <div className="font-semibold">{deal.price}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Cap Rate</div>
                            <div className="font-semibold text-accent-green">{deal.capRate}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Type</div>
                            <div className="font-medium">{deal.type}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Units</div>
                            <div className="font-medium">{deal.units}</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{deal.description}</p>
                        
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div>By {deal.postedBy} • {deal.postedDate}</div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {deal.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {deal.interested}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1">View Details</Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "upload" && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Share a Deal Opportunity</CardTitle>
                  <p className="text-muted-foreground">
                    Share investment opportunities with the community
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Deal Title</label>
                      <Input placeholder="e.g., Prime Multifamily in Austin" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Property Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multifamily">Multifamily</SelectItem>
                          <SelectItem value="single-family">Single Family</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Price</label>
                      <Input placeholder="$2,500,000" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Cap Rate</label>
                      <Input placeholder="7.2%" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Units</label>
                      <Input placeholder="24" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="City, State" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      placeholder="Describe the investment opportunity, key highlights, and any unique features..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Documents & Photos</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop files here or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Support for images, PDFs, and spreadsheets
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1">Share Deal</Button>
                    <Button variant="outline">Save Draft</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "requests" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Deal Requests</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Request
                  </Button>
                </div>

                <div className="grid gap-4">
                  {mockRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold">{request.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Budget: {request.budget} • {request.location}
                            </p>
                          </div>
                          <Badge variant={request.status === "Active" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm mb-4">{request.criteria}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            By {request.requester} • {request.posted}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {request.responses} responses
                            </span>
                            <Button size="sm">Respond</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "forums" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Community Forums</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Topic
                  </Button>
                </div>

                <div className="grid gap-4">
                  {mockForumPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold hover:text-primary cursor-pointer">
                            {post.title}
                          </h4>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                        
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div>By {post.author} • {post.posted}</div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.replies} replies
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Market Analytics & Intelligence</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Deals Posted Today</p>
                          <p className="text-2xl font-bold">47</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-accent-green" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Requests</p>
                          <p className="text-2xl font-bold">23</p>
                        </div>
                        <Search className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Avg. Deal Size</p>
                          <p className="text-2xl font-bold">$1.2M</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Community Members</p>
                          <p className="text-2xl font-bold">1,247</p>
                        </div>
                        <Users className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hot Markets This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Austin, TX</span>
                          <Badge variant="default">+15 deals</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Tampa, FL</span>
                          <Badge variant="default">+12 deals</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Phoenix, AZ</span>
                          <Badge variant="default">+9 deals</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Bell className="h-4 w-4 mt-1 text-accent-green" />
                          <div className="text-sm">
                            <p>New multifamily deal in your target area</p>
                            <p className="text-muted-foreground">2 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-4 w-4 mt-1 text-yellow-500" />
                          <div className="text-sm">
                            <p>Price drop alert: Austin property</p>
                            <p className="text-muted-foreground">15 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 mt-1 text-blue-500" />
                          <div className="text-sm">
                            <p>Deal request matched successfully</p>
                            <p className="text-muted-foreground">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DealFeed;