import React from "react";

export const FooterSection = () => {
  // Footer link data for mapping
  const quickLinks = [
    { text: "About Us", href: "#" },
    { text: "Our Programs", href: "#" },
    { text: "Our Marketplace", href: "#" },
  ];

  const supportLinks = [
    { text: "Help Center", href: "#" },
    { text: "FAQs", href: "#" },
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
  ];

  const contactInfo = [
    { text: "Reid Avenue, Colombo" },
    { text: "+94 77 123456789" },
    { text: "info@willfair.org" },
  ];

  const socialIcons = [
    { alt: "Facebook logo", src: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=50", href: "#" },
    { alt: "Instagram logo", src: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=50", href: "#" },
    { alt: "LinkedIn logo", src: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=50", href: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and company info */}
        <div className="footer-brand">
          <div className="footer-logo-section">
            <img
              className="footer-logo"
              alt="WillFair Logo"
              src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=120"
            />
            <h2 className="footer-brand-name">WillFair</h2>
          </div>

          <h3 className="footer-tagline">
            Connecting Hearts, Changing Lives
          </h3>

          <p className="footer-description">
            Connecting generous hearts with communities in need, creating
            lasting positive change through transparent and impactful giving.
          </p>

          {/* Social Media Icons */}
          <div className="social-icons">
            {socialIcons.map((icon, index) => (
              <a key={`social-${index}`} href={icon.href}>
                <img
                  className="social-icon"
                  alt={icon.alt}
                  src={icon.src}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            {quickLinks.map((link, index) => (
              <li key={`quick-${index}`}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Column */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul className="footer-links">
            {supportLinks.map((link, index) => (
              <li key={`support-${index}`}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Column */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul className="footer-links">
            {contactInfo.map((info, index) => (
              <li key={`contact-${index}`}>
                <span>{info.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};