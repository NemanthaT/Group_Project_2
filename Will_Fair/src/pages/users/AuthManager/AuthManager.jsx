import React, { useState } from "react";
import DashboardPage from "./DashboardPage";
import ProductReviewPage from "./ProductReviewPage";
import PendingDonationRequests from "./PendingDonationRequests";
import PendingEventsApproval from "./PendingEventsApproval";
import "./AuthManagerDashboard.css";

const AuthManager = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
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
    { id: "events", label: "Pending Events" },
  ];

  const handleNavClick = (itemId) => {
    handleNavItemClick(itemId);
    closeSidebar();
  };

  return (
    <div className="authmanager-dashboard">
      {/* Mobile overlay */}
      <div className={`authmanager-sidebar-overlay ${sidebarVisible ? 'authmanager-visible' : ''}`} onClick={closeSidebar}></div>
        <div className={`authmanager-sidebar ${sidebarVisible ? 'authmanager-mobile-visible' : 'authmanager-mobile-hidden'}`}>

          <img className="authmanager-profile-icon" alt="Profile" src="http://localhost:5173/src/assets/images/logo.png" />

          <div className="authmanager-sidebar-nav">
            {navItems.map((item) => (
          <div
            key={item.id}
            className={`authmanager-nav-item ${activeTab === item.id ? 'authmanager-active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span className="authmanager-nav-item-text">
              {item.label}
            </span>
          </div>
            ))}
          </div>

          <button
            className="authmanager-logout-btn"
            onClick={() => {
          localStorage.removeItem('userData');
          window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        {/* Main content */}
      <div className="authmanager-main-content">
        
        <div className="authmanager-content-wrapper">
          {activeTab === 'dashboard' && <DashboardPage user={user}/>}
          {activeTab === 'products' && <ProductReviewPage user={user}/>}
          {activeTab === 'requests' && <PendingDonationRequests />}
          {activeTab === 'events' && <PendingEventsApproval />}
        </div>
      </div>
    </div>
  );
};

export default AuthManager;