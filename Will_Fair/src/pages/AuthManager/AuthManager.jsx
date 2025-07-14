import React, { useState } from "react";
import { SidebarSection } from "./sections/SidebarSection";
import DashboardPage from "./DashboardPage";
import ProductReviewPage from "./ProductReviewPage";
import "./AuthManagerDashboard.css";

const AuthManager = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const closeSidebar = () => setSidebarVisible(false);

  const handleNavItemClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="app-container">
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>☰</button>
      <div className={`sidebar-overlay ${sidebarVisible ? 'visible' : ''}`} onClick={closeSidebar}></div>

      <SidebarSection 
        isVisible={sidebarVisible} 
        onClose={closeSidebar} 
        onNavItemClick={handleNavItemClick} 
        activeTab={activeTab}
      />

      <div className="main-content">

        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'products' && <ProductReviewPage />}

      </div>
    </div>
  );
};

export default AuthManager;
