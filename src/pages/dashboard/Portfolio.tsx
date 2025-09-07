import { DealMapContainer } from "@/components/dashboard/DealMapContainer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  Building, 
  Star, 
  Clock, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  MapPin,
  Calendar
} from "lucide-react";

const savedDeals = [
  {
    id: 1,
    address: "1247 Atlantic Avenue",
    city: "Brooklyn, NY",
    price: 485000,
    estimatedValue: 620000,
    score: 94,
    savedDate: "2025-01-15",
    status: "saved",
    type: "Townhouse"
  },
  {
    id: 2,
    address: "156 MacDonough Street", 
    city: "Brooklyn, NY",
    price: 390000,
    estimatedValue: 480000,
    score: 87,
    savedDate: "2025-01-14",
    status: "saved",
    type: "Multi-Family"
  }
];

const inProgressDeals = [
  {
    id: 3,
    address: "91-15 Corona Avenue",
    city: "Queens, NY", 
    price: 425000,
    estimatedValue: 510000,
    score: 91,
    startDate: "2025-01-12",
    status: "in_progress",
    type: "Single Family",
    stage: "Due Diligence"
  },
  {
    id: 4,
    address: "1455 Webster Avenue",
    city: "Bronx, NY",
    price: 320000,
    estimatedValue: 395000,
    score: 84,
    startDate: "2025-01-10",
    status: "in_progress", 
    type: "Duplex",
    stage: "Negotiation"
  }
];

const completedDeals = [
  {
    id: 5,
    address: "1567 Calle San Sebastián",
    city: "San Juan, PR",
    price: 180000,
    finalPrice: 165000,
    currentValue: 240000,
    score: 89,
    completedDate: "2024-12-28",
    status: "completed",
    type: "Condo",
    roi: "45.5%"
  }
];

const Portfolio = () => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-success/10 text-success border-success/20";
    if (score >= 80) return "bg-warning/10 text-warning border-warning/20";
    return "bg-muted text-muted-foreground";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "saved": return "bg-ice/10 text-ice border-ice/20";
      case "in_progress": return "bg-warning/10 text-warning border-warning/20";
      case "completed": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const DealCard = ({ deal, showStage = false, showROI = false }: any) => (
    <Card className="glass">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground mb-1 truncate">{deal.address}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-3 h-3" />
              <span>{deal.city}</span>
            </div>
          </div>
          <Badge className={getScoreColor(deal.score)}>
            {deal.score}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium">${deal.price.toLocaleString()}</span>
          </div>
          {deal.estimatedValue && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Est. Value</span>
              <span className="font-medium text-ice">${deal.estimatedValue.toLocaleString()}</span>
            </div>
          )}
          {deal.finalPrice && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Final Price</span>
              <span className="font-medium text-success">${deal.finalPrice.toLocaleString()}</span>
            </div>
          )}
          {showROI && deal.roi && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ROI</span>
              <span className="font-medium text-gold">{deal.roi}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">{deal.type}</Badge>
          {showStage && deal.stage && (
            <Badge className={getStatusColor(deal.status)}>{deal.stage}</Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar className="w-3 h-3" />
          <span>
            {deal.savedDate && `Saved ${deal.savedDate}`}
            {deal.startDate && `Started ${deal.startDate}`}
            {deal.completedDate && `Completed ${deal.completedDate}`}
          </span>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            View Details
          </Button>
          <Button size="sm" variant="ghost" className="flex-1 text-xs">
            {deal.status === "completed" ? "View Report" : "Update Status"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="font-display text-2xl text-foreground mb-2">Portfolio</h1>
                <p className="text-muted-foreground">
                  Manage your saved deals, active investments, and completed transactions
                </p>
              </div>

              {/* Portfolio Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ice/10 rounded-lg">
                        <Star className="w-5 h-5 text-ice" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Saved Deals</p>
                        <p className="text-2xl font-semibold text-foreground">{savedDeals.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="institutional-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <Clock className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                        <p className="text-2xl font-semibold text-foreground">{inProgressDeals.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="institutional-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-semibold text-foreground">{completedDeals.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="institutional-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/10 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="text-2xl font-semibold text-foreground">$1.2M</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="saved" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="saved">Saved Deals</TabsTrigger>
                  <TabsTrigger value="progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="saved" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground">Saved Deals</h2>
                    <Button size="sm" variant="outline">
                      Export List
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedDeals.map((deal) => (
                      <DealCard key={deal.id} deal={deal} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground">In Progress Deals</h2>
                    <Button size="sm" variant="outline">
                      Update Status
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inProgressDeals.map((deal) => (
                      <DealCard key={deal.id} deal={deal} showStage />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground">Completed Deals</h2>
                    <Button size="sm" variant="outline">
                      Performance Report
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completedDeals.map((deal) => (
                      <DealCard key={deal.id} deal={deal} showROI />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Portfolio;