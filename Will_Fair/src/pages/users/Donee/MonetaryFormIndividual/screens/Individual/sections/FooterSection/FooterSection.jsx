import React from "react";

export const FooterSection = () => {
  // Footer data for better organization and maintainability
  const quickLinks = [
    { title: "About Us", href: "#" },
    { title: "Our Programs", href: "#" },
    { title: "Our Marketplace", href: "#" },
  ];

  const supportLinks = [
    { title: "Help Center", href: "#" },
    { title: "FAQs", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
  ];

  const contactInfo = [
    { title: "Reid Avanue, Colombo", href: "#" },
    { title: "+94 77 123456789", href: "tel:+94771234567" },
    { title: "info@willfair.org", href: "mailto:info@willfair.org" },
  ];

  const socialMedia = [
    { icon: "/group.png", alt: "Facebook", href: "#" },
    { icon: "/insta-logo.png", alt: "Instagram", href: "#" },
    { icon: "/linkedin-logo.png", alt: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and Description */}
        <div className="footer-brand">
          <div className="footer-logo-section">
            <img
              className="footer-logo"
              alt="Element"
              src="/6-6.png"
            />
            <div className="footer-brand-text">
              <h2>WillFair</h2>
              <p className="tagline">
                Connecting Hearts, Changing Lives
              </p>
              <p className="description">
                Connecting generous hearts with communities in need, creating
                lasting positive change through transparent and impactful
                giving.
              </p>
            </div>
          </div>
          <div className="social-links">
            {socialMedia.map((item, index) => (
              <a key={index} href={item.href} aria-label={item.alt} className="social-link">
                {index === 0 ? (
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundImage: 'url(/group.png)',
                    backgroundSize: '100% 100%'
                  }} />
                ) : (
                  <img
                    className="social-icon"
                    alt={item.alt}
                    src={item.icon}
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            {quickLinks.map((link, index) => (
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
            {supportLinks.map((link, index) => (
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
            {contactInfo.map((info, index) => (
              <li key={index}>
                <a href={info.href}>
                  {info.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};