import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardPage from "./DashboardPage";
import ProductReviewPage from "./ProductReviewPage";
import PendingDonationRequests from "./PendingDonationRequests";
import PendingEventsManagement from "./PendingEventsManagement";
import "./AuthManagerDashboard.css";

const AuthManager = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [eventCounts, setEventCounts] = useState({
    pendingApproval: 0,
    pendingDeletion: 0,
    total: 0
  });

  const closeSidebar = () => setSidebarVisible(false);

  // Fetch event counts on component mount
  useEffect(() => {
    const fetchEventCounts = async () => {
      try {
        const [approvalRes, deletionRes] = await Promise.all([
          axios.get("http://localhost:5000/authManager/pending-events"),
          axios.get("http://localhost:5000/authManager/pending-deletion-events")
        ]);
        
        const approvalCount = approvalRes.data.events?.length || 0;
        const deletionCount = deletionRes.data.events?.length || 0;
        
        setEventCounts({
          pendingApproval: approvalCount,
          pendingDeletion: deletionCount,
          total: approvalCount + deletionCount
        });
      } catch (error) {
        console.error("Failed to fetch event counts:", error);
      }
    };
    
    fetchEventCounts();
  }, []);

  const handleNavItemClick = (tabId) => {
    setActiveTab(tabId);
    closeSidebar(); // Close sidebar on mobile after navigation
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "requests", label: "Requests" },
    { id: "products", label: "Product Reviews" },
    { id: "events", label: "Pending Events", count: eventCounts.total },
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
            {item.count !== undefined && item.count > 0 && (
              <span className="authmanager-nav-badge">{item.count}</span>
            )}
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
          {activeTab === 'events' && <PendingEventsManagement />}
        </div>
      </div>
    </div>
  );
};

export default AuthManager;