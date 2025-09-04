import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Wrench, RefreshCw, Building2, Calculator, Shield } from "lucide-react";

const ownershipFeatures = [
  {
    icon: Calculator,
    title: "Tax & Insurance Reminders",
    description: "Never miss property tax deadlines or insurance renewals",
    action: "Set Reminders"
  },
  {
    icon: Wrench,
    title: "Maintenance Alerts", 
    description: "Proactive maintenance schedules to protect your investment",
    action: "View Schedule"
  },
  {
    icon: RefreshCw,
    title: "Refinance Opportunities",
    description: "Monitor rates and get alerts when refinancing makes sense",
    action: "Check Rates"
  },
  {
    icon: Building2,
    title: "Rental Management",
    description: "Tools to help you rent out your property if needed",
    action: "Get Started"
  }
];

export const AfterYouOwnIt = () => {
  return (
    <section className="space-y-6">
      <h2 className="font-display text-3xl font-semibold text-foreground">
        After You Own It
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {ownershipFeatures.map((feature, index) => (
          <Card key={index} className="institutional-card hover:border-accent/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <span>{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {feature.description}
              </p>
              <Button variant="outline" className="btn-institutional w-full">
                {feature.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="institutional-card bg-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent/20 rounded-full">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Comprehensive Home Protection
              </h3>
              <p className="text-muted-foreground">
                Get peace of mind with ongoing monitoring, alerts, and professional guidance for your most important investment.
              </p>
            </div>
            <Button className="btn-professional">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};