import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MakeDonation.css';
import axios from 'axios';

const MakeDonation = ( {user}) => {
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
    } catch (err) {
      console.error(err);
      setError('Failed to process donation.');
    }
  };

  if (loading) return <div className="make-donation-container">Loading...</div>;

  // If user is not signed in, show a login prompt instead of the form
  if (!user || !user.id) {
    return (
      <div className="make-donation-container">
        <h2 className="make-donation-title">Make a Donation</h2>
        <div className="donation-details-summary">
          <div><strong>Title:</strong> {donation?.title || '-'}</div>
          <div><strong>Target Amount:</strong> Rs. {donation?.quantity_needed?.toLocaleString() || '-'}</div>
          <div><strong>Received Amount:</strong> Rs. {donation?.quantity_received?.toLocaleString() || '-'}</div>
        </div>
        <div className="make-donation-error">You must be signed in to make a donation.</div>
        <Link to="/sign-in" className="make-donation-btn">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="make-donation-container">
      <h2 className="make-donation-title">Make a Donation</h2>
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
        <button className="make-donation-btn" type="submit">Donate</button>
      </form>
      {success && <div className="make-donation-success">Thank you for your donation!</div>}
      {error && <div className="make-donation-error">{error}</div>}
    </div>
  );
};

export default MakeDonation;
