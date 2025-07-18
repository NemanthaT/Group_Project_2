import React from "react";
import { Button } from "../../../../components/ui/Button";

export const SidebarNavigationSection = ({ isVisible, onClose }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", active: true },
    { id: "inventory", label: "Inventory", active: false },
    { id: "donation-requests", label: "Donation Requests", active: false },
    { id: "track-donations", label: "Track Donations", active: false },
  ];

  return (
    <nav className={`sidebar ${isVisible ? 'mobile-visible' : ''}`}>
      <div className="logo-container">
        <div style={{ position: "relative", width: "141px", height: "141px" }}>
          <div className="logo-bg" />
          <img
            className="logo-img"
            alt="Logo"
            src="/6-6.png"
          />
        </div>
      </div>

      <div className="nav-items">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={item.active ? "active" : "secondary"}
            className={`nav-button ${item.active ? 'active' : 'secondary'}`}
            onClick={() => {
              if (window.innerWidth <= 768) {
                onClose();
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};