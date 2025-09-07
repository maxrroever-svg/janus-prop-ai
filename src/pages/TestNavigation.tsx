import React from "react";
import { useNavigate } from "react-router-dom";

const TestNavigation = () => {
  console.log("TestNavigation component rendering");
  const navigate = useNavigate();
  console.log("TestNavigation useNavigate:", typeof navigate);

  const testConsumerNav = () => {
    console.log("TEST: Consumer navigation triggered");
    navigate("/consumer");
  };

  const testInvestorNav = () => {
    console.log("TEST: Investor navigation triggered");
    navigate("/investor");
  };

  return (
    <div style={{ 
      position: "fixed", 
      top: "10px", 
      right: "10px", 
      zIndex: 99999, 
      background: "red", 
      padding: "10px",
      border: "2px solid white"
    }}>
      <h3 style={{ color: "white", margin: "0 0 10px 0" }}>TEST NAVIGATION</h3>
      <button 
        onClick={testConsumerNav}
        style={{ 
          background: "blue", 
          color: "white", 
          padding: "5px 10px", 
          margin: "5px",
          border: "none",
          cursor: "pointer"
        }}
      >
        TEST Consumer
      </button>
      <button 
        onClick={testInvestorNav}
        style={{ 
          background: "green", 
          color: "white", 
          padding: "5px 10px", 
          margin: "5px", 
          border: "none",
          cursor: "pointer"
        }}
      >
        TEST Investor
      </button>
    </div>
  );
};

export default TestNavigation;