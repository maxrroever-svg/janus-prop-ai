import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  Settings as SettingsIcon,
  Mail,
  Phone,
  MapPin,
  CreditCard
} from "lucide-react";

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-semibold text-foreground">
                  Janus Consumer
                </span>
                <button 
                  onClick={() => window.location.href = '/'} 
                  className="hover:opacity-80 transition-opacity"
                >
                  <span className="font-display text-xl text-foreground">Janus AI</span>
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="font-display text-2xl text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account preferences and homebuying settings
                </p>
              </div>

              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Demo" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="User" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="demo@janusai.com" />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Preferred Location</Label>
                        <Input id="location" defaultValue="New York, NY" />
                      </div>
                      
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>New Property Matches</Label>
                          <p className="text-sm text-muted-foreground">Get notified when new properties match your criteria</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Price Alerts</Label>
                          <p className="text-sm text-muted-foreground">Alerts when saved properties change price</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Market Updates</Label>
                          <p className="text-sm text-muted-foreground">Weekly market analysis for your areas of interest</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label>Notification Method</Label>
                        <Select defaultValue="email">
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email Only</SelectItem>
                            <SelectItem value="sms">SMS Only</SelectItem>
                            <SelectItem value="both">Email & SMS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <SettingsIcon className="w-5 h-5" />
                        Homebuying Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Price Range</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Input placeholder="Min Price" defaultValue="$300,000" />
                          <Input placeholder="Max Price" defaultValue="$750,000" />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Property Types</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked />
                            <Label>Single Family</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch defaultChecked />
                            <Label>Condo</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch />
                            <Label>Townhouse</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch />
                            <Label>Multi-family</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Minimum Bedrooms</Label>
                        <Select defaultValue="2">
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button>Save Preferences</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <Button>Update Security</Button>
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