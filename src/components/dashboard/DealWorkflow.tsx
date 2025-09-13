import { useState } from "react";
import { Upload, Search, BarChart3, Bot, Plus, FileText, HelpCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealMap } from "./DealMap";
import { ExplainPanel } from "./ExplainPanel";
import { AIDataSearch } from "./AIDataSearch";
import { PropertyAnalyzer } from "./PropertyAnalyzer";

export function DealWorkflow() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);

  // Sample deals data
  const deals = [
    {
      id: 1,
      address: "2847 Wilshire Blvd",
      city: "Los Angeles, CA",
      price: "$2,450,000",
      type: "Multifamily",
      janusScore: 87,
      capRate: "6.8%",
      status: "Deal Reviewed"
    },
    {
      id: 2,
      address: "1523 Ocean Park Blvd", 
      city: "Santa Monica, CA",
      price: "$3,750,000",
      type: "Mixed Use",
      janusScore: 72,
      capRate: "5.2%",
      status: "Under Analysis"
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload & Parse
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Property Analyzer
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Property Search
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Deal Analysis
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Data Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Document Upload & AI Processing
                  </div>
                  <Button variant="outline" size="sm">
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Drag & Drop Your Documents
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Upload PDFs, Excel files, or other deal documents
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Select Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyzer" className="space-y-6">
            <PropertyAnalyzer />
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Property Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search by address, city, or zip code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-2 h-[600px] gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Deal Map</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-full">
                  <DealMap onDealSelect={setSelectedDeal} />
                </CardContent>
              </Card>
              
              <Card className="dashboard-card">
                <CardContent className="p-0 h-full">
                  <ExplainPanel deal={selectedDeal} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Data Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AIDataSearch />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}