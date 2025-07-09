import React, { useState } from 'react';
import { Heart, ShoppingCart, User, Bell, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Heart className="logo-icon" />
              <span className="logo-text">WillFair</span>
            </div>
            
            <nav className="nav">
              <a href="#" className="nav-link active">Home</a>
              <a href="#" className="nav-link">Volunteer</a>
              <a href="#" className="nav-link">Contact</a>
              <a href="#" className="nav-link">About Us</a>
            </nav>
            
            <div className="header-actions">
              <button className="icon-button">
                <ShoppingCart className="icon" />
                <span className="badge">2</span>
              </button>
              <button className="icon-button">
                <Bell className="icon" />
                <span className="badge">5</span>
              </button>
              <button className="icon-button" onClick={toggleSidebar}>
                <User className="icon" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-user">
            <div className="user-avatar">
              <User className="icon" />
            </div>
            <div className="user-info">
              <h3>dulim123</h3>
              <p>Active Donor</p>
            </div>
          </div>
          <button className="sidebar-close" onClick={closeSidebar}>
            <X className="icon" />
          </button>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link active">
            <span className="sidebar-icon">📊</span>
            Dashboard
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">👤</span>
            My Profile
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">💝</span>
            My Donations
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">📈</span>
            Impact Reports
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">🛒</span>
            Marketplace
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">📦</span>
            My Orders
          </a>
          <a href="#" className="sidebar-link logout">
            <span className="sidebar-icon">🚪</span>
            Log Out
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;