import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Percent, CheckCircle, Building, Calculator, TrendingUp, Shield } from "lucide-react";

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

      {/* Loan Calculator */}
      <Card className="institutional-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-accent" />
            <span>Advanced Loan Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Loan Amount</label>
                <input 
                  type="text" 
                  defaultValue="$400,000"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Interest Rate (%)</label>
                <input 
                  type="text" 
                  defaultValue="6.75"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Loan Term (years)</label>
                <input 
                  type="text" 
                  defaultValue="30"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <Button className="btn-professional w-full">Calculate Payment</Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-card border border-border rounded-lg">
                <h4 className="font-medium text-foreground mb-3">Payment Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Principal & Interest:</span>
                    <span className="font-medium text-foreground">$2,594</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Tax:</span>
                    <span className="font-medium text-foreground">$420</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance:</span>
                    <span className="font-medium text-foreground">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PMI:</span>
                    <span className="font-medium text-foreground">$167</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span className="text-foreground">Total Monthly Payment:</span>
                    <span className="text-foreground">$3,331</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Programs */}
      <Card className="institutional-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span>Loan Programs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Conventional</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Traditional loans with competitive rates for qualified borrowers.
              </p>
              <div className="text-sm space-y-1">
                <div>Down Payment: 3-20%</div>
                <div>Credit Score: 620+</div>
                <div>Rate: 6.75% - 7.25%</div>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium text-foreground mb-2">FHA</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Government-backed loans with lower down payment requirements.
              </p>
              <div className="text-sm space-y-1">
                <div>Down Payment: 3.5%</div>
                <div>Credit Score: 580+</div>
                <div>Rate: 6.50% - 7.00%</div>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium text-foreground mb-2">VA</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Exclusive benefits for eligible veterans and service members.
              </p>
              <div className="text-sm space-y-1">
                <div>Down Payment: 0%</div>
                <div>Credit Score: 580+</div>
                <div>Rate: 6.25% - 6.75%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre-qualification */}
      <Card className="institutional-card border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-accent" />
            <span>Get Pre-Qualified Today</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Get a competitive edge with a pre-qualification letter. Takes 5 minutes and won't affect your credit score.
          </p>
          <div className="flex space-x-2">
            <Button className="btn-professional">Start Pre-Qualification</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};