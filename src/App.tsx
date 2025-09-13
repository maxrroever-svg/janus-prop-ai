import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Consumer from "./pages/Consumer";
import Dashboard from "./pages/Dashboard";
import DealFeed from "./pages/dashboard/DealFeed";
import Forums from "./pages/dashboard/Forums";
import DealAnalytics from "./pages/dashboard/DealAnalytics";
import Deals from "./pages/dashboard/Deals";
import Plans from "./pages/dashboard/Plans";
import Intelligence from "./pages/dashboard/Intelligence";
import ICMemos from "./pages/dashboard/ICMemos";
import Outreach from "./pages/dashboard/Outreach";
import Portfolio from "./pages/dashboard/Portfolio";
import DataLake from "./pages/dashboard/DataLake";
import Assistant from "./pages/dashboard/Assistant";
import Settings from "./pages/dashboard/Settings";
import AuditLog from "./pages/dashboard/AuditLog";
import Agents from "./pages/dashboard/Agents";
import InvestorDueDiligence from "./pages/investor/DueDiligence";

// Consumer pages
import ConsumerDueDiligence from "./pages/consumer/DueDiligence";
import ConsumerAnalysis from "./pages/consumer/Analysis";
import ConsumerMapView from "./pages/consumer/MapView";
import ConsumerUnderwriting from "./pages/consumer/Underwriting";
import ConsumerFinancing from "./pages/consumer/Financing";
import ConsumerClosing from "./pages/consumer/Closing";
import ConsumerOutreach from "./pages/consumer/Outreach";
import ConsumerOwnership from "./pages/consumer/Ownership";
import ConsumerDataLake from "./pages/consumer/DataLake";
import ConsumerAssistant from "./pages/consumer/Assistant";
import ConsumerSettings from "./pages/consumer/Settings";
import ConsumerAuditLog from "./pages/consumer/AuditLog";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/consumer" element={<Consumer />} />
      <Route path="/consumer/analysis" element={<ConsumerAnalysis />} />
      <Route path="/consumer/map" element={<ConsumerMapView />} />
      <Route path="/consumer/underwriting" element={<ConsumerUnderwriting />} />
      <Route path="/consumer/financing" element={<ConsumerFinancing />} />
      <Route path="/consumer/closing" element={<ConsumerClosing />} />
      <Route path="/consumer/outreach" element={<ConsumerOutreach />} />
      <Route path="/consumer/ownership" element={<ConsumerOwnership />} />
      <Route path="/consumer/data-lake" element={<ConsumerDataLake />} />
      <Route path="/consumer/assistant" element={<ConsumerAssistant />} />
      <Route path="/consumer/settings" element={<ConsumerSettings />} />
      <Route path="/consumer/audit" element={<ConsumerAuditLog />} />
      <Route path="/consumer/due-diligence" element={<ConsumerDueDiligence />} />
      <Route path="/investor" element={<Dashboard />} />
      <Route path="/investor/deals" element={<Deals />} />
      <Route path="/investor/deal-feed" element={<DealFeed />} />
      <Route path="/investor/plans" element={<Plans />} />
      <Route path="/investor/intelligence" element={<Intelligence />} />
      <Route path="/investor/memos" element={<ICMemos />} />
      <Route path="/investor/outreach" element={<Outreach />} />
      <Route path="/investor/portfolio" element={<Portfolio />} />
      <Route path="/investor/data-lake" element={<DataLake />} />
      <Route path="/investor/assistant" element={<Assistant />} />
      <Route path="/investor/settings" element={<Settings />} />
      <Route path="/investor/audit" element={<AuditLog />} />
      <Route path="/investor/agents" element={<Agents />} />
      <Route path="/investor/due-diligence" element={<InvestorDueDiligence />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

