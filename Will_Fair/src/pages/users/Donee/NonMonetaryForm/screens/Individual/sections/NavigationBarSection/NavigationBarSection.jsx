import React, { useState } from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

export const NavigationBarSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home" },
    { label: "Volunteer" },
    { label: "Contact Us" },
    { label: "About" },
  ];

  return (
    <header className="navigation-bar">
      <div className="flex items-center">
        <img
          className="logo"
          alt="Logo"
          src="/6-6.png"
        />
        <button className="back-button ml-4">
          ← Back
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="nav-menu">
        {navItems.map((item, index) => (
          <a key={index} href="#" className="nav-item">
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{ display: 'none' }}
      >
        ☰
      </button>

      {/* User Actions */}
      <div className="nav-actions">
        <button className="logout-button">
          Logout
        </button>
        <Avatar className="user-avatar">
          <AvatarImage
            src="/image.png"
            alt="User profile"
          />
        </Avatar>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          {navItems.map((item, index) => (
            <a key={index} href="#" className="mobile-nav-item">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};