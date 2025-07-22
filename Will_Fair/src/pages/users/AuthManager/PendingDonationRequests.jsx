import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthManagerDashboard.css";

const PendingDonationRequests = ( {user}) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [stats, setStats] = useState({ pending: 0, accepted: 0, declined: 0, total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/authManager/pending-donations"
        );
        setRequests(res.data.requests);
      } catch {
        setError("Failed to fetch pending donation requests");
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/authManager/donation-stats");
        setStats(res.data.stats);
      } catch {
        // fallback: calculate from requests if backend fails
        setStats({
          pending: requests.filter((r) => r.status === "pending").length,
          accepted: requests.filter((r) => r.status === "active").length,
          declined: requests.filter((r) => r.status === "rejected").length,
          total: requests.length,
        });
      }
    };
    fetchStats();
  }, [requests]);

  const handleAction = async (id, action) => {
    setActionLoading(id + action);
    try {
      await axios.post(
        `http://localhost:5000/authManager/pending-donations/${id}/${action}`
      );
      setRequests((prev) => prev.filter((r) => r.request_id !== id));
    } catch {
      alert("Failed to update request status");
    } finally {
      setActionLoading(null);
    }
  };

  const statsCards = [
    { value: stats.pending, label: "Pending", icon: "⏳", color: "#f59e0b" },
    { value: stats.accepted, label: "Accepted", icon: "✅", color: "#10b981" },
    { value: stats.declined, label: "Declined", icon: "❌", color: "#ef4444" },
    { value: stats.total, label: "Total", icon: "📦", color: "#3b82f6" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="authmanager-dashboard-content">
      <div className="authmanager-welcome-section">
        <div className="authmanager-welcome-content">
          <h2>Pending Donation Requests</h2>
          <p>Review and manage Donation Requests</p>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="authmanager-stats-grid" style={{ marginBottom: 24 }}>
        {statsCards.map((card, idx) => (
          <div className="authmanager-stat-card" key={idx}>
            <div
              className="authmanager-stat-icon"
              style={{ backgroundColor: card.color + "15", color: card.color }}
            >
              {card.icon}
            </div>
            <div className="authmanager-stat-info">
              <div className="authmanager-stat-value">{card.value}</div>
              <div className="authmanager-stat-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="pending-requests-list">
        {requests.length === 0 ? (
          <div>No pending requests.</div>
        ) : (
          requests.map((req) => (
            <div key={req.request_id} className="pending-request-card">
              <div>
                <b>Title:</b> {req.title}
              </div>
              <div>
                <b>Type:</b> {req.type}
              </div>
              <div>
                <b>Requested By:</b> {req.donee_name || req.donee_id}
              </div>
              <div>
                <b>Target:</b> Rs. {req.quantity_needed}
              </div>
              <div className="pending-actions">
                <button
                  className="btn btn-info"
                  onClick={() =>
                    navigate(`/authmanager/donations/${req.request_id}`)
                  }
                  style={{ marginRight: 8 }}
                >
                  View Details
                </button>
                <button
                  className="btn btn-primary"
                  disabled={actionLoading === req.request_id + "accept"}
                  onClick={() => handleAction(req.request_id, "accept")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  disabled={actionLoading === req.request_id + "reject"}
                  onClick={() => handleAction(req.request_id, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingDonationRequests;
