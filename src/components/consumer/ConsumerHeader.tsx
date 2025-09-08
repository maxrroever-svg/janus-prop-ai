import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

interface ConsumerHeaderProps {
  title: string;
  subtitle?: string;
}

export function ConsumerHeader({ title, subtitle }: ConsumerHeaderProps) {
  const navigate = useNavigate();

  // Debug logging
  console.log('ConsumerHeader rendering:', title);

  return (
    <header className="sticky top-0 h-16 border-b border-border/30 dashboard-card flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-foreground hover:bg-accent/10" />
        <div>
          <h1 className="font-display text-xl font-semibold text-foreground glow-text">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="font-display text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        Janus AI
      </Button>
    </header>
  );
}