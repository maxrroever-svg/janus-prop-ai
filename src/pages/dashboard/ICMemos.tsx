import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Eye,
  Edit,
  Brain,
  TrendingUp,
  DollarSign,
  Calendar,
  Zap,
  FileSpreadsheet,
  Presentation,
  ClipboardList,
  Building,
  Calculator
} from "lucide-react";

const generatedMemos = [
  {
    id: 1,
    property: "1247 Atlantic Avenue",
    title: "Investment Committee Memo - Brooklyn Townhouse",
    generatedDate: "2025-01-15",
    recommendation: "Strong Buy",
    confidence: 94,
    estimatedROI: "18.2%",
    riskLevel: "Low",
    pdfUrl: "/memos/1247-atlantic-memo.pdf",
    summary: "Multi-agent analysis confirms exceptional opportunity with coordinated assessment from Orion, Osiris, and Atelius showing 18%+ ROI potential.",
    keyPoints: [
      "Below-market pricing identified by Orion market scanning",
      "Osiris projects $135k equity gain post-renovation", 
      "Atelius confirms clean legal status and zoning compliance",
      "Eden coordination ranks this in top 5% of opportunities"
    ]
  },
  {
    id: 2,
    property: "91-15 Corona Avenue",
    title: "IC Memo - Queens Foreclosure Opportunity",
    generatedDate: "2025-01-12", 
    recommendation: "Buy",
    confidence: 87,
    estimatedROI: "15.8%",
    riskLevel: "Medium",
    pdfUrl: "/memos/91-15-corona-memo.pdf",
    summary: "Foreclosure filing detected 48hrs ago in gentrifying area with strong appreciation trends and renovation upside.",
    keyPoints: [
      "Time-sensitive foreclosure opportunity identified by Orion",
      "23% YoY appreciation in surrounding area",
      "Osiris estimates $85k renovation for optimal positioning",
      "Atelius flags minor title research needed"
    ]
  }
];

const inProgressMemos = [
  {
    id: 3,
    property: "156 MacDonough Street",
    title: "IC Memo - Multi-Family Analysis",
    startDate: "2025-01-14",
    progress: 75,
    estimatedCompletion: "Today, 6:00 PM",
    assignedAgents: ["Osiris", "Atelius", "Eden"],
    currentStep: "Legal compliance review by Atelius",
    blockers: []
  },
  {
    id: 4,
    property: "1455 Webster Avenue",
    title: "IC Memo - Bronx Duplex Assessment", 
    startDate: "2025-01-13",
    progress: 45,
    estimatedCompletion: "Tomorrow, 2:00 PM",
    assignedAgents: ["Orion", "Osiris", "Celestia"],
    currentStep: "Financial modeling by Celestia",
    blockers: ["Awaiting updated comps from Osiris"]
  },
  {
    id: 5,
    property: "789 Park Place",
    title: "IC Memo - Distressed Asset Analysis",
    startDate: "2025-01-10",
    progress: 20,
    estimatedCompletion: "Jan 18, 4:00 PM",
    assignedAgents: ["Orion", "Atelius"],
    currentStep: "Initial market research by Orion",
    blockers: ["Owner contact information needed"]
  }
];

