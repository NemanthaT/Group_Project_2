import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DonationView.css';

const DonationView = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donations/${id}`);
        setDonation(response.data.donation);
      } catch (err) {
        setError('Failed to fetch donation details');
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  }, [id]);

  if (loading) return <div className="donation-view-loading">Loading...</div>;
  if (error) return <div className="donation-view-error">{error}</div>;
  if (!donation) return <div className="donation-view-error">Donation not found</div>;

  return (
    <div className="donation-view-container">
      <div className="donation-view-image-section">
        <img
          className="donation-view-image"
          src={donation.image_path && donation.image_path.startsWith('uploads/')
            ? `http://localhost:5000/${donation.image_path.replace(/\\/g, '/')}`
            : ''}
          alt={donation.title}
        />
      </div>
      <div className="donation-view-content-section">
        <h2 className="donation-view-title">{donation.title}</h2>
        <p className="donation-view-description">{donation.description}</p>
        <div className="donation-view-progress">
          <div className="donation-view-progress-bar">
            <div
              className="donation-view-progress-fill"
              style={{ width: `${donation.quantity_needed ? Math.round((donation.quantity_received / donation.quantity_needed) * 100) : 0}%` }}
            ></div>
          </div>
          <div className="donation-view-progress-labels">
            <span>Received: {donation.quantity_received || 0}</span>
            <span>Target: {donation.quantity_needed || 0}</span>
          </div>
        </div>
        <div className="donation-view-meta">
          <span className="donation-view-deadline">
            Deadline: {donation.due_date ? new Date(donation.due_date).toLocaleDateString() : '-'}
          </span>
          <span className="donation-view-status">Status: {donation.status}</span>
        </div>
        <button
          className="donation-view-donate-btn btn btn-primary"
          onClick={() => window.location.href = `/users/donor/donations/${donation.request_id || donation.id}/donate`}
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default DonationView;
