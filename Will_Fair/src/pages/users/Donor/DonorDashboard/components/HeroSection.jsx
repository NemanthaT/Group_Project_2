import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css";
import axios from 'axios';

const HeroSection = ({ user }) => {
  const [stats, setStats] = useState({
    livesImpacted: 0,
    raisedThisMonth: 0,
    activeDonors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/donations/stats');
        if (resp.data && resp.data.success) {
          setStats({
            livesImpacted: resp.data.stats.livesImpacted,
            raisedThisMonth: resp.data.stats.raisedThisMonth,
            activeDonors: resp.data.stats.activeDonors
          });
        }
      } catch (err) {
        console.error('Failed to fetch hero stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="hero">
      <div className="bg-container">
        <img
          className="bg"
          src="http://localhost:5173/src/assets/images/featuredBg.png"
          alt="Hero Background"
        />
      </div>

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to WillFair, {user?.name || "Guest"}!</h1>
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
              <div className="stat-number">{loading ? '—' : stats.livesImpacted.toLocaleString()}</div>
              <div className="stat-label">Lives Impacted</div>
            </div>
            <div className="stat">
              <div className="stat-number">{loading ? '—' : `Rs. ${stats.raisedThisMonth.toLocaleString()}`}</div>
              <div className="stat-label">Raised This Month</div>
            </div>
            <div className="stat">
              <div className="stat-number">{loading ? '—' : stats.activeDonors.toLocaleString()}</div>
              <div className="stat-label">Active Donors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
