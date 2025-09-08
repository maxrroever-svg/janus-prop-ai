import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, CreditCard } from "lucide-react";

const ConsumerSettings = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <main className="flex-1 flex flex-col">
          <ConsumerHeader title="Settings" subtitle="Manage your account and preferences" />
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Profile Settings */}
              <Card className="institutional-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-accent" />
                    <span>Profile Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="demo@janusai.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="institutional-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-accent" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new properties and analysis</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="agent-updates">AI Agent Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified when agents complete tasks</p>
                    </div>
                    <Switch id="agent-updates" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="market-alerts">Market Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts about market changes and opportunities</p>
                    </div>
                    <Switch id="market-alerts" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="institutional-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-accent" />
                    <span>Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </CardContent>
              </Card>

              {/* Billing Settings */}
              <Card className="institutional-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-accent" />
                    <span>Billing & Subscription</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h3 className="font-medium text-foreground">Current Plan: Consumer Pro</h3>
                      <p className="text-sm text-muted-foreground">Unlimited property analysis and AI assistance</p>
                    </div>
                    <Button variant="outline">Manage Plan</Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">Download Invoice</Button>
                    <Button variant="outline">Update Payment Method</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="btn-professional">Save Changes</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConsumerSettings;