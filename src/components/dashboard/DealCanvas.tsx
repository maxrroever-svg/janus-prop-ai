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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Command Bar */}
      <div className="shrink-0 border-b border-border">
        <CommandBar onCommand={handleCommand} />
      </div>
      
      {/* Deal Upload Actions */}
      <div className="shrink-0 p-4 border-b border-border glass">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground glow-text">
            Deal Canvas
          </h3>
          <Button 
            className="glass hover:bg-white/10 border border-white/20 text-foreground hover:text-white"
            onClick={() => setShowUploader(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Deal
          </Button>
        </div>
      </div>
      
      {/* Main Content Area - Full Width */}
      <div className="flex-1 overflow-hidden">
        <DealWorkflow />
      </div>

      {/* Deal Uploader Modal */}
      {showUploader && (
        <DealUploader onClose={() => setShowUploader(false)} />
      )}
    </div>
  );
}