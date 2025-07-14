import React from "react";

export const DonationDetailsSection = ({ value, onChange }) => {
  return (
    <section className="form-section">
      <h2 className="section-title">Dropoff Location</h2>
      <div className="input-card">
        <input
          className="form-input"
          placeholder="Enter location"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </section>
  );
};