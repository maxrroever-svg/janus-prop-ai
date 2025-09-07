import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Triangle, 
  Hexagon, 
  Shield, 
  ChevronUp, 
  Circle, 
  Brain,
  Database,
  MapPin,
  Scale,
  MessageSquare,
  FileText,
  DollarSign,
  Target,
  Search,
  Zap
} from "lucide-react";

const agents = [
  {
    name: "Orion",
    fullName: "Orion (Market Scout)",
    icon: Search,
    description: "Foreclosure & distress monitoring, market scanning",
    status: "running",
    features: ["Foreclosure tracking", "Tax lien monitoring", "Market alerts", "Distress signals"],
    progress: 75
  },
  {
    name: "Eden", 
    fullName: "Eden (AI Coordinator)",
    icon: Brain,
    description: "Multi-agent orchestration & decision coordination",
    status: "running", 
    features: ["Agent coordination", "Strategy optimization", "Risk assessment", "Priority ranking"],
    progress: 90
  },
  {
    name: "Osiris",
    fullName: "Osiris (Underwriter)",
    icon: Hexagon,
    description: "Financial analysis, comps, ARV, rehab estimates",
    status: "done",
    features: ["Comp analysis", "ARV calculations", "Rehab estimates", "Cash flow projections"],
    progress: 100
  },
  {
    name: "Atelius",
    fullName: "Atelius (Legal)",
    icon: Scale, 
    description: "Title research, liens, zoning, legal compliance",
    status: "idle",
    features: ["Title verification", "Lien analysis", "Zoning compliance", "Legal risk assessment"],
    progress: 0
  },
  {
    name: "Celestia",
    fullName: "Celestia (Capital)",
    icon: DollarSign,
    description: "DSCR analysis, lender matching, rate optimization", 
    status: "idle",
    features: ["DSCR calculations", "Lender matching", "Rate analysis", "Financing optimization"],
    progress: 0
  },
  {
    name: "Valyria",
    fullName: "Valyria (Outreach)",
    icon: MessageSquare,
    description: "Owner contact, outreach automation, deal coordination",
    status: "idle",
    features: ["Owner identification", "Contact research", "Outreach templates", "Communication tracking"],
    progress: 0
  },
  {
    name: "Nexus",
    fullName: "Nexus (Data Ingestion)",
    icon: Database,
    description: "Multi-source data aggregation & processing",
    status: "running",
    features: ["MLS integration", "County records", "ATTOM data", "Public records"],
    progress: 65,
    dataStatus: {
      mls: "connected",
      attom: "syncing", 
      county: "error"
    }
  }
];

const statusColors = {
  idle: "bg-muted text-muted-foreground",
  running: "bg-warning/10 text-warning border-warning/20",
  done: "bg-success/10 text-success border-success/20", 
  error: "bg-destructive/10 text-destructive border-destructive/20"
};

const dataStatusColors = {
  connected: "bg-success/10 text-success border-success/20",
  syncing: "bg-warning/10 text-warning border-warning/20",
  error: "bg-destructive/10 text-destructive border-destructive/20"
};

interface AgentStackProps {
  runs: any[];
}

export function AgentStack({ runs }: AgentStackProps) {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="font-display text-lg text-foreground flex items-center gap-2">
          Agent Operations
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-success font-medium">LIVE</span>
          </div>
        </h2>
        <p className="text-sm text-muted-foreground">
          {agents.filter(a => a.status === 'running').length} running • {agents.filter(a => a.status === 'done').length} completed
        </p>
      </div>
      
      <div className="space-y-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isRunning = agent.status === 'running';
          
          return (
            <Card key={agent.name} className={`glass border-border p-4 ${
              isRunning ? 'border-primary/30 bg-primary/5' : ''
            }`}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-2 rounded-lg ${
                    isRunning ? 'bg-primary/20' : 'bg-secondary'
                  }`}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-1">
                       <h3 className="font-medium text-foreground break-words pr-2">
                         {agent.name}
                       </h3>
                       <Badge className={`${statusColors[agent.status as keyof typeof statusColors]} shrink-0`}>
                         {agent.status}
                       </Badge>
                     </div>
                     <div className="text-xs text-muted-foreground mb-2 break-words leading-relaxed">{agent.description}</div>
                     
                     {agent.status === 'running' && (
                       <div className="space-y-2">
                         <div className="flex justify-between text-xs">
                           <span className="text-muted-foreground">Progress</span>
                           <span className="text-foreground font-medium">{agent.progress}%</span>
                         </div>
                         <Progress value={agent.progress} className="h-2" />
                       </div>
                     )}
                     
                     {agent.name === 'Nexus' && agent.dataStatus && (
                       <div className="space-y-2 mt-2">
                         <p className="text-xs font-medium text-foreground">
                           Data Sources
                         </p>
                         <div className="grid grid-cols-3 gap-1">
                           <Badge className={`${dataStatusColors[agent.dataStatus.mls]} text-xs justify-center px-1 py-0.5 truncate`}>
                             MLS
                           </Badge>
                           <Badge className={`${dataStatusColors[agent.dataStatus.attom]} text-xs justify-center px-1 py-0.5 truncate`}>
                             ATTOM
                           </Badge>
                           <Badge className={`${dataStatusColors[agent.dataStatus.county]} text-xs justify-center px-1 py-0.5 truncate`}>
                             County
                           </Badge>
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
                 
                 {agent.features && (
                   <div className="space-y-1">
                     <p className="text-xs font-medium text-foreground">Capabilities</p>
                     <div className="grid grid-cols-2 gap-1">
                       {agent.features.map((feature, idx) => (
                         <span 
                           key={idx}
                           className="text-xs px-1.5 py-0.5 bg-secondary rounded border text-muted-foreground break-words text-center"
                           title={feature}
                         >
                           {feature.length > 12 ? feature.slice(0, 12) + '...' : feature}
                         </span>
                       ))}
                     </div>
                   </div>
                 )}
                 
                 <div className="grid grid-cols-2 gap-2">
                   <Button size="sm" variant="outline" className={`text-xs h-7 min-w-0 ${
                     isRunning ? 'border-primary/30 text-primary' : ''
                   }`}>
                     Config
                   </Button>
                   <Button size="sm" variant="ghost" className={`text-xs h-7 min-w-0 ${
                     isRunning ? 'text-primary' : ''
                   }`}>
                     Logs
                   </Button>
                 </div>
               </div>
             </Card>
           );
         })}
       </div>
       
       <div className="mt-6 p-4 glass border border-primary/20 rounded-lg">
         <div className="text-xs text-foreground italic flex items-center gap-2">
           <div className="w-2 h-2 bg-primary rounded-full"></div>
           "All agents coordinated through Eden's orchestration engine."
          </div>
       </div>
     </div>
   );
 }