import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Triangle, Hexagon, Shield, ChevronUp, Circle } from "lucide-react";

const agents = [
  {
    name: "Theme Scout",
    icon: Triangle,
    description: "Sourcing markets, permits, liens",
    status: "idle"
  },
  {
    name: "Underwriter", 
    icon: Hexagon,
    description: "Comps, ARV, sensitivities",
    status: "idle"
  },
  {
    name: "Legal",
    icon: Shield, 
    description: "Title, liens, zoning redlines",
    status: "idle"
  },
  {
    name: "Capital",
    icon: ChevronUp,
    description: "DSCR, rates, lender matches", 
    status: "idle"
  },
  {
    name: "Outreach",
    icon: Circle,
    description: "Owner matched; drafts ready",
    status: "idle"
  }
];

const statusColors = {
  idle: "bg-muted text-muted-foreground",
  running: "bg-warning/10 text-warning border-warning/20",
  done: "bg-success/10 text-success border-success/20", 
  error: "bg-destructive/10 text-destructive border-destructive/20"
};

interface AgentStackProps {
  runs: any[];
}

export function AgentStack({ runs }: AgentStackProps) {
  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="font-display text-lg text-foreground">Agent Stack</h2>
        <p className="text-sm text-muted-foreground">AI agents ready to orchestrate</p>
      </div>
      
      <div className="space-y-3">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <Card key={agent.name} className="institutional-card p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{agent.name}</h3>
                    <Badge className={statusColors[agent.status as keyof typeof statusColors]}>
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-muted/30 border border-border">
        <p className="text-xs text-muted-foreground italic">
          "Type an address to begin orchestration."
        </p>
      </div>
    </div>
  );
}