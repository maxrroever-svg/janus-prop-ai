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
    <header className="consumer-header sticky top-0 z-35 shrink-0 h-16 border-b border-border/30 flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="sidebar-trigger text-foreground hover:bg-accent/10" />
        <div>
          <h1 className="font-display text-sm font-semibold text-foreground glow-text" style={{ maxHeight: '36px' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="font-display text-xs font-medium text-muted-foreground hover:text-accent-blue"
        style={{ fontSize: '12px', maxHeight: '36px' }}
      >
        Janus AI
      </Button>
    </header>
  );
}