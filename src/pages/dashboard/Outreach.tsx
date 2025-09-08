import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Calendar,
  Send,
  Reply,
  Archive,
  TrendingUp
} from "lucide-react";

const progressConversations = [
  {
    id: 1,
    property: "1247 Atlantic Avenue",
    contact: "Maria Rodriguez",
    lastMessage: "Interested in discussing. Can we schedule a call?",
    timestamp: "2 hours ago",
    status: "active",
    messages: 4,
    type: "email",
    aiRanking: "High motivation - Property vacant 6 months, owner relocated",
    motivation: "high"
  },
  {
    id: 2,
    property: "156 MacDonough Street",
    contact: "James Chen",
    lastMessage: "Need to review with partner first",
    timestamp: "1 day ago", 
    status: "pending",
    messages: 2,
    type: "phone",
    aiRanking: "Medium likelihood - No urgency signals, reviewing options",
    motivation: "medium"
  },
  {
    id: 3,
    property: "91-15 Corona Avenue",
    contact: "Sandra Williams",
    lastMessage: "What's your best offer?",
    timestamp: "3 days ago",
    status: "negotiating",
    messages: 8,
    type: "email",
    aiRanking: "High profitability - Owner of 123 Main St has high motivation, 3 missed mortgage payments, likely to respond",
    motivation: "high"
  }
];

const nextSteps = [
  {
    id: 1,
    property: "1247 Atlantic Avenue",
    contact: "Maria Rodriguez",
    action: "Schedule call for property walkthrough",
    priority: "high",
    dueDate: "Today, 3:00 PM",
    agent: "Valyria"
  },
  {
    id: 2,
    property: "156 MacDonough Street", 
    contact: "James Chen",
    action: "Send comparable sales analysis",
    priority: "medium",
    dueDate: "Tomorrow",
    agent: "Osiris"
  },
  {
    id: 3,
    property: "91-15 Corona Avenue",
    contact: "Sandra Williams",
    action: "Follow up on negotiation terms",
    priority: "high",
    dueDate: "Jan 17, 10:00 AM",
    agent: "Valyria"
  }
];

const emails = [
  {
    id: 1,
    from: "maria.rodriguez@email.com",
    subject: "Re: Atlantic Avenue Property Inquiry",
    preview: "Thank you for reaching out about the property. I'm definitely interested...",
    timestamp: "2 hours ago",
    status: "unread",
    property: "1247 Atlantic Avenue"
  },
  {
    id: 2,
    from: "james.chen@email.com",
    subject: "MacDonough Street - Questions",
    preview: "I have a few questions about the property condition and timeline...",
    timestamp: "1 day ago",
    status: "read",
    property: "156 MacDonough Street"
  },
  {
    id: 3,
    from: "sandra.w@email.com",
    subject: "Corona Avenue - Counter Offer",
    preview: "I've reviewed your offer and would like to propose a counter...",
    timestamp: "3 days ago",
    status: "replied",
    property: "91-15 Corona Avenue"
  }
];

