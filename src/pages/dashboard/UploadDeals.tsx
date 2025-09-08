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
  Upload,
  Building,
  MapPin,
  Clock,
  Users,
  Eye,
  Heart,
  Send,
  Bookmark,
  DollarSign
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
  type: "single-family" | "multi-family" | "commercial" | "land";
  dealType: "wholesale" | "fix-flip" | "rental" | "note";
  views: number;
  saved: number;
}

const recentDeals: Deal[] = [
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
    description: "Excellent BRRRR opportunity in growing Austin neighborhood. Property needs cosmetic rehab estimated at $35K.",
    uploadedBy: "You",
    uploadedAt: "2 hours ago",
    status: "active",
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
    description: "Fully occupied 4-unit building in desirable Tampa neighborhood. Current rents below market.",
    uploadedBy: "Marcus Chen",
    uploadedAt: "5 hours ago", 
    status: "active",
    type: "multi-family",
    dealType: "rental",
    views: 89,
    saved: 23
  }
];

const UploadDeals = () => {
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

  const handleUploadDeal = () => {
    console.log("Uploading deal:", uploadForm);
    // Reset form after successful upload
    setUploadForm({
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
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      "active": "bg-success/20 text-success border-success/30",
      "under-contract": "bg-warning/20 text-warning border-warning/30", 
      "closed": "bg-muted/20 text-muted-foreground border-muted/30"
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Upload Deals" subtitle="Share investment opportunities with the community" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Upload Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Share a Deal
                  </CardTitle>
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
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drop files here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleUploadDeal} className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Deal
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Uploads & Activity */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentDeals.map((deal) => (
                    <div key={deal.id} className="border border-border/30 rounded-lg p-4 hover:shadow-md transition-shadow">
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
                              <Clock className="h-3 w-3" />
                              {deal.uploadedAt}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {deal.views}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            {deal.saved}
                          </div>
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
                        <Button variant="outline" size="sm">
                          Edit Deal
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Include detailed property information and accurate financial projections</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Upload high-quality photos and relevant documents</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Respond promptly to inquiries from interested investors</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">Update deal status as circumstances change</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UploadDeals;