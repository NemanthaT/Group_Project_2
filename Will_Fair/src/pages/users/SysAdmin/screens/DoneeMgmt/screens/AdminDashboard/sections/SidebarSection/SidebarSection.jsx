import React from "react";

export const SidebarSection = () => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", isActive: false },
    { id: "donees", label: "Donees", isActive: true },
    { id: "donors", label: "Donors", isActive: false },
    { id: "regional-managers", label: "Regional Managers", isActive: false },
    { id: "auth-managers", label: "Auth Managers", isActive: false },
  ];

  return (
    <>
      <div className="logo-container">
        <div className="logo-bg" />
        <img
          className="logo-img"
          alt="Logo"
          src="/6-6.png"
        />
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${item.isActive ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
};