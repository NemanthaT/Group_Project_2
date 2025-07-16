import { Outlet, NavLink } from "react-router-dom";
import "./SellerDashboard.css";

const navItems = [
  { name: 'Dashboard', icon: '📊', path: 'dashboard' },
  { name: 'Products', icon: '📦', path: 'products' },
  { name: 'Orders', icon: '📋', path: 'orders' },
  { name: 'Categories', icon: '📂', path: 'categories' },
  { name: 'Customers', icon: '👥', path: 'customers' },
  { name: 'Marketing', icon: '📢', path: 'marketing' },
  { name: 'Reports', icon: '📈', path: 'reports' },
  { name: 'Settings', icon: '⚙️', path: 'settings' }
];

function SellerDashboardLayout() {
  return (
    <div className="dashboard">
      {/* Mobile overlay */}
      <div className="sidebar-overlay" onClick={() => {
        document.querySelector('.sidebar').classList.remove('sidebar-open');
      }}></div>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="header">
          <button className="mobile-menu-btn" onClick={() => {
            document.querySelector('.sidebar').classList.toggle('sidebar-open');
          }}>
            ☰
          </button>
          <h1 className="header-title">Seller Dashboard</h1>
          <div className="header-right">
            <div className="notifications">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </div>
            <span className="logout-text">Logout</span>
            <div className="profile-icon">👤</div>
          </div>
        </div>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SellerDashboardLayout;