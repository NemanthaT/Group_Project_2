import React, { useState } from "react";

export const MainContentSection = () => {
  const [activeTab, setActiveTab] = useState("monetary");

  const tabOptions = [
    { id: "monetary", label: "Monetary Support" },
    { id: "non-monetary", label: "Non Monetary Support" },
  ];

  return (
    <section className="tabs-container">
      <div className="tabs-list">
        {tabOptions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-trigger ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
};