import React, { useState } from "react";

export const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data for stat cards
  const statCards = [
    {
      title: "Total Donees",
      value: "300",
      iconType: "heart",
      colorClass: "red",
      percentage: "+12%",
    },
    {
      title: "Total Donations",
      value: "Rs.150,000",
      iconSrc: "/vector.svg",
      colorClass: "green",
      percentage: "+12%",
    },
    {
      title: "Total donors",
      value: "208",
      iconSrc: "/users.svg",
      colorClass: "blue",
      percentage: "+12%",
    },
    {
      title: "Regional Managers",
      value: "300",
      iconSrc: "/gmail-groups.svg",
      colorClass: "purple",
      percentage: "+12%",
    },
  ];

  // Navigation items
  const navItems = [
    { name: "Dashboard", active: true },
    { name: "Donees", active: false },
    { name: "Donors", active: false },
    { name: "Regional Managers", active: false },
    { name: "Auth Managers", active: false },
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "donee_request",
      title: "New Donee Account Request",
      description: "Sarah Ahmed has requested to create a donee account",
      time: "2 minutes ago",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      type: "donation_pending",
      title: "Donation Approval Required",
      description: "Rs. 25,000 donation from John Smith needs approval",
      time: "15 minutes ago",
      status: "pending",
      priority: "medium"
    },
    {
      id: 3,
      type: "donee_request",
      title: "Donee Account Request",
      description: "Muhammad Ali has submitted documents for verification",
      time: "1 hour ago",
      status: "under_review",
      priority: "medium"
    },
    {
      id: 4,
      type: "donation_pending",
      title: "Large Donation Pending",
      description: "Rs. 50,000 donation from Fatima Khan awaiting approval",
      time: "2 hours ago",
      status: "pending",
      priority: "high"
    },
    {
      id: 5,
      type: "donee_request",
      title: "Donee Verification Complete",
      description: "Ahmed Hassan's account has been successfully verified",
      time: "3 hours ago",
      status: "approved",
      priority: "low"
    },
    {
      id: 6,
      type: "donation_pending",
      title: "Monthly Donation Review",
      description: "Rs. 15,000 recurring donation needs monthly approval",
      time: "4 hours ago",
      status: "pending",
      priority: "medium"
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getActivityIcon = (type) => {
    if (type === "donee_request") {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="activity-icon">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="activity-icon">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "status-pending", text: "Pending" },
      under_review: { class: "status-review", text: "Under Review" },
      approved: { class: "status-approved", text: "Approved" }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`status-badge ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const getPriorityIndicator = (priority) => {
    return <div className={`priority-indicator priority-${priority}`}></div>;
  };

  const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );

  const LogOutIcon = () => (
    <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );

  return (
    <div className="dashboard-container">
      {/* Mobile menu toggle */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Mobile overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-visible' : 'mobile-hidden'}`}>
        <div className="logo-container">
          <div className="logo-bg"></div>
          <img
            className="logo-img"
            alt="Logo"
            src="/6-6.png"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`nav-button ${item.active ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <button className="logout-button">
            <LogOutIcon />
            <span>Logout</span>
          </button>
          <img
            className="profile-avatar"
            src="/profile-icon-5.png"
            alt="Profile"
          />
        </header>

        {/* Dashboard Title */}
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Dashboard</p>
        </div>

        {/* Stat Cards */}
        <div className="stat-cards">
          {statCards.map((card, index) => (
            <div
              key={index}
              className={`stat-card ${card.colorClass}`}
            >
              <div className={`stat-card-icon ${card.colorClass}`}>
                {card.iconType === 'heart' ? (
                  <HeartIcon />
                ) : (
                  <img
                    alt={card.title}
                    src={card.iconSrc}
                  />
                )}
              </div>
              <div className="stat-card-content">
                <div className="stat-card-value">
                  {card.value}
                </div>
                <div className="stat-card-title">
                  {card.title}
                </div>
                <div className="stat-card-percentage">
                  {card.percentage}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="recent-activities">
          <div className="activities-header">
            <h2>Recent Activities</h2>
            <div className="activities-summary">
              <span className="pending-count">
                {recentActivities.filter(activity => activity.status === 'pending').length} Pending Actions
              </span>
            </div>
          </div>
          
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                {getPriorityIndicator(activity.priority)}
                <div className="activity-icon-container">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <h3 className="activity-title">{activity.title}</h3>
                    {getStatusBadge(activity.status)}
                  </div>
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
                {activity.status === 'pending' && (
                  <div className="activity-actions">
                    <button className="action-btn approve-btn">Approve</button>
                    <button className="action-btn reject-btn">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="activities-footer">
            <button className="view-all-btn">View All Activities</button>
          </div>
        </div>
      </main>
    </div>
  );
};