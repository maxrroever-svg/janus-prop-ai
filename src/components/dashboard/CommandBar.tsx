import { useState } from "react";
import { Search, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CommandBarProps {
  onCommand: (command: string) => void;
}

export function CommandBar({ onCommand }: CommandBarProps) {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command.trim());
      setCommand("");
    }
  };

  return (
    <div className="border-b border-border glass p-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Paste an address or describe your investment criteria..."
            className="pl-10 bg-muted/30 border-border focus:bg-background"
          />
        </div>
        <Button 
          type="submit" 
          className="glass text-foreground hover:bg-white/10 border border-white/20 px-6"
          disabled={!command.trim()}
        >
          <Zap className="w-4 h-4 mr-2" />
          Orchestrate
        </Button>
      </form>
      
      <div className="mt-3 flex gap-2">
        <button 
          type="button"
          onClick={() => setCommand("Find distressed 2-4 unit MF in Brooklyn; CoC > 12%")}
          className="text-xs px-3 py-1 glass hover:bg-white/10 border border-white/20 text-muted-foreground hover:text-foreground transition-colors"
        >
          Distressed MF Brooklyn
        </button>
        <button 
          type="button"
          onClick={() => setCommand("123 Main St, Queens, NY")}
          className="text-xs px-3 py-1 glass hover:bg-white/10 border border-white/20 text-muted-foreground hover:text-foreground transition-colors"
        >
          Analyze Address
        </button>
      </div>
    </div>
  );
}