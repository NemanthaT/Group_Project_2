import React from "react";

export const NavigationBarSection = () => {
  // Navigation items data for mapping
  const navigationItems = [
    { label: "Home" },
    { label: "Volunteer" },
    { label: "Contact Us" },
    { label: "About" },
  ];

  return (
    <header className="header">
      <div className="nav-background" />
      
      {/* Logo positioned in left corner */}
      <img
        className="logo"
        alt="Logo"
        src="/6-6.png"
      />
      
      {/* Navigation menu centered */}
      <nav className="nav-container">
        <ul className="nav-menu">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a href="#" className="nav-item">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};