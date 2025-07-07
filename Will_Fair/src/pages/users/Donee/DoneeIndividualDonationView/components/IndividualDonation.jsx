import React from "react";

export const IndividualDonation = () => {
  // Navigation links data
  const navLinks = [
    { text: "Home", href: "#" },
    { text: "Volunteer", href: "#" },
    { text: "Contact Us", href: "#" },
    { text: "About", href: "#" },
  ];

  // Footer links data
  const footerLinks = {
    quickLinks: ["About Us", "Our Programs", "Our Marketplace"],
    support: ["Help Center", "FAQs", "Privacy Policy", "Terms of Service"],
    contactUs: [
      "Reid Avenue, Colombo",
      "+94 77 123456789",
      "info@willfair.org",
    ],
  };

  // Social media icons
  const socialIcons = [
    { src: "/group.png", alt: "Facebook" },
    { src: "/insta-logo.png", alt: "Instagram" },
    { src: "/linkedin-logo.png", alt: "LinkedIn" },
  ];

  // Timeline data
  const timelineData = [
    {
      id: 1,
      label: "Request Created",
      date: "March 15, 2024",
      status: "completed",
      icon: "1"
    },
    {
      id: 2,
      label: "Request Approved",
      date: "March 18, 2024",
      status: "completed",
      icon: "2"
    },
    {
      id: 3,
      label: "Campaign End Date",
      date: "June 15, 2024",
      status: "pending",
      icon: "3"
    }
  ];

  // Progress calculation
  const target = 60000;
  const progressPercentage = 11.67; // Static percentage for display

  return (
    <div className="page-wrapper">
      {/* Header Section */}
      <header className="header">
        <img
          className="header-bg"
          alt="Close up people holding box"
          src="/close-up-people-holding-box-7.png"
        />

        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-bg"></div>
          <div className="navbar-content">
            <img
              className="logo"
              alt="WillFair Logo"
              src="/6-6.png"
            />

            <a href="#" className="back-button">
              <span>← Back</span>
            </a>

            <ul className="nav-links">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>

            <div className="user-section">
              <button className="logout-btn">Logout</button>
              <img
                className="user-avatar"
                alt="User profile"
                src="/image.png"
              />
            </div>
          </div>
        </nav>

        {/* Page Title */}
        <h1 className="page-title">
          Renovations at Early Bird Child Care
        </h1>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Column */}
        <div className="left-column">
          <img
            className="main-image"
            alt="Child care center"
            src="/image-6.png"
          />

          <div className="location-category">
            <div className="location">
              <img
                className="location-icon"
                alt="Location pin"
                src="/location-pin-svgrepo-com-1.svg"
              />
              <span className="location-text">Karapitiya</span>
            </div>

            <div className="category-badge">Education</div>
          </div>

          <div className="description">
            Early Bird Child Care is in need of essential renovations to provide
            a safer, more engaging, and nurturing environment for our children.
            With your generous support, we aim to upgrade classrooms, improve
            play areas, and ensure our facilities meet the highest standards of
            care and learning. Every contribution brings us closer to giving
            these young learners the bright and supportive space they deserve.
          </div>

          <button className="feedback-btn">
            Send feedback to Donors
          </button>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Timeline Card */}
          <div className="timeline-card">
            <h2 className="timeline-title">Timeline</h2>
            <div className="timeline-content">
              {timelineData.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className={`timeline-icon ${item.status === 'completed' ? (item.id === 1 ? 'created' : 'approved') : item.id === 3 ? 'end' : 'pending'}`}>
                    {item.icon}
                  </div>
                  <div className="timeline-details">
                    <div className="timeline-label">{item.label}</div>
                    <div className="timeline-date">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fundraising Progress */}
          <div className="progress-section">
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <img
                className="tick-icon"
                alt="Tick"
                src="/tick-svgrepo-com-1.svg"
              />
            </div>

            <div className="progress-info">
              <div className="progress-amounts">
                <div>
                  <span className="label">Target:</span>
                  <span className="amount">{target.toLocaleString()}.00</span>
                </div>
              </div>

              <button className="status-btn">Active</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn delete">
              <svg className="action-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"/>
              </svg>
              Delete
            </button>

            <button className="action-btn edit">
              <svg className="action-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            {/* Logo and Description */}
            <div className="footer-section">
              <div className="footer-logo-section">
                <img
                  className="footer-logo"
                  alt="WillFair Logo"
                  src="/6-6.png"
                />
                <div>
                  <h2 className="footer-brand">WillFair</h2>
                </div>
              </div>
              <div className="footer-tagline">
                Connecting Hearts, Changing Lives
              </div>
              <p className="footer-description">
                Connecting generous hearts with communities in need, creating
                lasting positive change through transparent and impactful
                giving.
              </p>
              <div className="social-icons">
                {socialIcons.map((icon, index) => (
                  <a key={index} href="#">
                    <img
                      className="social-icon"
                      alt={icon.alt}
                      src={icon.src}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h3 className="footer-title">Support</h3>
              <ul className="footer-links">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="footer-section">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="footer-contact">
                {footerLinks.contactUs.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};