const Outreach = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "negotiating": return "bg-ice/10 text-ice border-ice/20";
      case "unread": return "bg-warning/10 text-warning border-warning/20";
      case "read": return "bg-muted text-muted-foreground";
      case "replied": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Outreach" subtitle="Manage communications and lead nurturing" />
        <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2 glow-text">Outreach</h1>
                <p className="text-muted-foreground">
                  Manage conversations, track progress, and coordinate next steps with property owners
                </p>
              </div>

              {/* AI Ranking Notice */}
              <Card className="mb-6 glass border-primary/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg glass">
                      <TrendingUp className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground glow-text">AI-Powered Contact Ranking</h3>
                      <p className="text-sm text-muted-foreground">
                        AI ranks contacts by deal likelihood, motivation, or profitability. Example: "Owner of 123 Main St has high motivation, 3 missed mortgage payments, likely to respond."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Outreach Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-success/20 rounded-lg glass">
                        <MessageSquare className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Active Conversations</p>
                        <p className="text-2xl font-display font-semibold text-foreground glow-text">{progressConversations.filter(c => c.status === 'active').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-warning/20 rounded-lg glass">
                        <Clock className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Actions</p>
                        <p className="text-2xl font-display font-semibold text-foreground glow-text">{nextSteps.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ice/20 rounded-lg glass">
                        <Mail className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Unread Emails</p>
                        <p className="text-2xl font-display font-semibold text-foreground glow-text">{emails.filter(e => e.status === 'unread').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/20 rounded-lg glass">
                        <CheckCircle className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                        <p className="text-2xl font-display font-semibold text-foreground glow-text">67%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="conversations" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 glass">
                  <TabsTrigger value="conversations" className="font-display">Progress Conversations</TabsTrigger>
                  <TabsTrigger value="next-steps" className="font-display">Next Steps</TabsTrigger>
                  <TabsTrigger value="emails" className="font-display">Email Inbox</TabsTrigger>
                </TabsList>

                <TabsContent value="conversations" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground glow-text">Active Conversations</h2>
                    <Button size="sm" variant="outline" className="glass text-foreground hover:bg-white/10 border border-white/20">
                      <Send className="w-4 h-4 mr-2" />
                      New Outreach
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                     {progressConversations.map((conversation) => (
                       <Card key={conversation.id} className="glass">
                         <CardContent className="p-4">
                           <div className="flex items-start justify-between mb-3">
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center gap-2 mb-1">
                                 <h3 className="font-display font-medium text-foreground glow-text">{conversation.contact}</h3>
                                 <Badge className={getStatusColor(conversation.status)}>
                                   {conversation.status}
                                 </Badge>
                               </div>
                               <p className="text-sm text-muted-foreground mb-2">{conversation.property}</p>
                               <p className="text-sm text-foreground break-words mb-2">{conversation.lastMessage}</p>
                               <div className="flex items-center gap-2 p-2 glass rounded-lg">
                                 <TrendingUp className="w-4 h-4 text-foreground" />
                                 <p className="text-xs text-foreground font-medium">{conversation.aiRanking}</p>
                               </div>
                             </div>
                             <div className="text-right ml-4">
                               <div className="flex items-center gap-2 mb-2">
                                 {conversation.type === 'email' ? (
                                   <Mail className="w-4 h-4 text-foreground" />
                                 ) : (
                                   <Phone className="w-4 h-4 text-foreground" />
                                 )}
                                 <span className="text-xs text-muted-foreground">{conversation.messages} messages</span>
                               </div>
                               <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                             </div>
                           </div>
                           
                           <div className="flex gap-2">
                             <Button size="sm" variant="outline" className="flex-1 glass text-foreground hover:bg-white/10 border border-white/20">
                               <Reply className="w-4 h-4 mr-2" />
                               Reply
                             </Button>
                             <Button size="sm" variant="ghost" className="flex-1">
                               View History
                             </Button>
                           </div>
                         </CardContent>
                       </Card>
                     ))}
                  </div>
                </TabsContent>

                <TabsContent value="next-steps" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground glow-text">Next Steps</h2>
                    <Button size="sm" variant="outline" className="glass text-foreground hover:bg-white/10 border border-white/20">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Action
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {nextSteps.map((step) => (
                      <Card key={step.id} className="glass">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-medium text-foreground truncate glow-text">{step.action}</h3>
                                <Badge className={getPriorityColor(step.priority)}>
                                  {step.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{step.property} • {step.contact}</p>
                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant="outline" className="text-xs glass">{step.agent}</Badge>
                                <span className="text-muted-foreground">Due: {step.dueDate}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 glass text-foreground hover:bg-white/10 border border-white/20">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Complete
                            </Button>
                            <Button size="sm" variant="ghost" className="flex-1">
                              Reschedule
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="emails" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground glow-text">Email Communications</h2>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="glass text-foreground hover:bg-white/10 border border-white/20">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive Read
                      </Button>
                      <Button size="sm" variant="outline" className="glass text-foreground hover:bg-white/10 border border-white/20">
                        <Send className="w-4 h-4 mr-2" />
                        Compose
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {emails.map((email) => (
                      <Card key={email.id} className="glass">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-medium text-foreground truncate glow-text">{email.subject}</h3>
                                <Badge className={getStatusColor(email.status)}>
                                  {email.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{email.from}</p>
                              <p className="text-sm text-foreground break-words">{email.preview}</p>
                              <p className="text-xs text-muted-foreground mt-2">Property: {email.property}</p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-xs text-muted-foreground">{email.timestamp}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 glass text-foreground hover:bg-white/10 border border-white/20">
                              <Reply className="w-4 h-4 mr-2" />
                              Reply
                            </Button>
                            <Button size="sm" variant="ghost" className="flex-1">
                              View Full
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Outreach;