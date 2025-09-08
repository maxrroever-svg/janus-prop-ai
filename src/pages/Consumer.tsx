import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { SmartSearch } from "@/components/consumer/SmartSearch";

const Consumer = () => {
  console.log("Consumer component is rendering");
  
  return (
    <SidebarProvider>
      <ConsumerSidebar />
      
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Smart Search" subtitle="AI-powered real estate search and analysis" />
        
        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Dashboard Metrics Banner */}
          <section className="section band band--horizon glass border-b border-border/30 p-6">
            <div className="container max-w-4xl mx-auto">
              <div className="mb-6">
                <p className="text-muted-foreground text-center">
                  AI-powered real estate search and analysis
                </p>
              </div>

              {/* Bloomberg-style metrics */}
              <div className="flex flex-wrap justify-center gap-4">
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">DEAL SCORE</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">91</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+2.1</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">DSCR</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">1.28</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+0.03</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">CAP RATE</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">6.8%</span>
                  <span className="delta down num text-red-400 text-sm ml-1">-0.2%</span>
                </span>
                <span className="chip glass border border-border/30 px-3 py-2 rounded-lg">
                  <span className="label text-xs text-muted-foreground uppercase tracking-wide">RENT BAND</span>
                  <span className="value num text-lg font-bold text-foreground ml-2">$1,780</span>
                  <span className="delta up num text-accent-green text-sm ml-1">+15</span>
                </span>
              </div>
            </div>
          </section>

          {/* Main Dashboard content */}
          <div className="p-6">
            <SmartSearch />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Consumer;