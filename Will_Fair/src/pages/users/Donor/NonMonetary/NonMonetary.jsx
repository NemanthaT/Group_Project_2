import React, { useState } from "react";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { DonationInstructionsSection } from "./sections/DonationInstructionsSection";
import { DonationDetailsSection } from "./sections/DonationDetailsSection";
import { DonationFormSection } from "./sections/DonationFormSection";
import { TermsAgreementSection } from "./sections/TermsAgreementSection";
import { FooterSection } from "./sections/FooterSection";

export const NonMonetary = () => {
  const [formData, setFormData] = useState({
    quantity: '',
    location: '',
    date: null,
    termsAccepted: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.quantity || !formData.location || !formData.date || !formData.termsAccepted) {
      alert('Please fill in all fields and accept the terms and conditions.');
      return;
    }
    
    alert('Donation submitted successfully! You will receive a confirmation email shortly.');
  };

  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <NavigationBarSection />

      {/* Hero Section */}
      <div className="hero">
        <img
          className="hero-bg"
          alt="Close up people holding donation box"
          src="/close-up-people-holding-box-6.png"
        />
        <div className="hero-content">
          <h1 className="hero-title">Make a Donation</h1>
          <p className="hero-subtitle">
            Your generosity makes a difference in our community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <div className="donation-card">
            {/* Notification Alert */}
            <div className="alert">
              <p className="alert-text">
                Please ensure the items are in good condition and bring them at
                your scheduled time.
                <br />
                You will receive a confirmation email with your drop-off
                details.
              </p>
            </div>

            {/* Donation Sections */}
            <DonationInstructionsSection 
              value={formData.quantity}
              onChange={(value) => handleInputChange('quantity', value)}
            />
            <DonationDetailsSection 
              value={formData.location}
              onChange={(value) => handleInputChange('location', value)}
            />
            <DonationFormSection 
              value={formData.date}
              onChange={(value) => handleInputChange('date', value)}
            />

            {/* Terms Agreement */}
            <TermsAgreementSection 
              checked={formData.termsAccepted}
              onChange={(checked) => handleInputChange('termsAccepted', checked)}
            />

            {/* Complete Donation Button */}
            <div className="donation-button-container">
              <button 
                className="complete-donation-btn"
                onClick={handleSubmit}
              >
                Complete Donation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};