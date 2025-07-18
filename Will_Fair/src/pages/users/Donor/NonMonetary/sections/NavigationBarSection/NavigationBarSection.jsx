import React from "react";

export const NavigationBarSection = () => {
  const menuItems = [
    { label: "Home" },
    { label: "Volunteer" },
    { label: "Contact Us" },
    { label: "About" },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="flex items-center">
          <img
            className="logo"
            alt="WillFair Logo"
            src="/6-6.png"
          />
          <a href="#" className="back-button">
            ← Back
          </a>
        </div>

        <nav className="nav-menu">
          {menuItems.map((item, index) => (
            <a key={index} href="#">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="user-section">
          <button className="logout-btn">
            Logout
          </button>
          <img
            className="user-avatar"
            src="/image.png"
            alt="User profile"
          />
        </div>
      </div>
    </header>
  );
};