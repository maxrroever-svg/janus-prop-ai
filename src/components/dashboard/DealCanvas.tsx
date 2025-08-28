import { useState } from "react";
import { AgentStack } from "./AgentStack";
import { DealMap } from "./DealMap";
import { ExplainPanel } from "./ExplainPanel";
import { CommandBar } from "./CommandBar";

export function DealCanvas() {
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [agentRuns, setAgentRuns] = useState<any[]>([]);

  const handleCommand = async (command: string) => {
    // TODO: Implement orchestrator logic
    console.log('Processing command:', command);
  };

  return (
    <div className="h-full flex">
      {/* Left Panel - Agent Stack */}
      <div className="w-80 border-r border-border bg-secondary/30">
        <AgentStack runs={agentRuns} />
      </div>
      
      {/* Center Panel - Map & Command */}
      <div className="flex-1 flex flex-col">
        <CommandBar onCommand={handleCommand} />
        <div className="flex-1">
          <DealMap onDealSelect={setSelectedDeal} />
        </div>
      </div>
      
      {/* Right Panel - Explain */}
      <div className="w-96 border-l border-border bg-secondary/30">
        <ExplainPanel deal={selectedDeal} />
      </div>
    </div>
  );
}