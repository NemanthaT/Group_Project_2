import React, { useState } from "react";
import "./styles.css";

const IndividualDonation = () => {
  const [activeTab, setActiveTab] = useState("details");

  // Progress data
  const progressData = {
    received: 23,
    target: 40,
    percentage: (23 / 40) * 100,
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <div className="hero">
        <img
          className="hero-bg"
          alt="Close up people holding box"
          src="/close-up-people-holding-box-8.png"
        />
        {/* Hero Title */}
        <h1 className="hero-title">
          Wheelchairs at Sathkara Elderly Care Centre
        </h1>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <div className="content-grid">
            {/* Left Column - Image */}
            <div>
              <img
                className="content-image"
                alt="Elderly people at care center"
                src="/image-7.png"
              />
            </div>

            {/* Right Column - Progress and Actions */}
            <div className="progress-section">
              {/* Progress Bar */}
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressData.percentage}%` }}
                  />
                </div>
                <img
                  className="progress-icon"
                  alt="Completed"
                  src="/tick-svgrepo-com-1.svg"
                />
              </div>

              {/* Progress Stats */}
              <div className="progress-stats">
                <div className="stats-labels">
                  Received:
                  <br />
                  Target:
                </div>
                <div className="stats-values">
                  {progressData.received}
                  <br />
                  {progressData.target}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="btn btn-primary">Donate Now</button>
                <button className="btn btn-secondary">View Proof</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="container">
          <div className="tabs-card">
            <div className="tabs-list">
              <button
                className={`tab-trigger ${
                  activeTab === "details" ? "active" : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`tab-trigger ${
                  activeTab === "impact" ? "active" : ""
                }`}
                onClick={() => setActiveTab("impact")}
              >
                Impact
              </button>
              <button
                className={`tab-trigger ${
                  activeTab === "updates" ? "active" : ""
                }`}
                onClick={() => setActiveTab("updates")}
              >
                Updates
              </button>
            </div>
            <div className="tab-content">
              {activeTab === "details" && (
                <div>Details content goes here...</div>
              )}
              {activeTab === "impact" && <div>Impact content goes here...</div>}
              {activeTab === "updates" && (
                <div>Updates content goes here...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDonation;
