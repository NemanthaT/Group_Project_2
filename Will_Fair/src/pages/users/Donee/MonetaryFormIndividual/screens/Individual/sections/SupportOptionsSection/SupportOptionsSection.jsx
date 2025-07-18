import React, { useState } from "react";

export const SupportOptionsSection = () => {
  const [activeTab, setActiveTab] = useState("monetary");

  // Define the support options data for easy maintenance
  const supportOptions = [
    { id: "monetary", label: "Monetary Support" },
    { id: "non-monetary", label: "Non Monetary Support" },
  ];

  return (
    <div className="support-tabs">
      <div className="tabs-list">
        {supportOptions.map((option) => (
          <button
            key={option.id}
            className={`tab-trigger ${activeTab === option.id ? 'active' : 'inactive'}`}
            onClick={() => setActiveTab(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};