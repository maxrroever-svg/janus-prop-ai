import { useState, useCallback, useRef } from "react";
import { Upload, Search, FileText, MapPin, TrendingUp, Brain, Plus, File, BarChart3, FileSpreadsheet, Database, CheckCircle, AlertCircle, Clock, X, CloudUpload, FolderOpen, HelpCircle, Shield, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface UploadedFile extends File {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  documentType?: string;
  extractedData?: any;
  validationErrors?: string[];
}

export function DealWorkflow() {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadMethod, setUploadMethod] = useState<'local' | 'cloud' | 'url'>('local');
  
  // Example deals for demonstration
  const [analysisResults, setAnalysisResults] = useState<any[]>([
    {
      id: 1,
      address: "2847 Wilshire Blvd",
      city: "Los Angeles, CA",
      price: "$2,450,000",
      type: "Multifamily",
      janusScore: 87,
      capRate: "6.8%",
      distressLevel: "Low",
      predictedUpside: "$285,000",
      aiInsights: "Excellent location with strong rental demand. Property shows consistent NOI growth and below-market rents present value-add opportunity.",
      status: "Deal Reviewed",
      fileName: "Wilshire_Investment_Package.pdf"
    },
    {
      id: 2,
      address: "1523 Ocean Park Blvd",
      city: "Santa Monica, CA", 
      price: "$3,750,000",
      type: "Mixed Use",
      janusScore: 72,
      capRate: "5.2%",
      distressLevel: "Medium",
      predictedUpside: "$420,000",
      aiInsights: "Prime Santa Monica location with retail ground floor and residential units above. Market comps suggest 12% upside potential.",
      status: "Under Analysis",
      fileName: "Ocean_Park_Financial_Model.xlsx"
    },
    {
      id: 3,
      address: "8945 Sunset Strip",
      city: "West Hollywood, CA",
      price: "$5,200,000",
      type: "Commercial",
      janusScore: 94,
      capRate: "7.1%",
      distressLevel: "Low",
      predictedUpside: "$650,000",
      aiInsights: "Trophy asset on Sunset Strip with AAA credit tenants. Stable cash flow with built-in rent escalations and expansion potential.",
      status: "Investment Committee",
      fileName: "Sunset_Strip_Offering_Memo.pdf"
    },
    {
      id: 4,
      address: "4721 Ventura Blvd",
      city: "Sherman Oaks, CA",
      price: "$1,890,000",
      type: "Retail Strip",
      janusScore: 58,
      capRate: "8.4%",
      distressLevel: "High",
      predictedUpside: "$180,000",
      aiInsights: "Value-add opportunity with vacant anchor space. Strong neighborhood demographics but requires active leasing strategy.",
      status: "Requires Attention",
      fileName: "Ventura_Blvd_Deal_Package.pdf"
    }
  ]);

  const walkthroughSteps = [
    {
      title: "Welcome to Professional Deal Management",
      description: "Learn how to efficiently upload, analyze, and manage real estate deals with our AI-powered platform.",
      icon: Target,
      content: "This advanced system will guide you through document upload, AI analysis, and deal management processes."
    },
    {
      title: "Document Upload Methods",
      description: "Multiple ways to get your deal documents into the system.",
      icon: Upload,
      content: "Choose from local file upload, cloud storage integration, or direct URL import for maximum flexibility."
    },
    {
      title: "AI-Powered Document Analysis",
      description: "Our Janus AI automatically extracts key metrics and insights.",
      icon: Brain,
      content: "Advanced OCR and NLP technology identifies property details, financial metrics, and investment opportunities."
    },
    {
      title: "Professional Deal Tracking",
      description: "Monitor your entire pipeline with institutional-grade tools.",
      icon: BarChart3,
      content: "Track deal progress, generate reports, and collaborate with your team using professional workflows."
    }
  ];

  const detectDocumentType = (file: File): string => {
    const name = file.name.toLowerCase();
    if (name.includes('offering') || name.includes('memo')) return 'Offering Memorandum';
    if (name.includes('financial') || name.includes('model')) return 'Financial Model';
    if (name.includes('rent') || name.includes('roll')) return 'Rent Roll';
    if (name.includes('lease')) return 'Lease Document';
    if (name.includes('appraisal')) return 'Appraisal Report';
    if (name.includes('inspection')) return 'Inspection Report';
    return 'General Document';
  };

  const validateFile = (file: File): string[] => {
    const errors: string[] = [];
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ['.pdf', '.xlsx', '.xls', '.csv', '.doc', '.docx'];
    
    if (file.size > maxSize) {
      errors.push('File size exceeds 50MB limit');
    }
    
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(extension)) {
      errors.push('Unsupported file type');
    }
    
    return errors;
  };

  const processFiles = useCallback((files: File[]) => {
    const processedFiles: UploadedFile[] = files.map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending' as const,
      progress: 0,
      documentType: detectDocumentType(file),
      validationErrors: validateFile(file)
    }));

    setUploadedFiles(prev => [...prev, ...processedFiles]);

    // Simulate processing each file
    processedFiles.forEach((file, index) => {
      if (file.validationErrors && file.validationErrors.length > 0) {
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'error' } : f
          ));
        }, 500 * index);
        return;
      }

      // Start processing
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'processing' } : f
        ));

        // Progress simulation
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setUploadedFiles(prev => prev.map(f => 
              f.id === file.id ? { 
                ...f, 
                status: 'completed', 
                progress: 100,
                extractedData: {
                  propertyType: detectDocumentType(file),
                  estimatedValue: '$' + (Math.random() * 2000000 + 500000).toFixed(0),
                  confidence: Math.floor(Math.random() * 30 + 70) + '%'
                }
              } : f
            ));
          } else {
            setUploadedFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, progress } : f
            ));
          }
        }, 200);
      }, 1000 * index);
    });
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      processFiles(files);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, [processFiles]);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSearch = () => {
    // Mock search results
    const mockResults = [
      {
        id: 1,
        address: "123 Main St",
        city: "Los Angeles, CA",
        price: "$850,000",
        bedrooms: 3,
        bathrooms: 2,
        sqft: "1,800",
        type: "Single Family"
      },
      {
        id: 2,
        address: "456 Oak Ave",
        city: "San Diego, CA", 
        price: "$1,200,000",
        bedrooms: 4,
        bathrooms: 3,
        sqft: "2,400",
        type: "Single Family"
      }
    ];
    setSearchResults(mockResults);
  };

  const handleAnalyzeProperty = (property: any) => {
    // Mock analysis data
    const analysisData = {
      ...property,
      janusScore: Math.floor(Math.random() * 100),
      capRate: "8.2%",
      distressLevel: "Medium",
      predictedUpside: "$125,000",
      aiInsights: "Strong potential for value-add renovation. Market comps suggest 15% upside."
    };
    setAnalysisResults(prev => [...prev, analysisData]);
  };

  const handleProcessFiles = () => {
    setProcessingStatus('processing');
    // Mock processing delay
    setTimeout(() => {
      setProcessingStatus('complete');
      const mockParsedDeals = uploadedFiles.map((file, index) => ({
        id: index + 1,
        fileName: file.name,
        type: "Investment Property",
        address: `${123 + index} Mock St`,
        price: `$${(Math.random() * 1000000 + 500000).toFixed(0)}`,
        janusScore: Math.floor(Math.random() * 100) + 1,
        status: "Parsed Successfully"
      }));
      setAnalysisResults(mockParsedDeals);
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border glass">
        <h1 className="font-display text-lg text-foreground glow-text">Deal Management</h1>
        <p className="text-sm text-muted-foreground">AI-powered deal analysis</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-6">
          <Tabs defaultValue="upload" className="h-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload & Parse
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
              <Database className="w-4 h-4" />
              Deal Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {/* Document Upload Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground glow-text">Document Upload</h2>
                <p className="text-sm text-muted-foreground">AI-powered processing</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowWalkthrough(true)}
                className="glass hover:bg-white/10 border-border"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            </div>

            {/* Upload Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">1</div>
                  Select Upload Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all ${uploadMethod === 'local' ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                    onClick={() => setUploadMethod('local')}
                  >
                    <CardContent className="p-4 text-center">
                      <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground">Local Files</h4>
                      <p className="text-xs text-muted-foreground">Upload from your device</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${uploadMethod === 'cloud' ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                    onClick={() => setUploadMethod('cloud')}
                  >
                    <CardContent className="p-4 text-center">
                      <CloudUpload className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground">Cloud Storage</h4>
                      <p className="text-xs text-muted-foreground">Google Drive, Dropbox</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${uploadMethod === 'url' ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                    onClick={() => setUploadMethod('url')}
                  >
                    <CardContent className="p-4 text-center">
                      <FolderOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground">URL Import</h4>
                      <p className="text-xs text-muted-foreground">Import from web links</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Upload Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">2</div>
                  Upload Deal Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadMethod === 'local' && (
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                      isDragOver 
                        ? 'border-primary bg-primary/5 scale-105' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Drag & Drop Your Documents
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        or click to browse your files
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        <Badge variant="secondary">PDF</Badge>
                        <Badge variant="secondary">Excel</Badge>
                        <Badge variant="secondary">Word</Badge>
                        <Badge variant="secondary">CSV</Badge>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <div className="flex gap-2">
                        <Button 
                          variant="default"
                          onClick={() => fileInputRef.current?.click()}
                          className="cursor-pointer"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Select Files
                        </Button>
                        <Button variant="outline">
                          <FolderOpen className="w-4 h-4 mr-2" />
                          Browse Folder
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {uploadMethod === 'cloud' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-16 flex flex-col gap-2">
                        <CloudUpload className="w-6 h-6" />
                        <span>Google Drive</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col gap-2">
                        <CloudUpload className="w-6 h-6" />
                        <span>Dropbox</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Connect your cloud storage to import documents directly
                    </p>
                  </div>
                )}

                {uploadMethod === 'url' && (
                  <div className="space-y-4">
                    <Input 
                      placeholder="Enter document URL (PDF, Excel, etc.)" 
                      className="w-full"
                    />
                    <Button className="w-full">
                      <CloudUpload className="w-4 h-4 mr-2" />
                      Import from URL
                    </Button>
                  </div>
                )}
                
                {/* Uploaded Files with Advanced Status */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-4">
                    <Separator />
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">Processing Queue</h4>
                      <Badge variant="outline">
                        {uploadedFiles.filter(f => f.status === 'completed').length} / {uploadedFiles.length} Complete
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {uploadedFiles.map((file) => (
                        <Card key={file.id} className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              {file.status === 'completed' && <CheckCircle className="w-5 h-5 text-success" />}
                              {file.status === 'processing' && <Clock className="w-5 h-5 text-primary animate-spin" />}
                              {file.status === 'error' && <AlertCircle className="w-5 h-5 text-destructive" />}
                              {file.status === 'pending' && <Clock className="w-5 h-5 text-muted-foreground" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h5 className="font-medium text-foreground truncate">{file.name}</h5>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                                    <span>•</span>
                                    <span>{file.documentType}</span>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => removeFile(file.id)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              {file.status === 'processing' && (
                                <div className="space-y-2">
                                  <Progress value={file.progress} className="w-full h-2" />
                                  <p className="text-xs text-muted-foreground">
                                    Analyzing document structure and extracting data...
                                  </p>
                                </div>
                              )}
                              
                              {file.status === 'completed' && file.extractedData && (
                                <div className="mt-2 p-3 bg-success/10 rounded border border-success/20">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Shield className="w-4 h-4 text-success" />
                                    <span className="text-sm font-medium text-success">Data Extracted Successfully</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                      <span className="text-muted-foreground">Type: </span>
                                      <span className="font-medium">{file.extractedData.propertyType}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Est. Value: </span>
                                      <span className="font-medium">{file.extractedData.estimatedValue}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {file.status === 'error' && file.validationErrors && (
                                <div className="mt-2 p-3 bg-destructive/10 rounded border border-destructive/20">
                                  <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-4 h-4 text-destructive" />
                                    <span className="text-sm font-medium text-destructive">Upload Failed</span>
                                  </div>
                                  <ul className="text-xs text-destructive space-y-1">
                                    {file.validationErrors.map((error, idx) => (
                                      <li key={idx}>• {error}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Advanced AI Processing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">3</div>
                  Janus AI Processing Engine
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">OCR & NLP</p>
                      <p className="text-xs text-muted-foreground">Advanced text extraction</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Smart Analysis</p>
                      <p className="text-xs text-muted-foreground">Automated insights</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Data Validation</p>
                      <p className="text-xs text-muted-foreground">Quality assurance</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Ready for Processing</p>
                    <p className="text-xs text-muted-foreground">
                      {uploadedFiles.filter(f => f.status === 'completed').length} documents uploaded successfully
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={uploadedFiles.filter(f => f.status === 'completed').length === 0 || processingStatus === 'processing'}
                    onClick={handleProcessFiles}
                    className="flex items-center gap-2"
                  >
                    {processingStatus === 'processing' ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        Processing Pipeline...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Processing Status */}
            {processingStatus !== 'idle' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">3</div>
                    Processing Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={processingStatus === 'processing' ? 60 : 100} className="w-full" />
                    <div className="flex items-center gap-3">
                      {processingStatus === 'processing' ? (
                        <>
                          <Clock className="w-5 h-5 text-primary animate-spin" />
                          <span className="text-sm text-foreground">Extracting data from documents...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 text-success" />
                          <span className="text-sm text-foreground">Processing complete! {uploadedFiles.length} deals parsed successfully.</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            {/* Step 1: Search Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">1</div>
                  Search Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter address, city, or property details..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch}>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
                
                {searchResults.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Search Results:</p>
                    {searchResults.map((property) => (
                      <div key={property.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-foreground flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              {property.address}
                            </h4>
                            <p className="text-sm text-muted-foreground">{property.city}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{property.price}</p>
                            <Badge variant="outline">{property.type}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <span>{property.sqft} sqft</span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleAnalyzeProperty(property)}
                          className="w-full"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Run Janus Analysis
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Deal Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResults.map((deal, index) => (
                    <div key={deal.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{deal.address}</h4>
                          <p className="text-sm text-muted-foreground">{deal.city} • {deal.type}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={deal.janusScore > 80 ? "default" : deal.janusScore > 60 ? "secondary" : "destructive"}>
                            Janus Score: {deal.janusScore}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Price: </span>
                          <span className="font-medium text-foreground">{deal.price}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cap Rate: </span>
                          <span className="font-medium text-foreground">{deal.capRate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status: </span>
                          <Badge variant="outline" className="text-xs">
                            {deal.status}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Upside: </span>
                          <span className="font-medium text-success">{deal.predictedUpside}</span>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-secondary/30 rounded">
                        <p className="text-sm text-foreground">{deal.aiInsights}</p>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Run Analysis
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Deal Database Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileSpreadsheet className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">{analysisResults.length}</p>
                            <p className="text-sm text-muted-foreground">Total Deals</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-8 h-8 text-success" />
                          <div>
                            <p className="font-medium text-foreground">{analysisResults.filter(d => d.janusScore > 80).length}</p>
                            <p className="text-sm text-muted-foreground">Premium Deals</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-8 h-8 text-warning" />
                          <div>
                            <p className="font-medium text-foreground">{analysisResults.filter(d => d.janusScore <= 60).length}</p>
                            <p className="text-sm text-muted-foreground">Needs Review</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Deal Database Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Deal Database</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisResults.map((deal) => (
                          <div key={deal.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground">{deal.address}</h4>
                                <p className="text-sm text-muted-foreground">{deal.fileName}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-medium text-foreground">{deal.price}</p>
                                <p className="text-sm text-muted-foreground">{deal.capRate} cap</p>
                              </div>
                              <Badge variant={deal.janusScore > 80 ? "default" : deal.janusScore > 60 ? "secondary" : "destructive"}>
                                {deal.janusScore}
                              </Badge>
                              <Button size="sm" variant="outline">
                                <Search className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Export Deals
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>

      {/* Professional Walkthrough Dialog */}
      <Dialog open={showWalkthrough} onOpenChange={setShowWalkthrough}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Professional Deal Management Guide
            </DialogTitle>
            <DialogDescription>
              Learn how to maximize efficiency with our advanced document upload and analysis system
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                {walkthroughSteps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                {(() => {
                  const IconComponent = walkthroughSteps[currentStep].icon;
                  return <IconComponent className="w-8 h-8 text-primary" />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {walkthroughSteps[currentStep].title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {walkthroughSteps[currentStep].description}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {walkthroughSteps[currentStep].content}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={() => {
                  if (currentStep < walkthroughSteps.length - 1) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    setShowWalkthrough(false);
                    setCurrentStep(0);
                  }
                }}
              >
                {currentStep < walkthroughSteps.length - 1 ? 'Next' : 'Get Started'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}