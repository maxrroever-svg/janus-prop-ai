import { useState } from "react";
import { Upload, Search, FileText, MapPin, TrendingUp, Brain, Plus, File, BarChart3, FileSpreadsheet, Database, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export function DealWorkflow() {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
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
      <div className="p-6 border-b border-border">
        <h1 className="font-display text-2xl text-foreground mb-2">Professional Deal Management</h1>
        <p className="text-muted-foreground">Upload, parse, analyze, and manage your real estate deals with AI-powered insights</p>
      </div>

      <div className="flex-1 p-6">
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
            {/* Step 1: Upload Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">1</div>
                  Upload Deal Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Upload property documents, financial statements, or deal packages
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <Plus className="w-4 h-4 mr-2" />
                      Select Files
                    </Button>
                  </label>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Uploaded Files:</p>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-secondary/30 rounded">
                        <File className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{file.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 2: AI Processing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">2</div>
                  AI Document Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                  <Brain className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Janus AI Analysis</p>
                    <p className="text-xs text-muted-foreground">Extract key metrics, identify opportunities, generate insights</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="ml-auto" 
                    disabled={uploadedFiles.length === 0 || processingStatus === 'processing'}
                    onClick={handleProcessFiles}
                  >
                    {processingStatus === 'processing' ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Process Files
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
                          <CheckCircle className="w-5 h-5 text-green-500" />
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
                {analysisResults.length > 0 ? (
                  <div className="space-y-4">
                    {analysisResults.map((deal, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-foreground">{deal.address || deal.fileName}</h4>
                            <p className="text-sm text-muted-foreground">{deal.type || "Document Analysis"}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={deal.janusScore > 70 ? "default" : deal.janusScore > 40 ? "secondary" : "destructive"}>
                              Janus Score: {deal.janusScore}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Price: </span>
                            <span className="font-medium text-foreground">{deal.price}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cap Rate: </span>
                            <span className="font-medium text-foreground">{deal.capRate || "TBD"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status: </span>
                            <span className="font-medium text-green-600">{deal.status || "Analyzed"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Upside: </span>
                            <span className="font-medium text-foreground">{deal.predictedUpside || "TBD"}</span>
                          </div>
                        </div>
                        {deal.aiInsights && (
                          <div className="mt-3 p-3 bg-secondary/30 rounded">
                            <p className="text-sm text-foreground">{deal.aiInsights}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No deals analyzed yet. Upload documents or search properties to get started.</p>
                  </div>
                )}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                          <CheckCircle className="w-8 h-8 text-green-500" />
                          <div>
                            <p className="font-medium text-foreground">{analysisResults.filter(d => d.janusScore > 70).length}</p>
                            <p className="text-sm text-muted-foreground">High Scoring</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-8 h-8 text-yellow-500" />
                          <div>
                            <p className="font-medium text-foreground">{analysisResults.filter(d => d.janusScore <= 40).length}</p>
                            <p className="text-sm text-muted-foreground">Needs Review</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
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
  );
}