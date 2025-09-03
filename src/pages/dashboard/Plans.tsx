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
  BarChart3
} from "lucide-react";

interface Playbook {
  id: string;
  name: string;
  description: string;
  objectives: {
    yield: string;
    dscr: string;
    timeline: string;
  };
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
}

const mockPlaybooks: Playbook[] = [
  {
    id: "brrrr",
    name: "BRRRR Strategy",
    description: "Buy, Rehab, Rent, Refinance, Repeat",
    objectives: {
      yield: "12-15% IRR",
      dscr: "1.25+",
      timeline: "6-12 months"
    },
    steps: [
      { id: "source", name: "Source Properties", status: "completed", assignedTo: "ai" },
      { id: "underwrite", name: "Underwrite Deals", status: "active", assignedTo: "ai" },
      { id: "outreach", name: "Seller Outreach", status: "pending", assignedTo: "human" },
      { id: "loi", name: "Submit LOI", status: "pending", assignedTo: "human" },
      { id: "diligence", name: "Due Diligence", status: "pending", assignedTo: "human" },
      { id: "close", name: "Close Deal", status: "pending", assignedTo: "human" }
    ],
    kpis: [
      { label: "Properties Sourced", current: 47, target: 100, status: "good" },
      { label: "Under Contract", current: 2, target: 5, status: "warning" },
      { label: "Avg. Cap Rate", current: 7.2, target: 8.0, status: "warning" }
    ],
    riskGates: ["Market downturn", "Interest rate spike", "Construction delays"]
  },
  {
    id: "preforeclosure",
    name: "Pre-Foreclosure Flip",
    description: "Distressed property acquisition and flip",
    objectives: {
      yield: "20-25% ROI",
      dscr: "N/A",
      timeline: "3-6 months"
    },
    steps: [
      { id: "source", name: "Source Distressed", status: "completed", assignedTo: "ai" },
      { id: "underwrite", name: "Quick Analysis", status: "completed", assignedTo: "ai" },
      { id: "outreach", name: "Owner Contact", status: "active", assignedTo: "ai" },
      { id: "loi", name: "Fast LOI", status: "pending", assignedTo: "human" },
      { id: "diligence", name: "Fast DD", status: "pending", assignedTo: "human" },
      { id: "close", name: "Quick Close", status: "pending", assignedTo: "human" }
    ],
    kpis: [
      { label: "Distressed Leads", current: 23, target: 50, status: "warning" },
      { label: "Owner Response Rate", current: 15, target: 25, status: "danger" },
      { label: "Avg. Discount", current: 22, target: 30, status: "warning" }
    ],
    riskGates: ["Title issues", "Structural problems", "Market volatility"]
  },
  {
    id: "smallmulti",
    name: "Small Multi Repositioning",
    description: "Value-add small multifamily properties",
    objectives: {
      yield: "15-18% IRR",
      dscr: "1.35+",
      timeline: "12-18 months"
    },
    steps: [
      { id: "source", name: "Source Multi-Family", status: "active", assignedTo: "ai" },
      { id: "underwrite", name: "Value-Add Analysis", status: "pending", assignedTo: "ai" },
      { id: "outreach", name: "Broker Outreach", status: "pending", assignedTo: "human" },
      { id: "loi", name: "Submit LOI", status: "pending", assignedTo: "human" },
      { id: "diligence", name: "Full DD", status: "pending", assignedTo: "human" },
      { id: "close", name: "Close & Execute", status: "pending", assignedTo: "human" }
    ],
    kpis: [
      { label: "Properties Analyzed", current: 12, target: 30, status: "warning" },
      { label: "Value-Add Upside", current: 35, target: 40, status: "good" },
      { label: "Avg. Unit Mix", current: 4.2, target: 6, status: "good" }
    ],
    riskGates: ["Tenant turnover", "Rehab cost overruns", "Rent growth slowdown"]
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
      <div className="min-h-screen w-full bg-background flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-display text-foreground mb-2">Investment Plans</h1>
              <p className="text-muted-foreground">
                Choose a playbook and let Janus AI execute your investment strategy
              </p>
            </div>

            {!selectedPlaybook ? (
              /* Playbook Selection */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockPlaybooks.map((playbook) => {
                  const completedSteps = playbook.steps.filter(step => step.status === "completed").length;
                  const progressPercent = (completedSteps / playbook.steps.length) * 100;

                  return (
                    <Card 
                      key={playbook.id}
                      className="institutional-card p-6 cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => setSelectedPlaybook(playbook)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-foreground mb-1">{playbook.name}</h3>
                          <p className="text-sm text-muted-foreground">{playbook.description}</p>
                        </div>
                        <Building className="h-5 w-5 text-primary" />
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Target Yield:</span>
                          <span className="text-foreground font-medium">{playbook.objectives.yield}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Timeline:</span>
                          <span className="text-foreground font-medium">{playbook.objectives.timeline}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-muted-foreground">{completedSteps}/{playbook.steps.length}</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                      </div>

                      <Button 
                        className="w-full btn-professional"
                        onClick={(e) => {
                          e.stopPropagation();
                          runPlan(playbook.id);
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run Plan
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Objectives */}
                    <Card className="institutional-card p-6">
                      <h3 className="font-medium text-foreground mb-4 flex items-center">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        Objectives
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target Yield:</span>
                          <span className="text-foreground font-medium">{selectedPlaybook.objectives.yield}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Min DSCR:</span>
                          <span className="text-foreground font-medium">{selectedPlaybook.objectives.dscr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Timeline:</span>
                          <span className="text-foreground font-medium">{selectedPlaybook.objectives.timeline}</span>
                        </div>
                      </div>
                    </Card>

                    {/* Progress Ring */}
                    <Card className="institutional-card p-6">
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
                    <Card className="institutional-card p-6">
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
                  <Card className="institutional-card p-6">
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
                      <Card key={index} className="institutional-card p-6">
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