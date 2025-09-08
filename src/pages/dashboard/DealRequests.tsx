import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { 
  Search,
  Send,
  MapPin,
  DollarSign,
  Building,
  Clock,
  Users,
  Target,
  AlertCircle
} from "lucide-react";

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
  priority: "high" | "medium" | "low";
  status: "active" | "fulfilled" | "expired";
}

const mockRequests: DealRequest[] = [
  {
    id: "1",
    title: "Looking for Fix & Flip Opportunities",
    description: "Seeking distressed properties in Austin metro for fix and flip. Budget up to $200K purchase price, prefer SFH with good bones. Looking for properties that need cosmetic updates only.",
    budget: 200000,
    location: "Austin, TX Metro",
    propertyType: "Single Family",
    requestedBy: "Investment Group LLC",
    requestedAt: "3 hours ago",
    responses: 7,
    priority: "high",
    status: "active"
  },
  {
    id: "2", 
    title: "Multifamily Cash Flow Properties Wanted",
    description: "Looking for cash-flowing multifamily properties (5+ units) in secondary markets. Strong preference for value-add opportunities with potential for rent increases.",
    budget: 750000,
    location: "Southeast US",
    propertyType: "Multifamily",
    requestedBy: "Real Estate Fund",
    requestedAt: "1 day ago", 
    responses: 12,
    priority: "medium",
    status: "active"
  },
  {
    id: "3",
    title: "Industrial Warehouse Acquisition",
    description: "Seeking industrial warehouse properties near major logistics hubs. Must have truck-level loading and minimum 10,000 sq ft.",
    budget: 1500000,
    location: "Dallas-Fort Worth",
    propertyType: "Industrial",
    requestedBy: "Logistics Capital Partners",
    requestedAt: "2 days ago",
    responses: 3,
    priority: "low",
    status: "active"
  }
];

const DealRequests = () => {
  const [requestForm, setRequestForm] = useState({
    title: "",
    description: "", 
    budget: "",
    location: "",
    propertyType: "Single Family",
    priority: "medium"
  });

  const [activeTab, setActiveTab] = useState<"browse" | "create" | "my-requests">("browse");

  const handleCreateRequest = () => {
    console.log("Creating request:", requestForm);
    // Reset form after successful creation
    setRequestForm({
      title: "",
      description: "",
      budget: "",
      location: "",
      propertyType: "Single Family",
      priority: "medium"
    });
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "high": "bg-destructive/20 text-destructive border-destructive/30",
      "medium": "bg-warning/20 text-warning border-warning/30",
      "low": "bg-muted/20 text-muted-foreground border-muted/30"
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "active": "bg-success/20 text-success border-success/30",
      "fulfilled": "bg-primary/20 text-primary border-primary/30",
      "expired": "bg-muted/20 text-muted-foreground border-muted/30"
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Deal Requests" subtitle="Post what you're looking for - let the community find deals for you" />
        <main className="flex-1 overflow-y-auto p-6">
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 bg-muted/20 p-1 rounded-lg w-fit">
            {[
              { key: "browse", label: "Browse Requests", icon: Search },
              { key: "create", label: "Post Request", icon: Send },
              { key: "my-requests", label: "My Requests", icon: Target }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
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

          {/* Browse Requests */}
          {activeTab === "browse" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Active Deal Requests</h2>
                  <p className="text-muted-foreground">Help investors find what they're looking for</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    {mockRequests.length} Active Requests
                  </Badge>
                </div>
              </div>

              <div className="grid gap-6">
                {mockRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{request.title}</h4>
                            <Badge className={getPriorityColor(request.priority)}>{request.priority} priority</Badge>
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              Budget: ${request.budget.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {request.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {request.propertyType}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {request.requestedAt}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Send className="h-3 w-3" />
                            {request.responses} responses
                          </Badge>
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Respond with Deal
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{request.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Requested by {request.requestedBy}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Get Alerts for Similar Requests
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Create Request */}
          {activeTab === "create" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Post a Deal Request</h2>
                <p className="text-muted-foreground">Tell the community exactly what you're looking for</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                      <label className="text-sm font-medium">Priority Level</label>
                      <select 
                        className="w-full px-3 py-2 border border-input bg-background rounded-md"
                        value={requestForm.priority}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, priority: e.target.value }))}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Budget</label>
                      <Input
                        type="number"
                        placeholder="200000"
                        value={requestForm.budget}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, budget: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        placeholder="Austin, TX Metro"
                        value={requestForm.location}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
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
                      <option value="Industrial">Industrial</option>
                      <option value="Land">Land</option>
                      <option value="Mixed Use">Mixed Use</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Detailed Requirements</label>
                    <Textarea
                      placeholder="Describe what you're looking for in detail - location preferences, property condition, deal structure, timeline, etc."
                      rows={5}
                      value={requestForm.description}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <Button onClick={handleCreateRequest} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Post Deal Request
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Request Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Be specific about your criteria to get better quality responses</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Include your timeline and decision-making process</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Respond promptly to deal submissions to build relationships</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Update or close your request when fulfilled</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* My Requests */}
          {activeTab === "my-requests" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">My Deal Requests</h2>
                  <p className="text-muted-foreground">Manage your posted requests and responses</p>
                </div>
                <Button onClick={() => setActiveTab("create")}>
                  <Send className="h-4 w-4 mr-2" />
                  Post New Request
                </Button>
              </div>

              <div className="grid gap-4">
                {mockRequests.slice(0, 1).map((request) => (
                  <Card key={request.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{request.title}</h4>
                            <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              ${request.budget.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {request.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {request.requestedAt}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit Request
                          </Button>
                          <Button variant="outline" size="sm">
                            View Responses ({request.responses})
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </SidebarProvider>
  );
};

export default DealRequests;