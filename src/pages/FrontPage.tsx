import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp } from "lucide-react";

const FrontPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-12">
          <h1 className="font-display text-6xl font-bold text-foreground mb-6">
            Janus AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional real estate intelligence platform powered by AI agents
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Link to="/consumer" className="group">
            <div className="institutional-card p-8 rounded-lg h-full hover:border-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                  <Users className="h-12 w-12 text-accent" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Consumer
                </h2>
                <p className="text-muted-foreground text-center">
                  AI-powered homebuying assistant for individual buyers
                </p>
                <Button className="btn-professional w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </Link>

          <Link to="/investor" className="group">
            <div className="institutional-card p-8 rounded-lg h-full hover:border-primary/50 transition-all duration-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Investor
                </h2>
                <p className="text-muted-foreground text-center">
                  Professional deal sourcing and intelligence platform
                </p>
                <Button variant="outline" className="btn-institutional w-full">
                  Access Dashboard
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;