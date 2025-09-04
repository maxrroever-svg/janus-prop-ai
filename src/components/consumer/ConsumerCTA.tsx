import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export const ConsumerCTA = () => {
  return (
    <Card className="institutional-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/20 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h2 className="font-display text-3xl font-semibold text-foreground">
            With Janus, buying a home is simple, clear, and seamless.
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Join thousands of homebuyers who have simplified their journey with AI-powered assistance.
          </p>
          
          <div className="pt-4">
            <Button size="lg" className="btn-professional px-12 py-4 text-lg">
              Get Started Now
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Expert support</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};