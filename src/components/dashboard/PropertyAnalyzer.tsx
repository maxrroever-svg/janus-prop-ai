import { useState } from "react";
import { Search, MapPin, TrendingUp, AlertTriangle, Calculator, Building, BarChart3, Home, DollarSign, Clock, Star, Zap, Target, Eye, FileText, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface PropertyAnalysis {
  address: string;
  estimatedValue: number;
  confidence: number;
  dealScore: number;
  financials: {
    purchasePrice: number;
    downPayment: number;
    monthlyRent: number;
    monthlyExpenses: number;
    cashFlow: number;
    capRate: number;
    roi: number;
    irr: number;
  };
  market: {
    avgRent: number;
    appreciation: number;
    pricePerSqft: number;
    daysOnMarket: number;
    neighborhood: string;
    walkScore: number;
  };
  risks: Array<{
    type: 'high' | 'medium' | 'low';
    title: string;
    description: string;
  }>;
  comparables: Array<{
    address: string;
    soldPrice: number;
    soldDate: string;
    distance: number;
    sqft: number;
    pricePerSqft: number;
  }>;
}

export function PropertyAnalyzer() {
  const [searchAddress, setSearchAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PropertyAnalysis | null>(null);
  const [activeScenario, setActiveScenario] = useState("base");

  const handleAnalyze = async () => {
    if (!searchAddress.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockAnalysis: PropertyAnalysis = {
        address: searchAddress,
        estimatedValue: 485000,
        confidence: 87,
        dealScore: 78,
        financials: {
          purchasePrice: 450000,
          downPayment: 90000,
          monthlyRent: 3200,
          monthlyExpenses: 1850,
          cashFlow: 1350,
          capRate: 6.8,
          roi: 18.2,
          irr: 15.4
        },
        market: {
          avgRent: 3050,
          appreciation: 4.2,
          pricePerSqft: 425,
          daysOnMarket: 23,
          neighborhood: "Williamsburg",
          walkScore: 89
        },
        risks: [
          {
            type: 'medium',
            title: 'Above Market Price/Sqft',
            description: 'Property is priced 8% above neighborhood average'
          },
          {
            type: 'low', 
            title: 'Older Building',
            description: '1985 construction may require higher maintenance'
          },
          {
            type: 'high',
            title: 'Declining Rental Demand',
            description: 'Recent 15% decrease in rental inquiries in area'
          }
        ],
        comparables: [
          {
            address: "156 Grand St",
            soldPrice: 465000,
            soldDate: "2024-11-15",
            distance: 0.3,
            sqft: 1150,
            pricePerSqft: 404
          },
          {
            address: "234 Berry St", 
            soldPrice: 492000,
            soldDate: "2024-10-28",
            distance: 0.5,
            sqft: 1200,
            pricePerSqft: 410
          },
          {
            address: "89 Meeker Ave",
            soldPrice: 438000,
            soldDate: "2024-12-02", 
            distance: 0.4,
            sqft: 1075,
            pricePerSqft: 407
          }
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2500);
  };

  const scenarios = [
    { id: "base", name: "Base Case", rentChange: 0, expenseChange: 0 },
    { id: "optimistic", name: "Optimistic", rentChange: 10, expenseChange: -5 },
    { id: "conservative", name: "Conservative", rentChange: -10, expenseChange: 10 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getRiskColor = (type: string) => {
    switch (type) {
      case 'high': return "border-destructive text-destructive bg-destructive/5";
      case 'medium': return "border-warning text-warning bg-warning/5";
      case 'low': return "border-success text-success bg-success/5";
      default: return "border-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Property Analysis & Underwriting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter property address (e.g., 123 Main St, Brooklyn NY)"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="flex-1"
            />
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !searchAddress.trim()}>
              {isAnalyzing ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze Property
                </>
              )}
            </Button>
          </div>
          
          {isAnalyzing && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Pulling property data from multiple sources...</span>
              </div>
              <Progress value={33} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calculator className="w-4 h-4 animate-pulse" />
                <span>Calculating financial metrics and scenarios...</span>
              </div>
              <Progress value={66} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="w-4 h-4 animate-pulse" />
                <span>Analyzing market comparables and risk factors...</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Property Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{analysis.address}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {analysis.market.neighborhood}
                    </span>
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      ${analysis.estimatedValue.toLocaleString()} est. value
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 fill-current text-primary" />
                    <span className={`text-2xl font-bold ${getScoreColor(analysis.dealScore)}`}>
                      {analysis.dealScore}
                    </span>
                    <span className="text-sm text-muted-foreground">Deal Score</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {analysis.confidence}% Confidence
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Monthly Cash Flow</p>
                  <p className="text-lg font-semibold text-success">+${analysis.financials.cashFlow}</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Cap Rate</p>
                  <p className="text-lg font-semibold">{analysis.financials.capRate}%</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-lg font-semibold text-success">{analysis.financials.roi}%</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">IRR</p>
                  <p className="text-lg font-semibold">{analysis.financials.irr}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="financials" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="market">Market Analysis</TabsTrigger>
              <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            </TabsList>

            <TabsContent value="financials" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calculator className="w-5 h-5" />
                      Investment Calculations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Purchase Price</span>
                        <span className="font-medium">${analysis.financials.purchasePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Down Payment (20%)</span>
                        <span className="font-medium">${analysis.financials.downPayment.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Rent</span>
                        <span className="font-medium text-success">+${analysis.financials.monthlyRent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Expenses</span>
                        <span className="font-medium text-destructive">-${analysis.financials.monthlyExpenses}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Net Cash Flow</span>
                        <span className="text-success">${analysis.financials.cashFlow}/month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BarChart3 className="w-5 h-5" />
                      Comparable Sales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.comparables.map((comp, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{comp.address}</p>
                            <p className="text-xs text-muted-foreground">
                              {comp.distance}mi • {comp.sqft} sqft • {comp.soldDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${comp.soldPrice.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">${comp.pricePerSqft}/sqft</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="market" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Neighborhood Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Avg. Rent</p>
                        <p className="text-lg font-semibold">${analysis.market.avgRent}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Appreciation</p>
                        <p className="text-lg font-semibold text-success">+{analysis.market.appreciation}%</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Price/Sqft</p>
                        <p className="text-lg font-semibold">${analysis.market.pricePerSqft}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Walk Score</p>
                        <p className="text-lg font-semibold">{analysis.market.walkScore}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Market Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-medium text-sm">Above Average Rent</p>
                          <p className="text-xs text-muted-foreground">5% higher than neighborhood average</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <div>
                          <p className="font-medium text-sm">High Walkability</p>
                          <p className="text-xs text-muted-foreground">Excellent public transport access</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <div>
                          <p className="font-medium text-sm">Market Cooling</p>
                          <p className="text-xs text-muted-foreground">23 days on market vs 18 day average</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="risks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.risks.map((risk, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${getRiskColor(risk.type)}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium mb-1">{risk.title}</h4>
                            <p className="text-sm text-muted-foreground">{risk.description}</p>
                          </div>
                          <Badge variant="outline" className={`${getRiskColor(risk.type)} border-0`}>
                            {risk.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {scenarios.map((scenario) => (
                        <Button
                          key={scenario.id}
                          variant={activeScenario === scenario.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveScenario(scenario.id)}
                        >
                          {scenario.name}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {scenarios.map((scenario) => {
                        const adjustedRent = analysis.financials.monthlyRent * (1 + scenario.rentChange / 100);
                        const adjustedExpenses = analysis.financials.monthlyExpenses * (1 + scenario.expenseChange / 100);
                        const adjustedCashFlow = adjustedRent - adjustedExpenses;
                        
                        return (
                          <div key={scenario.id} className={`p-4 rounded-lg border ${activeScenario === scenario.id ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <h4 className="font-medium mb-3">{scenario.name}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Rent:</span>
                                <span>${Math.round(adjustedRent)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Expenses:</span>
                                <span>${Math.round(adjustedExpenses)}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-medium">
                                <span>Cash Flow:</span>
                                <span className={adjustedCashFlow > 0 ? 'text-success' : 'text-destructive'}>
                                  ${Math.round(adjustedCashFlow)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Button className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate IC Memo
                </Button>
                <Button variant="outline" className="flex-1">
                  <Target className="w-4 h-4 mr-2" />
                  Save to Pipeline
                </Button>
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Schedule Showing
                </Button>
                <Button variant="ghost" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Zillow
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}