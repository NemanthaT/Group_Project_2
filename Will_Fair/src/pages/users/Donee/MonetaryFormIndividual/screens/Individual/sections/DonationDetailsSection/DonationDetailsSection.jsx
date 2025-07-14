import React from "react";

export const DonationDetailsSection = () => {
  return (
    <section className="form-section">
      <h2 className="section-title">
        Target Amount
      </h2>

      <div className="form-card">
        <div className="amount-wrapper">
          <span className="currency-symbol">
            Rs.
          </span>
          <input
            className="form-input amount-input"
            aria-label="Target amount in Rupees"
            placeholder="0"
          />
        </div>
      </div>
    </section>
  );
};