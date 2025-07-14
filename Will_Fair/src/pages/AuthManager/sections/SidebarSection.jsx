import React from "react";

export const SidebarSection = ({ isVisible, onClose, onNavItemClick, activeTab }) => {

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "requests", label: "Requests" },
    { id: "products", label: "Product Reviews" },
  ];

  const handleNavClick = (itemId) => {
    if (onNavItemClick) {
      onNavItemClick(itemId);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`sidebar ${isVisible ? 'mobile-visible' : 'mobile-hidden'}`}>
      <div className="sidebar-logo">
        <div className="logo-container">
          <div className="logo-bg" />
          <img
            className="logo-image"
            alt="Logo"
            src="src/assets/images/logo.png"
          />
        </div>
      </div>

      <img className="profile-icon" alt="Profile" src="/profile-icon-5.png" />

      <div className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}  // ✅ Active styling
            onClick={() => handleNavClick(item.id)}
          >
            <span className="nav-item-text">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <button className="logout-btn">Logout</button>
    </div>
  );
};
