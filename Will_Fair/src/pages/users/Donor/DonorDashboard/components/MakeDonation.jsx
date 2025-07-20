import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './MakeDonation.css';

const MakeDonation = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    // TODO: Replace with real backend call
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    // Simulate success
    setTimeout(() => {
      setSuccess(true);
    }, 800);
  };

  return (
    <div className="make-donation-container">
      <h2 className="make-donation-title">Make a Donation</h2>
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
