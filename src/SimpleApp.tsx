import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Simple test components
const HomePage = () => {
  const navigate = useNavigate();
  
  console.log("HomePage rendering");
  
  return (
    <div style={{ padding: "20px", background: "black", color: "white", minHeight: "100vh" }}>
      <h1>Janus AI - Home Page</h1>
      <button 
        onClick={() => {
          console.log("Navigating to consumer");
          navigate("/consumer");
        }}
        style={{ 
          background: "blue", 
          color: "white", 
          padding: "20px", 
          margin: "10px",
          fontSize: "18px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Go to Consumer Dashboard
      </button>
      <button 
        onClick={() => {
          console.log("Navigating to investor");
          navigate("/investor");
        }}
        style={{ 
          background: "green", 
          color: "white", 
          padding: "20px", 
          margin: "10px",
          fontSize: "18px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Go to Investor Dashboard
      </button>
    </div>
  );
};

const ConsumerDashboard = () => {
  console.log("ConsumerDashboard rendering");
  return (
    <div style={{ padding: "20px", background: "blue", color: "white", minHeight: "100vh" }}>
      <h1>CONSUMER DASHBOARD LOADED SUCCESSFULLY!</h1>
      <button onClick={() => window.location.href = "/"} style={{ padding: "10px", fontSize: "16px" }}>
        Back to Home
      </button>
    </div>
  );
};

const InvestorDashboard = () => {
  console.log("InvestorDashboard rendering");
  return (
    <div style={{ padding: "20px", background: "green", color: "white", minHeight: "100vh" }}>
      <h1>INVESTOR DASHBOARD LOADED SUCCESSFULLY!</h1>
      <button onClick={() => window.location.href = "/"} style={{ padding: "10px", fontSize: "16px" }}>
        Back to Home
      </button>
    </div>
  );
};

const SimpleApp = () => {
  console.log("SimpleApp rendering");
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/consumer" element={<ConsumerDashboard />} />
      <Route path="/investor" element={<InvestorDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default SimpleApp;