const documentTemplates = [
  {
    id: 1,
    name: "Investment Memo",
    description: "Comprehensive investment analysis with risk assessment and financial projections",
    icon: FileText,
    estimatedTime: "2 minutes",
    automationLevel: "Full",
    inputs: ["Property address", "Financial data", "Market comps"],
    outputs: ["Executive summary", "Financial analysis", "Risk factors", "Recommendation"]
  },
  {
    id: 2,
    name: "Deal Summary",
    description: "Quick property overview for stakeholders and partners",
    icon: Building,
    estimatedTime: "30 seconds",
    automationLevel: "Full", 
    inputs: ["Property details", "Key metrics"],
    outputs: ["Property profile", "Key financials", "Location analysis"]
  },
  {
    id: 3,
    name: "Due Diligence Questionnaire",
    description: "Automated responses to standard DD questions based on property analysis",
    icon: ClipboardList,
    estimatedTime: "5 minutes",
    automationLevel: "85%",
    inputs: ["Property data", "Legal documents", "Financial records"],
    outputs: ["Completed questionnaire", "Supporting documents list", "Risk flags"]
  },
  {
    id: 4,
    name: "Pro-Forma Report",
    description: "Financial projections and cash flow analysis ready for lenders",
    icon: Calculator,
    estimatedTime: "1 minute",
    automationLevel: "95%",
    inputs: ["Purchase price", "Renovation costs", "Market rents"],
    outputs: ["5-year projections", "Cash flow analysis", "ROI calculations"]
  },
  {
    id: 5,
    name: "Meeting Summary",
    description: "Structured summaries of property walkthrough and partner meetings",
    icon: Presentation,
    estimatedTime: "1 minute",
    automationLevel: "80%",
    inputs: ["Meeting notes", "Action items", "Decisions made"],
    outputs: ["Executive summary", "Action items", "Follow-up tasks"]
  },
  {
    id: 6,
    name: "Lender Package",
    description: "Complete loan application package with all required documentation",
    icon: FileSpreadsheet,
    estimatedTime: "10 minutes",
    automationLevel: "90%",
    inputs: ["Property data", "Financial statements", "Personal financials"],
    outputs: ["Loan application", "Property analysis", "Financial projections", "Supporting docs"]
  }
];

const recentGenerations = [
  {
    id: 1,
    template: "Investment Memo",
    property: "1247 Atlantic Avenue",
    generatedAt: "2 hours ago",
    status: "Completed",
    timeSaved: "3.5 hours"
  },
  {
    id: 2,
    template: "Due Diligence Questionnaire", 
    property: "91-15 Corona Avenue",
    generatedAt: "1 day ago",
    status: "Completed",
    timeSaved: "6 hours"
  },
  {
    id: 3,
    template: "Pro-Forma Report",
    property: "156 MacDonough Street", 
    generatedAt: "2 days ago",
    status: "In Review",
    timeSaved: "4 hours"
  }
];

