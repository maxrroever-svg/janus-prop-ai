import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AgentStack } from "@/components/dashboard/AgentStack";
import { DecisionHistory } from "@/components/dashboard/DecisionHistory";
import { InvestmentMap } from "@/components/analytics/InvestmentMap";
import { InvestmentCharts } from "@/components/analytics/InvestmentCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Intelligence = () => {
  return (
    <SidebarProvider>
      <div className="janus janus-dashboard min-h-screen w-full flex overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="font-display text-2xl text-foreground mb-2">Intelligence Center</h1>
                <p className="text-muted-foreground">
                  Monitor agent operations, decisions, and investment performance analytics
                </p>
              </div>

              <Tabs defaultValue="agents" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="agents">Agent Operations</TabsTrigger>
                  <TabsTrigger value="decisions">Decision History</TabsTrigger>
                  <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
                  <TabsTrigger value="maps">Investment Map</TabsTrigger>
                </TabsList>

                <TabsContent value="agents" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 xl:col-span-3">
                      <div className="max-w-2xl">
                        <AgentStack runs={[]} />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="decisions" className="space-y-4">
                  <div className="max-w-4xl">
                    <DecisionHistory />
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <InvestmentCharts />
                </TabsContent>

                <TabsContent value="maps" className="space-y-4">
                  <InvestmentMap />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Intelligence;