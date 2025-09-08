import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { UnderwritingModal } from "./UnderwritingModal";

export const OneClickUnderwriting = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <section className="space-y-6">
      
      <Card className="institutional-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-accent" />
            <span>Generate Bank-Ready Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Get a comprehensive underwriting memo with comps, risks, affordability analysis, and appreciation forecast that you can share directly with lenders.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Comps Analysis</h3>
              <p className="text-sm text-muted-foreground">Recent sales & market data</p>
            </div>
            
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Risk Assessment</h3>
              <p className="text-sm text-muted-foreground">Liens, zoning, HOA issues</p>
            </div>
            
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Affordability</h3>
              <p className="text-sm text-muted-foreground">Payment scenarios & forecasts</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              className="btn-professional px-8"
              onClick={() => setShowModal(true)}
            >
              Generate Underwriting Memo
            </Button>
          </div>
        </CardContent>
      </Card>

      <UnderwritingModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </section>
  );
};