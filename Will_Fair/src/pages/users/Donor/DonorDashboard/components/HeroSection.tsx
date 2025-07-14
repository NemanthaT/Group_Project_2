import React from 'react';
import { ArrowRight } from 'lucide-react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-illustration">
          <img src="https://images.pexels.com/photos/6647033/pexels-photo-6647033.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Community helping" />
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Welcome, dulim123!</h1>
          <p className="hero-subtitle">
            Thank you for your generosity and support. Together, we can make a difference.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary">
              Make a Donation
              <ArrowRight className="icon" />
            </button>
            <button className="btn btn-secondary">
              View Impact
            </button>
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