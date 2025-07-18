import React from "react";

export const NavigationBarSection = () => {
  // Navigation menu items data
  const navItems = [
    { label: "Home" },
    { label: "Volunteer" },
    { label: "Contact Us" },
    { label: "About" },
  ];

  return (
    <header className="header">
      <div className="header-bg" />

      <nav className="nav-menu">
        {navItems.map((item, index) => (
          <a key={index} href="#" className="nav-item">
            {item.label}
          </a>
        ))}
      </nav>

      <img
        className="logo"
        alt="Logo"
        src="/6-6.png"
      />

      <button className="back-button">
        <span>← Back</span>
      </button>

      <img
        className="user-avatar"
        src="/image.png"
        alt="User profile"
      />

      <button className="logout-button">
        Logout
      </button>
    </header>
  );
};