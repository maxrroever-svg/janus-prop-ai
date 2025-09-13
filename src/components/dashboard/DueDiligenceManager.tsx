import { useState } from "react";
import { Upload, FileText, MessageSquare, CheckCircle, Clock, AlertTriangle, Download, Send, Calendar, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface ChatMessage {
  type: 'user' | 'ai';
  message: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  analysis?: {
    keyFindings: string[];
    redFlags: string[];
    summary: string;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
}

export function DueDiligenceManager() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Property Inspection Report.pdf',
      type: 'inspection',
      size: 2400000,
      uploadDate: '2024-01-15',
      status: 'ready',
      analysis: {
        keyFindings: [
          'HVAC system needs replacement within 2-3 years',
          'Roof in good condition, recent replacement',
          'Minor electrical updates needed'
        ],
        redFlags: [
          'Potential foundation settling in basement',
          'Asbestos tiles in utility room'
        ],
        summary: 'Overall property condition is good with some maintenance items to address.'
      }
    },
    {
      id: '2', 
      name: 'Lease Agreement - Unit 2A.pdf',
      type: 'lease',
      size: 850000,
      uploadDate: '2024-01-14',
      status: 'ready',
      analysis: {
        keyFindings: [
          'Current rent: $2,800/month',
          'Lease expires June 2024',
          'Security deposit: $2,800'
        ],
        redFlags: [
          'Early termination clause with 30 days notice',
          'No rent escalation clause'
        ],
        summary: 'Standard residential lease with below-market rent and tenant-favorable terms.'
      }
    }
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Order Environmental Assessment',
      description: 'Phase I Environmental Site Assessment required for financing',
      status: 'in-progress',
      dueDate: '2024-01-25',
      assignee: 'Environmental Consultant',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Schedule Appraisal',
      description: 'Coordinate property appraisal with lender requirements',
      status: 'pending',
      dueDate: '2024-01-30',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Title Search Review',
      description: 'Review preliminary title report for any liens or issues',
      status: 'completed',
      dueDate: '2024-01-20',
      assignee: 'Title Company',
      priority: 'high'
    }
  ]);

  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      type: 'ai',
      message: 'Hello! I can help you analyze documents and answer questions about your due diligence materials. What would you like to know?'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDoc: Document = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: 'unknown',
          size: file.size,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'processing'
        };
        setDocuments(prev => [...prev, newDoc]);
        
        // Simulate processing
        setTimeout(() => {
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === newDoc.id 
                ? { ...doc, status: 'ready' as const }
                : doc
            )
          );
        }, 3000);
      });
    }
  };

  const handleQuery = () => {
    if (!query.trim()) return;
    
    setChatHistory(prev => [...prev, { type: 'user', message: query }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on the inspection report, the main issues are HVAC replacement needed ($8-12K) and potential foundation settling that should be evaluated by a structural engineer ($500-1K assessment).",
        "The lease agreements show below-market rents averaging $2,650/month vs. market rate of $3,100/month. This represents 15% upside potential.",
        "I found 2 red flags in the uploaded documents: early termination clauses in leases and potential asbestos in utility areas requiring professional remediation.",
        "The financial statements show stable NOI but property taxes increased 12% last year. Budget an additional $200/month for tax increases.",
        "All documents have been analyzed. The deal appears viable with a total capital expenditure requirement of approximately $15-20K in the first year."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { type: 'ai', message: randomResponse }]);
    }, 1500);
    
    setQuery("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': case 'completed': return 'bg-success text-success-foreground';
      case 'processing': case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-destructive text-destructive';
      case 'medium': return 'border-warning text-warning';
      case 'low': return 'border-success text-success';
      default: return 'border-muted';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents">Document Review</TabsTrigger>
          <TabsTrigger value="qa">AI Q&A</TabsTrigger>
          <TabsTrigger value="tasks">Task Automation</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xlsx,.jpg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Upload Due Diligence Documents</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    PDFs, Word docs, Excel files, images (Max 20MB each)
                  </p>
                  <Button variant="outline">Choose Files</Button>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Document List */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map(doc => (
                  <div key={doc.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {(doc.size / 1024 / 1024).toFixed(1)} MB • Uploaded {doc.uploadDate}
                        </p>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status === 'processing' ? (
                          <>
                            <Clock className="w-3 h-3 mr-1 animate-spin" />
                            Processing
                          </>
                        ) : doc.status === 'ready' ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Ready
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Error
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    {doc.status === 'processing' && (
                      <Progress value={66} className="h-2" />
                    )}

                    {doc.analysis && (
                      <div className="space-y-3 pt-3 border-t">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Key Findings:</h5>
                          <ul className="text-sm space-y-1">
                            {doc.analysis.keyFindings.map((finding, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 mt-0.5 text-success" />
                                {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {doc.analysis.redFlags.length > 0 && (
                          <div>
                            <h5 className="font-medium text-sm mb-2 text-destructive">Red Flags:</h5>
                            <ul className="text-sm space-y-1">
                              {doc.analysis.redFlags.map((flag, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <AlertTriangle className="w-3 h-3 mt-0.5 text-destructive" />
                                  {flag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div>
                          <h5 className="font-medium text-sm mb-1">Summary:</h5>
                          <p className="text-sm text-muted-foreground">{doc.analysis.summary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI Document Q&A
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat History */}
              <div className="border rounded-lg p-4 h-96 overflow-y-auto space-y-3">
                {chatHistory.map((item, idx) => (
                  <div key={idx} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      item.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-4' 
                        : 'bg-muted mr-4'
                    }`}>
                      <p className="text-sm">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Query Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask questions about your documents..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                  className="flex-1"
                />
                <Button onClick={handleQuery} disabled={!query.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Example questions: "What are the major issues in the inspection?", "List lease clauses about early termination", "Summarize financial statements"
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Due Diligence Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className={`border rounded-lg p-4 ${getPriorityColor(task.priority)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Due: {task.dueDate}
                      </span>
                      {task.assignee && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {task.assignee}
                        </span>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {task.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Generate Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Due Diligence Summary</span>
                  <span className="text-xs text-muted-foreground">Complete findings report</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Building className="w-5 h-5" />
                  <span className="font-medium">Property Condition Report</span>
                  <span className="text-xs text-muted-foreground">Inspection & maintenance summary</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Financial Analysis</span>
                  <span className="text-xs text-muted-foreground">Rent rolls & expense review</span>
                </Button>
                
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Risk Assessment</span>
                  <span className="text-xs text-muted-foreground">Red flags & recommendations</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}