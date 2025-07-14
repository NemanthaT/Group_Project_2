import React from "react";

export const TermsAgreementSection = ({ checked, onChange }) => {
  return (
    <div className="terms-section">
      <input
        type="checkbox"
        id="terms"
        className="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor="terms" className="terms-text">
        I agree to the{" "}
        <a href="#" className="terms-link">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a href="#" className="terms-link">
          Privacy Policy
        </a>
      </label>
    </div>
  );
};