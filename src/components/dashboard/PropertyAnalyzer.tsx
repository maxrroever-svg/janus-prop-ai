import { useEffect, useState } from "react";
import { Search, MapPin, TrendingUp, AlertTriangle, Calculator, Building, BarChart3, Home, DollarSign, Clock, Star, Zap, Target, Eye, FileText, CheckCircle, XCircle, ExternalLink, Settings, Info, Sliders, School, Shield, Users, Car, Wifi, Trees, Map, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PropertyAnalysis {
  address: string;
  estimatedValue: number;
  confidence: number;
  dealScore: number;
  dataSources: {
    zillow: { value: number; date: string; confidence: number };
    redfin: { value: number; date: string; confidence: number };
    houseCanary: { value: number; date: string; confidence: number };
    publicRecords: { assessedValue: number; lastSale: number; taxYear: string };
  };
  propertyDetails: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    lotSize: number;
    yearBuilt: number;
    propertyType: string;
    parking: string;
    hoa: number;
  };
  financials: {
    purchasePrice: number;
    downPayment: number;
    loanAmount: number;
    interestRate: number;
    monthlyPayment: number;
    monthlyRent: number;
    monthlyExpenses: number;
    cashFlow: number;
    capRate: number;
    roi: number;
    irr: number;
    cocROI: number;
    dscr: number;
  };
  assumptions: {
    vacancy: number;
    maintenance: number;
    capex: number;
    management: number;
    insurance: number;
    taxes: number;
  };
  market: {
    avgRent: number;
    rentGrowth: number;
    appreciation: number;
    pricePerSqft: number;
    daysOnMarket: number;
    neighborhood: string;
    walkScore: number;
    transitScore: number;
  };
  neighborhood: {
    crimeIndex: number;
    schoolRating: number;
    demographics: {
      medianIncome: number;
      populationGrowth: number;
      employment: number;
      avgAge: number;
    };
    amenities: {
      restaurants: number;
      shopping: number;
      parks: number;
      hospitals: number;
    };
  };
  risks: Array<{
    type: 'high' | 'medium' | 'low';
    category: 'financial' | 'market' | 'property' | 'neighborhood';
    title: string;
    description: string;
    impact: string;
  }>;
  opportunities: Array<{
    title: string;
    description: string;
    potential: string;
  }>;
  comparables: Array<{
    address: string;
    soldPrice: number;
    soldDate: string;
    distance: number;
    sqft: number;
    pricePerSqft: number;
    bedrooms: number;
    bathrooms: number;
    daysOnMarket: number;
  }>;
  recommendations: {
    decision: 'strong-buy' | 'buy' | 'hold' | 'pass';
    reasoning: string[];
    proscons: {
      pros: string[];
      cons: string[];
    };
  };
}

