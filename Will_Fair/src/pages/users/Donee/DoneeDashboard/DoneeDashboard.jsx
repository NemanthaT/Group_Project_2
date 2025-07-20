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
import axios from 'axios';
import './App.css';

function DoneeDashboard( { user } ) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post('http://localhost:5000/donations/getDonationsById', { doneeId: user.id });
        if (response.data && response.data.donations) {
          setRequests(response.data.donations);
        } else {
          setRequests([]);
        }
      } catch (err) {
        setError('Failed to fetch requests');
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user.id]);

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

  // Stats calculation
  const totalRequests = requests.length;
  const completedRequests = requests.filter(r => r.status === 'completed').length;
  const inProgressRequests = requests.filter(r => r.status === 'approved' || r.status === 'PENDING').length;
  const donors = 0; // Placeholder, update if donor info is available

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
                    <p className="stat-value">{totalRequests}</p>
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
                    <p className="stat-value">{completedRequests}</p>
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
                    <p className="stat-value">{inProgressRequests}</p>
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
                    <p className="stat-value">{donors}</p>
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
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
              ) : (
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
                    {requests.map((request) => (
                      <tr key={request.request_id}>
                        <td>
                          <div className="request-image">
                            {request.image_path ? (
                              <img src={`/${request.image_path}`} alt="request" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                            ) : (
                              <Heart className="icon" />
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="request-title">
                            <div className="title-text">{request.title || request.request_name}</div>
                            <div className="created-date">Created: {request.created_at ? new Date(request.created_at).toLocaleDateString() : ''}</div>
                          </div>
                        </td>
                        <td>{request.category}</td>
                        <td>{request.quantity_needed ? 'Monetary' : 'NonMonetary'}</td>
                        <td>
                          <span className={`status-badge ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td>{request.due_date || request.dropoff_date || '-'}</td>
                        <td>
                          <div className="progress-container">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${request.progress || 0}%` }}
                              ></div>
                            </div>
                            <span className="progress-text">{request.progress || 0}%</span>
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
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default DoneeDashboard;