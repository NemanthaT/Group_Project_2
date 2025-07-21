import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./BuyerDashboard.css";

const navItems = [
  { name: 'Dashboard', icon: '🏠', path: 'dashboard' },
  { name: 'Orders', icon: '📦', path: 'orders' },
  { name: 'History', icon: '📋', path: 'history' },
  { name: 'Wishlist', icon: '❤️', path: 'wishlist' },
  { name: 'Settings', icon: '⚙️', path: 'settings' }
];

function BuyerDashboardLayout() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="buyer-dashboard">
      {/* Mobile overlay */}
      <div className="buyer-sidebar-overlay" onClick={() => {
        document.querySelector('.buyer-sidebar').classList.remove('buyer-sidebar-open');
      }}></div>

      {/* Sidebar */}
      <div className="buyer-sidebar">
        <div className="buyer-sidebar-header">
          <div className="buyer-logo">
            <div className="buyer-logo-icon">🛒</div>
            <div className="buyer-logo-text">
              <h2>Buyer Portal</h2>
              <p>Manage your purchases</p>
            </div>
          </div>
        </div>
        <nav className="buyer-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `buyer-nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="buyer-nav-icon">{item.icon}</span>
              <span className="buyer-nav-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="buyer-main-content">
        <div className="buyer-header-dashboard">
          <button className="buyer-mobile-menu-btn" onClick={() => {
            document.querySelector('.buyer-sidebar').classList.toggle('buyer-sidebar-open');
          }}>
            ☰
          </button>
          <h1 className="buyer-header-title">Buyer Dashboard</h1>
          
          {/* Navigation Links */}
          <div className="buyer-header-nav-links">
            <a href="/" className="buyer-header-nav-link">Home</a>
            <a href="/marketplace" className="buyer-header-nav-link">Marketplace</a>
            <a href="/#contact" className="buyer-header-nav-link">Contact Us</a>
          </div>
          
          <div className="buyer-header-right">
            <div className="buyer-notifications">
              <span className="buyer-notification-icon">🔔</span>
              <span className="buyer-notification-badge">5</span>
            </div>
            <span className="buyer-logout-text" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
            <div className="buyer-profile-icon" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>👤</div>
          </div>
        </div>
        <div className="buyer-content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboardLayout;
