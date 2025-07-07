import { PlusIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export const DoneeDonationsView = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    setIsProfileDropdownOpen(false);
  };

  // Donation card data
  const donationCards = [
    {
      id: 1,
      title: "Renovations at Early Bird Child Care",
      image: "/image-5.png",
      type: "Monetary",
      category: "Education",
      raised: "7,000.00",
      target: "60,000.00",
      progress: 12, // Percentage of progress (7000/60000 ≈ 12%)
    },
    {
      id: 2,
      title: "Wheelchairs at Sathkara Elderly Care Centre",
      image: "/image-6.png",
      type: "Non-monetary",
      category: "Education",
      received: "23",
      target: "40",
      progress: 58, // Percentage of progress (23/40 ≈ 58%)
    },
    {
      id: 3,
      title: "Renovations at Magalle Special Care",
      image: "/image-7.png",
      type: "Monetary",
      category: "Education",
      raised: "22,000.00",
      target: "50,000.00",
      progress: 44, // Percentage of progress (22000/50000 = 44%)
    },
    {
      id: 4,
      title: "Renovations at Early Bird Child Care",
      image: "/image-5-1.png",
      type: "Monetary",
      category: "Education",
      raised: "7,000.00",
      target: "60,000.00",
      progress: 12, // Percentage of progress (7000/60000 ≈ 12%)
    },
    {
      id: 5,
      title: "Wheelchairs at Sathkara Elderly Care Centre",
      image: "/image-6-1.png",
      type: "Non-monetary",
      category: "Education",
      received: "23",
      target: "40",
      progress: 58, // Percentage of progress (23/40 ≈ 58%)
    },
    {
      id: 6,
      title: "Renovations at Magalle Special Care",
      image: "/image-7-1.png",
      type: "Monetary",
      category: "Education",
      raised: "22,000.00",
      target: "50,000.00",
      progress: 44, // Percentage of progress (22000/50000 = 44%)
    },
  ];

  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: "/group.png" },
    { name: "Instagram", icon: "/insta-logo.png" },
    { name: "LinkedIn", icon: "/linkedin-logo.png" },
  ];

  // Footer links
  const footerLinks = {
    quickLinks: [
      { title: "About Us", href: "#" },
      { title: "Our Programs", href: "#" },
      { title: "Our Marketplace", href: "#" },
    ],
    support: [
      { title: "Help Center", href: "#" },
      { title: "FAQs", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" },
    ],
    contact: [
      { title: "Reid Avenue, Colombo", href: "#" },
      { title: "+94 77 123456789", href: "tel:+94771234567" },
      { title: "info@willfair.org", href: "mailto:info@willfair.org" },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="header">
        <img
          className="header-bg"
          alt="Close up people"
          src="/close-up-people-holding-box-4.png"
        />
        <div className="header-overlay"></div>

        {/* Navigation Bar */}
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-left">
              <img
                className="logo"
                alt="WillFair Logo"
                src="/6-6.png"
              />
              <a href="#" className="back-link">
                <span>←</span>
                <span>Back</span>
              </a>
            </div>

            <div className="nav-center">
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link">Volunteer</a>
              <a href="#" className="nav-link">Contact Us</a>
              <a href="#" className="nav-link">About</a>
            </div>

            <div className="nav-right">
              <div className="profile-dropdown" ref={dropdownRef}>
                <img
                  className="profile-img"
                  alt="User profile"
                  src="/image.png"
                  onClick={toggleProfileDropdown}
                />
                {isProfileDropdownOpen && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            My Donation Requests
          </h1>
          <p className="hero-subtitle">
            Track and Manage your submitted donation requests
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-controls">
              <div className="select-wrapper">
                <select className="select">
                  <option value="all">All Types</option>
                  <option value="monetary">Monetary</option>
                  <option value="non-monetary">Non-monetary</option>
                </select>
              </div>

              <div className="select-wrapper">
                <select className="select">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <button className="new-request-btn">
              <PlusIcon className="plus-icon" />
              <span>New Request</span>
            </button>
          </div>

          {/* Donation Cards Grid */}
          <div className="cards-grid">
            {donationCards.map((card) => (
              <div key={card.id} className="donation-card">
                <div className="card-image-container">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                  <div className="card-badge">
                    {card.category}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">
                    {card.title}
                  </h3>
                  <p className="card-type">{card.type}</p>

                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${card.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="card-stats">
                    <div className="stats-labels">
                      {card.type === "Monetary" ? "Raised:" : "Received:"}
                      <br />
                      Target:
                    </div>
                    <div className="stats-values">
                      {card.type === "Monetary" ? card.raised : card.received}
                      <br />
                      {card.target}
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn btn-outline">
                    Edit
                  </button>
                  <button className="btn btn-primary">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            {/* Logo and Description */}
            <div className="footer-section">
              <div className="flex items-center">
                <img
                  className="footer-logo"
                  alt="WillFair Logo"
                  src="/6-6.png"
                />
              </div>
              <h2>WillFair</h2>
              <p className="footer-tagline">
                Connecting Hearts, Changing Lives
              </p>
              <p className="footer-description">
                Connecting generous hearts with communities in need, creating
                lasting positive change through transparent and impactful
                giving.
              </p>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a key={index} href="#" className="social-link" aria-label={link.name}>
                    <img
                      src={link.icon}
                      alt={link.name}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h3>Support</h3>
              <ul className="footer-links">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <ul className="footer-links">
                {footerLinks.contact.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};