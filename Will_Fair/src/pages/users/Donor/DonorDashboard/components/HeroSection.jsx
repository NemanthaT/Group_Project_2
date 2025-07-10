import React from "react";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="bg-container">
        <img
          className="bg"
          src="http://localhost:5173/src/assets/images/homeBg.jpeg"
          alt="Hero Background"
        />
      </div>

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to WillFair, dulim123!</h1>
          <p className="hero-subtitle">
            Thank you for your generosity and support. Together, we can make a
            difference.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary">
              Make a Donation
              <ArrowRight className="icon" />
            </button>
            <button className="btn btn-secondary">View Impact</button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">2,450</div>
              <div className="stat-label">Lives Impacted</div>
            </div>
            <div className="stat">
              <div className="stat-number">$125,000</div>
              <div className="stat-label">Raised This Month</div>
            </div>
            <div className="stat">
              <div className="stat-number">340</div>
              <div className="stat-label">Active Donors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
