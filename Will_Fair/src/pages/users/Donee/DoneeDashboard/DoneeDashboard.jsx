import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  FileText, 
  Plus, 
  MessageSquare, 
  Menu, 
  X,
  Bell,
  Search,
  Calendar,
  TrendingUp,
  Users,
  Heart,
  Eye,
  Edit3,
  MoreHorizontal,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import './App.css';

const mockRequests = [
  {
    id: 1,
    title: 'හෘදයකට ගෙදරයක්',
    category: 'Healthcare',
    type: 'Monetary',
    status: 'PENDING',
    deadline: 'Jun 27, 2025',
    progress: 45,
    image: '/api/placeholder/40/40',
    createdDate: 'Jan 11, 2025'
  },
  {
    id: 2,
    title: 'need wheelchair',
    category: 'Community',
    type: 'NonMonetary',
    status: 'PENDING',
    deadline: 'May 31, 2025',
    progress: 45,
    image: '/api/placeholder/40/40',
    createdDate: 'May 21, 2025'
  },
  {
    id: 3,
    title: 'school supplies needed',
    category: 'Education',
    type: 'Monetary',
    status: 'PENDING',
    deadline: 'Jun 07, 2025',
    progress: 45,
    image: '/api/placeholder/40/40',
    createdDate: 'May 19, 2025'
  }
];

function DoneeDashboard( { user } ) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'APPROVED': return 'status-approved';
      case 'COMPLETED': return 'status-completed';
      default: return 'status-default';
    }
  };

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: User, label: 'Profile' },
    { icon: FileText, label: 'My Requests' },
    { icon: Plus, label: 'Create Requests' },
    { icon: MessageSquare, label: 'Feedback History' },
  ];

  const navigate = useNavigate();

  const goToDonationsView = () => {
    navigate('/users/donee/view');
  }

  return (
    <div className="app">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="sidebar-mobile" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <button onClick={toggleSidebar} className="close-button">
                <X className="icon" />
              </button>
            </div>
            <div className="sidebar-content">
              <div className="sidebar-logo">
                <div className="logo">
                  <Heart className="logo-icon" />
                </div>
                <span className="logo-text">WillFair</span>
              </div>
              <nav className="sidebar-nav">
                {sidebarItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`sidebar-link ${item.active ? 'active' : ''}`}
                  >
                    <item.icon className="sidebar-icon" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`sidebar-desktop ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-logo">
            <div className="logo">
              <Heart className="logo-icon" />
            </div>
            <span className="logo-text">WillFair</span>
          </div>
          <nav className="sidebar-nav">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`sidebar-link ${item.active ? 'active' : ''}`}
              >
                <item.icon className="sidebar-icon" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Welcome, {user.name} </h1>
              <p className="hero-subtitle">Your dashboard for monitoring donation requests and impact</p>
              <button onClick={goToDonationsView} className="hero-button">View Requests</button>
            </div>
          </div>
        </div>

        <div className="content-container">
          {/* Analytics Section */}
          <div className="analytics-section">
            <div className="section-header">
              <h2 className="section-title">Request Analytics</h2>
              <div className="period-selector">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="select-input"
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">Total Requests</p>
                    <p className="stat-value">3</p>
                  </div>
                  <div className="stat-icon blue">
                    <FileText className="icon" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">Completed</p>
                    <p className="stat-value">0</p>
                  </div>
                  <div className="stat-icon green">
                    <TrendingUp className="icon" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">In Progress</p>
                    <p className="stat-value">0</p>
                  </div>
                  <div className="stat-icon yellow">
                    <Calendar className="icon" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-info">
                    <p className="stat-label">Donors</p>
                    <p className="stat-value">0</p>
                  </div>
                  <div className="stat-icon purple">
                    <Users className="icon" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Request Trends</h3>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color blue"></div>
                    <span className="legend-text">Requests Created</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color green"></div>
                    <span className="legend-text">Requests Completed</span>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                  <div key={month} className="chart-column">
                    <div className="chart-bars">
                      <div 
                        className="chart-bar blue" 
                        style={{ height: `${Math.random() * 80 + 20}px` }}
                      ></div>
                      <div 
                        className="chart-bar green" 
                        style={{ height: `${Math.random() * 60 + 10}px` }}
                      ></div>
                    </div>
                    <span className="chart-label">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="table-card">
            <div className="table-header">
              <h3 className="table-title">Your Donation Requests</h3>
              <button className="primary-button">New Request</button>
            </div>
            <div className="table-container">
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Progress</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <div className="request-image">
                          <Heart className="icon" />
                        </div>
                      </td>
                      <td>
                        <div className="request-title">
                          <div className="title-text">{request.title}</div>
                          <div className="created-date">Created: {request.createdDate}</div>
                        </div>
                      </td>
                      <td>{request.category}</td>
                      <td>{request.type}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td>{request.deadline}</td>
                      <td>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${request.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{request.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-button view">
                            <Eye className="icon" />
                          </button>
                          <button className="action-button edit">
                            <Edit3 className="icon" />
                          </button>
                          <button className="action-button more">
                            <MoreHorizontal className="icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default DoneeDashboard;