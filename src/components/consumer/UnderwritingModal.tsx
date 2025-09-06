import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, FileText, Calculator, TrendingUp, AlertTriangle } from "lucide-react";

interface UnderwritingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnderwritingModal = ({ isOpen, onClose }: UnderwritingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-accent" />
              <span>Demo Underwriting Analysis</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Summary */}
          <Card className="institutional-card">
            <CardHeader>
              <CardTitle className="text-lg">Property Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Property Details</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-muted-foreground">Address:</span> 123 Maple Street, Detroit, MI</div>
                    <div><span className="text-muted-foreground">Price:</span> $485,000</div>
                    <div><span className="text-muted-foreground">Bedrooms:</span> 3</div>
                    <div><span className="text-muted-foreground">Bathrooms:</span> 2.5</div>
                    <div><span className="text-muted-foreground">Square Feet:</span> 1,850 sq ft</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Loan Details</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-muted-foreground">Loan Amount:</span> $388,000</div>
                    <div><span className="text-muted-foreground">Down Payment:</span> $97,000 (20%)</div>
                    <div><span className="text-muted-foreground">Interest Rate:</span> 6.75%</div>
                    <div><span className="text-muted-foreground">Term:</span> 30 years</div>
                    <div><span className="text-muted-foreground">Monthly Payment:</span> $2,515</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="institutional-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Calculator className="h-4 w-4 text-accent" />
                  <span>Affordability</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Income Needed:</span>
                    <span className="text-sm font-medium text-foreground">$10,060</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Debt-to-Income Ratio:</span>
                    <span className="text-sm font-medium text-foreground">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Credit Score Required:</span>
                    <span className="text-sm font-medium text-foreground">680+</span>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30 w-full justify-center">
                    Affordable
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="institutional-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span>Market Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Market Value:</span>
                    <span className="text-sm font-medium text-foreground">$490,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Appreciation (1yr):</span>
                    <span className="text-sm font-medium text-foreground">+8.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Days on Market:</span>
                    <span className="text-sm font-medium text-foreground">22 days</span>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30 w-full justify-center">
                    Good Value
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="institutional-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span>Risk Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Market Risk:</span>
                    <span className="text-sm font-medium text-foreground">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Liquidity Risk:</span>
                    <span className="text-sm font-medium text-foreground">Medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Interest Rate Risk:</span>
                    <span className="text-sm font-medium text-foreground">Medium</span>
                  </div>
                  <Badge className="bg-warning/20 text-warning border-warning/30 w-full justify-center">
                    Moderate Risk
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparable Properties */}
          <Card className="institutional-card">
            <CardHeader>
              <CardTitle className="text-lg">Comparable Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-4 p-3 border border-border rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium text-foreground">456 Oak Street</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="font-medium text-foreground">$475,000</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sq Ft</div>
                    <div className="font-medium text-foreground">1,820</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Price/Sq Ft</div>
                    <div className="font-medium text-foreground">$261</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-3 border border-border rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium text-foreground">789 Pine Avenue</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="font-medium text-foreground">$495,000</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sq Ft</div>
                    <div className="font-medium text-foreground">1,900</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Price/Sq Ft</div>
                    <div className="font-medium text-foreground">$261</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card className="institutional-card border-success/30 bg-success/5">
            <CardHeader>
              <CardTitle className="text-lg text-success">Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                This property represents a solid investment opportunity. The asking price is within market range, 
                the neighborhood shows strong appreciation trends, and the monthly payment aligns with recommended 
                affordability ratios. Consider making an offer within 5% of asking price.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button className="btn-professional">Download Report</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};