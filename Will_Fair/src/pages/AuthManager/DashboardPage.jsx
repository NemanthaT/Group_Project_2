import React, { useState } from "react";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("donations");

  const statsCards = [
    { value: '300', label: 'Total Accepted', icon: '✅', color: '#22c55e', trend: '+12%' },
    { value: '200', label: 'Total Declined', icon: '❌', color: '#ef4444', trend: '+8%' },
    { value: 'Rs. 150,000', label: 'Total Donations Raised', icon: '💰', color: '#3b82f6', trend: '+15%' },
    { value: '300', label: 'Regional Donees', icon: '👥', color: '#e879f9', trend: '+12%' }
  ];

  const donationRequests = [
    { id: 1, title: "Emergency Medical Fund", description: "Request for medical treatment funding for cancer patient", requester: "John Doe", amount: "Rs. 50,000", date: "2024-01-15", status: "pending", urgency: "High" },
    { id: 2, title: "Education Support", description: "Scholarship request for underprivileged student", requester: "Mary Smith", amount: "Rs. 25,000", date: "2024-01-14", status: "pending", urgency: "Medium" },
    { id: 3, title: "Disaster Relief", description: "Emergency aid for flood victims in rural area", requester: "Relief Committee", amount: "Rs. 100,000", date: "2024-01-13", status: "approved", urgency: "High" },
    { id: 4, title: "Community Center", description: "Funding for building community center", requester: "Local Council", amount: "Rs. 200,000", date: "2024-01-12", status: "declined", urgency: "Low" },
  ];

  const productRequests = [
    { id: 1, title: "Handmade Crafts Collection", description: "Traditional handicrafts made by local artisans", seller: "Artisan Collective", price: "Rs. 500 - Rs. 2,000", date: "2024-01-15", status: "pending", category: "Handicrafts" },
    { id: 2, title: "Organic Food Products", description: "Fresh organic vegetables and fruits from local farms", seller: "Green Farm Co-op", price: "Rs. 100 - Rs. 500", date: "2024-01-14", status: "pending", category: "Food" },
    { id: 3, title: "Educational Books", description: "Second-hand textbooks and educational materials", seller: "Book Exchange", price: "Rs. 50 - Rs. 300", date: "2024-01-13", status: "approved", category: "Education" },
    { id: 4, title: "Clothing Items", description: "Donated clothing items in good condition", seller: "Charity Shop", price: "Rs. 20 - Rs. 200", date: "2024-01-12", status: "declined", category: "Clothing" },
  ];

  const recentActivities = [
    { type: 'donation', title: 'Medical Emergency Fund', user: 'John Doe', time: '2 hours ago', status: 'pending' },
    { type: 'product', title: 'Handmade Crafts', user: 'Artisan Collective', time: '3 hours ago', status: 'approved' },
    { type: 'donation', title: 'Education Support', user: 'Mary Smith', time: '5 hours ago', status: 'pending' },
    { type: 'product', title: 'Organic Food Products', user: 'Green Farm', time: '1 day ago', status: 'declined' }
  ];

  const handleApprove = (id, type) => {
    console.log(`Approving ${type} with ID: ${id}`);
  };

  const handleDecline = (id, type) => {
    console.log(`Declining ${type} with ID: ${id}`);
  };

  const handleView = (id, type) => {
    console.log(`Viewing ${type} with ID: ${id}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'declined': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="authmanager-dashboard-content">
      {/* Welcome Section */}
      <div className="authmanager-welcome-section">
        <div className="authmanager-welcome-content">
          <h2>Welcome back, Admin!</h2>
          <p>Here's what's happening with your platform today</p>
        </div>
        <div className="authmanager-quick-actions">
          <button className="authmanager-quick-action-btn authmanager-primary">Review Pending</button>
          <button className="authmanager-quick-action-btn authmanager-secondary">Generate Report</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="authmanager-stats-grid">
        {statsCards.map((card, index) => (
          <div key={index} className="authmanager-stat-card">
            <div className="authmanager-stat-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
              {card.icon}
            </div>
            <div className="authmanager-stat-info">
              <div className="authmanager-stat-value">{card.value}</div>
              <div className="authmanager-stat-label">{card.label}</div>
              <div className="authmanager-stat-trend" style={{ color: card.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>
                {card.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="authmanager-overview-grid">
        {/* Recent Activities */}
        <div className="authmanager-overview-card">
          <div className="authmanager-card-header">
            <h3>Recent Activities</h3>
            <button className="authmanager-view-all-btn">View All</button>
          </div>
          <div className="authmanager-card-content">
            <div className="authmanager-activities-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="authmanager-activity-item">
                  <div className="authmanager-activity-icon" style={{ 
                    backgroundColor: activity.type === 'donation' ? '#3b82f615' : '#e879f915',
                    color: activity.type === 'donation' ? '#3b82f6' : '#e879f9'
                  }}>
                    {activity.type === 'donation' ? '💰' : '📦'}
                  </div>
                  <div className="authmanager-activity-info">
                    <div className="authmanager-activity-title">{activity.title}</div>
                    <div className="authmanager-activity-user">by {activity.user}</div>
                    <div className="authmanager-activity-time">{activity.time}</div>
                  </div>
                  <span className="authmanager-status-badge" style={{ backgroundColor: getStatusColor(activity.status) }}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Requests Summary */}
        <div className="authmanager-overview-card">
          <div className="authmanager-card-header">
            <h3>Pending Requests</h3>
            <button className="authmanager-view-all-btn">Manage All</button>
          </div>
          <div className="authmanager-card-content">
            <div className="authmanager-pending-summary">
              <div className="authmanager-summary-item">
                <div className="authmanager-summary-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
                  💰
                </div>
                <div className="authmanager-summary-info">
                  <div className="authmanager-summary-value">{donationRequests.filter(r => r.status === 'pending').length}</div>
                  <div className="authmanager-summary-label">Donation Requests</div>
                </div>
                <button className="authmanager-summary-action">Review</button>
              </div>
              <div className="authmanager-summary-item">
                <div className="authmanager-summary-icon" style={{ backgroundColor: '#e879f915', color: '#e879f9' }}>
                  📦
                </div>
                <div className="authmanager-summary-info">
                  <div className="authmanager-summary-value">{productRequests.filter(r => r.status === 'pending').length}</div>
                  <div className="authmanager-summary-label">Product Reviews</div>
                </div>
                <button className="authmanager-summary-action">Review</button>
              </div>
            </div>
          </div>
        </div>

        {/* High Priority Items */}
        <div className="authmanager-overview-card">
          <div className="authmanager-card-header">
            <h3>High Priority</h3>
            <button className="authmanager-view-all-btn">View All</button>
          </div>
          <div className="authmanager-card-content">
            <div className="authmanager-priority-list">
              {donationRequests.filter(r => r.urgency === 'High').map((item, index) => (
                <div key={index} className="authmanager-priority-item">
                  <div className="authmanager-priority-info">
                    <div className="authmanager-priority-title">{item.title}</div>
                    <div className="authmanager-priority-meta">
                      <span style={{ color: getUrgencyColor(item.urgency) }}>
                        {item.urgency} Priority
                      </span>
                      <span>{item.amount}</span>
                    </div>
                  </div>
                  <div className="authmanager-priority-actions">
                    <button className="authmanager-action-btn authmanager-approve">✓</button>
                    <button className="authmanager-action-btn authmanager-decline">✗</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Activities Table */}
      <div className="authmanager-table-section">
        <div className="authmanager-section-header">
          <h3>Recent Requests</h3>
          <div className="authmanager-table-actions">
            <div className="authmanager-search-box">
              <input type="text" placeholder="Search requests..." />
              <span className="authmanager-search-icon">🔍</span>
            </div>
            <select className="authmanager-filter-select">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Declined</option>
            </select>
            <div className="authmanager-tab-buttons">
              <button 
                className={`authmanager-tab-btn ${activeTab === 'donations' ? 'authmanager-active' : ''}`}
                onClick={() => setActiveTab('donations')}
              >
                Donations ({donationRequests.filter(item => item.status === 'pending').length})
              </button>
              <button 
                className={`authmanager-tab-btn ${activeTab === 'products' ? 'authmanager-active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                Products ({productRequests.filter(item => item.status === 'pending').length})
              </button>
            </div>
          </div>
        </div>
        
        <div className="authmanager-table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>{activeTab === 'donations' ? 'Requester' : 'Seller'}</th>
                <th>{activeTab === 'donations' ? 'Amount' : 'Price'}</th>
                <th>Date</th>
                <th>{activeTab === 'donations' ? 'Urgency' : 'Category'}</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'donations' ? donationRequests : productRequests).map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>
                    <div className="authmanager-item-cell">
                      <div className="authmanager-item-title">{item.title}</div>
                      <div className="authmanager-item-description">{item.description}</div>
                    </div>
                  </td>
                  <td>{activeTab === 'donations' ? item.requester : item.seller}</td>
                  <td className="authmanager-amount-cell">{activeTab === 'donations' ? item.amount : item.price}</td>
                  <td>{item.date}</td>
                  <td>
                    {activeTab === 'donations' ? (
                      <span className="authmanager-urgency-badge" style={{ backgroundColor: getUrgencyColor(item.urgency) }}>
                        {item.urgency}
                      </span>
                    ) : (
                      <span className="authmanager-category-badge">{item.category}</span>
                    )}
                  </td>
                  <td>
                    <span className="authmanager-status-badge" style={{ backgroundColor: getStatusColor(item.status) }}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="authmanager-action-buttons">
                      <button className="authmanager-action-btn authmanager-view" title="View" onClick={() => handleView(item.id, activeTab)}>👁️</button>
                      {item.status === 'pending' && (
                        <>
                          <button className="authmanager-action-btn authmanager-approve" title="Approve" onClick={() => handleApprove(item.id, activeTab)}>✅</button>
                          <button className="authmanager-action-btn authmanager-decline" title="Decline" onClick={() => handleDecline(item.id, activeTab)}>❌</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;