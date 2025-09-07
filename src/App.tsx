import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Consumer from "./pages/Consumer";
import Dashboard from "./pages/Dashboard";
import ConsumerAssistant from "./pages/consumer/Assistant";
import ConsumerAnalysis from "./pages/consumer/Analysis";
import ConsumerUnderwriting from "./pages/consumer/Underwriting";
import ConsumerFinancing from "./pages/consumer/Financing";
import ConsumerClosing from "./pages/consumer/Closing";
import ConsumerOwnership from "./pages/consumer/Ownership";
import ConsumerSettings from "./pages/consumer/Settings";
import ConsumerAuditLog from "./pages/consumer/AuditLog";
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
import DataLake from "./pages/dashboard/DataLake";
import ConsumerOutreach from "./pages/consumer/Outreach";
import ConsumerDataLake from "./pages/consumer/DataLake";
import ConsumerMapView from "./pages/consumer/MapView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/investor" element={<Dashboard />} />
        <Route path="/consumer/assistant" element={<ConsumerAssistant />} />
        <Route path="/consumer/analysis" element={<ConsumerAnalysis />} />
        <Route path="/consumer/underwriting" element={<ConsumerUnderwriting />} />
        <Route path="/consumer/financing" element={<ConsumerFinancing />} />
        <Route path="/consumer/closing" element={<ConsumerClosing />} />
        <Route path="/consumer/ownership" element={<ConsumerOwnership />} />
        <Route path="/consumer/outreach" element={<ConsumerOutreach />} />
        <Route path="/consumer/settings" element={<ConsumerSettings />} />
        <Route path="/consumer/audit" element={<ConsumerAuditLog />} />
        <Route path="/consumer/data-lake" element={<ConsumerDataLake />} />
        <Route path="/consumer/map" element={<ConsumerMapView />} />
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
        <Route path="/dashboard/data-lake" element={<DataLake />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
