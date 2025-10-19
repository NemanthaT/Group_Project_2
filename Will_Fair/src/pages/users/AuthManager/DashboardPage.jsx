import React, { useState, useEffect } from 'react';
import { Heart, DollarSign, CalendarCheck, Clock, Users, TrendingUp, TrendingDown } from 'lucide-react';
import axios from 'axios';

const DashboardPage = ({ user, stats, setActiveTab }) => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [highPriorityItems, setHighPriorityItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent activities
      const activitiesResponse = await axios.get('http://localhost:5000/authManager/recent-activities');
      if (activitiesResponse.data.success) {
        setRecentActivities(activitiesResponse.data.activities);
      }

      // Fetch high priority items
      const priorityResponse = await axios.get('http://localhost:5000/authManager/high-priority');
      if (priorityResponse.data.success) {
        setHighPriorityItems(priorityResponse.data.items);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'accepted': return '#10b981';
      case 'declined': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="overview-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon accepted">
            <Heart size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Accepted Donations</h3>
            <p className="stat-number">{stats.totalAcceptedDonations}</p>
            <span className="stat-label">Monetary & Non-Monetary</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon monetary">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Monetary Donations</h3>
            <p className="stat-number">Rs. {stats.totalMonetaryDonations.toLocaleString()}</p>
            <span className="stat-label">Amount Distributed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon events">
            <CalendarCheck size={24} />
          </div>
          <div className="stat-content">
            <h3>Accepted Voluntary Events</h3>
            <p className="stat-number">{stats.totalAcceptedEvents}</p>
            <span className="stat-label">Active Programs</span>
          </div>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="overview-grid">
        {/* Recent Activities */}
        <div className="overview-card">
          <div className="card-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="card-content">
            {loading ? (
              <div className="loading-text">Loading activities...</div>
            ) : recentActivities.length === 0 ? (
              <div className="empty-text">No recent activities</div>
            ) : (
              <div className="activities-list">
                {recentActivities.slice(0, 5).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon" style={{ 
                      backgroundColor: activity.type === 'donation' ? '#3b82f615' : '#e879f915',
                      color: activity.type === 'donation' ? '#3b82f6' : '#e879f9'
                    }}>
                      {activity.type === 'donation' ? '💰' : '📅'}
                    </div>
                    <div className="activity-info">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-user">by {activity.user}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                    <span className="status-badge-small" style={{ backgroundColor: getStatusColor(activity.status) }}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pending Requests Summary */}
        <div className="overview-card">
          <div className="card-header">
            <h3>Pending Requests</h3>
          </div>
          <div className="card-content">
            <div className="pending-summary">
              <div className="summary-item" onClick={() => setActiveTab('donations')}>
                <div className="summary-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
                  <Heart size={24} />
                </div>
                <div className="summary-info">
                  <div className="summary-value">{stats.pendingDonations}</div>
                  <div className="summary-label">Donation Requests</div>
                </div>
                <button className="summary-action">Review</button>
              </div>
              <div className="summary-item" onClick={() => setActiveTab('events')}>
                <div className="summary-icon" style={{ backgroundColor: '#e879f915', color: '#e879f9' }}>
                  <CalendarCheck size={24} />
                </div>
                <div className="summary-info">
                  <div className="summary-value">{stats.pendingEvents}</div>
                  <div className="summary-label">Voluntary Events</div>
                </div>
                <button className="summary-action">Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals Section */}
      <div className="pending-section">
        <h2>Quick Actions</h2>
        <div className="pending-grid">
          <div className="pending-card" onClick={() => setActiveTab('donations')}>
            <div className="pending-header">
              <Clock size={20} />
              <h3>Donation Requests</h3>
            </div>
            <p className="pending-count">{stats.pendingDonations}</p>
            <button className="view-btn">
              Review Requests
            </button>
          </div>

          <div className="pending-card" onClick={() => setActiveTab('events')}>
            <div className="pending-header">
              <Users size={20} />
              <h3>Voluntary Events</h3>
            </div>
            <p className="pending-count">{stats.pendingEvents}</p>
            <button className="view-btn">
              Review Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;