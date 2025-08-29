import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Bot,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const decisions = [
  {
    id: 1,
    timestamp: "2025-01-15 14:32",
    type: "deal_evaluation",
    actor: "Eden AI",
    decision: "recommend",
    confidence: 87,
    deal: "1247 Atlantic Avenue",
    reasoning: "Multi-agent consensus: 85% probability of 14%+ ROI based on coordinated analysis from Orion, Osiris, and Atelius.",
    outcome: "approved",
    impact: "$127k projected profit"
  },
  {
    id: 2,
    timestamp: "2025-01-15 13:45",
    type: "risk_assessment", 
    actor: "Atelius",
    decision: "flag_risk",
    confidence: 92,
    deal: "156 MacDonough Street",
    reasoning: "Title complications detected: outstanding lien of $23k not disclosed in listing. Recommend renegotiation.",
    outcome: "investigating",
    impact: "Deal value adjustment"
  },
  {
    id: 3,
    timestamp: "2025-01-15 12:18",
    type: "market_opportunity",
    actor: "Orion", 
    decision: "priority_alert",
    confidence: 94,
    deal: "91-15 Corona Avenue",
    reasoning: "Foreclosure filing detected 48hrs ago. Property in gentrifying zone with 23% value appreciation YoY.",
    outcome: "escalated",
    impact: "Fast-track evaluation"
  },
  {
    id: 4,
    timestamp: "2025-01-15 11:55",
    type: "financial_analysis",
    actor: "Osiris",
    decision: "revise_projection", 
    confidence: 76,
    deal: "1455 Webster Avenue",
    reasoning: "Updated comps show 12% higher ARV than initial estimate. Rehab costs revised down 8% based on contractor network.",
    outcome: "completed",
    impact: "+$18k projected equity"
  },
  {
    id: 5,
    timestamp: "2025-01-15 10:22",
    type: "outreach_strategy",
    actor: "Valyria",
    decision: "personalized_approach",
    confidence: 83,
    deal: "1567 Calle San Sebastián",
    reasoning: "Owner research reveals Spanish-speaking preference and previous real estate investment experience. Tailored approach recommended.",
    outcome: "pending",
    impact: "Contact strategy set"
  }
];

const getDecisionIcon = (type: string) => {
  switch (type) {
    case "deal_evaluation": return TrendingUp;
    case "risk_assessment": return AlertTriangle;
    case "market_opportunity": return CheckCircle;
    case "financial_analysis": return TrendingUp;
    case "outreach_strategy": return User;
    default: return Bot;
  }
};

const getOutcomeColor = (outcome: string) => {
  switch (outcome) {
    case "approved": return "bg-success/10 text-success border-success/20";
    case "completed": return "bg-success/10 text-success border-success/20";
    case "escalated": return "bg-warning/10 text-warning border-warning/20";
    case "investigating": return "bg-warning/10 text-warning border-warning/20";
    case "pending": return "bg-muted text-muted-foreground";
    case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return "text-success";
  if (confidence >= 75) return "text-warning";
  return "text-muted-foreground";
};

export function DecisionHistory() {
  return (
    <Card className="institutional-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Decision History
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI agent decision logs and reasoning
        </p>
      </CardHeader>
      
      <CardContent className="p-0 pb-6">
        <ScrollArea className="h-[600px] px-6">
          <div className="space-y-4">
            {decisions.map((decision, index) => {
              const Icon = getDecisionIcon(decision.type);
              
              return (
                <div key={decision.id} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap min-w-0">
                          <Badge variant="outline" className="text-xs shrink-0">
                            {decision.actor}
                          </Badge>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {decision.timestamp}
                          </span>
                        </div>
                        <Badge className={`${getOutcomeColor(decision.outcome)} shrink-0`}>
                          {decision.outcome}
                        </Badge>
                      </div>
                      
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground mb-1 break-words line-clamp-2">
                          {decision.deal}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed break-words line-clamp-3 overflow-hidden">
                          {decision.reasoning}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            Confidence:
                          </span>
                          <span className={`text-xs font-medium whitespace-nowrap ${getConfidenceColor(decision.confidence)}`}>
                            {decision.confidence}%
                          </span>
                        </div>
                        {decision.impact && (
                          <span className="text-xs font-medium text-ice truncate max-w-[120px]">
                            {decision.impact}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {index < decisions.length - 1 && (
                    <Separator className="opacity-30" />
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        <div className="px-6 pt-4">
          <Button variant="outline" size="sm" className="w-full">
            View All Decisions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}