import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, TrendingUp, AlertTriangle, Target, Brain, Clock } from "lucide-react";

const agentInsights = [
  {
    id: 1,
    agent: "Eden",
    type: "coordination",
    icon: Brain,
    timestamp: "2 min ago",
    priority: "high",
    title: "Multi-agent consensus reached on 1247 Atlantic Avenue",
    message: "Coordinated analysis from Orion, Osiris, and Atelius shows 85% probability of 14%+ ROI. Recommending immediate action.",
    action: "Review Deal",
    dealId: 1
  },
  {
    id: 2,
    agent: "Osiris",
    type: "financial",
    icon: TrendingUp,
    timestamp: "5 min ago", 
    priority: "high",
    title: "Exceptional opportunity detected in Queens",
    message: "91-15 Corona Avenue shows 22% below-market pricing with foreclosure filing. ARV analysis complete - $140k upside potential.",
    action: "Fast Track",
    dealId: 3
  },
  {
    id: 3,
    agent: "Orion",
    type: "market",
    icon: Target,
    timestamp: "12 min ago",
    priority: "medium", 
    title: "Market shift detected in Brooklyn submarkets",
    message: "3 new foreclosure filings in Bedford-Stuyvesant area. Anticipating 15% price adjustments in next 30 days.",
    action: "Monitor",
    dealId: null
  },
  {
    id: 4,
    agent: "Atelius", 
    type: "risk",
    icon: AlertTriangle,
    timestamp: "18 min ago",
    priority: "medium",
    title: "Title issue flagged requiring attention",
    message: "156 MacDonough Street has outstanding lien of $23k not disclosed. Recommend 15% price reduction negotiation.",
    action: "Investigate", 
    dealId: 2
  }
];

export function AgentInsights() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "low": return "bg-green-500/10 text-green-600 border-green-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "coordination": return "text-primary";
      case "financial": return "text-success";
      case "market": return "text-ice";
      case "risk": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getAgentColor = (agent: string) => {
    const colors = {
      "Eden": "text-primary",
      "Osiris": "text-success", 
      "Orion": "text-ice",
      "Atelius": "text-gold",
      "Valyria": "text-purple-500",
      "Celestia": "text-pink-500",
      "Aurora": "text-cyan-500",
      "Elysia": "text-emerald-500",
      "Spring": "text-lime-500"
    };
    return colors[agent as keyof typeof colors] || "text-muted-foreground";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-normal text-foreground">Agent Insights</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-medium">Live Updates</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs border-red-500/30 text-red-600 bg-red-500/5">
            {agentInsights.filter(i => i.priority === "high").length} High Priority
          </Badge>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5">
            {agentInsights.length} Total
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {agentInsights.map((insight) => {
          const Icon = insight.icon;
          
          return (
            <Card key={insight.id} className={`dashboard-card cursor-pointer hover:border-primary/30 transition-all duration-200 ${
              insight.priority === "high" ? "border-red-500/20 bg-red-500/5" : ""
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    insight.priority === "high" ? "bg-red-500/10" : "bg-muted/50"
                  }`}>
                    <Icon className={`w-4 h-4 ${getTypeColor(insight.type)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className={`text-xs border-current ${getAgentColor(insight.agent)}`}>
                        {insight.agent}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-sm text-foreground mb-2 break-words">
                      {insight.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed break-words mb-3">
                      {insight.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(insight.priority)}>
                        {insight.priority} priority
                      </Badge>
                      
                      <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                        {insight.action} →
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}