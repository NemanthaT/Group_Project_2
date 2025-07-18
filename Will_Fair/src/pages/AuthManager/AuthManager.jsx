import React, { useState } from "react";
import DashboardPage from "./DashboardPage";
import ProductReviewPage from "./ProductReviewPage";
import "./AuthManagerDashboard.css";

const AuthManager = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const closeSidebar = () => setSidebarVisible(false);

  const handleNavItemClick = (tabId) => {
    setActiveTab(tabId);
    closeSidebar(); // Close sidebar on mobile after navigation
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "requests", label: "Requests" },
    { id: "products", label: "Product Reviews" },
  ];

  const handleNavClick = (itemId) => {
    handleNavItemClick(itemId);
    closeSidebar();
  };

  return (
    <div className="dashboard">
      {/* Mobile overlay */}
      <div className={`sidebar-overlay ${sidebarVisible ? 'visible' : ''}`} onClick={closeSidebar}></div>

      {/* Sidebar Section - moved inline */}
      <div className={`sidebar ${sidebarVisible ? 'mobile-visible' : 'mobile-hidden'}`}>

        <img className="profile-icon" alt="Profile" src="/profile-icon-5.png" />

        <div className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="nav-item-text">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <button className="logout-btn">Logout</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        
        <div className="content-wrapper">
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'products' && <ProductReviewPage />}
        </div>
      </div>
    </div>
  );
};

export default AuthManager;