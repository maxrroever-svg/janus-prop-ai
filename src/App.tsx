import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Consumer from "./pages/Consumer";
import Dashboard from "./pages/Dashboard";
import DealFeed from "./pages/dashboard/DealFeed";
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/consumer" element={<Consumer />} />
      <Route path="/investor" element={<Dashboard />} />
      <Route path="/investor/feed" element={<DealFeed />} />
      <Route path="/investor/deals" element={<Deals />} />
      <Route path="/investor/plans" element={<Plans />} />
      <Route path="/investor/intelligence" element={<Intelligence />} />
      <Route path="/investor/memos" element={<ICMemos />} />
      <Route path="/investor/outreach" element={<Outreach />} />
      <Route path="/investor/portfolio" element={<Portfolio />} />
      <Route path="/investor/data-lake" element={<DataLake />} />
      <Route path="/investor/assistant" element={<Assistant />} />
      <Route path="/investor/settings" element={<Settings />} />
      <Route path="/investor/audit" element={<AuditLog />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

