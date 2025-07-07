import React from "react";

export const FooterSection = () => {
  const quickLinks = [
    { text: "About Us" },
    { text: "Our Programs" },
    { text: "Our Marketplace" },
  ];

  const supportLinks = [
    { text: "Help Center" },
    { text: "FAQs" },
    { text: "Privacy Policy" },
    { text: "Terms of Service" },
  ];

  const contactInfo = [
    { text: "Reid Avenue, Colombo" },
    { text: "+94 77 123456789" },
    { text: "info@willfair.org" },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-brand">
          <img
            className="footer-logo"
            alt="WillFair Logo"
            src="/6-6.png"
          />
          <div className="footer-brand-name">WillFair</div>
          <div className="footer-tagline">
            Connecting Hearts, Changing Lives
          </div>
          <div className="footer-description">
            Connecting generous hearts with communities in need, creating
            lasting positive change through transparent and impactful giving.
          </div>
          <div className="social-links">
            <img
              className="social-icon"
              alt="Facebook"
              src="/group.png"
            />
            <img
              className="social-icon"
              alt="Instagram"
              src="/insta-logo.png"
            />
            <img
              className="social-icon"
              alt="LinkedIn"
              src="/linkedin-logo.png"
            />
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="footer-separator"></div>
          <div className="footer-links">
            {quickLinks.map((link, index) => (
              <a key={index} href="#">
                {link.text}
              </a>
            ))}
          </div>
        </div>

        {/* Support Column */}
        <div className="footer-section">
          <h3>Support</h3>
          <div className="footer-separator"></div>
          <div className="footer-links">
            {supportLinks.map((link, index) => (
              <a key={index} href="#">
                {link.text}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Us Column */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="footer-separator"></div>
          <div className="footer-info">
            {contactInfo.map((info, index) => (
              <div key={index}>{info.text}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};