const ICMemos = () => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Strong Buy": return "bg-success/10 text-success border-success/20";
      case "Buy": return "bg-ice/10 text-ice border-ice/20";
      case "Hold": return "bg-warning/10 text-warning border-warning/20";
      case "Pass": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
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
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="IC Memos" subtitle="Investment committee analysis and recommendations" />
        <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="font-display text-2xl text-foreground mb-2">IC Memos</h1>
                <p className="text-muted-foreground">
                  AI-generated Investment Committee memos with comprehensive deal analysis
                </p>
              </div>

              {/* IC Memo Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <FileText className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Generated Memos</p>
                        <p className="text-2xl font-semibold text-foreground">{generatedMemos.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <Clock className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                        <p className="text-2xl font-semibold text-foreground">{inProgressMemos.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ice/10 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-ice" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                        <p className="text-2xl font-semibold text-foreground">90%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. ROI</p>
                        <p className="text-2xl font-semibold text-foreground">17%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="generated" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="generated">Generated Memos</TabsTrigger>
                  <TabsTrigger value="automation">Document Automation</TabsTrigger>
                  <TabsTrigger value="progress">In Progress</TabsTrigger>
                </TabsList>

                <TabsContent value="generated" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground">Completed IC Memos</h2>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {generatedMemos.map((memo) => (
                      <Card key={memo.id} className="glass">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground mb-2">{memo.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{memo.property}</p>
                              <p className="text-sm text-foreground break-words">{memo.summary}</p>
                            </div>
                            <div className="text-right ml-4">
                              <Badge className={getRecommendationColor(memo.recommendation)}>
                                {memo.recommendation}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-2">
                                Generated {memo.generatedDate}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Confidence</span>
                              <span className="font-medium text-ice">{memo.confidence}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Est. ROI</span>
                              <span className="font-medium text-gold">{memo.estimatedROI}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Risk Level</span>
                              <span className={`font-medium ${getRiskColor(memo.riskLevel)}`}>
                                {memo.riskLevel}
                              </span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-foreground mb-2">Key Analysis Points</h4>
                            <div className="space-y-1">
                              {memo.keyPoints.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                                  <span className="text-muted-foreground break-words">{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View Full Memo
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                            <Button size="sm" variant="ghost" className="flex-1">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Notes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="automation" className="space-y-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="font-display text-lg text-foreground">Automated Document Generation</h2>
                        <p className="text-sm text-muted-foreground">Eliminate repetitive paperwork with AI-powered document automation</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Zap className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </div>

                    {/* Automation Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <Card className="glass">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Time Saved</p>
                              <p className="text-2xl font-semibold text-foreground">47 hrs</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-success/10 rounded-lg">
                              <FileText className="w-5 h-5 text-success" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Documents Generated</p>
                              <p className="text-2xl font-semibold text-foreground">156</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-ice/10 rounded-lg">
                              <TrendingUp className="w-5 h-5 text-ice" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                              <p className="text-2xl font-semibold text-foreground">94%</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-warning/10 rounded-lg">
                              <Clock className="w-5 h-5 text-warning" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Avg. Generation Time</p>
                              <p className="text-2xl font-semibold text-foreground">3 min</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Document Templates */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg text-foreground">Available Document Templates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documentTemplates.map((template) => (
                        <Card key={template.id} className="glass hover:shadow-lg transition-all duration-200 cursor-pointer group">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <template.icon className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-foreground">{template.name}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {template.automationLevel} Auto
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {template.estimatedTime}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    Auto-generated
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <h5 className="font-medium text-foreground text-sm mb-2">Required Inputs</h5>
                                <div className="flex flex-wrap gap-1">
                                  {template.inputs.map((input, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {input}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h5 className="font-medium text-foreground text-sm mb-2">Generated Outputs</h5>
                                <div className="flex flex-wrap gap-1">
                                  {template.outputs.map((output, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {output}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <Button className="w-full mt-4 group-hover:bg-primary/90 transition-colors">
                                <Brain className="w-4 h-4 mr-2" />
                                Generate Document
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Recent Generations */}
                  <div className="space-y-4">
                    <h3 className="font-display text-lg text-foreground">Recent Generations</h3>
                    <Card className="glass">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {recentGenerations.map((generation) => (
                            <div key={generation.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-success/10 rounded-lg">
                                  <CheckCircle className="w-4 h-4 text-success" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-foreground">{generation.template}</h4>
                                  <p className="text-sm text-muted-foreground">{generation.property}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-foreground">Saved {generation.timeSaved}</p>
                                <p className="text-xs text-muted-foreground">{generation.generatedAt}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-primary" />
                            <div>
                              <h4 className="font-medium text-foreground">Automation Impact</h4>
                              <p className="text-sm text-muted-foreground">
                                Document automation has eliminated 90% of repetitive paperwork, saving an average of 4.2 hours per deal.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground">Memos In Progress</h2>
                    <Button size="sm" variant="outline">
                      <Brain className="w-4 h-4 mr-2" />
                      Generate New Memo
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {inProgressMemos.map((memo) => (
                      <Card key={memo.id} className="glass">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground mb-2">{memo.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{memo.property}</p>
                              <p className="text-sm text-foreground">Current Step: {memo.currentStep}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-foreground">{memo.progress}%</span>
                                <Clock className="w-4 h-4 text-warning" />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Est. completion: {memo.estimatedCompletion}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm text-foreground">{memo.progress}%</span>
                            </div>
                            <Progress value={memo.progress} className="h-2" />
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-foreground mb-2">Assigned Agents</h4>
                            <div className="flex flex-wrap gap-2">
                              {memo.assignedAgents.map((agent, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {agent}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {memo.blockers.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-warning" />
                                Blockers
                              </h4>
                              <div className="space-y-1">
                                {memo.blockers.map((blocker, idx) => (
                                  <p key={idx} className="text-sm text-warning break-words">{blocker}</p>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View Progress
                            </Button>
                            <Button size="sm" variant="ghost" className="flex-1">
                              <Calendar className="w-4 h-4 mr-2" />
                              Update Timeline
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ICMemos;