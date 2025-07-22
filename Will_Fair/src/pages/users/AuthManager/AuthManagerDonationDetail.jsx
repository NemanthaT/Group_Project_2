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

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/authManager/pending-donations/${id}`);
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
      await axios.post(`http://localhost:5000/authManager/pending-donations/${id}/${action}`);
      navigate(-1); // Go back to the list after action
    } catch {
      alert("Failed to update request status");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!donation) return <div>Donation not found.</div>;

  return (
    <div className="authmanager-main-content">
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>&larr; Back</button>
      <h2>Donation Request Details</h2>
      <div className="donation-detail-card">
        <div><b>Title:</b> {donation.title}</div>
        <div><b>Type:</b> {donation.type}</div>
        <div><b>Description:</b> {donation.description}</div>
        <div><b>Requested By:</b> {donation.donee_name || donation.donee_id}</div>
        <div><b>Target:</b> Rs. {donation.quantity_needed}</div>
        <div><b>Received:</b> Rs. {donation.quantity_received}</div>
        {donation.document_url && (
          <div style={{ margin: '12px 0' }}>
            <b>Uploaded Document:</b><br />
            <a href={donation.document_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info" style={{ marginTop: 4 }}>
              View Document
            </a>
          </div>
        )}
        <div><b>Status:</b> {donation.status}</div>
        <div className="pending-actions" style={{ marginTop: 16 }}>
          <button
            className="btn btn-primary"
            onClick={() => handleAction("accept")}
            style={{ marginRight: 8 }}
            disabled={donation.status !== 'pending'}
          >
            Accept
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleAction("reject")}
            disabled={donation.status !== 'pending'}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthManagerDonationDetail;
