import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/dashboard/Agents";
import DealFeed from "./pages/dashboard/DealFeed";
import Deals from "./pages/dashboard/Deals";
import Plans from "./pages/dashboard/Plans";
import Portfolio from "./pages/dashboard/Portfolio";
import Outreach from "./pages/dashboard/Outreach";
import ICMemos from "./pages/dashboard/ICMemos";
import Settings from "./pages/dashboard/Settings";
import AuditLog from "./pages/dashboard/AuditLog";
import Assistant from "./pages/dashboard/Assistant";
import Intelligence from "./pages/dashboard/Intelligence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/feed" element={<DealFeed />} />
            <Route path="/dashboard/agents" element={<Agents />} />
            <Route path="/dashboard/deals" element={<Deals />} />
            <Route path="/dashboard/plans" element={<Plans />} />
            <Route path="/dashboard/portfolio" element={<Portfolio />} />
            <Route path="/dashboard/outreach" element={<Outreach />} />
            <Route path="/dashboard/memos" element={<ICMemos />} />
            <Route path="/dashboard/intelligence" element={<Intelligence />} />
            <Route path="/dashboard/assistant" element={<Assistant />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/audit" element={<AuditLog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
