import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Eye, X } from "lucide-react";

interface ExplainPanelProps {
  deal: any;
  onClose?: () => void;
}

export function ExplainPanel({ deal, onClose }: ExplainPanelProps) {
  if (!deal) {
    return (
      <div className="p-6 h-full">
        <div className="mb-6">
          <h2 className="font-display text-lg text-foreground">Explain</h2>
          <p className="text-sm text-muted-foreground">AI reasoning and evidence</p>
        </div>
        
        <div className="text-center mt-20">
          <Eye className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">
            Select a deal to see AI analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg text-foreground">Explain</h2>
          <p className="text-sm text-muted-foreground">Why this surfaced</p>
        </div>
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <Card className="institutional-card p-4 mb-6">
        <h3 className="font-medium text-foreground mb-3">AI Brief</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This property surfaced due to multiple distress signals: tax delinquency, 
          recent violations, and below-market pricing. The fundamentals suggest 
          strong value-add potential with projected 14% CoC returns.
        </p>
      </Card>
      
      <Card className="institutional-card p-4 mb-6">
        <h3 className="font-medium text-foreground mb-3">Distress Signals</h3>
        <div className="space-y-2">
          <Badge variant="destructive" className="text-xs">Tax Delinquency</Badge>
          <Badge variant="outline" className="text-xs">Building Violations</Badge>
          <Badge variant="outline" className="text-xs">Below Market Rent</Badge>
        </div>
      </Card>
      
      <Card className="institutional-card p-4 mb-6">
        <h3 className="font-medium text-foreground mb-3">Quick Comparables</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">125 Oak St (0.1 mi)</span>
            <span className="text-foreground">$485K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">89 Pine Ave (0.2 mi)</span>
            <span className="text-foreground">$520K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">67 Elm St (0.3 mi)</span>
            <span className="text-foreground">$475K</span>
          </div>
        </div>
      </Card>
      
      <div className="space-y-3">
        <Button className="w-full glass text-foreground hover:bg-white/10 border border-white/20" size="sm">
          <FileText className="w-4 h-4 mr-2" />
          Generate IC Memo
        </Button>
        <Button variant="outline" className="w-full" size="sm">
          <MessageSquare className="w-4 h-4 mr-2" />
          Draft Outreach
        </Button>
      </div>
    </div>
  );
}