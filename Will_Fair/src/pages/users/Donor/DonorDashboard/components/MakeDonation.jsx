import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MakeDonation.css';
import axios from 'axios';

const MakeDonation = ({ user }) => {
  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/donations/${id}`);
        setDonation(response.data.donation);
      } catch {
        setError('Failed to fetch donation details');
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!user || !user.id) {
      setError('You must be signed in to donate.');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    
    try {
      // Update donation amount in backend
      await axios.post(`http://localhost:5000/donations/${id}/donate`, { amount: Number(amount), donorId: user.id });
      console.log('Submitting donation:', { amount, donorId: user.id });
      setSuccess(true);
      // Optionally, refresh donation details
      const response = await axios.get(`http://localhost:5000/donations/${id}`);
      setDonation(response.data.donation);
      setAmount('');
    } catch (err) {
      console.error(err);
      setError('Failed to process donation.');
    }
  };

  const progressPercentage = donation ? Math.min((donation.quantity_received / donation.quantity_needed) * 100, 100) : 0;

  if (loading) return (
    <div className="donation-page-background">
      <div className="make-donation-container">Loading...</div>
    </div>
  );

  // If user is not signed in, show a login prompt instead of the form
  if (!user || !user.id) {
    return (
      <div className="donation-page-background">
        <div className="make-donation-container">
        <h2 className="make-donation-title">Make a Donation</h2>
        
        {/* Donation Image */}
        {donation?.image_url && (
          <div className="donation-image-container">
            <img src={donation.image_path && donation.image_path.startsWith('uploads/')
              ? `http://localhost:5173/server/${donation.image_path.replace(/\\/g, '/')}`
              : '/api/placeholder/800/500'} alt="Donation request" className="donation-image" />
          </div>
        )}

        {/* Category */}
        {donation?.category && (
          <div className="category-container">
            <span className="category-tag">{donation.category}</span>
          </div>
        )}

        {/* Description */}
        {donation?.description && (
          <div className="description-container">
            <p className="donation-description">{donation.description}</p>
          </div>
        )}

        {/* Progress Bar */}
        {donation && (
          <div className="progress-container">
            <div className="progress-header">
              <span>Progress: {progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="donation-details-summary">
          <div><strong>Title:</strong> {donation?.title || '-'}</div>
          <div><strong>Target Amount:</strong> Rs. {donation?.quantity_needed?.toLocaleString() || '-'}</div>
          <div><strong>Received Amount:</strong> Rs. {donation?.quantity_received?.toLocaleString() || '-'}</div>
        </div>
        <div className="make-donation-error">You must be signed in to make a donation.</div>
        <Link to="/sign-in" className="make-donation-btn">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="donation-page-background">
      <div className="make-donation-container">
      <h2 className="make-donation-title">Make a Donation</h2>
      
      {/* Donation Image */}
      {donation?.image_url && (
        <div className="donation-image-container">
          <img src={donation.image_url} alt="Donation request" className="donation-image" />
        </div>
      )}

      {/* Category */}
      {donation?.category && (
        <div className="category-container">
          <span className="category-tag">{donation.category}</span>
        </div>
      )}

      {/* Description */}
      {donation?.description && (
        <div className="description-container">
          <p className="donation-description">{donation.description}</p>
        </div>
      )}

      {/* Progress Bar */}
      {donation && (
        <div className="progress-container">
          <div className="progress-header">
            <span>Progress: {progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Donation details section */}
      <div className="donation-details-summary">
        <div><strong>Title:</strong> {donation?.title || '-'}</div>
        <div><strong>Target Amount:</strong> Rs. {donation?.quantity_needed?.toLocaleString() || '-'}</div>
        <div><strong>Received Amount:</strong> Rs. {donation?.quantity_received?.toLocaleString() || '-'}</div>
      </div>

      <form className="make-donation-form" onSubmit={handleSubmit}>
        <label className="make-donation-label">Amount (Rs.)</label>
        <input
          className="make-donation-input"
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        
        {/* Quick Amount Buttons */}
        <div className="quick-amounts">
          <div className="quick-amounts-label">Quick amounts:</div>
          <div className="quick-amounts-buttons">
            {[500, 1000, 2500].map((quickAmount) => (
              <button
                key={quickAmount}
                type="button"
                onClick={() => setAmount(quickAmount.toString())}
                className="quick-amount-btn"
              >
                Rs. {quickAmount}
              </button>
            ))}
          </div>
        </div>

        <button className="make-donation-btn" type="submit">Donate</button>
      </form>

      {success && <div className="make-donation-success">Thank you for your donation!</div>}
      {error && <div className="make-donation-error">{error}</div>}
      </div>
    </div>
  );
};

export default MakeDonation;