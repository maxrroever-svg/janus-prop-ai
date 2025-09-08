import { useState } from "react";
import { Search, Zap, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CommandBarProps {
  onCommand: (command: string) => void;
  onUpload?: () => void;
}

export function CommandBar({ onCommand, onUpload }: CommandBarProps) {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command.trim());
      setCommand("");
    }
  };

  return (
    <div className="section band band--fog glass border-b border-border/30 p-6">
      <div className="container max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Paste an address or describe your investment criteria..."
              className="pl-10 text-base py-6 glass border-border/50 bg-surface/50 backdrop-blur-sm placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              type="submit" 
              size="lg"
              className="btn-professional px-8"
              disabled={!command.trim()}
            >
              <Zap className="w-4 h-4 mr-2" />
              Orchestrate
            </Button>
            {onUpload && (
              <Button 
                type="button"
                onClick={onUpload}
                variant="outline"
                size="lg"
                className="px-8"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Deal
              </Button>
            )}
          </div>
        </form>
        
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <button 
            type="button"
            onClick={() => setCommand("Find distressed 2-4 unit MF in Brooklyn; CoC > 12%")}
            className="chip glass border border-border/30 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
          >
            Distressed MF Brooklyn
          </button>
          <button 
            type="button"
            onClick={() => setCommand("123 Main St, Queens, NY")}
            className="chip glass border border-border/30 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
          >
            Analyze Address
          </button>
          <button 
            type="button"
            onClick={() => setCommand("Find 1-2 unit SFH in Miami; rental yield > 8%")}
            className="chip glass border border-border/30 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
          >
            Miami SFH Rental
          </button>
        </div>
      </div>
    </div>
  );
}