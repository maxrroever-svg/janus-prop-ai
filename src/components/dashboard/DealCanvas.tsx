import { CommandBar } from "./CommandBar";
import { DealWorkflow } from "./DealWorkflow";

export function DealCanvas() {
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
      
      {/* Main Content Area - Full Width */}
      <div className="flex-1 overflow-hidden">
        <DealWorkflow />
      </div>
    </div>
  );
}