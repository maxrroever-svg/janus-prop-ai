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
    <div className="flex flex-col overflow-hidden">
      {/* Command Bar */}
      <div className="shrink-0">
        <CommandBar onCommand={handleCommand} onUpload={() => setShowUploader(true)} />
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