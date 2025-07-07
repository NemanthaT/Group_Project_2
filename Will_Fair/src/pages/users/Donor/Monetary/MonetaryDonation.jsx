import React, { useState } from "react";

export const MonetaryDonation = () => {
  // State for managing which payment method sections are visible
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showMobilePayment, setShowMobilePayment] = useState(false);

  // Navigation links data
  const navLinks = [
    { text: "Home", href: "#" },
    { text: "Volunteer", href: "#" },
    { text: "Contact Us", href: "#" },
    { text: "About", href: "#" },
  ];

  // Bank transfer details
  const bankDetails = [
    { label: "Bank", value: "People's Bank" },
    { label: "Account Name", value: "WillFair Foundation" },
    { label: "Account Number", value: "1234-5678-9012-3456" },
    { label: "Branch", value: "Main Branch, Colombo" },
    { label: "Reference", value: "REQ67737" },
  ];

  // Mobile payment details
  const mobileDetails = [
    { label: "Mobile Number", value: "077-123-4567" },
    { label: "Provider", value: "Dialog, Mobitel, Hutch" },
    { label: "Reference", value: "REQ67737" },
  ];

  // Footer links
  const footerSections = [
    {
      title: "Quick Links",
      links: ["About Us", "Our Programs", "Our Marketplace"],
    },
    {
      title: "Support",
      links: ["Help Center", "FAQs", "Privacy Policy", "Terms of Service"],
    },
    {
      title: "Contact Us",
      links: ["Reid Avenue, Colombo", "+94 77 123456789", "info@willfair.org"],
    },
  ];

  const handleBankTransferClick = () => {
    setShowBankTransfer(!showBankTransfer);
    // Hide mobile payment section when bank transfer is clicked
    if (showMobilePayment) {
      setShowMobilePayment(false);
    }
  };

  const handleMobilePaymentClick = () => {
    setShowMobilePayment(!showMobilePayment);
    // Hide bank transfer section when mobile payment is clicked
    if (showBankTransfer) {
      setShowBankTransfer(false);
    }
  };

  return (
    <div className="app">
      {/* Header Section */}
      <div className="header">
        <img
          className="header-bg"
          alt="Close up people"
          src="/close-up-people-holding-box-5.png"
        />

        {/* Navigation Bar */}
        <div className="nav-container">
          <div className="nav-bar">
            <div className="nav-bg" />

            <div className="nav-links">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="nav-link"
                >
                  {link.text}
                </a>
              ))}
            </div>

            <img
              className="logo"
              alt="WillFair Logo"
              src="/6-6.png"
            />

            <a href="#" className="back-btn">
              <span>← Back</span>
            </a>

            <img
              className="user-profile"
              alt="User profile"
              src="/image.png"
            />

            <button className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Header Text */}
        <div className="header-text">
          <h1 className="header-title">
            Make a Donation
          </h1>
          <p className="header-subtitle">
            Your generosity makes a difference in our community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <div className="payment-card">
            <h2 className="section-title">Payment Methods</h2>

            {/* Payment Methods Section */}
            <div className="payment-methods-card">
              <div className="credit-card-section">
                {/* Credit/Debit Card Button */}
                <button className="payment-btn">
                  Credit/ Debit Card
                </button>

                {/* Security Notice */}
                <div className="security-notice">
                  <p className="security-text">
                    All donations are secure and encrypted.
                    <br />
                    You will receive a confirmation email with your donation
                    details
                  </p>
                </div>
              </div>

              {/* Bank Transfer Button */}
              <button 
                onClick={handleBankTransferClick}
                className="payment-btn expandable"
              >
                Bank Transfer
              </button>

              {/* Bank Transfer Details - Conditionally Rendered */}
              {showBankTransfer && (
                <div className="payment-details">
                  <p className="payment-description">
                    Please transfer the donation amount to the following bank
                    account:
                  </p>

                  {/* Bank Details */}
                  <div className="details-list">
                    {bankDetails.map((detail, index) => (
                      <div key={index} className="detail-item">
                        <span className="detail-label">
                          {detail.label}
                        </span>
                        <span className="detail-value">
                          : {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="upload-instruction">
                    Please upload your payment receipt after completing the
                    transaction.
                  </p>

                  {/* File Upload */}
                  <div className="file-upload">
                    <span className="file-label">
                      Documents
                    </span>
                    <button className="file-btn">
                      Choose files
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Payment Section */}
            <div className="payment-methods-card">
              {/* Mobile Payment Button */}
              <button 
                onClick={handleMobilePaymentClick}
                className="payment-btn expandable"
              >
                Mobile Payment
              </button>

              {/* Mobile Payment Details - Conditionally Rendered */}
              {showMobilePayment && (
                <div className="payment-details">
                  <p className="payment-description">
                    Please transfer the donation amount to the following mobile payment account:
                  </p>

                  {/* Mobile Payment Details */}
                  <div className="details-list">
                    {mobileDetails.map((detail, index) => (
                      <div key={index} className="detail-item">
                        <span className="detail-label">
                          {detail.label}
                        </span>
                        <span className="detail-value">
                          : {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="upload-instruction">
                    Please upload your payment receipt after completing the
                    transaction.
                  </p>

                  {/* File Upload */}
                  <div className="file-upload">
                    <span className="file-label">
                      Documents
                    </span>
                    <button className="file-btn">
                      Choose files
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="checkbox-section">
              <div className="checkbox-item">
                <input type="checkbox" id="anonymous" className="checkbox" />
                <label
                  htmlFor="anonymous"
                  className="checkbox-label"
                >
                  Make this donation Anonymous
                </label>
              </div>

              <div className="checkbox-item">
                <input type="checkbox" id="terms" className="checkbox" />
                <label
                  htmlFor="terms"
                  className="checkbox-label"
                >
                  I agree to the{" "}
                  <span className="bold">Terms and Conditions </span>
                  and <span className="bold">Privacy Policy</span>
                </label>
              </div>
            </div>

            {/* Complete Donation Button */}
            <div className="donation-btn-container">
              <button className="complete-btn">
                Complete Donation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            {/* Logo and Description */}
            <div className="footer-brand">
              <div className="brand-header">
                <img
                  className="footer-logo"
                  alt="WillFair Logo"
                  src="/6-6.png"
                />
                <h2 className="brand-name">WillFair</h2>
              </div>
              <p className="brand-tagline">
                Connecting Hearts, Changing Lives
              </p>
              <p className="brand-description">
                Connecting generous hearts with communities in need, creating
                lasting positive change through transparent and impactful
                giving.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <img
                    src="/group.png"
                    alt="Facebook"
                    className="social-icon"
                  />
                </a>
                <a href="#" className="social-link">
                  <img
                    src="/insta-logo.png"
                    alt="Instagram"
                    className="social-icon"
                  />
                </a>
                <a href="#" className="social-link">
                  <img
                    src="/linkedin-logo.png"
                    alt="LinkedIn"
                    className="social-icon"
                  />
                </a>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="footer-section">
                <h3>{section.title}</h3>
                <ul className="footer-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};