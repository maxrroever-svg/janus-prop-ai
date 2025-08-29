import { useState } from "react";
import { Upload, Search, FileText, MapPin, TrendingUp, Brain, Plus, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DealWorkflowProps {
  onPropertySelect: (property: any) => void;
}

export function DealWorkflow({ onPropertySelect }: DealWorkflowProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

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
    onPropertySelect(analysisData);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="font-display text-xl text-foreground mb-2">Deal Analysis Workflow</h2>
        <p className="text-muted-foreground text-sm">Upload your deals or search properties to run Janus AI analysis</p>
      </div>

      <div className="flex-1 p-6">
        <Tabs defaultValue="upload" className="h-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Deals
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Properties
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
                  <Button size="sm" className="ml-auto" disabled={uploadedFiles.length === 0}>
                    Process Files
                  </Button>
                </div>
              </CardContent>
            </Card>
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
        </Tabs>
      </div>
    </div>
  );
}