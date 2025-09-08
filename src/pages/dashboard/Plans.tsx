import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  Building, 
  DollarSign,
  AlertTriangle,
  BarChart3,
  Brain,
  PieChart,
  Activity,
  BookOpen,
  Lightbulb,
  Shield,
  Globe,
  Users,
  Star,
  Calendar,
  Zap,
  LineChart,
  Award,
  Briefcase,
  Calculator
} from "lucide-react";

interface Playbook {
  id: string;
  name: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  riskProfile: "Low" | "Medium" | "High";
  objectives: {
    strategy: string;
    yield: string;
    dscr: string;
    timeline: string;
    holdPeriod: string;
    assetType: string;
    exitStrategy: string;
  };
  aiAdvantage: string;
  steps: {
    id: string;
    name: string;
    status: "completed" | "active" | "pending";
    assignedTo: "ai" | "human";
  }[];
  kpis: {
    label: string;
    current: number;
    target: number;
    status: "good" | "warning" | "danger";
  }[];
  riskGates: string[];
  scenarioModeling: {
    base: number;
    optimistic: number;
    pessimistic: number;
  };
}

const mockPlaybooks: Playbook[] = [
  {
    id: "brrrr",
    name: "BRRRR Strategy",
    description: "Buy, Rehab, Rent, Refinance, Repeat - Comprehensive value-add strategy with AI-powered sourcing and analysis",
    level: "Beginner",
    riskProfile: "Medium",
    objectives: {
      strategy: "Long-term wealth building through forced appreciation and cash flow",
      yield: "12-15% IRR",
      dscr: "1.25+",
      timeline: "6-12 months per cycle",
      holdPeriod: "2-5 years",
      assetType: "Single-family homes, small multifamily",
      exitStrategy: "Refinance and hold, or sell for equity"
    },
    aiAdvantage: "AI identifies undervalued properties, estimates rehab costs, and predicts rental yields with 95% accuracy",
    steps: [
      { id: "source", name: "AI Property Sourcing", status: "completed", assignedTo: "ai" },
      { id: "underwrite", name: "Automated Underwriting", status: "active", assignedTo: "ai" },
      { id: "outreach", name: "Seller Outreach Campaign", status: "pending", assignedTo: "ai" },
      { id: "loi", name: "Submit LOI", status: "pending", assignedTo: "human" },
      { id: "diligence", name: "Due Diligence", status: "pending", assignedTo: "human" },
      { id: "close", name: "Close Deal", status: "pending", assignedTo: "human" },
      { id: "rehab", name: "Rehab Management", status: "pending", assignedTo: "human" },
      { id: "lease", name: "Tenant Placement", status: "pending", assignedTo: "ai" },
      { id: "refinance", name: "Refinance Process", status: "pending", assignedTo: "ai" }
    ],
    kpis: [
      { label: "Properties Sourced", current: 47, target: 100, status: "good" },
      { label: "Under Contract", current: 2, target: 5, status: "warning" },
      { label: "Avg. Cap Rate", current: 7.2, target: 8.0, status: "warning" }
    ],
    riskGates: ["Market downturn", "Interest rate spike", "Construction delays"],
    scenarioModeling: { base: 14.2, optimistic: 18.7, pessimistic: 9.8 }
  },
  {
    id: "preforeclosure",
    name: "Pre-Foreclosure Acquisition",
    description: "AI-driven distressed property sourcing with automated outreach and rapid analysis for quick acquisition",
    level: "Intermediate",
    riskProfile: "High",
    objectives: {
      strategy: "Quick equity capture through distressed property acquisition",
      yield: "20-25% ROI",
      dscr: "N/A",
      timeline: "3-6 months",
      holdPeriod: "6 months - 2 years",
      assetType: "Distressed single-family, small multifamily",
      exitStrategy: "Quick sale or hold and rent"
    },
    aiAdvantage: "AI monitors foreclosure filings, predicts homeowner motivation, and automates compassionate outreach",
    steps: [
      { id: "source", name: "AI Distressed Sourcing", status: "completed", assignedTo: "ai" },
      { id: "underwrite", name: "Rapid Analysis", status: "completed", assignedTo: "ai" },
      { id: "outreach", name: "Automated Owner Contact", status: "active", assignedTo: "ai" },
      { id: "negotiate", name: "Price Negotiation", status: "pending", assignedTo: "human" },
      { id: "loi", name: "Fast LOI", status: "pending", assignedTo: "human" },
      { id: "diligence", name: "Expedited DD", status: "pending", assignedTo: "ai" },
      { id: "close", name: "Quick Close", status: "pending", assignedTo: "human" }
    ],
    kpis: [
      { label: "Distressed Leads", current: 23, target: 50, status: "warning" },
      { label: "Owner Response Rate", current: 15, target: 25, status: "danger" },
      { label: "Avg. Discount", current: 22, target: 30, status: "warning" }
    ],
    riskGates: ["Title issues", "Structural problems", "Market volatility"],
    scenarioModeling: { base: 22.5, optimistic: 35.2, pessimistic: 8.1 }
  },
  {
    id: "smallmulti",
    name: "Multifamily Value-Add",
    description: "Intelligent multifamily repositioning with AI-powered market analysis, tenant optimization, and value-add execution",
    level: "Intermediate",
    riskProfile: "Medium",
    objectives: {
      strategy: "Income enhancement through strategic property improvements",
      yield: "15-18% IRR",
      dscr: "1.35+",
      timeline: "12-18 months",
      holdPeriod: "3-7 years",
      assetType: "Small to mid-size multifamily (5-50 units)",
      exitStrategy: "Refinance and hold, or sale to institutional buyer"
    },
    aiAdvantage: "AI identifies value-add opportunities, optimizes unit mix, and predicts rent growth with neighborhood analysis",
    steps: [
      { id: "source", name: "AI Market Analysis", status: "active", assignedTo: "ai" },
      { id: "underwrite", name: "Value-Add Modeling", status: "pending", assignedTo: "ai" },
      { id: "outreach", name: "Broker Relations", status: "pending", assignedTo: "human" },
      { id: "loi", name: "Submit LOI", status: "pending", assignedTo: "human" },
      { id: "diligence", name: "Comprehensive DD", status: "pending", assignedTo: "human" },
      { id: "close", name: "Acquisition Close", status: "pending", assignedTo: "human" },
      { id: "improvements", name: "Value-Add Execution", status: "pending", assignedTo: "human" },
      { id: "lease", name: "Unit Optimization", status: "pending", assignedTo: "ai" }
    ],
    kpis: [
      { label: "Properties Analyzed", current: 12, target: 30, status: "warning" },
      { label: "Value-Add Upside", current: 35, target: 40, status: "good" },
      { label: "Avg. Unit Count", current: 18, target: 25, status: "good" }
    ],
    riskGates: ["Tenant turnover", "Rehab cost overruns", "Rent growth slowdown"],
    scenarioModeling: { base: 16.8, optimistic: 22.1, pessimistic: 11.2 }
  },
  {
    id: "distressed-debt",
    name: "Opportunistic Distressed Debt",
    description: "Acquire non-performing notes and tax liens with AI-powered risk assessment and restructuring strategies",
    level: "Expert",
    riskProfile: "High",
    objectives: {
      strategy: "High-yield returns through distressed debt acquisition and workout",
      yield: "25-40% IRR",
      dscr: "N/A",
      timeline: "12-24 months",
      holdPeriod: "1-3 years",
      assetType: "Non-performing notes, tax liens, distressed commercial",
      exitStrategy: "Note sale, foreclosure and flip, or debt restructuring"
    },
    aiAdvantage: "AI evaluates borrower creditworthiness, property values, and optimal workout strategies",
    steps: [
      { id: "source", name: "Note Marketplace Scanning", status: "pending", assignedTo: "ai" },
      { id: "underwrite", name: "Risk Assessment", status: "pending", assignedTo: "ai" },
      { id: "bid", name: "Competitive Bidding", status: "pending", assignedTo: "human" },
      { id: "acquire", name: "Note Acquisition", status: "pending", assignedTo: "human" },
      { id: "workout", name: "Borrower Outreach", status: "pending", assignedTo: "ai" },
      { id: "resolution", name: "Debt Resolution", status: "pending", assignedTo: "human" }
    ],
    kpis: [
      { label: "Notes Analyzed", current: 5, target: 20, status: "danger" },
      { label: "Acquisition Rate", current: 8, target: 15, status: "warning" },
      { label: "Avg. Discount", current: 45, target: 60, status: "warning" }
    ],
    riskGates: ["Legal complexities", "Borrower litigation", "Property condition"],
    scenarioModeling: { base: 32.1, optimistic: 48.7, pessimistic: 15.3 }
  },
  {
    id: "core-plus",
    name: "Core-Plus Multifamily",
    description: "Stable income-producing properties with light value-add opportunities for conservative growth",
    level: "Beginner",
    riskProfile: "Low",
    objectives: {
      strategy: "Stable cash flow with moderate appreciation through operational improvements",
      yield: "8-12% IRR",
      dscr: "1.50+",
      timeline: "6-12 months",
      holdPeriod: "5-10 years",
      assetType: "Stabilized multifamily (20+ units)",
      exitStrategy: "Long-term hold or sale to institutional investor"
    },
    aiAdvantage: "AI identifies operational inefficiencies and predicts long-term market stability",
    steps: [
      { id: "source", name: "Stabilized Property Search", status: "pending", assignedTo: "ai" },
      { id: "underwrite", name: "Cash Flow Analysis", status: "pending", assignedTo: "ai" },
      { id: "loi", name: "Letter of Intent", status: "pending", assignedTo: "human" },
      { id: "diligence", name: "Property Inspection", status: "pending", assignedTo: "human" },
      { id: "close", name: "Acquisition Close", status: "pending", assignedTo: "human" },
      { id: "optimize", name: "Operational Optimization", status: "pending", assignedTo: "ai" }
    ],
    kpis: [
      { label: "Properties Reviewed", current: 8, target: 25, status: "warning" },
      { label: "Occupancy Rate", current: 92, target: 95, status: "good" },
      { label: "NOI Growth", current: 3.2, target: 5.0, status: "warning" }
    ],
    riskGates: ["Market saturation", "Interest rate increases", "Regulatory changes"],
    scenarioModeling: { base: 10.2, optimistic: 13.8, pessimistic: 6.7 }
  },
  {
    id: "development",
    name: "Development Arbitrage",
    description: "Land acquisition and development partnerships in high-growth corridors with institutional JV opportunities",
    level: "Expert",
    riskProfile: "High",
    objectives: {
      strategy: "Value creation through development and strategic partnerships",
      yield: "20-30% IRR",
      dscr: "N/A",
      timeline: "18-36 months",
      holdPeriod: "2-5 years",
      assetType: "Development sites, entitled land",
      exitStrategy: "JV with developer, sell entitled land, or build and sell"
    },
    aiAdvantage: "AI analyzes zoning regulations, demographic trends, and development feasibility",
    steps: [
      { id: "source", name: "Site Identification", status: "pending", assignedTo: "ai" },
      { id: "zoning", name: "Zoning Analysis", status: "pending", assignedTo: "ai" },
      { id: "entitle", name: "Entitlement Process", status: "pending", assignedTo: "human" },
      { id: "partner", name: "Developer Partnership", status: "pending", assignedTo: "human" },
      { id: "finance", name: "Project Financing", status: "pending", assignedTo: "human" },
      { id: "execute", name: "Development Execution", status: "pending", assignedTo: "human" }
    ],
    kpis: [
      { label: "Sites Analyzed", current: 3, target: 10, status: "danger" },
      { label: "Entitlement Success", current: 60, target: 80, status: "warning" },
      { label: "Partner Interest", current: 2, target: 5, status: "warning" }
    ],
    riskGates: ["Regulatory approval", "Construction costs", "Market timing"],
    scenarioModeling: { base: 24.7, optimistic: 38.2, pessimistic: 8.9 }
  }
];

