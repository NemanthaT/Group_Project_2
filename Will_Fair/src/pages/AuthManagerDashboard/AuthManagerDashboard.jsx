import React, { useState } from "react";
import "./AuthManagerDashboard.css"; 

const AuthManager = () => {
  const [activeTab, setActiveTab] = useState("donations");

  // Data for stat cards
  const statCards = [
    {
      title: "Total Accepted",
      value: "300",
      increase: "+12%",
      iconType: "accepted",
      icon: "/tick-circle-svgrepo-com-1.svg",
    },
    {
      title: "Total Declined",
      value: "200",
      increase: "+8%",
      iconType: "declined",
      icon: "/icons-q2.png",
    },
    {
      title: "Total donations raised",
      value: "Rs.150,000",
      increase: "+15%",
      iconType: "donations",
      icon: "/vector.svg",
    },
    {
      title: "Regional Donees",
      value: "300",
      increase: "+12%",
      iconType: "donees",
      icon: "/gmail-groups.svg",
    },
  ];

  // Navigation items
  const navItems = [
    { name: "Dashboard", active: true },
    { name: "Requests", active: false },
    { name: "Product Requests", active: false },
  ];

  // Sample donation requests
  const donationRequests = [
    {
      id: 1,
      title: "Emergency Medical Fund",
      description: "Request for medical treatment funding for cancer patient",
      requester: "John Doe",
      amount: "Rs. 50,000",
      date: "2024-01-15",
      status: "pending",
      urgency: "High"
    },
    {
      id: 2,
      title: "Education Support",
      description: "Scholarship request for underprivileged student",
      requester: "Mary Smith",
      amount: "Rs. 25,000",
      date: "2024-01-14",
      status: "pending",
      urgency: "Medium"
    },
    {
      id: 3,
      title: "Disaster Relief",
      description: "Emergency aid for flood victims in rural area",
      requester: "Relief Committee",
      amount: "Rs. 100,000",
      date: "2024-01-13",
      status: "approved",
      urgency: "High"
    },
    {
      id: 4,
      title: "Community Center",
      description: "Funding for building community center",
      requester: "Local Council",
      amount: "Rs. 200,000",
      date: "2024-01-12",
      status: "declined",
      urgency: "Low"
    }
  ];

  // Sample product requests
  const productRequests = [
    {
      id: 1,
      title: "Handmade Crafts Collection",
      description: "Traditional handicrafts made by local artisans",
      seller: "Artisan Collective",
      price: "Rs. 500 - Rs. 2,000",
      date: "2024-01-15",
      status: "pending",
      category: "Handicrafts"
    },
    {
      id: 2,
      title: "Organic Food Products",
      description: "Fresh organic vegetables and fruits from local farms",
      seller: "Green Farm Co-op",
      price: "Rs. 100 - Rs. 500",
      date: "2024-01-14",
      status: "pending",
      category: "Food"
    },
    {
      id: 3,
      title: "Educational Books",
      description: "Second-hand textbooks and educational materials",
      seller: "Book Exchange",
      price: "Rs. 50 - Rs. 300",
      date: "2024-01-13",
      status: "approved",
      category: "Education"
    },
    {
      id: 4,
      title: "Clothing Items",
      description: "Donated clothing items in good condition",
      seller: "Charity Shop",
      price: "Rs. 20 - Rs. 200",
      date: "2024-01-12",
      status: "declined",
      category: "Clothing"
    }
  ];

  const handleApprove = (id, type) => {
    console.log(`Approving ${type} with ID: ${id}`);
    // Add approval logic here
  };

  const handleDecline = (id, type) => {
    console.log(`Declining ${type} with ID: ${id}`);
    // Add decline logic here
  };

  const handleView = (id, type) => {
    console.log(`Viewing ${type} with ID: ${id}`);
    // Add view logic here
  };

  const renderActivityItem = (item, type) => (
    <div key={`${type}-${item.id}`} className={`activity-item ${item.status}`}>
      <div className={`activity-icon ${type === 'donation' ? 'donation' : 'product'}`}>
        {type === 'donation' ? 'D' : 'P'}
      </div>
      <div className="activity-content">
        <div className="activity-title">{item.title}</div>
        <div className="activity-description">{item.description}</div>
        <div className="activity-meta">
          <span>{type === 'donation' ? `By: ${item.requester}` : `Seller: ${item.seller}`}</span>
          <span>{type === 'donation' ? `Amount: ${item.amount}` : `Price: ${item.price}`}</span>
          <span>Date: {item.date}</span>
          {type === 'donation' && <span>Urgency: {item.urgency}</span>}
          {type === 'product' && <span>Category: {item.category}</span>}
        </div>
      </div>
      {item.status === 'pending' && (
        <div className="activity-actions">
          <button 
            className="action-btn approve-btn"
            onClick={() => handleApprove(item.id, type)}
          >
            Approve
          </button>
          <button 
            className="action-btn decline-btn"
            onClick={() => handleDecline(item.id, type)}
          >
            Decline
          </button>
          <button 
            className="action-btn view-btn"
            onClick={() => handleView(item.id, type)}
          >
            View Details
          </button>
        </div>
      )}
      {item.status !== 'pending' && (
        <div className="activity-actions">
          <button 
            className="action-btn view-btn"
            onClick={() => handleView(item.id, type)}
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className={`sidebar`}>
        {/* Logo/Profile */}
        <div className="logo-container-dashboard">
          <div className="logo-dashboard">
            <div className="logo-bg-dashboard" />
            <img alt="Logo" src="/6-6.png" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <div 
              key={`nav-${index}`} 
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              {item.name}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Dashboard Title */}
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-subtitle">Dashboard</div>

          {/* Stat Cards */}
          <div className="stats-grid">
            {statCards.map((card, index) => (
              <div key={`stat-${index}`} className="stat-card">
                <div className={`stat-icon ${card.iconType}`}>
                  <img alt={card.title} src={card.icon} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{card.value}</div>
                  <div className="stat-title">{card.title}</div>
                  <div className="stat-increase">{card.increase}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="activities-card">
            <h2 className="activities-title">Recent Activities</h2>
            
            {/* Tabs */}
            <div className="activities-tabs">
              <button 
                className={`tab-button ${activeTab === 'donations' ? 'active' : ''}`}
                onClick={() => setActiveTab('donations')}
              >
                Donation Requests ({donationRequests.filter(item => item.status === 'pending').length} pending)
              </button>
              <button 
                className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                Product Reviews ({productRequests.filter(item => item.status === 'pending').length} pending)
              </button>
              <button 
                className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Activities
              </button>
            </div>

            {/* Activities List */}
            <div className="activities-list">
              {activeTab === 'donations' && donationRequests.map(item => renderActivityItem(item, 'donation'))}
              {activeTab === 'products' && productRequests.map(item => renderActivityItem(item, 'product'))}
              {activeTab === 'all' && [
                ...donationRequests.map(item => renderActivityItem(item, 'donation')),
                ...productRequests.map(item => renderActivityItem(item, 'product'))
              ]}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthManager;