import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./SellerDashboard.css";

const navItems = [
  { name: 'Dashboard', icon: '📊', path: 'dashboard' },
  { name: 'Inventory', icon: '📦', path: 'inventory' },
  { name: 'Orders', icon: '📋', path: 'orders' },
  { name: 'Categories', icon: '📂', path: 'categories' },
  { name: 'Reviews', icon: '👥', path: 'reviews' },
  { name: 'Marketing', icon: '📢', path: 'marketing' },
  { name: 'Reports', icon: '📈', path: 'reports' },
  { name: 'Profile', icon: '👤', path: 'profile' },
  { name: 'Settings', icon: '⚙️', path: 'settings' }
];

function SellerDashboardLayout() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="seller-dashboard">
      {/* Mobile overlay */}
      <div className="seller-sidebar-overlay" onClick={() => {
        document.querySelector('.seller-sidebar').classList.remove('seller-sidebar-open');
      }}></div>

      {/* Sidebar */}
      <div className="seller-sidebar">
        <div className="seller-sidebar-header">
          <div className="seller-logo">
            <div className="seller-logo-icon">🛍️</div>
            <div className="seller-logo-text">
              <h2>Seller Portal</h2>
              <p>Manage your business</p>
            </div>
          </div>
        </div>
        <nav className="seller-sidebar-nav">
          {navItems.map((item) => {
            // Hide specific navigation items
            if (['Categories', 'Marketing', 'Reports', 'Settings'].includes(item.name)) {
              return null;
            }
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `seller-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className="seller-nav-icon">{item.icon}</span>
                <span className="seller-nav-text">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="seller-main-content">
        <div className="seller-header-dashboard">
          <button className="seller-mobile-menu-btn" onClick={() => {
            document.querySelector('.seller-sidebar').classList.toggle('seller-sidebar-open');
          }}>
            ☰
          </button>
          <h1 className="seller-header-title">Seller Dashboard</h1>
          
          {/* Navigation Links */}
          <div className="seller-header-nav-links">
            <a href="/" className="seller-header-nav-link">Home</a>
            <a href="/marketplace" className="seller-header-nav-link">Marketplace</a>
            <a href="/#contact" className="seller-header-nav-link">Contact Us</a>
          </div>
          
          <div className="seller-header-right">
            <div className="seller-notifications">
              <span className="seller-notification-icon">🔔</span>
              <span className="seller-notification-badge">3</span>
            </div>
            <span className="seller-logout-text" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
            <div className="seller-profile-icon" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>👤</div>
          </div>
        </div>
        <div className="seller-content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SellerDashboardLayout;