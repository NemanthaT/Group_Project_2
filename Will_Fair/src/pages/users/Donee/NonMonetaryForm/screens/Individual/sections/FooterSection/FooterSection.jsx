import React from "react";

export const FooterSection = () => {
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
    { text: "Reid Avenue, Colombo", href: "#" },
    { text: "+94 77 123456789", href: "tel:+94771234567" },
    { text: "info@willfair.org", href: "mailto:info@willfair.org" },
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
        <div className="footer-section">
          <div className="flex items-center mb-4">
            <img
              className="w-24 h-24 object-cover"
              alt="WillFair Logo"
              src="/6-6.png"
            />
            <h2 className="text-3xl font-extrabold ml-4">WillFair</h2>
          </div>
          <h3 className="text-lg font-extrabold mb-4">
            Connecting Hearts, Changing Lives
          </h3>
          <p className="text-base font-normal mb-6">
            Connecting generous hearts with communities in need, creating
            lasting positive change through transparent and impactful giving.
          </p>

          {/* Social Media Icons */}
          <div className="social-icons">
            {socialMedia.map((social, index) => (
              <a key={index} href={social.href} aria-label={social.alt}>
                <img
                  className="social-icon"
                  alt={social.alt}
                  src={social.icon}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            {supportLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            {contactInfo.map((info, index) => (
              <li key={index}>
                <a href={info.href}>
                  {info.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};