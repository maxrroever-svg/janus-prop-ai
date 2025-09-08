import { Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar-simple";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="dashboard-header sticky top-0 z-35 shrink-0 h-16 border-b border-border/30 flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="sidebar-trigger text-foreground hover:bg-accent/10" />
        {title ? (
          <div>
            <h1 className="font-display text-sm font-semibold text-foreground glow-text" style={{ maxHeight: '36px' }}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        ) : (
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="font-display text-sm font-semibold text-foreground hover:text-accent-blue glow-text"
            style={{ maxHeight: '36px' }}
          >
            Janus AI
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {title && (
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="font-display text-xs font-medium text-muted-foreground hover:text-accent-blue"
            style={{ fontSize: '12px', maxHeight: '36px' }}
          >
            Janus AI
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>JA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass backdrop-blur-sm border-border/50" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Demo User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  demo@janusai.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}