import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MakeDonation.css';
import axios from 'axios';

const MakeDonation = () => {
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
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    // Simulate success
    setTimeout(() => {
      setSuccess(true);
    }, 800);
  };

  if (loading) return <div className="make-donation-container">Loading...</div>;

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
