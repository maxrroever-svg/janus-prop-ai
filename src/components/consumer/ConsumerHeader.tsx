import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const ConsumerHeader = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Janus Consumer — Your AI Homebuying Assistant
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button className="btn-professional" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};