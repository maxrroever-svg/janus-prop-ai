import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  Calendar,
  Send,
  Reply,
  Archive,
  TrendingUp,
  DollarSign
} from "lucide-react";

const consumerConversations = [
  {
    id: 1,
    property: "456 Oak Street",
    contact: "Sarah Thompson (Listing Agent)",
    lastMessage: "The seller is very motivated. Can we schedule a showing?",
    timestamp: "1 hour ago",
    status: "active",
    messages: 6,
    type: "email",
    aiRanking: "High likelihood - Seller motivated, price reduced twice",
    motivation: "high"
  },
  {
    id: 2,
    property: "123 Maple Drive",
    contact: "Robert Johnson (Owner)",
    lastMessage: "I'd prefer cash offers, what can you do?",
    timestamp: "3 hours ago", 
    status: "negotiating",
    messages: 4,
    type: "phone",
    aiRanking: "Medium likelihood - Owner prefers cash, timing flexible",
    motivation: "medium"
  },
  {
    id: 3,
    property: "789 Pine Avenue",
    contact: "Lisa Martinez (Seller)",
    lastMessage: "Need to close quickly due to job relocation",
    timestamp: "1 day ago",
    status: "urgent",
    messages: 3,
    type: "email",
    aiRanking: "High likelihood - Urgent relocation, price negotiable",
    motivation: "high"
  }
];

const consumerNextSteps = [
  {
    id: 1,
    property: "456 Oak Street",
    contact: "Sarah Thompson",
    action: "Schedule home inspection with preferred inspector",
    priority: "high",
    dueDate: "Today, 2:00 PM",
    agent: "AI Assistant"
  },
  {
    id: 2,
    property: "123 Maple Drive", 
    contact: "Robert Johnson",
    action: "Submit pre-approval letter and proof of funds",
    priority: "medium",
    dueDate: "Tomorrow, 10:00 AM",
    agent: "Financing Agent"
  },
  {
    id: 3,
    property: "789 Pine Avenue",
    contact: "Lisa Martinez",
    action: "Prepare competitive offer with quick close timeline",
    priority: "high",
    dueDate: "Today, 4:00 PM",
    agent: "AI Assistant"
  }
];

const consumerEmails = [
  {
    id: 1,
    from: "sarah.thompson@realty.com",
    subject: "Re: Oak Street Property - Showing Request",
    preview: "The seller is very flexible on timing. We can arrange a showing...",
    timestamp: "1 hour ago",
    status: "unread",
    property: "456 Oak Street"
  },
  {
    id: 2,
    from: "robert.johnson@email.com",
    subject: "Maple Drive - Cash Offer Discussion",
    preview: "Thanks for your interest. I'm looking for serious buyers...",
    timestamp: "3 hours ago",
    status: "read",
    property: "123 Maple Drive"
  },
  {
    id: 3,
    from: "lisa.martinez@email.com",
    subject: "Pine Avenue - Quick Sale Needed",
    preview: "Due to my job relocation, I need to sell quickly. Open to...",
    timestamp: "1 day ago",
    status: "replied",
    property: "789 Pine Avenue"
  }
];

const ConsumerOutreach = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "urgent": return "bg-destructive/10 text-destructive border-destructive/20";
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

  const getMotivationIcon = (motivation: string) => {
    switch (motivation) {
      case "high": return <TrendingUp className="w-4 h-4 text-success" />;
      case "medium": return <DollarSign className="w-4 h-4 text-warning" />;
      default: return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <ConsumerHeader title="Outreach" subtitle="Manage communications and follow-ups" />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="font-display text-2xl text-foreground mb-2">Property Communications</h1>
                <p className="text-muted-foreground">
                  Track conversations with sellers, agents, and other stakeholders in your homebuying journey
                </p>
              </div>

              {/* AI Ranking Notice */}
              <Card className="mb-6 bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">AI-Powered Contact Ranking</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI analyzes seller motivation, urgency, and deal likelihood to help you prioritize outreach
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consumer Outreach Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="institutional-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Active Conversations</p>
                        <p className="text-2xl font-semibold text-foreground">{consumerConversations.filter(c => c.status === 'active').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="institutional-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <Clock className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Actions</p>
                        <p className="text-2xl font-semibold text-foreground">{consumerNextSteps.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="institutional-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ice/10 rounded-lg">
                        <Mail className="w-5 h-5 text-ice" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Unread Messages</p>
                        <p className="text-2xl font-semibold text-foreground">{consumerEmails.filter(e => e.status === 'unread').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="institutional-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/10 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">High Priority Leads</p>
                        <p className="text-2xl font-semibold text-foreground">{consumerConversations.filter(c => c.motivation === 'high').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="conversations" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="conversations">Conversations</TabsTrigger>
                  <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
                  <TabsTrigger value="emails">Messages</TabsTrigger>
                </TabsList>

                <TabsContent value="conversations" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg text-foreground">Property Conversations</h2>
                    <Button size="sm" variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Contact Agent
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {consumerConversations.map((conversation) => (
                      <Card key={conversation.id} className="institutional-card">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-foreground">{conversation.contact}</h3>
                                <Badge className={getStatusColor(conversation.status)}>
                                  {conversation.status}
                                </Badge>
                                {getMotivationIcon(conversation.motivation)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{conversation.property}</p>
                              <p className="text-sm text-foreground break-words mb-2">{conversation.lastMessage}</p>
                              <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <p className="text-xs text-primary font-medium">{conversation.aiRanking}</p>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="flex items-center gap-2 mb-2">
                                {conversation.type === 'email' ? (
                                  <Mail className="w-4 h-4 text-ice" />
                                ) : (
                                  <Phone className="w-4 h-4 text-success" />
                                )}
                                <span className="text-xs text-muted-foreground">{conversation.messages} messages</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
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
                    <h2 className="font-display text-lg text-foreground">Upcoming Actions</h2>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {consumerNextSteps.map((step) => (
                      <Card key={step.id} className="institutional-card">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-foreground truncate">{step.action}</h3>
                                <Badge className={getPriorityColor(step.priority)}>
                                  {step.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{step.property} • {step.contact}</p>
                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant="outline" className="text-xs">{step.agent}</Badge>
                                <span className="text-muted-foreground">Due: {step.dueDate}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
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
                    <h2 className="font-display text-lg text-foreground">Message Center</h2>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive Read
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="w-4 h-4 mr-2" />
                        Compose
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {consumerEmails.map((email) => (
                      <Card key={email.id} className="institutional-card">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-foreground truncate">{email.subject}</h3>
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
                            <Button size="sm" variant="outline" className="flex-1">
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
      </div>
    </SidebarProvider>
  );
};

export default ConsumerOutreach;