const Plans = () => {
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "kpis">("overview");
  const [mainView, setMainView] = useState<"dashboard" | "playbooks" | "analytics" | "education">("dashboard");
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 2850000,
    totalROI: 18.4,
    activeDeals: 12,
    completedDeals: 34,
    avgHoldPeriod: "2.8 years",
    bestPerformer: "BRRRR Strategy",
    riskAdjustedReturn: 15.2
  });

  const [marketData, setMarketData] = useState({
    trends: [
      { metric: "Cap Rates", current: 6.8, trend: "down", change: -0.3 },
      { metric: "Interest Rates", current: 7.2, trend: "up", change: 0.5 },
      { metric: "Property Values", current: 100, trend: "up", change: 8.2 },
      { metric: "Rental Yields", current: 5.4, trend: "stable", change: 0.1 }
    ],
    opportunities: [
      { market: "Austin, TX", reason: "Emerging tech corridor", score: 92 },
      { market: "Tampa, FL", reason: "Strong rental demand", score: 88 },
      { market: "Phoenix, AZ", reason: "Population growth", score: 85 }
    ]
  });

  const [recentActivity, setRecentActivity] = useState([
    { date: "2 hours ago", action: "AI found 3 new BRRRR opportunities in Austin", type: "opportunity" },
    { date: "4 hours ago", action: "Completed underwriting for 1247 Oak Street", type: "completed" },
    { date: "6 hours ago", action: "Market alert: Cap rates dropped 0.1% in target area", type: "alert" },
    { date: "1 day ago", action: "Successfully closed on multifamily property", type: "success" },
    { date: "2 days ago", action: "Refinanced BRRRR property - unlocked $85K equity", type: "success" }
  ]);

  const [aiRecommendations, setAiRecommendations] = useState([
    {
      title: "Diversify into Multifamily",
      description: "Based on your success with BRRRR, consider adding small multifamily properties to your portfolio for better risk distribution.",
      impact: "Potentially increase IRR by 2-3%",
      confidence: 87
    },
    {
      title: "Geographic Expansion",
      description: "Your current market concentration is high. Consider expanding to secondary markets with strong fundamentals.",
      impact: "Reduce portfolio risk by 15%",
      confidence: 92
    },
    {
      title: "Interest Rate Hedge",
      description: "With rising rates, consider locking in fixed-rate financing on your variable-rate properties.",
      impact: "Save estimated $180K over 5 years",
      confidence: 78
    }
  ]);

  const educationResources = [
    {
      title: "Advanced BRRRR Strategies",
      type: "Course",
      duration: "4 hours",
      level: "Intermediate",
      description: "Master advanced techniques for scaling your BRRRR portfolio",
      completed: false
    },
    {
      title: "Multifamily Underwriting",
      type: "Workshop",
      duration: "2 hours",
      level: "Advanced",
      description: "Learn to analyze and underwrite multifamily properties like a pro",
      completed: true
    },
    {
      title: "Tax Optimization for REI",
      type: "Webinar",
      duration: "1 hour",
      level: "Beginner",
      description: "Maximize your returns through strategic tax planning",
      completed: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/20 text-success border-success/30";
      case "active": return "bg-accent/20 text-accent border-accent/30";
      case "pending": return "bg-muted/20 text-muted-foreground border-muted/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getKPIColor = (status: string) => {
    switch (status) {
      case "good": return "text-success";
      case "warning": return "text-warning";
      case "danger": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const assignTaskToAI = (playbookId: string, stepId: string) => {
    // Task assignment logic would go here
  };

  const runPlan = (playbookId: string) => {
    // Plan execution logic would go here
  };

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Investment Plans" subtitle="Automated investment strategies and playbooks" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Main Navigation */}
            <div className="flex flex-wrap gap-2 bg-muted/20 p-1 rounded-lg w-fit">
              {[
                { key: "dashboard", label: "Portfolio Dashboard", icon: BarChart3 },
                { key: "playbooks", label: "Investment Playbooks", icon: Building },
                { key: "analytics", label: "Performance Analytics", icon: LineChart },
                { key: "education", label: "Education & Resources", icon: BookOpen }
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

            {/* Dashboard View */}
            {mainView === "dashboard" && (
              <div className="space-y-6">
                {/* Portfolio Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Portfolio Value</p>
                          <p className="text-xl font-bold text-foreground">${(portfolioData.totalValue / 1000000).toFixed(2)}M</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-success/10 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total ROI</p>
                          <p className="text-xl font-bold text-foreground">{portfolioData.totalROI}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Building className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Deals</p>
                          <p className="text-xl font-bold text-foreground">{portfolioData.activeDeals}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-warning/10 rounded-lg">
                          <Award className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Success Rate</p>
                          <p className="text-xl font-bold text-foreground">94%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Recommendations & Market Data */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-accent" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {aiRecommendations.map((rec, index) => (
                        <div key={index} className="p-4 border border-border/30 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-foreground">{rec.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {rec.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                          <p className="text-sm text-success font-medium">{rec.impact}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        Market Intelligence
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Market Trends</h4>
                        <div className="space-y-2">
                          {marketData.trends.map((trend, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{trend.metric}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">{trend.current}%</span>
                                <div className={`flex items-center gap-1 ${
                                  trend.trend === "up" ? "text-success" : 
                                  trend.trend === "down" ? "text-destructive" : "text-muted-foreground"
                                }`}>
                                  <TrendingUp className={`h-3 w-3 ${
                                    trend.trend === "down" ? "rotate-180" : 
                                    trend.trend === "stable" ? "rotate-90" : ""
                                  }`} />
                                  <span className="text-xs">{trend.change > 0 ? "+" : ""}{trend.change}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Top Opportunities</h4>
                        <div className="space-y-2">
                          {marketData.opportunities.map((opp, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                              <div>
                                <span className="text-sm font-medium text-foreground">{opp.market}</span>
                                <p className="text-xs text-muted-foreground">{opp.reason}</p>
                              </div>
                              <Badge className="bg-success/10 text-success border-success/30">
                                {opp.score}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="glass">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-accent" />
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                              <div className={`p-1 rounded-full ${
                                activity.type === "success" ? "bg-success/20" :
                                activity.type === "alert" ? "bg-warning/20" :
                                activity.type === "opportunity" ? "bg-primary/20" :
                                "bg-accent/20"
                              }`}>
                                {activity.type === "success" && <CheckCircle className="h-3 w-3 text-success" />}
                                {activity.type === "alert" && <AlertTriangle className="h-3 w-3 text-warning" />}
                                {activity.type === "opportunity" && <Target className="h-3 w-3 text-primary" />}
                                {activity.type === "completed" && <Clock className="h-3 w-3 text-accent" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-foreground">{activity.action}</p>
                                <p className="text-xs text-muted-foreground">{activity.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Calculator className="h-4 w-4 mr-2" />
                        Deal Calculator
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Target className="h-4 w-4 mr-2" />
                        Find Properties
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <PieChart className="h-4 w-4 mr-2" />
                        Portfolio Analysis
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Risk Assessment
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Investment Playbooks View */}
            {mainView === "playbooks" && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-display text-foreground mb-2">Investment Playbooks</h2>
                  <p className="text-muted-foreground">
                    Choose a playbook and let Janus AI execute your investment strategy
                  </p>
                </div>

                {!selectedPlaybook ? (
                  /* Playbook Selection */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPlaybooks
                      .sort((a, b) => {
                        const levelOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "Expert": 4 };
                        return levelOrder[a.level] - levelOrder[b.level];
                      })
                      .map((playbook) => {
                        const completedSteps = playbook.steps.filter(step => step.status === "completed").length;
                        const progressPercent = (completedSteps / playbook.steps.length) * 100;
                        
                        const getLevelColor = (level: string) => {
                          switch (level) {
                            case "Beginner": return "bg-success/20 text-success border-success/30";
                            case "Intermediate": return "bg-warning/20 text-warning border-warning/30";
                            case "Advanced": return "bg-accent/20 text-accent border-accent/30";
                            case "Expert": return "bg-destructive/20 text-destructive border-destructive/30";
                            default: return "bg-muted/20 text-muted-foreground border-muted/30";
                          }
                        };

                        const getRiskColor = (risk: string) => {
                          switch (risk) {
                            case "Low": return "text-success";
                            case "Medium": return "text-warning";
                            case "High": return "text-destructive";
                            default: return "text-muted-foreground";
                          }
                        };

                        return (
                          <Card 
                            key={playbook.id}
                            className="glass p-6 cursor-pointer transition-all duration-300 group"
                            onClick={() => setSelectedPlaybook(playbook)}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-medium text-foreground">{playbook.name}</h3>
                                  <Badge className={getLevelColor(playbook.level)}>{playbook.level}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{playbook.description}</p>
                                <div className="flex items-center gap-4 text-xs">
                                  <span className="text-muted-foreground">Risk: 
                                    <span className={`ml-1 font-medium ${getRiskColor(playbook.riskProfile)}`}>
                                      {playbook.riskProfile}
                                    </span>
                                  </span>
                                  <span className="text-muted-foreground">Hold: 
                                    <span className="ml-1 text-foreground font-medium">{playbook.objectives.holdPeriod}</span>
                                  </span>
                                </div>
                              </div>
                              <Building className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                            </div>

                            <div className="space-y-3 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Target Yield:</span>
                                <span className="text-foreground font-medium">{playbook.objectives.yield}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Asset Type:</span>
                                <span className="text-foreground font-medium text-right">{playbook.objectives.assetType}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Exit Strategy:</span>
                                <span className="text-foreground font-medium text-right">{playbook.objectives.exitStrategy}</span>
                              </div>
                            </div>

                            <div className="mb-4 p-3 bg-secondary/30 rounded-lg border border-border/30">
                              <p className="text-xs text-muted-foreground mb-1">AI Advantage:</p>
                              <p className="text-sm text-foreground">{playbook.aiAdvantage}</p>
                            </div>

                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Execution Progress</span>
                                <span className="text-muted-foreground">{completedSteps}/{playbook.steps.length}</span>
                              </div>
                              <Progress value={progressPercent} className="h-2" />
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                              <div className="text-center">
                                <div className="text-success font-medium">{playbook.scenarioModeling.optimistic}%</div>
                                <div className="text-muted-foreground">Optimistic</div>
                              </div>
                              <div className="text-center">
                                <div className="text-foreground font-medium">{playbook.scenarioModeling.base}%</div>
                                <div className="text-muted-foreground">Base Case</div>
                              </div>
                              <div className="text-center">
                                <div className="text-destructive font-medium">{playbook.scenarioModeling.pessimistic}%</div>
                                <div className="text-muted-foreground">Pessimistic</div>
                              </div>
                            </div>

                            <Button 
                              className="w-full btn-professional group-hover:shadow-cosmic transition-all duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                runPlan(playbook.id);
                              }}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Execute Strategy
                            </Button>
                          </Card>
                        );
                      })}
                  </div>
                ) : (
                  /* Selected Playbook Detail - KEEP ALL EXISTING FUNCTIONALITY */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-display text-foreground">{selectedPlaybook.name}</h2>
                        <p className="text-muted-foreground">{selectedPlaybook.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={() => setSelectedPlaybook(null)}>
                          Back to Plans
                        </Button>
                        <Button onClick={() => runPlan(selectedPlaybook.id)}>
                          <Play className="h-4 w-4 mr-2" />
                          Run Plan
                        </Button>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-1 bg-muted/20 p-1 rounded-lg w-fit">
                      {["overview", "tasks", "kpis"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab as any)}
                          className={`px-4 py-2 text-sm rounded-lg transition-colors capitalize ${
                            activeTab === tab 
                              ? "bg-primary text-primary-foreground" 
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {activeTab === "overview" && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Investment Thesis */}
                        <Card className="glass p-6">
                          <h3 className="font-medium text-foreground mb-4 flex items-center">
                            <Target className="h-4 w-4 mr-2 text-primary" />
                            Investment Thesis
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <span className="text-sm text-muted-foreground">Strategy:</span>
                              <p className="text-foreground font-medium">{selectedPlaybook.objectives.strategy}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm text-muted-foreground">Target Yield:</span>
                                <p className="text-foreground font-medium">{selectedPlaybook.objectives.yield}</p>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Hold Period:</span>
                                <p className="text-foreground font-medium">{selectedPlaybook.objectives.holdPeriod}</p>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Asset Type:</span>
                              <p className="text-foreground font-medium">{selectedPlaybook.objectives.assetType}</p>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">Exit Strategy:</span>
                              <p className="text-foreground font-medium">{selectedPlaybook.objectives.exitStrategy}</p>
                            </div>
                            {selectedPlaybook.objectives.dscr !== "N/A" && (
                              <div>
                                <span className="text-sm text-muted-foreground">Min DSCR:</span>
                                <p className="text-foreground font-medium">{selectedPlaybook.objectives.dscr}</p>
                              </div>
                            )}
                          </div>
                        </Card>

                        {/* AI Advantage & Risk Profile */}
                        <Card className="dashboard-card p-6">
                          <h3 className="font-medium text-foreground mb-4 flex items-center">
                            <Brain className="h-4 w-4 mr-2 text-accent" />
                            AI Advantage & Risk
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <span className="text-sm text-muted-foreground">AI Enhancement:</span>
                              <p className="text-foreground">{selectedPlaybook.aiAdvantage}</p>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                              <span className="text-sm text-muted-foreground">Risk Profile:</span>
                              <Badge className={
                                selectedPlaybook.riskProfile === "Low" ? "bg-success/20 text-success border-success/30" :
                                selectedPlaybook.riskProfile === "Medium" ? "bg-warning/20 text-warning border-warning/30" :
                                "bg-destructive/20 text-destructive border-destructive/30"
                              }>
                                {selectedPlaybook.riskProfile} Risk
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                              <span className="text-sm text-muted-foreground">Complexity Level:</span>
                              <Badge className={
                                selectedPlaybook.level === "Beginner" ? "bg-success/20 text-success border-success/30" :
                                selectedPlaybook.level === "Intermediate" ? "bg-warning/20 text-warning border-warning/30" :
                                selectedPlaybook.level === "Advanced" ? "bg-accent/20 text-accent border-accent/30" :
                                "bg-destructive/20 text-destructive border-destructive/30"
                              }>
                                {selectedPlaybook.level}
                              </Badge>
                            </div>
                          </div>
                        </Card>

                        {/* Progress Ring */}
                        <Card className="dashboard-card p-6">
                          <h3 className="font-medium text-foreground mb-4 flex items-center">
                            <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                            Progress
                          </h3>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-foreground mb-2">
                              {Math.round((selectedPlaybook.steps.filter(s => s.status === "completed").length / selectedPlaybook.steps.length) * 100)}%
                            </div>
                            <Progress 
                              value={(selectedPlaybook.steps.filter(s => s.status === "completed").length / selectedPlaybook.steps.length) * 100} 
                              className="mb-2"
                            />
                            <p className="text-sm text-muted-foreground">
                              {selectedPlaybook.steps.filter(s => s.status === "completed").length} of {selectedPlaybook.steps.length} steps completed
                            </p>
                          </div>
                        </Card>

                        {/* Risk Gates */}
                        <Card className="dashboard-card p-6">
                          <h3 className="font-medium text-foreground mb-4 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                            Risk Gates
                          </h3>
                          <div className="space-y-2">
                            {selectedPlaybook.riskGates.map((risk, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-warning rounded-full"></div>
                                <span className="text-sm text-muted-foreground">{risk}</span>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>
                    )}

                    {activeTab === "tasks" && (
                      <Card className="dashboard-card p-6">
                        <h3 className="font-medium text-foreground mb-6">Execution Tasks</h3>
                        <div className="space-y-4">
                          {selectedPlaybook.steps.map((step, index) => (
                            <div key={step.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="text-sm text-muted-foreground font-mono">
                                  {String(index + 1).padStart(2, "0")}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {step.status === "completed" && <CheckCircle className="h-4 w-4 text-success" />}
                                  {step.status === "active" && <Clock className="h-4 w-4 text-accent animate-pulse" />}
                                  {step.status === "pending" && <Clock className="h-4 w-4 text-muted-foreground" />}
                                  <span className="font-medium text-foreground">{step.name}</span>
                                </div>
                                <Badge className={getStatusColor(step.status)}>
                                  {step.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {step.assignedTo === "ai" ? "🤖 AI Agent" : "👤 Human"}
                                </Badge>
                                {step.status === "pending" && step.assignedTo === "human" && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => assignTaskToAI(selectedPlaybook.id, step.id)}
                                  >
                                    Assign to AI
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {activeTab === "kpis" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedPlaybook.kpis.map((kpi, index) => (
                          <Card key={index} className="dashboard-card p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-foreground">{kpi.label}</h4>
                              <TrendingUp className={`h-4 w-4 ${getKPIColor(kpi.status)}`} />
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-2">
                              {kpi.current}{kpi.label.includes("Rate") || kpi.label.includes("Discount") ? "%" : ""}
                            </div>
                            <div className="text-sm text-muted-foreground mb-3">
                              Target: {kpi.target}{kpi.label.includes("Rate") || kpi.label.includes("Discount") ? "%" : ""}
                            </div>
                            <Progress 
                              value={(kpi.current / kpi.target) * 100} 
                              className="h-2"
                            />
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Performance Analytics View */}
            {mainView === "analytics" && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-display text-foreground mb-2">Performance Analytics</h2>
                  <p className="text-muted-foreground">
                    Comprehensive analysis of your investment portfolio performance
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-primary" />
                        Asset Allocation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Single Family</span>
                          <span className="text-sm font-medium text-foreground">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Multifamily</span>
                          <span className="text-sm font-medium text-foreground">25%</span>
                        </div>
                        <Progress value={25} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Commercial</span>
                          <span className="text-sm font-medium text-foreground">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-accent" />
                        Geographic Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Texas</span>
                          <span className="text-sm font-medium text-foreground">40%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Florida</span>
                          <span className="text-sm font-medium text-foreground">30%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Arizona</span>
                          <span className="text-sm font-medium text-foreground">20%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Other</span>
                          <span className="text-sm font-medium text-foreground">10%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-warning" />
                        Risk Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Portfolio Risk Score</span>
                          <span className="text-sm font-medium text-warning">Medium</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Diversification</span>
                          <span className="text-sm font-medium text-success">Good</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Leverage Ratio</span>
                          <span className="text-sm font-medium text-foreground">68%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Liquidity</span>
                          <span className="text-sm font-medium text-warning">Medium</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Education & Resources View */}
            {mainView === "education" && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-display text-foreground mb-2">Education & Resources</h2>
                  <p className="text-muted-foreground">
                    Expand your knowledge and improve your investment skills
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Learning Paths
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {educationResources.map((resource, index) => (
                        <div key={index} className="p-4 border border-border/30 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{resource.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                                <Badge variant="outline" className="text-xs">{resource.level}</Badge>
                                <span className="text-xs text-muted-foreground">{resource.duration}</span>
                              </div>
                            </div>
                            {resource.completed && <CheckCircle className="h-4 w-4 text-success" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <Button size="sm" variant={resource.completed ? "outline" : "default"}>
                            {resource.completed ? "Review" : "Start Learning"}
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-accent" />
                        Success Stories
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 border border-border/30 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Austin BRRRR Success</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Acquired distressed property for $180K, invested $45K in rehab, refinanced at $280K ARV
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-success">ROI: 22.4%</span>
                          <span className="text-foreground">Cash Recovered: $55K</span>
                        </div>
                      </div>
                      <div className="p-4 border border-border/30 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Multifamily Value-Add</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          18-unit property with unit upgrades and rent optimization increased NOI by 35%
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-success">IRR: 19.8%</span>
                          <span className="text-foreground">Hold Period: 3.2 years</span>
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

export default Plans;