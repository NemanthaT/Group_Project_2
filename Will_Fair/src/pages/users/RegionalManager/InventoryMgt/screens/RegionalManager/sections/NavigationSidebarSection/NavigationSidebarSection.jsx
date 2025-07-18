import React from "react";

export const NavigationSidebarSection = ({ isOpen, onClose }) => {
  // Navigation menu items data
  const navItems = [
    { id: "dashboard", label: "Dashboard", isActive: false },
    { id: "inventory", label: "Inventory", isActive: true },
    { id: "donation-requests", label: "Donation Requests", isActive: false },
    { id: "track-donations", label: "Track Donations", isActive: false },
  ];

  const handleNavClick = (e) => {
    e.preventDefault();
    // Close mobile menu when nav item is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-visible' : ''}`}>
      {/* Logo container */}
      <div className="logo-container">
        <div className="logo">
          <div className="logo-bg" />
          <img
            className="logo-img"
            alt="Logo"
            src="/6-6.png"
          />
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="nav-menu">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${item.isActive ? 'active' : 'inactive'}`}
            onClick={handleNavClick}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};