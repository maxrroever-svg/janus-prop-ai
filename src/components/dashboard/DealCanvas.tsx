import { useState } from "react";
import { CommandBar } from "./CommandBar";
import { DealWorkflow } from "./DealWorkflow";
import { DealUploader } from "./DealUploader";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function DealCanvas() {
  const [showUploader, setShowUploader] = useState(false);

  const handleCommand = async (command: string) => {
    // Orchestrator logic for AI command processing
    console.log('Processing AI command:', command);
    // Future implementation: Send command to Eden AI orchestrator
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Command Bar */}
      <div className="shrink-0 border-b border-border/30">
        <CommandBar onCommand={handleCommand} />
      </div>
      
      {/* Deal Canvas Header - Simple */}
      <div className="shrink-0 p-4 border-b border-border/30 bg-background/80 backdrop-blur-sm">
        <h3 className="font-display text-xl font-bold text-foreground glow-text">
          Deal Canvas
        </h3>
      </div>

      {/* Address Input Section */}
      <div className="shrink-0 p-4 border-b border-border/30 bg-background/50 backdrop-blur-sm">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter property address..."
              className="w-full px-4 py-3 rounded-lg bg-background/80 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 backdrop-blur-sm"
            />
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3"
          >
            Search
          </Button>
          <Button 
            variant="outline"
            className="bg-background/80 border-border/50 text-foreground hover:bg-background/60 px-6 py-3"
            onClick={() => setShowUploader(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
      
      {/* Main Content Area - Glass Grid */}
      <div className="flex-1 overflow-hidden bg-background p-6">
        <div className="glass-grid-container">
          <DealWorkflow />
        </div>
      </div>

      {/* Deal Uploader Modal */}
      {showUploader && (
        <DealUploader onClose={() => setShowUploader(false)} />
      )}
    </div>
  );
}