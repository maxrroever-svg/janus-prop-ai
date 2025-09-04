import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Percent, CheckCircle, Building } from "lucide-react";

const mockLenders = [
  {
    name: "Bank of America",
    rate: "6.75%",
    apr: "6.82%",
    monthlyPayment: "$3,200",
    type: "Conventional 30-year",
    recommended: true
  },
  {
    name: "Wells Fargo", 
    rate: "6.85%",
    apr: "6.91%",
    monthlyPayment: "$3,240",
    type: "Conventional 30-year",
    recommended: false
  },
  {
    name: "Quicken Loans",
    rate: "6.72%",
    apr: "6.79%", 
    monthlyPayment: "$3,185",
    type: "Conventional 30-year",
    recommended: false
  }
];

export const FinancingHub = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl font-semibold text-foreground">
          Financing Hub
        </h2>
        <Button className="btn-professional">
          <CreditCard className="h-4 w-4 mr-2" />
          Get Pre-Approved
        </Button>
      </div>
      
      <Card className="institutional-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Percent className="h-5 w-5 text-accent" />
            <span>Compare Mortgage Rates</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {mockLenders.map((lender, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all ${
                  lender.recommended
                    ? 'border-success bg-success/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{lender.name}</h3>
                    {lender.recommended && (
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">{lender.rate}</div>
                    <div className="text-sm text-muted-foreground">APR: {lender.apr}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Monthly Payment:</span>
                    <div className="font-semibold text-foreground">{lender.monthlyPayment}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Loan Type:</span>
                    <div className="font-semibold text-foreground">{lender.type}</div>
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="btn-professional">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};