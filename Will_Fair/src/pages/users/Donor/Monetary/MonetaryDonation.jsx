import React, { useState } from "react";
import "./styles.css"; // Import your CSS styles

export const MonetaryDonation = () => {
  // State for managing which payment method sections are visible
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showMobilePayment, setShowMobilePayment] = useState(false);

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
    <div className="main-content">
      <div className="container">
        <div className="payment-card">
          <h2 className="section-title">Payment Methods</h2>

          {/* Payment Methods Section */}
          <div className="payment-methods-card">
            <div className="credit-card-section">
              {/* Credit/Debit Card Button */}
              <button className="payment-btn">Credit/ Debit Card</button>

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
                      <span className="detail-label">{detail.label}</span>
                      <span className="detail-value">: {detail.value}</span>
                    </div>
                  ))}
                </div>

                <p className="upload-instruction">
                  Please upload your payment receipt after completing the
                  transaction.
                </p>

                {/* File Upload */}
                <div className="file-upload">
                  <span className="file-label">Documents</span>
                  <button className="file-btn">Choose files</button>
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
                  Please transfer the donation amount to the following mobile
                  payment account:
                </p>

                {/* Mobile Payment Details */}
                <div className="details-list">
                  {mobileDetails.map((detail, index) => (
                    <div key={index} className="detail-item">
                      <span className="detail-label">{detail.label}</span>
                      <span className="detail-value">: {detail.value}</span>
                    </div>
                  ))}
                </div>

                <p className="upload-instruction">
                  Please upload your payment receipt after completing the
                  transaction.
                </p>

                {/* File Upload */}
                <div className="file-upload">
                  <span className="file-label">Documents</span>
                  <button className="file-btn">Choose files</button>
                </div>
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="checkbox-section">
            <div className="checkbox-item">
              <input type="checkbox" id="anonymous" className="checkbox" />
              <label htmlFor="anonymous" className="checkbox-label">
                Make this donation Anonymous
              </label>
            </div>

            <div className="checkbox-item">
              <input type="checkbox" id="terms" className="checkbox" />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the{" "}
                <span className="bold">Terms and Conditions </span>
                and <span className="bold">Privacy Policy</span>
              </label>
            </div>
          </div>

          {/* Complete Donation Button */}
          <div className="donation-btn-container">
            <button className="complete-btn">Complete Donation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonetaryDonation;
