import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoneeDonationDetail.css";

function DoneeDonationDetail({ mode = "view" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donations/${id}`);
        setDonation(response.data.donation);
        setForm(response.data.donation);
      } catch (err) {
        setError("Failed to fetch donation");
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/donations/${id}`, form);
      alert("Donation updated successfully");
      navigate(-1);
    } catch (err) {
      alert("Failed to update donation");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      try {
        await axios.delete(`http://localhost:5000/donations/${id}`);
        alert("Donation deleted successfully");
        navigate(-1);
      } catch (err) {
        alert("Failed to delete donation");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!donation) return <div>Donation not found</div>;

  return (
    <div className="donation-detail-container">
      <h2 className="donation-detail-title">
        {mode === "edit" ? "Edit Donation" : "Donation Details"}
        {mode === "view" && (
          <button
            className="btn btn-outline ml-4"
            onClick={() => navigate(`/users/donee/donation/${id}/edit`)}
          >
            Edit
          </button>
        )}
      </h2>
      {mode === "edit" ? (
        <form onSubmit={handleSubmit} className="donation-detail-form">
          <div>
            <label className="donation-detail-label">Title</label>
            <input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="donation-detail-label">Description</label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="donation-detail-label">Target Amount</label>
            <input
              name="targetAmount"
              type="number"
              value={form.targetAmount || ""}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="donation-detail-label">Location</label>
            <input
              name="location"
              value={form.location || ""}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="donation-detail-label">Category</label>
            <input
              name="category"
              value={form.category || ""}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="donation-detail-label">Image URL</label>
            <input
              name="image"
              value={form.image || ""}
              onChange={handleChange}
              className="input"
              placeholder="Enter image URL"
            />
          </div>
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn ml-2" onClick={() => navigate(-1)}>Cancel</button>
        </form>
      ) : (
        <div className="donation-content">
          {/* Donation Image */}
          {donation.image && (
            <div className="donation-image-container">
              <img 
                src={donation.image} 
                alt={donation.title}
                className="donation-image"
              />
            </div>
          )}
          
          {/* Location and Category */}
          <div className="donation-meta">
            <div className="donation-location">
              📍 {donation.location || "Location not specified"}
            </div>
            <div className="donation-category">
              {donation.category || "General"}
            </div>
          </div>

          {/* Description */}
          <div className="donation-description">
            {donation.description}
          </div>

          {/* Progress Section */}
          <div className="donation-progress-section">
            <div className="progress-info">
              <div className="progress-amounts">
                <div className="raised-amount">
                  <span className="label">Raised:</span>
                  <span className="amount">{donation.raisedAmount || 0}.00</span>
                </div>
                <div className="target-amount">
                  <span className="label">Target:</span>
                  <span className="amount">{donation.targetAmount || 0}.00</span>
                </div>
              </div>
              <div className="status-badge">Active</div>
            </div>
            
            {/* Progress Bar */}
            <div className="progress-bar-container">
              <div 
                className="progress-bar"
                style={{
                  width: `${Math.min((donation.raisedAmount || 0) / (donation.targetAmount || 1) * 100, 100)}%`
                }}
              ></div>
            </div>
          </div>

          {/* Timeline and Details Sections */}
          <div className="info-sections">
            <div className="info-section">
              <h3 className="section-title">Timeline</h3>
              <div className="section-content">
                <p>Campaign started: {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : "Not specified"}</p>
                <p>Status: Active</p>
              </div>
            </div>
            
            <div className="info-section">
              <h3 className="section-title">Details</h3>
              <div className="section-content">
                <p><strong>Organization:</strong> {donation.organization || "Early Bird Child Care"}</p>
                <p><strong>Campaign ID:</strong> #{donation._id || id}</p>
                <p><strong>Total Donations:</strong> {donation.donationsCount || 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {mode !== "edit" && (
        <div className="button-group">
          <button className="btn btn-back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="action-buttons">
            <button className="btn btn-delete" onClick={handleDelete}>
             Delete
            </button>
            <button 
              className="btn btn-edit" 
              onClick={() => navigate(`/users/donee/donation/${id}/edit`)}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoneeDonationDetail;