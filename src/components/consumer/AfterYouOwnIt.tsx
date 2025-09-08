import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  Wrench, 
  RefreshCw, 
  Building2, 
  Calculator, 
  Shield,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  Home,
  Users,
  FileText,
  Phone,
  MapPin,
  Zap
} from "lucide-react";

// Tax & Insurance Data
const taxInsuranceItems = [
  {
    type: "Property Tax",
    dueDate: "April 15, 2025",
    amount: "$4,250",
    status: "upcoming",
    daysUntil: 45,
    description: "Annual property tax payment due to NYC Department of Finance"
  },
  {
    type: "Homeowners Insurance",
    dueDate: "March 22, 2025", 
    amount: "$1,850",
    status: "upcoming",
    daysUntil: 22,
    description: "Annual premium renewal with State Farm"
  },
  {
    type: "Flood Insurance",
    dueDate: "June 1, 2025",
    amount: "$650",
    status: "scheduled",
    daysUntil: 122,
    description: "FEMA flood insurance policy renewal"
  }
];

// Maintenance Schedule Data
const maintenanceItems = [
  {
    task: "HVAC Filter Replacement",
    frequency: "Every 3 months",
    lastDone: "Jan 15, 2025",
    nextDue: "Apr 15, 2025",
    priority: "medium",
    cost: "$25-50",
    description: "Replace air filters to maintain efficiency and air quality"
  },
  {
    task: "Gutter Cleaning",
    frequency: "Twice yearly",
    lastDone: "Oct 15, 2024",
    nextDue: "Mar 1, 2025",
    priority: "high",
    cost: "$200-400",
    description: "Prevent water damage and ice dams"
  },
  {
    task: "Water Heater Maintenance",
    frequency: "Annually",
    lastDone: "Aug 20, 2024",
    nextDue: "Aug 20, 2025",
    priority: "medium",
    cost: "$150-250",
    description: "Flush tank and inspect components"
  },
  {
    task: "Roof Inspection",
    frequency: "Annually",
    lastDone: "May 10, 2024",
    nextDue: "May 10, 2025",
    priority: "high",
    cost: "$300-500",
    description: "Professional inspection for damage and wear"
  }
];

// Refinance Data
const refinanceData = {
  currentRate: 6.75,
  currentPayment: 3245,
  suggestedRate: 5.95,
  potentialPayment: 2987,
  monthlySavings: 258,
  breakEvenMonths: 18,
  loanBalance: 485000,
  homeValue: 650000,
  ltv: 74.6
};

// Rental Management Data  
const rentalData = {
  marketRent: 4200,
  occupancyRate: 95,
  averageDaysToRent: 12,
  competitiveFeatures: [
    "In-unit laundry",
    "Updated kitchen",
    "Parking space",
    "Pet-friendly"
  ]
};

export const AfterYouOwnIt = () => {
  const [activeTab, setActiveTab] = useState("tax-insurance");

  return (
    <section className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted/30">
          <TabsTrigger value="tax-insurance" className="text-xs">Tax & Insurance</TabsTrigger>
          <TabsTrigger value="maintenance" className="text-xs">Maintenance</TabsTrigger>
          <TabsTrigger value="refinance" className="text-xs">Refinance</TabsTrigger>
          <TabsTrigger value="rental" className="text-xs">Rental Mgmt</TabsTrigger>
          <TabsTrigger value="protection" className="text-xs">Protection</TabsTrigger>
        </TabsList>

        {/* Tax & Insurance Tab */}
        <TabsContent value="tax-insurance" className="space-y-6">
          <Card className="institutional-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Calculator className="h-6 w-6 text-accent" />
                <span>Tax & Insurance Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {taxInsuranceItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'upcoming' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                      }`}>
                        <Calendar className={`h-4 w-4 ${
                          item.status === 'upcoming' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.type}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={item.status === 'upcoming' ? 'destructive' : 'secondary'}>
                            {item.daysUntil} days
                          </Badge>
                          <span className="text-sm text-muted-foreground">Due: {item.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-foreground">{item.amount}</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Bell className="h-3 w-3 mr-1" />
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-2">Annual Tax Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Tax:</span>
                        <span className="text-foreground">$4,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">School Tax:</span>
                        <span className="text-foreground">$2,100</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total Annual:</span>
                        <span>$6,350</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-2">Insurance Coverage</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dwelling:</span>
                        <span className="text-foreground">$425,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Personal Property:</span>
                        <span className="text-foreground">$106,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Liability:</span>
                        <span className="text-foreground">$300,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card className="institutional-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Wrench className="h-6 w-6 text-accent" />
                <span>Maintenance Schedule & Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {maintenanceItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        item.priority === 'high' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <Wrench className={`h-4 w-4 ${
                          item.priority === 'high' ? 'text-red-500' : 'text-yellow-500'  
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.task}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                            {item.priority} priority
                          </Badge>
                          <span className="text-sm text-muted-foreground">Every {item.frequency}</span>
                          <span className="text-sm text-muted-foreground">Cost: {item.cost}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">Next Due</div>
                      <div className="text-sm text-muted-foreground">{item.nextDue}</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Done
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-green-500/5 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Completed</h4>
                    <p className="text-2xl font-bold text-green-500">12</p>
                    <p className="text-sm text-muted-foreground">This year</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-500/5 border-yellow-500/20">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Upcoming</h4>
                    <p className="text-2xl font-bold text-yellow-500">4</p>
                    <p className="text-sm text-muted-foreground">Next 30 days</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Est. Annual</h4>
                    <p className="text-2xl font-bold text-accent">$2,800</p>
                    <p className="text-sm text-muted-foreground">Maintenance cost</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Refinance Tab */}
        <TabsContent value="refinance" className="space-y-6">
          <Card className="institutional-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <RefreshCw className="h-6 w-6 text-accent" />
                <span>Refinance Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-muted/20 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Current Loan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest Rate:</span>
                        <span className="text-foreground font-medium">{refinanceData.currentRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Payment:</span>
                        <span className="text-foreground font-medium">${refinanceData.currentPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Balance:</span>
                        <span className="text-foreground font-medium">${refinanceData.loanBalance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">LTV Ratio:</span>
                        <span className="text-foreground font-medium">{refinanceData.ltv}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-500/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Potential Savings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">New Rate:</span>
                        <span className="text-foreground font-medium">{refinanceData.suggestedRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">New Payment:</span>
                        <span className="text-foreground font-medium">${refinanceData.potentialPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Savings:</span>
                        <span className="text-green-600 font-bold">${refinanceData.monthlySavings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Break-even:</span>
                        <span className="text-foreground font-medium">{refinanceData.breakEvenMonths} months</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Refinance Recommendation
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Based on current market rates and your loan profile, refinancing could save you 
                        <span className="text-green-600 font-medium"> ${refinanceData.monthlySavings * 12}/year</span>. 
                        With closing costs around $4,500, you'll break even in {refinanceData.breakEvenMonths} months.
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button className="btn-professional">
                          <Zap className="h-4 w-4 mr-2" />
                          Get Pre-Qualified
                        </Button>
                        <Button variant="outline">
                          Rate Alerts
                        </Button>
                      </div>
                    </div>
                    <div className="text-center">
                      <TrendingDown className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Rate Trending</p>
                      <p className="text-lg font-bold text-green-500">Down</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rental Management Tab */}
        <TabsContent value="rental" className="space-y-6">
          <Card className="institutional-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Building2 className="h-6 w-6 text-accent" />
                <span>Rental Management Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Market Rent</h4>
                    <p className="text-2xl font-bold text-accent">${rentalData.marketRent}</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-500/5 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Occupancy Rate</h4>
                    <p className="text-2xl font-bold text-green-500">{rentalData.occupancyRate}%</p>
                    <p className="text-sm text-muted-foreground">area average</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-500/5 border-blue-500/20">
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">Time to Lease</h4>
                    <p className="text-2xl font-bold text-blue-500">{rentalData.averageDaysToRent}</p>
                    <p className="text-sm text-muted-foreground">days average</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-muted/20 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Competitive Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {rentalData.competitiveFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Home className="h-4 w-4 mr-2" />
                      Property Enhancement Tips
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/20 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Management Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Tenant Screening</span>
                        <Badge variant="secondary">$75</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Property Marketing</span>
                        <Badge variant="secondary">$150</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Full Management</span>
                        <Badge variant="secondary">8%</Badge>
                      </div>
                    </div>
                    <Button className="btn-professional w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Connect with Property Managers
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Rental Income Calculator
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Rent:</span>
                        <span className="text-foreground font-medium">${rentalData.marketRent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Rent:</span>
                        <span className="text-foreground font-medium">${(rentalData.marketRent * 12).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vacancy (5%):</span>
                        <span className="text-red-500">-${(rentalData.marketRent * 12 * 0.05).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Net Annual Income:</span>
                        <span className="text-green-600">${(rentalData.marketRent * 12 * 0.95).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Tax:</span>
                        <span className="text-red-500">-$6,350</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Insurance:</span>
                        <span className="text-red-500">-$2,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance:</span>
                        <span className="text-red-500">-$2,800</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Net Cash Flow:</span>
                        <span className="text-accent">${((rentalData.marketRent * 12 * 0.95) - 6350 - 2500 - 2800).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comprehensive Protection Tab */}
        <TabsContent value="protection" className="space-y-6">
          <Card className="institutional-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-accent" />
                <span>Comprehensive Home Protection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-500/5 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-blue-500" />
                      <span>Smart Monitoring</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Property value tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Market condition alerts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Neighborhood updates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Crime & safety reports</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-500/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-green-500" />
                      <span>Professional Network</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Vetted contractors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Insurance specialists</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Legal resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Emergency services</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-accent mx-auto mb-2" />
                      <h4 className="font-medium text-foreground mb-2">Document Vault</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Secure storage for all property documents, warranties, and records
                      </p>
                      <Button variant="outline" size="sm">
                        Access Vault
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-accent mx-auto mb-2" />
                      <h4 className="font-medium text-foreground mb-2">Local Intelligence</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Stay informed about zoning changes, permits, and development plans
                      </p>
                      <Button variant="outline" size="sm">
                        View Updates
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
                      <h4 className="font-medium text-foreground mb-2">AI Advisor</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get personalized recommendations and property insights
                      </p>
                      <Button variant="outline" size="sm">
                        Ask Advisor
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-yellow-500/5 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Protection Plan Status
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Coverage Level:</span>
                            <span className="text-sm font-medium text-foreground">Premium</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Next Review:</span>
                            <span className="text-sm font-medium text-foreground">June 15, 2025</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Your comprehensive protection plan is active and monitoring your property 24/7. 
                        We've detected 3 market opportunities and 1 maintenance recommendation this month.
                      </p>
                      <div className="flex space-x-3">
                        <Button className="btn-professional">
                          View Full Report
                        </Button>
                        <Button variant="outline">
                          Upgrade Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};