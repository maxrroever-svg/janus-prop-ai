import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Database, 
  Shield, 
  Zap,
  DollarSign,
  MapPin,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle,
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full flex overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h1 className="font-display text-2xl text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground">
                  Configure your platform preferences, integrations, and agent parameters
                </p>
              </div>

              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  <TabsTrigger value="agents">Agent Config</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Demo" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="User" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="demo@janusai.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" defaultValue="Janus AI Real Estate" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="analyst">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="analyst">Investment Analyst</SelectItem>
                            <SelectItem value="manager">Portfolio Manager</SelectItem>
                            <SelectItem value="director">Investment Director</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        <Save className="w-4 h-4 mr-2" />
                        Save Profile
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">New Deal Alerts</h4>
                            <p className="text-sm text-muted-foreground">Get notified when Orion identifies new opportunities</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Agent Status Updates</h4>
                            <p className="text-sm text-muted-foreground">Notifications when agents complete analysis or encounter issues</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">High-Priority Decisions</h4>
                            <p className="text-sm text-muted-foreground">Eden coordination alerts for time-sensitive opportunities</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Owner Response Notifications</h4>
                            <p className="text-sm text-muted-foreground">Valyria outreach responses and follow-up reminders</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Legal Risk Alerts</h4>
                            <p className="text-sm text-muted-foreground">Atelius notifications for title issues or legal complications</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-4 border-t pt-4">
                        <h4 className="font-medium">Notification Methods</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span>Email Notifications</span>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>SMS Alerts (Critical Only)</span>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="integrations" className="space-y-6">
                  <Card className="dashboard-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Data Source Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">MLS Connections</h4>
                            <p className="text-sm text-muted-foreground">12 active MLS feeds connected</p>
                          </div>
                          <Badge className="bg-success/10 text-success border-success/20">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">ATTOM Data</h4>
                            <p className="text-sm text-muted-foreground">Property records and analytics API</p>
                          </div>
                          <Badge className="bg-warning/10 text-warning border-warning/20">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Syncing
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">County Records</h4>
                            <p className="text-sm text-muted-foreground">Tax liens, foreclosures, ownership data</p>
                          </div>
                          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Error
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4 border-t pt-4">
                        <h4 className="font-medium">API Configurations</h4>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="refreshRate">Data Refresh Rate (minutes)</Label>
                            <Select defaultValue="15">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5">5 minutes</SelectItem>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="agents" className="space-y-6">
                  <Card className="dashboard-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Agent Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Orion (Market Scout)</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Auto-scan frequency</span>
                              <Select defaultValue="10">
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">5 min</SelectItem>
                                  <SelectItem value="10">10 min</SelectItem>
                                  <SelectItem value="15">15 min</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Minimum deal size</span>
                              <Input className="w-32" defaultValue="$100,000" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Osiris (Underwriter)</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Minimum cap rate threshold</span>
                              <Input className="w-32" defaultValue="8%" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Risk tolerance level</span>
                              <Select defaultValue="medium">
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Conservative</SelectItem>
                                  <SelectItem value="medium">Moderate</SelectItem>
                                  <SelectItem value="high">Aggressive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-3">Eden (AI Coordinator)</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Decision confidence threshold</span>
                              <Input className="w-32" defaultValue="85%" />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Auto-approve low-risk deals</span>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="dashboard-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Button variant="outline">Enable 2FA</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Session Timeout</h4>
                            <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                          </div>
                          <Select defaultValue="60">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 min</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                              <SelectItem value="480">8 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-3 border-t pt-4">
                          <h4 className="font-medium">API Keys</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded">
                              <div>
                                <span className="font-mono text-sm">sk-janus-••••••••••••••••</span>
                                <p className="text-xs text-muted-foreground">Created Jan 15, 2025</p>
                              </div>
                              <Button variant="outline" size="sm">Regenerate</Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 border-t pt-4">
                          <h4 className="font-medium">Password</h4>
                          <Button variant="outline">Change Password</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;