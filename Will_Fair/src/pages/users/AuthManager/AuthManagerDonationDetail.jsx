import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthManagerDashboard.css";

const AuthManagerDonationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("requests");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const closeSidebar = () => setSidebarVisible(false);

  const handleNavItemClick = (tabId) => {
    setActiveTab(tabId);
    closeSidebar(); // Close sidebar on mobile after navigation
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "requests", label: "Requests" },
    { id: "products", label: "Product Reviews" },
  ];

  const handleNavClick = (itemId) => {
    handleNavItemClick(itemId);
    closeSidebar();
  };

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/authManager/pending-donations/${id}`
        );
        setDonation(res.data.donation);
      } catch {
        setError("Failed to fetch donation details");
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  }, [id]);

  const handleAction = async (action) => {
    try {
      await axios.post(
        `http://localhost:5000/authManager/pending-donations/${id}/${action}`
      );
      navigate(-1); // Go back to the list after action
    } catch {
      alert("Failed to update request status");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!donation) return <div>Donation not found.</div>;

  return (
    <div className="authmanager-dashboard">
      {/* Mobile overlay */}
      {/*<div
        className={`authmanager-sidebar-overlay ${
          sidebarVisible ? "authmanager-visible" : ""
        }`}
        onClick={closeSidebar}
      ></div>
      <div
        className={`authmanager-sidebar ${
          sidebarVisible
            ? "authmanager-mobile-visible"
            : "authmanager-mobile-hidden"
        }`}
      >
        <img
          className="authmanager-profile-icon"
          alt="Profile"
          src="http://localhost:5173/src/assets/images/logo.png"
        />

        <div className="authmanager-sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`authmanager-nav-item ${
                activeTab === item.id ? "authmanager-active" : ""
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="authmanager-nav-item-text">{item.label}</span>
            </div>
          ))}
        </div>

        <button
          className="authmanager-logout-btn"
          onClick={() => {
            localStorage.removeItem("userData");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>*/}

      {/* Main content */}
      <div className="authmanager-main-content">
        <div className="authmanager-content-wrapper">
          <div className="authmanager-dashboard-content">
            <div className="authmanager-welcome-section" id="individual-donation">
              <div className="authmanager-welcome-content">
                <button
                  className="btn btn-secondary"
                  id="back-button"
                  onClick={() => navigate(-1)}
                >
                  &larr; Back
                </button>
                <h2>Donation Request Details</h2>
              </div>
            </div>

            <div className="donation-detail-card" id="donation-image">
              <div className="coverImageContainer">
                <img
                  className="coverImage"
                  src={`http://localhost:5173/server/${donation.image_path}`}
                ></img>
              </div>
              <div>
                <b>Title:</b> {donation.title}
              </div>
              <div>
                <b>Type:</b> {donation.type}
              </div>
              <div>
                <b>Description:</b> {donation.description}
              </div>
              <div>
                <b>Requested By:</b> {donation.donee_name || donation.donee_id}
              </div>
              <div>
                <b>Target:</b> Rs. {donation.quantity_needed}
              </div>
              {donation.document_url && (
                <div style={{ margin: "12px 0" }}>
                  <b>Uploaded Document:</b>
                  <br />
                  <a
                    href={donation.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-info"
                    style={{ marginTop: 4 }}
                  >
                    View Document
                  </a>
                </div>
              )}
              {/* Proof Document Section */}
              {donation.document_path && (
                <div className="proof-doc-section" style={{ margin: "18px 0", padding: "16px", background: "#f8fafc", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="PDF" style={{ width: 40, height: 40, objectFit: "contain" }} />
                    <div>
                      <b>Proof Document:</b>
                      <div style={{ fontSize: "15px", color: "#555", marginTop: 2 }}>
                        {donation.document_path.split('/').pop()}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`http://localhost:5173/server/${donation.document_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-info"
                    style={{ marginTop: 12, display: "inline-block", fontWeight: 500 }}
                  >
                    <span role="img" aria-label="view">📄</span> View Proof Document
                  </a>
                </div>
              )}
              <div>
                <b>Status:</b> {donation.status}
              </div>
              <div className="pending-actions" style={{ marginTop: 16 }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAction("accept")}
                  style={{ marginRight: 8 }}
                  disabled={donation.status !== "pending"}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleAction("reject")}
                  disabled={donation.status !== "pending"}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthManagerDonationDetail;
