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
          {/* Add more fields as needed */}
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn ml-2" onClick={() => navigate(-1)}>Cancel</button>
        </form>
      ) : (
        <div>
          <div className="donation-detail-value"><strong>Title:</strong> {donation.title}</div>
          <div className="donation-detail-value"><strong>Description:</strong> {donation.description}</div>
          {/* Add more fields as needed */}
        </div>
      )}
      {mode !== "edit" && (
        <button className="btn mt-4" onClick={() => navigate(-1)}>Back</button>
      )}
    </div>
  );
}

export default DoneeDonationDetail;
