import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, X, CheckCircle } from "lucide-react";

interface DealUploaderProps {
  onClose: () => void;
}

export const DealUploader = ({ onClose }: DealUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dealName, setDealName] = useState("");
  const [dealDescription, setDealDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="dashboard-card w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Upload Deal Documents
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Deal Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Deal Name
                </label>
                <Input
                  value={dealName}
                  onChange={(e) => setDealName(e.target.value)}
                  placeholder="e.g., 123 Main Street Acquisition"
                  className="cosmic-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <Textarea
                  value={dealDescription}
                  onChange={(e) => setDealDescription(e.target.value)}
                  placeholder="Brief description of the deal..."
                  className="cosmic-input h-24"
                />
              </div>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Upload Documents
              </h3>
              <p className="text-muted-foreground mb-4">
                Drop files here or click to browse
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="btn-institutional" asChild>
                  <span>Choose Files</span>
                </Button>
              </label>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Uploaded Files</h4>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* AI Processing Info */}
            <div className="bg-card/30 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    AI Document Analysis
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Our AI will automatically extract key information including property details,
                    financial data, comparable sales, and risk factors.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 btn-institutional" 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 glass text-foreground hover:bg-glass-hover border border-glass"
                onClick={handleSubmit}
                disabled={!dealName || files.length === 0 || isUploading}
              >
                {isUploading ? "Processing..." : "Upload & Analyze"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};