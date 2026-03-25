import React from "react";
import "./timelineTabs.css";

const tabs = ["Day", "Week", "Month", "Year", "Detailed"];

export default function TimelineTabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-btn ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}