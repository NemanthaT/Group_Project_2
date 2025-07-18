import React from "react";

export const DonationInstructionsSection = ({ value, onChange }) => {
  return (
    <section className="form-section">
      <h2 className="section-title">Quantity to Donate</h2>
      <div className="input-card">
        <input
          className="form-input"
          placeholder="Enter quantity"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </section>
  );
};