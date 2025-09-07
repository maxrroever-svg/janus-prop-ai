import { SidebarProvider } from "@/components/ui/sidebar";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  MapPin, 
  Shield, 
  TrendingUp, 
  School, 
  Car, 
  ShoppingCart,
  Hospital,
  Coffee,
  Star,
  AlertTriangle,
  CheckCircle,
  Home,
  DollarSign,
  Building
} from "lucide-react";

const Analysis = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full bg-background flex">
        <ConsumerSidebar />
        <div className="flex-1 flex flex-col">
          <ConsumerHeader 
            title="Property Analysis" 
            subtitle="AI-powered insights including neighborhood analysis, crime rates, and building perks"
          />
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              {/* Property Search */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Enter property address or MLS number..."
                        className="pl-10"
                      />
                    </div>
                    <Button>Analyze Property</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sample Property Analysis */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Home className="w-5 h-5" />
                          1247 Atlantic Avenue, Brooklyn, NY 11216
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">4 bed • 3 bath • 2,100 sq ft • Built 1925</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">$875,000</div>
                        <div className="text-sm text-muted-foreground">Listed 3 days ago</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
                        <TabsTrigger value="comparables">Comparables</TabsTrigger>
                        <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-success/10 rounded-lg">
                                  <TrendingUp className="w-5 h-5 text-success" />
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Market Value</p>
                                  <p className="text-xl font-semibold text-foreground">$892,000</p>
                                  <p className="text-xs text-success">+2% above asking</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  <DollarSign className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Est. Monthly</p>
                                  <p className="text-xl font-semibold text-foreground">$4,247</p>
                                  <p className="text-xs text-muted-foreground">20% down, 6.5% APR</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-warning/10 rounded-lg">
                                  <Star className="w-5 h-5 text-warning" />
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Janus Score</p>
                                  <p className="text-xl font-semibold text-foreground">8.4/10</p>
                                  <p className="text-xs text-success">Excellent Match</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">AI Analysis Summary</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            This well-maintained Victorian townhouse offers excellent value in Bedford-Stuyvesant. 
                            Recent renovations include updated kitchen and bathrooms. The property sits on a tree-lined 
                            street with easy access to transportation. Expected appreciation of 4-6% annually based on 
                            neighborhood trends. Strong rental potential if needed.
                          </p>
                        </div>

                        {/* Building Amenities */}
                        <Card className="institutional-card">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Building className="h-5 w-5 text-accent" />
                              <span>Building Amenities & Features</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h4 className="font-medium text-foreground mb-3">Building Features</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">24/7 Doorman</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Fitness Center</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Rooftop Pool</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Beautiful Lobby</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Concierge Service</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-foreground mb-3">Property Highlights</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">River Views</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Hardwood Floors</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Modern Kitchen</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">High Ceilings</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">In-Unit Laundry</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-foreground mb-3">Parking & Storage</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Garage Parking</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Storage Unit</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Bike Storage</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm text-foreground">Package Room</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="neighborhood" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Safety & Crime
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Overall Safety Score</span>
                                <Badge className="bg-warning/10 text-warning">7.2/10</Badge>
                              </div>
                              <Progress value={72} className="h-2" />
                              
                              <div className="space-y-2 text-xs text-muted-foreground">
                                <div className="flex justify-between">
                                  <span>Violent Crime</span>
                                  <span className="text-success">Below NYC average</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Property Crime</span>
                                  <span className="text-warning">Average</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Police Response</span>
                                  <span className="text-success">6.5 min avg</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <School className="w-5 h-5" />
                                Schools & Education
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">School District Rating</span>
                                <Badge className="bg-success/10 text-success">8/10</Badge>
                              </div>
                              
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span>Elementary (PS 5)</span>
                                  <span className="text-success">0.3 mi • 8.5/10</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Middle (IS 93)</span>
                                  <span className="text-success">0.6 mi • 7.8/10</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>High (Benjamin Banneker)</span>
                                  <span className="text-success">1.2 mi • 9.1/10</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Car className="w-5 h-5" />
                                Transportation
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Transit Score</span>
                                <Badge className="bg-success/10 text-success">9.1/10</Badge>
                              </div>
                              
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span>A/C Subway</span>
                                  <span className="text-success">2 min walk</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>G Train</span>
                                  <span className="text-success">5 min walk</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Manhattan Commute</span>
                                  <span>25-35 min</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Coffee className="w-5 h-5" />
                                Amenities & Lifestyle
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Walk Score</span>
                                <Badge className="bg-success/10 text-success">8.7/10</Badge>
                              </div>
                              
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span>Grocery Stores</span>
                                  <span className="text-success">4 within 0.5 mi</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Restaurants</span>
                                  <span className="text-success">25+ nearby</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Herbert Von King Park</span>
                                  <span>3 min walk</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="comparables" className="space-y-4 mt-4">
                        <div className="space-y-4">
                          {[
                            { address: "1255 Atlantic Ave", price: "$825,000", beds: 3, baths: 2, sqft: 1900, sold: "2 weeks ago", distance: "0.1 mi" },
                            { address: "1189 Atlantic Ave", price: "$910,000", beds: 4, baths: 3, sqft: 2200, sold: "1 month ago", distance: "0.2 mi" },
                            { address: "1301 Pacific St", price: "$795,000", beds: 3, baths: 2, sqft: 1850, sold: "3 weeks ago", distance: "0.3 mi" }
                          ].map((comp, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-semibold text-foreground">{comp.address}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {comp.beds} bed • {comp.baths} bath • {comp.sqft} sq ft
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-semibold text-foreground">{comp.price}</div>
                                    <div className="text-xs text-muted-foreground">
                                      Sold {comp.sold} • {comp.distance}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="risks" className="space-y-4 mt-4">
                        <div className="space-y-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                                <div>
                                  <h4 className="font-semibold text-foreground">Clean Title</h4>
                                  <p className="text-sm text-muted-foreground">No liens, judgments, or legal issues found</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                                <div>
                                  <h4 className="font-semibold text-foreground">Flood Zone</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Property is in FEMA Flood Zone X (minimal risk). Flood insurance not required but recommended.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                                <div>
                                  <h4 className="font-semibold text-foreground">Recent Renovations</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Kitchen and bathroom updates completed in 2022. All permits properly filed.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                                <div>
                                  <h4 className="font-semibold text-foreground">Market Competition</h4>
                                  <p className="text-sm text-muted-foreground">
                                    High buyer demand in area. Properties average 7 days on market with multiple offers.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Analysis;