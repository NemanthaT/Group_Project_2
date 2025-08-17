import React from "react";
import { Button } from "../../../../components/ui/button";
import '../../../../styles/NavigationSidebar.css';

export const NavigationSidebarSection = ({ isOpen, onClose }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", isActive: false },
    { id: "inventory", label: "Inventory", isActive: false },
    { id: "donation-requests", label: "Donation Requests", isActive: true },
    { id: "track-donations", label: "Track Donations", isActive: false },
  ];

  const handleNavClick = (itemId) => {
    console.log(`Navigating to: ${itemId}`);
    if (onClose) {
      onClose();
    }
  };

  return (
    <nav className={`navigation-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <div className="logo-background" />
        <img
          className="logo-image"
          alt="Logo"
          src="/6-6.png"
        />
      </div>

      <div className="nav-menu">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`btn-nav ${item.isActive ? 'active' : 'inactive'}`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};