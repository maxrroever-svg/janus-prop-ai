import { useState } from "react";
import { DealWorkflow } from "./DealWorkflow";
import { DealUploader } from "./DealUploader";

export function DealCanvas() {
  const [showUploader, setShowUploader] = useState(false);

  const handleCommand = async (command: string) => {
    // Orchestrator logic for AI command processing
    console.log('Processing AI command:', command);
    // Future implementation: Send command to Eden AI orchestrator
  };

  return (
    <div className="flex flex-col overflow-hidden">
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