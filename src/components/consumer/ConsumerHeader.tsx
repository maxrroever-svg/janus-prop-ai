import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

interface ConsumerHeaderProps {
  title: string;
  subtitle?: string;
}

export function ConsumerHeader({ title, subtitle }: ConsumerHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-border/30 dashboard-card flex items-center justify-between px-6">
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
        className="font-display text-lg font-semibold text-foreground hover:text-primary glow-text"
      >
        Janus AI
      </Button>
    </header>
  );
}