import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Bot,
  Download,
  Eye,
  Zap
} from "lucide-react";

const Documents = () => {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [generatedDocs, setGeneratedDocs] = useState<Record<string, boolean>>({});
  const [aiExplanations, setAiExplanations] = useState<Record<string, boolean>>({});

  const handleGenerateDocument = (docKey: string) => {
    setGeneratedDocs(prev => ({ ...prev, [docKey]: true }));
  };

  const handleUploadDocument = (docKey: string) => {
    setUploadedDocs(prev => ({ ...prev, [docKey]: true }));
  };

  const handleExplainDocument = (docKey: string) => {
    setAiExplanations(prev => ({ ...prev, [docKey]: true }));
  };

  const getDocumentStatus = (docKey: string) => {
    if (uploadedDocs[docKey] || generatedDocs[docKey]) return "complete";
    return "pending";
  };

  const calculateProgress = () => {
    const totalDocs = 16; // Total number of documents
    const completedDocs = Object.keys(uploadedDocs).length + Object.keys(generatedDocs).length;
    return Math.round((completedDocs / totalDocs) * 100);
  };

  const documentCategories = [
    {
      title: "Financing / Bank",
      description: "Essential documents for mortgage and loan processing",
      documents: [
        { 
          key: "loan-app", 
          name: "Loan Application (1003 Form)", 
          description: "Your master application for a mortgage.",
          autoGenerate: true,
          canUpload: true
        },
        { 
          key: "credit-auth", 
          name: "Credit Report Authorization", 
          description: "Permission for lenders to check credit.",
          autoGenerate: true,
          canUpload: true
        },
        { 
          key: "income-proof", 
          name: "Proof of Income & Assets", 
          description: "W-2s, pay stubs, tax returns, bank statements.",
          autoGenerate: false,
          canUpload: true
        },
        { 
          key: "loan-estimate", 
          name: "Loan Estimate", 
          description: "Early disclosure of interest rate, fees, closing costs.",
          autoGenerate: false,
          canUpload: true
        },
        { 
          key: "closing-disclosure", 
          name: "Closing Disclosure (CD)", 
          description: "Final statement of all loan terms and costs.",
          autoGenerate: false,
          canUpload: true
        },
        { 
          key: "promissory-note", 
          name: "Promissory Note", 
          description: "Legal IOU saying you'll repay the loan.",
          autoGenerate: true,
          canUpload: true
        },
        { 
          key: "deed-trust", 
          name: "Deed of Trust / Mortgage", 
          description: "Gives the bank rights to the property if you default.",
          autoGenerate: true,
          canUpload: true
        },
      ]
    },
    {
      title: "Property / Seller",
      description: "Documents related to the property and seller obligations",
      documents: [
        { 
          key: "purchase-agreement", 
          name: "Purchase Agreement / Sales Contract", 
          description: "The binding offer between buyer and seller.",
          autoGenerate: true,
          canUpload: true
        },
        { 
          key: "seller-disclosure", 
          name: "Seller's Disclosure", 
          description: "Seller reveals known property issues (repairs, hazards).",
          autoGenerate: false,
          canUpload: true
        },
        { 
          key: "title-report", 
          name: "Title Report", 
          description: "Shows legal ownership, liens, encumbrances.",
          autoGenerate: false,
          canUpload: true
        },
        { 
          key: "deed", 
          name: "Deed", 
          description: "Transfers ownership from seller to buyer at closing.",
          autoGenerate: false,
          canUpload: true
        },
        { 
          key: "bill-sale", 
          name: "Bill of Sale", 
          description: "For personal property included (appliances, fixtures, etc.).",
          autoGenerate: true,
          canUpload: true
        },
      ]
    },
    {
      title: "Inspections & Legal",
      description: "Required inspections and legal protections",
      documents: [
        { 
          key: "inspection-report", 
          name: "Home Inspection Report", 
          description: "Reveals condition issues.",
          autoGenerate: false,
          canUpload: true
        },
        { 
          key: "appraisal", 
          name: "Appraisal Report", 
          description: "Confirms value for the lender.",
          autoGenerate: false,
          canUpload: true
        },
        { 
          key: "insurance", 
          name: "Insurance Policy", 
          description: "Homeowner's insurance proof.",
          autoGenerate: true,
          canUpload: true
        },
        { 
          key: "title-insurance", 
          name: "Title Insurance", 
          description: "Protects against ownership disputes.",
          autoGenerate: true,
          canUpload: true
        },
      ]
    },
    {
      title: "Closing & Post-Closing",
      description: "Final documents and post-purchase requirements",
      documents: [
        { 
          key: "settlement", 
          name: "Settlement Statement (HUD-1)", 
          description: "Itemized list of all closing costs.",
          autoGenerate: true,
          canUpload: true
        },
        { 
          key: "escrow", 
          name: "Escrow Documents", 
          description: "Instructions to escrow agent on handling funds.",
          autoGenerate: true,
          canUpload: true
        },
      ]
    }
  ];

  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Key Documents" subtitle="AI-powered document management for home buying" />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Progress Overview */}
            <Card className="mb-6 bg-gradient-to-r from-accent-green/5 to-accent-blue/5 border-accent-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent-green" />
                  Document Progress
                </CardTitle>
                <CardDescription>
                  Track your home-buying document completion with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{calculateProgress()}% Complete</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent-green" />
                      <span>{Object.keys(uploadedDocs).length + Object.keys(generatedDocs).length} Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>{16 - (Object.keys(uploadedDocs).length + Object.keys(generatedDocs).length)} Pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="documents" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documents">Document Manager</TabsTrigger>
                <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
                <TabsTrigger value="checklist">Smart Checklist</TabsTrigger>
              </TabsList>

              <TabsContent value="documents">
                <div className="grid gap-6">
                  {documentCategories.map((category, index) => (
                    <Card key={index} className="w-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <FileText className="h-5 w-5 text-accent-green" />
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {category.documents.map((doc, docIndex) => {
                            const status = getDocumentStatus(doc.key);
                            return (
                              <div key={docIndex} className="border rounded-lg p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold text-foreground">{doc.name}</h4>
                                      <Badge variant={status === "complete" ? "default" : "secondary"} className="text-xs">
                                        {status === "complete" ? (
                                          <>
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Complete
                                          </>
                                        ) : (
                                          <>
                                            <Clock className="h-3 w-3 mr-1" />
                                            Pending
                                          </>
                                        )}
                                      </Badge>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-3">{doc.description}</p>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {doc.autoGenerate && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleGenerateDocument(doc.key)}
                                      disabled={generatedDocs[doc.key]}
                                      className="flex items-center gap-1"
                                    >
                                      <Sparkles className="h-3 w-3" />
                                      {generatedDocs[doc.key] ? "Generated" : "AI Generate"}
                                    </Button>
                                  )}
                                  
                                  {doc.canUpload && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleUploadDocument(doc.key)}
                                      disabled={uploadedDocs[doc.key]}
                                      className="flex items-center gap-1"
                                    >
                                      <Upload className="h-3 w-3" />
                                      {uploadedDocs[doc.key] ? "Uploaded" : "Upload"}
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleExplainDocument(doc.key)}
                                    className="flex items-center gap-1"
                                  >
                                    <Bot className="h-3 w-3" />
                                    {aiExplanations[doc.key] ? "Explained" : "AI Explain"}
                                  </Button>
                                  
                                  {(uploadedDocs[doc.key] || generatedDocs[doc.key]) && (
                                    <>
                                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        View
                                      </Button>
                                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                                        <Download className="h-3 w-3" />
                                        Download
                                      </Button>
                                    </>
                                  )}
                                </div>

                                {aiExplanations[doc.key] && (
                                  <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-3 mt-3">
                                    <div className="flex items-start gap-2">
                                      <Bot className="h-4 w-4 text-accent-blue mt-0.5" />
                                      <div>
                                        <p className="text-sm font-medium text-accent-blue mb-1">AI Explanation</p>
                                        <p className="text-sm text-muted-foreground">
                                          This document is essential for {doc.description.toLowerCase()} 
                                          Janus AI has analyzed similar documents and recommends completing this early in your process.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ai-tools">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent-green" />
                        Auto-Fill Personal Information
                      </CardTitle>
                      <CardDescription>
                        Let Janus AI populate your information across all forms
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" placeholder="Enter your full name" />
                        </div>
                        <div>
                          <Label htmlFor="ssn">Social Security Number</Label>
                          <Input id="ssn" placeholder="XXX-XX-XXXX" />
                        </div>
                        <div>
                          <Label htmlFor="income">Annual Income</Label>
                          <Input id="income" placeholder="$0" />
                        </div>
                        <div>
                          <Label htmlFor="employer">Current Employer</Label>
                          <Input id="employer" placeholder="Company name" />
                        </div>
                      </div>
                      <Button className="w-full">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Auto-Fill All Forms
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-accent-blue" />
                        Document AI Assistant
                      </CardTitle>
                      <CardDescription>
                        Ask questions about any document or requirement
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea 
                        placeholder="Ask me anything about your home-buying documents..."
                        className="min-h-[100px]"
                      />
                      <Button className="w-full">
                        <Bot className="h-4 w-4 mr-2" />
                        Ask Janus AI
                      </Button>
                      
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">Quick Questions:</p>
                        <div className="flex flex-wrap gap-1">
                          <Button size="sm" variant="outline" className="text-xs">
                            What's a Loan Estimate?
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            Do I need title insurance?
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            What happens at closing?
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-accent-green" />
                        Document Scanner
                      </CardTitle>
                      <CardDescription>
                        Upload documents and let AI extract key information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drop documents here or click to upload
                        </p>
                        <Button variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Supported: PDF, JPG, PNG, DOCX • AI will extract key data automatically
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        Compliance Checker
                      </CardTitle>
                      <CardDescription>
                        Ensure all documents meet lender requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Income Documentation</span>
                          <CheckCircle className="h-4 w-4 text-accent-green" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Credit Authorization</span>
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Property Information</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Run Full Compliance Check
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="checklist">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-accent-green" />
                      Smart Document Checklist
                    </CardTitle>
                    <CardDescription>
                      AI-powered timeline showing what to do when
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-2 border-accent-green pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-accent-green" />
                          <span className="font-medium">Week 1: Pre-Approval</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                          <li>✓ Loan Application (1003 Form)</li>
                          <li>✓ Credit Report Authorization</li>
                          <li>✓ Proof of Income & Assets</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-accent-blue pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-accent-blue" />
                          <span className="font-medium">Week 2-3: Property Search</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                          <li>• Purchase Agreement (when offer accepted)</li>
                          <li>• Seller's Disclosure</li>
                          <li>• Home Inspection Report</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-muted-foreground pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Week 4-6: Due Diligence</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                          <li>• Appraisal Report</li>
                          <li>• Title Report</li>
                          <li>• Insurance Policy</li>
                          <li>• Loan Estimate</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-muted-foreground pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Week 7-8: Closing Prep</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                          <li>• Closing Disclosure (CD)</li>
                          <li>• Title Insurance</li>
                          <li>• Settlement Statement</li>
                          <li>• Final documents</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-accent-green/5 border border-accent-green/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-accent-green mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-accent-green mb-1">AI Recommendation</p>
                          <p className="text-sm text-muted-foreground">
                            Based on your timeline, focus on gathering income documentation next. 
                            Janus can auto-generate your credit authorization form to speed up the process.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Documents;