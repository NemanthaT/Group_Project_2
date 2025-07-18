import React from "react";

export const SidebarNavigationSection = () => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", isActive: false },
    { id: "donees", label: "Donees", isActive: false },
    { id: "donors", label: "Donors", isActive: true },
    { id: "regional-managers", label: "Regional Managers", isActive: false },
    { id: "auth-managers", label: "Auth Managers", isActive: false },
  ];

  return (
    <>
      <div className="logo-container">
        <div className="logo">
          <img src="/6-6.png" alt="Logo" />
        </div>
      </div>

      <div className="nav-menu">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-button ${item.isActive ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};