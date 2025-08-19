import React from "react";

export const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", isActive: false },
    { id: "donees", label: "Donees", isActive: false },
    { id: "donors", label: "Donors", isActive: false },
    { id: "regional-managers", label: "Regional Managers", isActive: true },
    { id: "auth-managers", label: "Auth Managers", isActive: false },
  ];

  const handleItemClick = (itemId) => {
    console.log(`Navigate to ${itemId}`);
    onClose(); // Close mobile menu when item is clicked
  };

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-visible' : 'mobile-hidden'}`}>
      {/* Logo */}
      <div className="logo-container">
        <div className="logo-bg" />
        <img
          className="logo-img"
          alt="Logo"
          src="/6-6.png"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${item.isActive ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <span className="nav-text">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};