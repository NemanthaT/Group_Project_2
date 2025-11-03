import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DonationView.css";

const DonationView = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/donations/${id}`
        );
        setDonation(response.data.donation);

        // Mock recent donations for demonstration
        setRecentDonations([
          { donor: "Anonymous", amount: 500, time: "2 hours ago" },
          { donor: "John D.", amount: 1000, time: "5 hours ago" },
          { donor: "Sarah M.", amount: 750, time: "1 day ago" },
        ]);
      } catch (err) {
        setError("Failed to fetch donation details");
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  }, [id]);

  const getProgressPercentage = () => {
    if (!donation.quantity_needed) return 0;
    return Math.min(
      Math.round((donation.quantity_received / donation.quantity_needed) * 100),
      100
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Health: "🏥",
      Education: "📚",
      Emergency: "🚨",
      Community: "🏘️",
      Environment: "🌱",
      Children: "👶",
      Elderly: "👴",
      Food: "🍽️",
      Housing: "🏠",
    };
    return icons[category];
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "#22c55e";
      case "completed":
        return "#3b82f6";
      case "expired":
        return "#ef4444";
      case "pending":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const getDaysRemaining = () => {
    if (!donation.due_date) return null;
    const today = new Date();
    const deadline = new Date(donation.due_date);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading)
    return (
      <div className="donation-view-loading">
        <div className="loading-spinner"></div>
        <p>Loading donation details...</p>
      </div>
    );

  if (error)
    return (
      <div className="donation-view-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
      </div>
    );

  if (!donation)
    return (
      <div className="donation-view-error">
        <div className="error-icon">❌</div>
        <p>Donation not found</p>
      </div>
    );

  const progressPercentage = getProgressPercentage();
  const daysRemaining = getDaysRemaining();

  return (
    <div className="donation-view-container">
      {/* Hero Section */}
      <div className="donation-hero">
        <div className="donation-image-container">
          <img
            className="donation-image"
            src={
              donation.image_path && donation.image_path.startsWith("uploads/")
                ? `http://localhost:5173/server/${donation.image_path.replace(
                    /\\/g,
                    "/"
                  )}`
                : "/api/placeholder/800/500"
            }
            alt={donation.title}
          />
          <div className="donation-overlay">
            <div className="donation-category">
              {/*<span className="category-icon">
                {getCategoryIcon(donation.category)}
              </span>*/}
              <span className="category-text">
                {donation.category || "General"}
              </span>
            </div>
            <div
              className="donation-status"
              style={{ backgroundColor: getStatusColor(donation.status) }}
            >
              {donation.status || "Active"}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="donation-content">
          <div className="donation-header">
            <div className="donation-title-container">
              <h1 className="donation-title">{donation.title}</h1>
            </div>
            <div className="donation-urgency">
              {daysRemaining !== null && daysRemaining >= 0 && (
                <div
                  className={`urgency-badge ${
                    daysRemaining <= 7
                      ? "urgent"
                      : daysRemaining <= 30
                      ? "moderate"
                      : "normal"
                  }`}
                >
                  {daysRemaining === 0
                    ? "Last day!"
                    : daysRemaining === 1
                    ? "1 day left"
                    : `${daysRemaining} days left`}
                </div>
              )}
            </div>
          </div>

          <div className="donation-description">
            <h3>About this campaign</h3>
            <p>{donation.description}</p>
          </div>
        </div>
        
        <div className="scndSection">
          {/* Progress Section */}
          <div className="progress-section">
            <div className="progress-header">
              <h3>Fundraising Progress</h3>
              <div className="progress-percentage">{progressPercentage}%</div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="progress-shine"></div>
                </div>
              </div>
            </div>

            <div className="progress-stats">
              <div className="stat-item">
                <div className="stat-value">
                  Rs. {(donation.quantity_received || 0).toLocaleString()}
                </div>
                <div className="stat-label">Raised</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  Rs. {(donation.quantity_needed || 0).toLocaleString()}
                </div>
                <div className="stat-label">Goal</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{donation.donor_count || 0}</div>
                <div className="stat-label">Donors</div>
              </div>
            </div>
          </div>

          {/* Campaign Details */}
          <div className="campaign-details">
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <div className="detail-content">
                <div className="detail-label">Campaign Deadline</div>
                <div className="detail-value">
                  {donation.due_date
                    ? new Date(donation.due_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No deadline set"}
                </div>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">🏷️</span>
              <div className="detail-content">
                <div className="detail-label">Category</div>
                <div className="detail-value">
                  {donation.category || "General"}
                </div>
              </div>
            </div>

            {/*<div className="detail-item">
              <span className="detail-icon">👤</span>
              <div className="detail-content">
                <div className="detail-label">Organized by</div>
                <div className="detail-value">{donation.organizer_name || 'Anonymous'}</div>
              </div>
            </div>*/}
          </div>

          {/* Action Button */}
          <div className="donation-actions">
            <button
              className="donate-btn primary"
              onClick={() =>
                (window.location.href = `/users/donor/donations/${
                  donation.request_id || donation.id
                }/donate`)
              }
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationView;
