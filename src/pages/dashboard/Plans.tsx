import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Brain
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
    console.log(`Assigning ${stepId} in ${playbookId} to AI agent`);
  };

  const runPlan = (playbookId: string) => {
    console.log(`Running plan: ${playbookId}`);
  };

  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full flex overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-display text-foreground mb-2">Investment Plans</h1>
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
              /* Selected Playbook Detail */
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
                              {String(index + 1).padStart(2, '0')}
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Plans;