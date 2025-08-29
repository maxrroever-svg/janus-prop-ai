import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown,
  ChevronRight,
  Database,
  Sparkles,
  Calculator,
  Target,
  Briefcase,
  Play,
  Pause,
  FileText,
  Clock,
  DollarSign,
  MessageSquare
} from "lucide-react";

const agents = [
  {
    name: "Nexus (Data Ingestion)",
    description: "Multi-source data aggregation & processing",
    status: "running",
    lastUpdate: "2m ago",
    stats: "4,231 properties scanned",
    icon: Database,
    details: [
      "MLS integration and monitoring",
      "ATTOM data synchronization", 
      "County records processing",
      "Real-time data validation"
    ]
  },
  {
    name: "Orion (Market Scout)", 
    description: "Foreclosure & distress monitoring, market scanning",
    status: "running",
    lastUpdate: "5m ago",
    stats: "156 opportunities identified",
    icon: Sparkles,
    details: [
      "Foreclosure tracking alerts",
      "Tax lien monitoring",
      "Market distress signals",
      "Opportunity prioritization"
    ]
  },
  {
    name: "Osiris (Underwriter)",
    description: "Financial analysis, comps, ARV, rehab estimates",
    status: "idle",
    lastUpdate: "15m ago", 
    stats: "89 deals analyzed",
    icon: Calculator,
    details: [
      "Comp analysis and validation",
      "ARV calculations", 
      "Rehab cost estimates",
      "Cash flow projections"
    ]
  },
  {
    name: "Eden (AI Coordinator)",
    description: "Multi-agent orchestration & decision coordination",
    status: "running",
    lastUpdate: "1m ago",
    stats: "23 coordinated decisions",
    icon: Target,
    details: [
      "Agent coordination protocols",
      "Strategy optimization",
      "Risk assessment synthesis",
      "Priority ranking algorithms"
    ]
  },
  {
    name: "Atelius (Legal)",
    description: "Title research, liens, zoning, legal compliance",
    status: "idle",
    lastUpdate: "32m ago",
    stats: "12 legal reviews completed",
    icon: Briefcase,
    details: [
      "Title verification processes",
      "Lien analysis and detection",  
      "Zoning compliance checks",
      "Legal risk assessment"
    ]
  },
  {
    name: "Celestia (Capital)",
    description: "DSCR analysis, lender matching, rate optimization",
    status: "idle",
    lastUpdate: "45m ago",
    stats: "8 financing scenarios analyzed",
    icon: DollarSign,
    details: [
      "DSCR calculations",
      "Lender matching algorithms",
      "Rate analysis and optimization",
      "Financing structure recommendations"
    ]
  },
  {
    name: "Valyria (Outreach)",
    description: "Owner contact, outreach automation, deal coordination",
    status: "running",
    lastUpdate: "8m ago",
    stats: "14 active conversations",
    icon: MessageSquare,
    details: [
      "Owner identification research",
      "Contact information sourcing",
      "Outreach template generation",
      "Communication tracking"
    ]
  }
];

export function AgentModules() {
  const [expandedAgents, setExpandedAgents] = useState<string[]>(["Nexus (Data Ingestion)"]);

  const toggleAgent = (agentName: string) => {
    setExpandedAgents(prev => 
      prev.includes(agentName) 
        ? prev.filter(name => name !== agentName)
        : [...prev, agentName]
    );
  };

  const runningAgents = agents.filter(agent => agent.status === "running").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-normal">Agent Operations</h2>
          <p className="text-muted-foreground mt-1">
            {runningAgents} of {agents.length} agents actively processing
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
            {runningAgents} Active
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {agents.map((agent, index) => (
          <Card key={index} className="data-card">
            <Collapsible 
              open={expandedAgents.includes(agent.name)}
              onOpenChange={() => toggleAgent(agent.name)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/20 transition-colors rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        agent.status === "running" ? "bg-success/20" : "bg-muted/20"
                      }`}>
                        <agent.icon className={`w-5 h-5 ${
                          agent.status === "running" ? "text-success" : "text-muted-foreground"
                        }`} />
                      </div>
                      
                      <div>
                        <CardTitle className="text-lg font-normal">{agent.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`agent-status ${agent.status}`}>
                          {agent.status === "running" ? (
                            <Play className="w-3 h-3" />
                          ) : (
                            <Pause className="w-3 h-3" />
                          )}
                          {agent.status}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Updated {agent.lastUpdate}
                        </p>
                      </div>
                      
                      {expandedAgents.includes(agent.name) ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Current Activity</h4>
                      <p className="text-sm text-muted-foreground mb-4">{agent.stats}</p>
                      
                      <div className="space-y-2">
                        {agent.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={agent.status === "running" ? "destructive" : "default"}
                          className="flex-1"
                        >
                          {agent.status === "running" ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start
                            </>
                          )}
                        </Button>
                        
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Logs
                        </Button>
                      </div>
                      
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Next run:</span>
                          <span>In 12 minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
}