export function PropertyAnalyzer() {
  const [searchAddress, setSearchAddress] = useState("156 Grand St, Brooklyn NY");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assumptions, setAssumptions] = useState({
    downPayment: 20,
    interestRate: 7.5,
    vacancy: 5,
    maintenance: 8,
    capex: 5,
    management: 10,
    insurance: 0.5,
    taxes: 1.2
  });

  // Initialize with demo analysis data to prevent visual glitch
  const [analysis, setAnalysis] = useState<PropertyAnalysis>({
    address: "156 Grand St, Brooklyn NY",
    estimatedValue: 485000,
    confidence: 87,
    dealScore: 78,
    dataSources: {
      zillow: { value: 490000, date: "2024-01-15", confidence: 85 },
      redfin: { value: 480000, date: "2024-01-12", confidence: 88 },
      houseCanary: { value: 485000, date: "2024-01-18", confidence: 90 },
      publicRecords: { assessedValue: 425000, lastSale: 380000, taxYear: "2023" }
    },
    propertyDetails: {
      bedrooms: 2,
      bathrooms: 1.5,
      sqft: 750,
      lotSize: 2500,
      yearBuilt: 1925,
      propertyType: "Condo",
      parking: "Street",
      hoa: 150
    },
    financials: {
      purchasePrice: 485000,
      downPayment: 97000,
      loanAmount: 388000,
      interestRate: 7.5,
      monthlyPayment: 2710,
      monthlyRent: 3200,
      monthlyExpenses: 1245,
      cashFlow: 485,
      capRate: 6.1,
      roi: 18.5,
      irr: 15.2,
      cocROI: 6.0,
      dscr: 1.18
    },
    assumptions: {
      vacancy: 5,
      maintenance: 8,
      capex: 5,
      management: 10,
      insurance: 0.5,
      taxes: 1.2
    },
    market: {
      avgRent: 3100,
      rentGrowth: 4.2,
      appreciation: 5.8,
      pricePerSqft: 647,
      daysOnMarket: 42,
      neighborhood: "Nolita",
      walkScore: 98,
      transitScore: 85
    },
    neighborhood: {
      crimeIndex: 25,
      schoolRating: 8,
      demographics: {
        medianIncome: 95000,
        populationGrowth: 2.1,
        employment: 96.5,
        avgAge: 32
      },
      amenities: {
        restaurants: 85,
        shopping: 45,
        parks: 12,
        hospitals: 3
      }
    },
    risks: [
      { 
        type: "medium", 
        category: "market",
        title: "Market Correction Risk", 
        description: "Property values in Brooklyn have risen 23% in 2 years, showing potential for correction.",
        impact: "Could reduce property value by 5-10%"
      },
      { 
        type: "low", 
        category: "financial",
        title: "Interest Rate Risk", 
        description: "Current rates favorable but may rise affecting refinancing.",
        impact: "Minor impact on cash flow"
      },
      { 
        type: "medium", 
        category: "property",
        title: "Tenant Risk", 
        description: "High rental demand but tenant turnover costs average $3,200.",
        impact: "Potential vacancy costs"
      }
    ],
    opportunities: [
      {
        title: "Value-Add Renovation",
        description: "Unit renovation potential through modern fixtures and finishes",
        potential: "$15K investment, +$200/month rent"
      },
      {
        title: "Strong Rental Market",
        description: "High demand area with consistent occupancy rates",
        potential: "97% occupancy rates in area"
      },
      {
        title: "ADU Conversion",
        description: "Potential basement conversion to additional rental unit",
        potential: "+$1,200/month additional income"
      },
      {
        title: "Tax Benefits",
        description: "Depreciation and expense deductions available",
        potential: "$12K annual tax savings"
      }
    ],
    comparables: [
      { address: "142 Grand St", soldPrice: 475000, soldDate: "2024-01-10", distance: 0.1, sqft: 720, pricePerSqft: 659, bedrooms: 2, bathrooms: 1, daysOnMarket: 28 },
      { address: "168 Grand St", soldPrice: 510000, soldDate: "2024-01-05", distance: 0.2, sqft: 780, pricePerSqft: 654, bedrooms: 2, bathrooms: 1.5, daysOnMarket: 35 },
      { address: "134 Mott St", soldPrice: 465000, soldDate: "2023-12-28", distance: 0.3, sqft: 700, pricePerSqft: 664, bedrooms: 2, bathrooms: 1, daysOnMarket: 52 }
    ],
    recommendations: {
      decision: 'buy',
      reasoning: [
        "Property priced 5% below market median with strong fundamentals",
        "Positive cash flow from day one with conservative estimates",
        "Neighborhood showing consistent 8-12% annual appreciation",
        "Strong rental market with low vacancy rates"
      ],
      proscons: {
        pros: [
          "Below market price with immediate equity",
          "Strong rental demand and pricing power",
          "Value-add opportunities for increased returns",
          "Stable, gentrifying neighborhood"
        ],
        cons: [
          "Higher property taxes than surrounding areas",
          "Potential interest rate increases",
          "Limited parking affecting some tenant appeal",
          "Older building may require maintenance"
        ]
      }
    }
  });
  
  const [activeScenario, setActiveScenario] = useState("base");

  const handleAnalyze = async (addr?: string) => {
    const address = (addr ?? searchAddress).trim();
    if (!address) return;
    
    setIsAnalyzing(true);
    
    // Simulate comprehensive API calls to multiple data sources
    setTimeout(() => {
      const mockAnalysis: PropertyAnalysis = {
        address: address,
        estimatedValue: 485000,
        confidence: 87,
        dealScore: 78,
        dataSources: {
          zillow: { value: 482000, date: "2024-01-10", confidence: 85 },
          redfin: { value: 488000, date: "2024-01-08", confidence: 82 },
          houseCanary: { value: 485000, date: "2024-01-12", confidence: 91 },
          publicRecords: { assessedValue: 465000, lastSale: 420000, taxYear: "2023" }
        },
        propertyDetails: {
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1140,
          lotSize: 3000,
          yearBuilt: 1985,
          propertyType: "Single Family",
          parking: "2 Car Garage",
          hoa: 0
        },
        financials: {
          purchasePrice: 450000,
          downPayment: 90000,
          loanAmount: 360000,
          interestRate: 7.5,
          monthlyPayment: 2517,
          monthlyRent: 3200,
          monthlyExpenses: 1850,
          cashFlow: 1350,
          capRate: 6.8,
          roi: 18.2,
          irr: 15.4,
          cocROI: 24.1,
          dscr: 1.27
        },
        assumptions: {
          vacancy: 5,
          maintenance: 8,
          capex: 5,
          management: 10,
          insurance: 0.5,
          taxes: 1.2
        },
        market: {
          avgRent: 3050,
          rentGrowth: 3.8,
          appreciation: 4.2,
          pricePerSqft: 425,
          daysOnMarket: 23,
          neighborhood: "Williamsburg",
          walkScore: 89,
          transitScore: 92
        },
        neighborhood: {
          crimeIndex: 42, // Lower is better (out of 100)
          schoolRating: 8.2,
          demographics: {
            medianIncome: 85000,
            populationGrowth: 2.1,
            employment: 94.2,
            avgAge: 34
          },
          amenities: {
            restaurants: 127,
            shopping: 45,
            parks: 12,
            hospitals: 3
          }
        },
        risks: [
          {
            type: 'medium',
            category: 'market',
            title: 'Above Market Price/Sqft',
            description: 'Property is priced 8% above neighborhood average',
            impact: 'May limit appreciation potential'
          },
          {
            type: 'low', 
            category: 'property',
            title: 'Older Building (1985)',
            description: 'May require higher maintenance and capital expenditures',
            impact: 'Estimated +$150/month maintenance'
          },
          {
            type: 'high',
            category: 'market',
            title: 'Rental Market Softening',
            description: 'Recent 15% decrease in rental inquiries in area',
            impact: 'Potential vacancy increase to 8-10%'
          },
          {
            type: 'medium',
            category: 'financial',
            title: 'Interest Rate Sensitivity',
            description: 'Cash flow sensitive to rate changes',
            impact: '+1% rate = -$225/month cash flow'
          }
        ],
        opportunities: [
          {
            title: 'Basement Conversion Potential',
            description: 'Unfinished basement could add rental unit or increase value',
            potential: '+$800/month or +$75k value'
          },
          {
            title: 'Strong Transit Access',
            description: 'New subway line opening 2025 within 0.3 miles',
            potential: '+5-8% appreciation boost'
          },
          {
            title: 'Gentrification Trend',
            description: 'Area showing signs of upscale development',
            potential: 'Above-average rent growth potential'
          }
        ],
        comparables: [
          {
            address: "156 Grand St",
            soldPrice: 465000,
            soldDate: "2024-11-15",
            distance: 0.3,
            sqft: 1150,
            pricePerSqft: 404,
            bedrooms: 3,
            bathrooms: 2,
            daysOnMarket: 18
          },
          {
            address: "234 Berry St", 
            soldPrice: 492000,
            soldDate: "2024-10-28",
            distance: 0.5,
            sqft: 1200,
            pricePerSqft: 410,
            bedrooms: 3,
            bathrooms: 2.5,
            daysOnMarket: 25
          },
          {
            address: "89 Meeker Ave",
            soldPrice: 438000,
            soldDate: "2024-12-02", 
            distance: 0.4,
            sqft: 1075,
            pricePerSqft: 407,
            bedrooms: 2,
            bathrooms: 2,
            daysOnMarket: 31
          }
        ],
        recommendations: {
          decision: 'buy',
          reasoning: [
            'Positive cash flow with conservative assumptions',
            'Strong neighborhood fundamentals and transit access',
            'Below estimated market value by 7%',
            'Multiple value-add opportunities identified'
          ],
          proscons: {
            pros: [
              'Excellent walkability and transit scores',
              'Strong rental demand historically',
              'Value-add potential through basement conversion',
              'Growing neighborhood with good demographics'
            ],
            cons: [
              'Above average price per square foot',
              'Older construction requiring higher maintenance',
              'Recent softening in rental market',
              'Interest rate sensitivity on cash flow'
            ]
          }
        }
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const scenarios = [
    { id: "base", name: "Base Case", rentChange: 0, expenseChange: 0, rateChange: 0 },
    { id: "optimistic", name: "Optimistic", rentChange: 10, expenseChange: -5, rateChange: -0.5 },
    { id: "conservative", name: "Conservative", rentChange: -10, expenseChange: 15, rateChange: 1 },
    { id: "stress", name: "Stress Test", rentChange: -20, expenseChange: 25, rateChange: 2 }
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

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'strong-buy': return "bg-success text-success-foreground";
      case 'buy': return "bg-primary text-primary-foreground";
      case 'hold': return "bg-warning text-warning-foreground";
      case 'pass': return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const updateAssumption = (key: string, value: number[]) => {
    setAssumptions(prev => ({ ...prev, [key]: value[0] }));
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
            <Button onClick={() => handleAnalyze()} disabled={isAnalyzing || !searchAddress.trim()}>
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
                <span>Pulling data from Zillow, Redfin, HouseCanary, and public records...</span>
              </div>
              <Progress value={25} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="w-4 h-4 animate-pulse" />
                <span>Analyzing property details, taxes, and HOA information...</span>
              </div>
              <Progress value={50} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calculator className="w-4 h-4 animate-pulse" />
                <span>Calculating comprehensive financial metrics and scenarios...</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart3 className="w-4 h-4 animate-pulse" />
                <span>Analyzing comparables, neighborhood data, and generating risk assessment...</span>
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
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-semibold">{analysis.address}</h3>
                    <Badge className={getDecisionColor(analysis.recommendations.decision)}>
                      {analysis.recommendations.decision.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {analysis.market.neighborhood}
                    </span>
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      {analysis.propertyDetails.bedrooms} bed, {analysis.propertyDetails.bathrooms} bath
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {analysis.propertyDetails.sqft} sqft
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Built {analysis.propertyDetails.yearBuilt}
                    </span>
                  </div>
                  
                  {/* Data Sources */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-medium">Data Sources:</span>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        Zillow: ${analysis.dataSources.zillow.value.toLocaleString()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Redfin: ${analysis.dataSources.redfin.value.toLocaleString()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        HouseCanary: ${analysis.dataSources.houseCanary.value.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-6 h-6 fill-current text-primary" />
                    <span className={`text-3xl font-bold ${getScoreColor(analysis.dealScore)}`}>
                      {analysis.dealScore}
                    </span>
                    <span className="text-sm text-muted-foreground">Deal Score</span>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-lg font-semibold">${analysis.estimatedValue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Est. Market Value</p>
                    <Badge variant="outline" className="text-xs">
                      {analysis.confidence}% Confidence
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Monthly Cash Flow</p>
                  <p className="text-lg font-semibold text-success">+${analysis.financials.cashFlow}</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Cap Rate</p>
                  <p className="text-lg font-semibold">{analysis.financials.capRate}%</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">CoC ROI</p>
                  <p className="text-lg font-semibold text-success">{analysis.financials.cocROI}%</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">DSCR</p>
                  <p className="text-lg font-semibold">{analysis.financials.dscr}</p>
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
              <TabsTrigger value="market">Market Data</TabsTrigger>
              <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
              <TabsTrigger value="risks">Risks & Opps</TabsTrigger>
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
                        <span className="text-muted-foreground">Down Payment ({assumptions.downPayment}%)</span>
                        <span className="font-medium">${analysis.financials.downPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-medium">${analysis.financials.loanAmount.toLocaleString()}</span>
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
                              {comp.bedrooms}bd/{comp.bathrooms}ba • {comp.sqft} sqft
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

            <TabsContent value="assumptions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="w-5 h-5" />
                    Adjustable Assumptions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Down Payment: {assumptions.downPayment}%</Label>
                        <Slider
                          value={[assumptions.downPayment]}
                          onValueChange={(value) => updateAssumption('downPayment', value)}
                          max={50}
                          min={5}
                          step={5}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Interest Rate: {assumptions.interestRate}%</Label>
                        <Slider
                          value={[assumptions.interestRate]}
                          onValueChange={(value) => updateAssumption('interestRate', value)}
                          max={12}
                          min={4}
                          step={0.25}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Vacancy Rate: {assumptions.vacancy}%</Label>
                        <Slider
                          value={[assumptions.vacancy]}
                          onValueChange={(value) => updateAssumption('vacancy', value)}
                          max={20}
                          min={0}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Maintenance: {assumptions.maintenance}%</Label>
                        <Slider
                          value={[assumptions.maintenance]}
                          onValueChange={(value) => updateAssumption('maintenance', value)}
                          max={20}
                          min={2}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>CapEx Reserve: {assumptions.capex}%</Label>
                        <Slider
                          value={[assumptions.capex]}
                          onValueChange={(value) => updateAssumption('capex', value)}
                          max={15}
                          min={0}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Management: {assumptions.management}%</Label>
                        <Slider
                          value={[assumptions.management]}
                          onValueChange={(value) => updateAssumption('management', value)}
                          max={20}
                          min={0}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Insurance: {assumptions.insurance}%</Label>
                        <Slider
                          value={[assumptions.insurance]}
                          onValueChange={(value) => updateAssumption('insurance', value)}
                          max={2}
                          min={0.2}
                          step={0.1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Property Taxes: {assumptions.taxes}%</Label>
                        <Slider
                          value={[assumptions.taxes]}
                          onValueChange={(value) => updateAssumption('taxes', value)}
                          max={3}
                          min={0.5}
                          step={0.1}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Reset to Defaults
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="market" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Avg. Rent</p>
                        <p className="text-lg font-semibold">${analysis.market.avgRent}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Rent Growth</p>
                        <p className="text-lg font-semibold text-success">+{analysis.market.rentGrowth}%</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Price/Sqft</p>
                        <p className="text-lg font-semibold">${analysis.market.pricePerSqft}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Days on Market</p>
                        <p className="text-lg font-semibold">{analysis.market.daysOnMarket}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Walkability & Transit</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Walk Score</p>
                        <p className="text-lg font-semibold text-success">{analysis.market.walkScore}/100</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Transit Score</p>
                        <p className="text-lg font-semibold text-primary">{analysis.market.transitScore}/100</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="neighborhood" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Demographics & Safety
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Crime Index</p>
                        <p className={`text-lg font-semibold ${analysis.neighborhood.crimeIndex < 50 ? 'text-success' : 'text-warning'}`}>
                          {analysis.neighborhood.crimeIndex}/100
                        </p>
                        <p className="text-xs text-muted-foreground">Lower is safer</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">School Rating</p>
                        <p className="text-lg font-semibold text-primary">{analysis.neighborhood.schoolRating}/10</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Median Income</p>
                        <p className="text-lg font-semibold">${analysis.neighborhood.demographics.medianIncome.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Pop. Growth</p>
                        <p className="text-lg font-semibold text-success">+{analysis.neighborhood.demographics.populationGrowth}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="w-5 h-5" />
                      Local Amenities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Restaurants</span>
                      <span>{analysis.neighborhood.amenities.restaurants} within 1mi</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shopping Centers</span>
                      <span>{analysis.neighborhood.amenities.shopping}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Parks</span>
                      <span>{analysis.neighborhood.amenities.parks} nearby</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Hospitals</span>
                      <span>{analysis.neighborhood.amenities.hospitals} within 5mi</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="risks" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
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
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{risk.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {risk.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                              <p className="text-xs font-medium">{risk.impact}</p>
                            </div>
                            <Badge variant="outline" className={`${getRiskColor(risk.type)} border-0 ml-2`}>
                              {risk.type.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.opportunities.map((opportunity, index) => (
                        <div key={index} className="p-4 rounded-lg bg-success/5 border-l-4 border-success">
                          <h4 className="font-medium text-success mb-2">{opportunity.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                          <p className="text-xs font-medium text-success">{opportunity.potential}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendation Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    AI Recommendation Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className={getDecisionColor(analysis.recommendations.decision)}>
                        {analysis.recommendations.decision.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Based on comprehensive analysis</span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Key Reasoning:</h4>
                      <div className="space-y-1">
                        {analysis.recommendations.reasoning.map((reason, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-success mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-success mb-2">Pros</h4>
                        <div className="space-y-1">
                          {analysis.recommendations.proscons.pros.map((pro, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-success mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{pro}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-destructive mb-2">Cons</h4>
                        <div className="space-y-1">
                          {analysis.recommendations.proscons.cons.map((con, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <XCircle className="w-3 h-3 text-destructive mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{con}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Scenario Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-2 flex-wrap">
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
                    
                    <div className="grid grid-cols-4 gap-4">
                      {scenarios.map((scenario) => {
                        const adjustedRent = analysis.financials.monthlyRent * (1 + scenario.rentChange / 100);
                        const adjustedExpenses = analysis.financials.monthlyExpenses * (1 + scenario.expenseChange / 100);
                        const adjustedCashFlow = adjustedRent - adjustedExpenses;
                        const adjustedRate = analysis.financials.interestRate + (scenario.rateChange || 0);
                        
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
                              <div className="flex justify-between">
                                <span>Rate:</span>
                                <span>{adjustedRate.toFixed(2)}%</span>
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
                    
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2">Scenario Impact Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        The {scenarios.find(s => s.id === activeScenario)?.name} scenario shows how sensitive this deal is to market changes. 
                        Use these projections to understand downside risk and upside potential.
                      </p>
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