import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { ClosingRoom } from "@/components/consumer/ClosingRoom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Bot, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users, 
  FileText, 
  Calendar,
  Phone,
  Mail,
  Building,
  Zap,
  Target,
  MessageSquare
} from "lucide-react";

const ConsumerClosing = () => {
  const [activeCoordination, setActiveCoordination] = useState("all");
  const [conditionsStatus, setConditionsStatus] = useState({
    title: "complete",
    insurance: "complete", 
    appraisal: "pending",
    inspection: "complete",
    funding: "in-progress"
  });

  const escrowTasks = [
    {
      id: 1,
      title: "Title Search & Clearance",
      status: "complete",
      assignedTo: "First American Title",
      dueDate: "2024-01-15",
      aiActions: ["Document verified", "Liens cleared", "Title insurance issued"],
      humanContact: "Sarah Johnson - (555) 123-4567"
    },
    {
      id: 2,
      title: "Loan Funding Coordination",
      status: "in-progress",
      assignedTo: "Wells Fargo Bank",
      dueDate: "2024-01-18",
      aiActions: ["Conditions verified", "Funding request sent", "Wire instructions prepared"],
      humanContact: "Mike Chen - (555) 234-5678"
    },
    {
      id: 3,
      title: "Final Walkthrough Scheduling",
      status: "pending",
      assignedTo: "Keller Williams Realty",
      dueDate: "2024-01-17",
      aiActions: ["Auto-scheduled for Jan 17 2PM", "Sent calendar invites", "Prepared checklist"],
      humanContact: "Lisa Rodriguez - (555) 345-6789"
    },
    {
      id: 4,
      title: "Recording Documents",
      status: "pending",
      assignedTo: "Orange County Recorder",
      dueDate: "2024-01-19",
      aiActions: ["Documents prepared", "Recording fees calculated", "Submission queue ready"],
      humanContact: "County Office - (555) 456-7890"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "text-accent-green";
      case "in-progress": return "text-accent-blue";
      case "pending": return "text-amber-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete": return <CheckCircle className="h-4 w-4" />;
      case "in-progress": return <Clock className="h-4 w-4" />;
      case "pending": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const overallProgress = 75; // Calculate based on completed tasks

  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Closing Room" subtitle="AI-powered escrow coordination and document management" />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* AI Escrow Assistant Header */}
            <Card className="mb-6 bg-gradient-to-r from-accent-blue/5 to-accent-green/5 border-accent-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Bot className="h-6 w-6 text-accent-blue" />
                  AI Escrow Assistant
                </CardTitle>
                <CardDescription className="text-base">
                  Automated coordination reducing closing time and errors by 70-80%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-green">{overallProgress}%</div>
                    <div className="text-sm text-muted-foreground">Overall Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-blue">4</div>
                    <div className="text-sm text-muted-foreground">Active Coordinations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-green">2 days</div>
                    <div className="text-sm text-muted-foreground">Time Saved</div>
                  </div>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </CardContent>
            </Card>

            <Tabs defaultValue="coordination" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="coordination">Coordination Hub</TabsTrigger>
                <TabsTrigger value="conditions">Closing Conditions</TabsTrigger>
                <TabsTrigger value="documents">Document Prep</TabsTrigger>
                <TabsTrigger value="timeline">Smart Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="coordination">
                <div className="space-y-6">
                  {/* Active Coordinations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent-blue" />
                        Active Coordinations
                      </CardTitle>
                      <CardDescription>
                        Real-time coordination with all closing parties
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {escrowTasks.map((task) => (
                          <div key={task.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{task.title}</h4>
                                  <Badge variant={task.status === "complete" ? "default" : "secondary"} className="text-xs">
                                    <span className={getStatusColor(task.status)}>
                                      {getStatusIcon(task.status)}
                                    </span>
                                    <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Assigned to: {task.assignedTo} • Due: {task.dueDate}
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium mb-2 flex items-center gap-1">
                                  <Bot className="h-3 w-3 text-accent-blue" />
                                  AI Actions Completed
                                </p>
                                <ul className="text-xs space-y-1">
                                  {task.aiActions.map((action, idx) => (
                                    <li key={idx} className="flex items-center gap-1">
                                      <CheckCircle className="h-3 w-3 text-accent-green" />
                                      {action}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium mb-2 flex items-center gap-1">
                                  <Phone className="h-3 w-3 text-accent-green" />
                                  Human Contact
                                </p>
                                <div className="text-xs space-y-1">
                                  <p>{task.humanContact}</p>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="h-6 text-xs">
                                      <Phone className="h-3 w-3 mr-1" />
                                      Call
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-6 text-xs">
                                      <Mail className="h-3 w-3 mr-1" />
                                      Email
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-6 text-xs">
                                      <MessageSquare className="h-3 w-3 mr-1" />
                                      Message
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Assistant Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-accent-green" />
                        Recent AI Assistant Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-accent-green/5 rounded-lg">
                          <Bot className="h-4 w-4 text-accent-green mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Automated Lender Communication</p>
                            <p className="text-xs text-muted-foreground">
                              Sent funding conditions update to Wells Fargo, received confirmation of wire transfer schedule
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-accent-blue/5 rounded-lg">
                          <Bot className="h-4 w-4 text-accent-blue mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Document Auto-Generation</p>
                            <p className="text-xs text-muted-foreground">
                              Generated final HUD-1 settlement statement and sent to all parties for review
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-accent-green/5 rounded-lg">
                          <Bot className="h-4 w-4 text-accent-green mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">County Recording Prep</p>
                            <p className="text-xs text-muted-foreground">
                              Prepared all recording documents, calculated fees ($247), and queued for same-day submission
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="conditions">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-accent-green" />
                      Closing Conditions Monitor
                    </CardTitle>
                    <CardDescription>
                      AI-powered tracking of all closing requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-accent-green" />
                          <div>
                            <p className="font-medium">Title & Survey</p>
                            <p className="text-sm text-muted-foreground">Clear title, no liens found</p>
                          </div>
                        </div>
                        <Badge className="bg-accent-green/10 text-accent-green">Complete</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-accent-green" />
                          <div>
                            <p className="font-medium">Homeowner's Insurance</p>
                            <p className="text-sm text-muted-foreground">Policy active, lender requirements met</p>
                          </div>
                        </div>
                        <Badge className="bg-accent-green/10 text-accent-green">Complete</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-accent-blue" />
                          <div>
                            <p className="font-medium">Final Loan Approval</p>
                            <p className="text-sm text-muted-foreground">Underwriter final review in progress</p>
                          </div>
                        </div>
                        <Badge className="bg-accent-blue/10 text-accent-blue">In Progress</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                          <div>
                            <p className="font-medium">Final Walkthrough</p>
                            <p className="text-sm text-muted-foreground">Scheduled for Jan 17, 2PM</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-500/10 text-amber-500">Pending</Badge>
                      </div>
                    </div>
                    
                    <Alert className="mt-4">
                      <Bot className="h-4 w-4" />
                      <AlertDescription>
                        AI Assistant is monitoring all conditions 24/7. You'll be notified immediately if any issues arise.
                        Current risk assessment: <span className="font-medium text-accent-green">Low Risk</span>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-accent-green" />
                        Auto-Generated Documents
                      </CardTitle>
                      <CardDescription>
                        AI-prepared closing documents ready for signature
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          "HUD-1 Settlement Statement",
                          "Deed of Trust",
                          "Promissory Note", 
                          "Title Insurance Policy",
                          "Closing Disclosure (CD)"
                        ].map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-accent-green" />
                              <span className="text-sm">{doc}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="h-6 text-xs">
                                Review
                              </Button>
                              <Button size="sm" variant="outline" className="h-6 text-xs">
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-accent-blue" />
                        Third-Party Documents
                      </CardTitle>
                      <CardDescription>
                        Documents from lenders, title companies, and others
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: "Final Loan Documents", source: "Wells Fargo", status: "received" },
                          { name: "Title Commitment", source: "First American", status: "received" },
                          { name: "Property Survey", source: "ABC Surveyors", status: "received" },
                          { name: "HOA Documents", source: "Sunset HOA", status: "pending" },
                          { name: "Final Appraisal", source: "Smith Appraisals", status: "pending" }
                        ].map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">From: {doc.source}</p>
                            </div>
                            <Badge variant={doc.status === "received" ? "default" : "secondary"} className="text-xs">
                              {doc.status === "received" ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Received
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </>
                              )}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-accent-green" />
                      Smart Closing Timeline
                    </CardTitle>
                    <CardDescription>
                      AI-optimized schedule coordinating all parties
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-2 border-accent-green pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-accent-green" />
                          <span className="font-medium">January 15 - Title Clearance</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">✓ Title search completed, no issues found</p>
                        <p className="text-sm text-muted-foreground ml-6">✓ Title insurance issued</p>
                      </div>
                      
                      <div className="border-l-2 border-accent-blue pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-accent-blue" />
                          <span className="font-medium">January 17 - Final Walkthrough</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">• Scheduled for 2:00 PM</p>
                        <p className="text-sm text-muted-foreground ml-6">• AI-generated checklist prepared</p>
                        <p className="text-sm text-muted-foreground ml-6">• All parties notified</p>
                      </div>
                      
                      <div className="border-l-2 border-accent-blue pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-accent-blue" />
                          <span className="font-medium">January 18 - Loan Funding</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">• Wire transfer scheduled for 10:00 AM</p>
                        <p className="text-sm text-muted-foreground ml-6">• Bank coordination automated</p>
                      </div>
                      
                      <div className="border-l-2 border-muted-foreground pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">January 19 - Closing Day</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">• 1:00 PM - Document signing</p>
                        <p className="text-sm text-muted-foreground ml-6">• 3:00 PM - Recording at county</p>
                        <p className="text-sm text-muted-foreground ml-6">• 4:00 PM - Key transfer</p>
                      </div>
                    </div>
                    
                    <Alert className="mt-6">
                      <Zap className="h-4 w-4" />
                      <AlertDescription>
                        AI optimization has reduced your closing timeline by <span className="font-medium">2.5 days</span> compared to traditional processes.
                        Risk of delays: <span className="font-medium text-accent-green">5% (Very Low)</span>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Original Closing Room Component */}
            <div className="mt-8">
              <ClosingRoom />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerClosing;