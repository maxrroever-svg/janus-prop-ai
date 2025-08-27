import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Calculator,
  FileText,
  Phone,
  TrendingUp,
  Brain,
  Search,
  Shield,
  Database,
  GitBranch,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

const agentProfiles = {
  "Eden": {
    icon: Brain,
    color: "text-gold",
    bgColor: "bg-gold/10",
    role: "Executive Strategist",
    specialty: "Investment decisions and deal ranking"
  },
  "Orion": {
    icon: Search,
    color: "text-ice",
    bgColor: "bg-ice/10", 
    role: "Market Intelligence Scanner",
    specialty: "Property discovery and market analysis"
  },
  "Atelius": {
    icon: Shield,
    color: "text-success",
    bgColor: "bg-success/10",
    role: "Legal Intelligence Agent", 
    specialty: "Legal risk assessment and compliance"
  },
  "Osiris": {
    icon: Calculator,
    color: "text-warning",
    bgColor: "bg-warning/10",
    role: "Financial Modeler",
    specialty: "ROI projections and financial analysis"
  },
  "Celestia": {
    icon: FileText,
    color: "text-ice",
    bgColor: "bg-ice/10",
    role: "Report Generator",
    specialty: "Investment reports and documentation"
  },
  "Valyria": {
    icon: TrendingUp,
    color: "text-gold",
    bgColor: "bg-gold/10",
    role: "Market Forecaster", 
    specialty: "Market trends and price predictions"
  },
  "Spring": {
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    role: "Quality Control Agent",
    specialty: "Data accuracy and validation"
  },
  "Elysia": {
    icon: Database,
    color: "text-ice",
    bgColor: "bg-ice/10",
    role: "Data Integrator",
    specialty: "Data processing and enrichment"
  },
  "Aurora": {
    icon: GitBranch,
    color: "text-gold",
    bgColor: "bg-gold/10",
    role: "Workflow Orchestrator",
    specialty: "Agent coordination and task management"
  }
};

const mockConversations = [
  {
    id: 1,
    agent: "Eden",
    message: "I've analyzed the Oak Street property. The numbers look solid with a 12.4% IRR. Should we prioritize this over the Maple Ave deal?",
    timestamp: "2 min ago",
    isUser: false
  },
  {
    id: 2,
    agent: "User",
    message: "What's the risk profile comparison between these two properties?",
    timestamp: "1 min ago", 
    isUser: true
  },
  {
    id: 3,
    agent: "Atelius",
    message: "Oak Street has clean title with no liens. Maple Ave has 2 minor code violations that could cost ~$15K to resolve. Both are low legal risk overall.",
    timestamp: "30s ago",
    isUser: false
  }
];

export function AIAgentChat() {
  const [selectedAgent, setSelectedAgent] = useState<string>("Eden");
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: conversations.length + 1,
      agent: "User",
      message: message,
      timestamp: "Just now",
      isUser: true
    };

    setConversations(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate agent response
    setTimeout(() => {
      const agentProfile = agentProfiles[selectedAgent as keyof typeof agentProfiles];
      const responses = [
        `I'll analyze that right away. Based on my ${agentProfile.specialty.toLowerCase()}, here's what I found...`,
        `Great question! Let me run the numbers using my specialized algorithms...`,
        `I can help with that. My analysis suggests several key factors to consider...`,
        `Understood. I'll cross-reference this with current market data and provide recommendations...`
      ];
      
      const agentResponse = {
        id: conversations.length + 2,
        agent: selectedAgent,
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: "Just now",
        isUser: false
      };

      setConversations(prev => [...prev, agentResponse]);
    }, 1500);
  };

  const selectedProfile = agentProfiles[selectedAgent as keyof typeof agentProfiles];
  const SelectedIcon = selectedProfile.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 left-6 h-14 px-6 bg-gold text-gold-foreground hover:bg-gold/90 shadow-lg z-50">
          <MessageSquare className="w-5 h-5 mr-2" />
          Ask Janus AI
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-[80vh] bg-card border-border p-0">
        <div className="flex h-full">
          {/* Agent Selection Sidebar */}
          <div className="w-80 bg-secondary border-r border-border">
            <DialogHeader className="p-6 border-b border-border">
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <Bot className="w-5 h-5 text-ice" />
                Janus AI Agents
              </DialogTitle>
            </DialogHeader>

            <div className="p-4 space-y-2">
              {Object.entries(agentProfiles).map(([name, profile]) => {
                const IconComponent = profile.icon;
                return (
                  <Button
                    key={name}
                    variant={selectedAgent === name ? "default" : "ghost"}
                    className={`w-full justify-start p-3 h-auto ${
                      selectedAgent === name 
                        ? 'bg-ice text-ice-foreground' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedAgent(name)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${profile.bgColor}`}>
                        <IconComponent className={`w-4 h-4 ${profile.color}`} />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-medium truncate">{name}</p>
                        <p className="text-xs opacity-75 truncate">{profile.role}</p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedProfile.bgColor}`}>
                  <SelectedIcon className={`w-5 h-5 ${selectedProfile.color}`} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{selectedAgent}</h3>
                  <p className="text-sm text-muted-foreground">{selectedProfile.specialty}</p>
                </div>
                <div className="ml-auto">
                  <Badge variant="outline" className="border-success text-success">
                    Online
                  </Badge>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {conversations.map((conv, index) => {
                const isUser = conv.isUser;
                const agentProfile = isUser ? null : agentProfiles[conv.agent as keyof typeof agentProfiles];
                const AgentIcon = agentProfile?.icon;

                return (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isUser ? 'bg-primary' : agentProfile?.bgColor
                    }`}>
                      {isUser ? (
                        <User className="w-4 h-4 text-primary-foreground" />
                      ) : AgentIcon ? (
                        <AgentIcon className={`w-4 h-4 ${agentProfile?.color}`} />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>

                    {/* Message */}
                    <div className={`max-w-xs lg:max-w-md ${isUser ? 'text-right' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        isUser 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'
                      }`}>
                        {!isUser && (
                          <p className="text-xs font-medium mb-1 opacity-75">{conv.agent}</p>
                        )}
                        <p className="text-sm leading-relaxed">{conv.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{conv.timestamp}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-border bg-card">
              <div className="flex gap-3">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Ask ${selectedAgent} anything about real estate investment...`}
                  className="flex-1 bg-input border-border"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-ice text-ice-foreground hover:bg-ice/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="border-border hover:bg-muted text-xs">
                  Analyze this property
                </Button>
                <Button size="sm" variant="outline" className="border-border hover:bg-muted text-xs">
                  Compare markets
                </Button>
                <Button size="sm" variant="outline" className="border-border hover:bg-muted text-xs">
                  Generate report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}