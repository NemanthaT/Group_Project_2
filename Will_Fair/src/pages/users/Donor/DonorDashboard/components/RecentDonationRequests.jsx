import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import './RecentDonationRequests.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecentDonationRequests = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/donations/recent');
        setDonations(response.data.donations);
      } catch {
        setError('Failed to fetch recent donations');
      } finally {
        setLoading(false);
      }
    };
    fetchRecentDonations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Recent Donation Requests</h2>
          <button className="btn btn-outline" onClick={() => navigate('/users/donor/all-donations')}>
            View All Requests
            <ArrowRight className="icon" />
          </button>
        </div>
        
        <div className="donation-grid">
          {donations.map(donation => (
            <div key={donation.request_id} className="donation-card card">
              <div className="donation-image">
                <img src={donation.image_path && donation.image_path.startsWith('uploads/') ? `http://localhost:5173/server/${donation.image_path.replace(/\\/g, '/')}` : donation.image || ''} alt={donation.title} />
                {donation.urgent && <span className="urgent-badge">Urgent</span>}
              </div>
              
              <div className="donation-content">
                <h3 className="donation-title">{donation.title}</h3>
                {/*<p className="donation-description">{donation.description}</p>*/}
                
                <div className="donation-progress">
                  <div className="progress-header">
                    <span className="progress-percentage">
                      {donation.quantity_needed ? Math.round((donation.quantity_received / donation.quantity_needed) * 100) : 0}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${donation.quantity_needed ? Math.round((donation.quantity_received / donation.quantity_needed) * 100) : 0}%` }}
                    ></div>
                  </div>
                  <div className="donation-amounts">
                    <span className="donation-target">Target: Rs. {donation.quantity_needed ? donation.quantity_needed.toLocaleString() : 0}</span>
                    <span className="donation-received">Received: Rs. {donation.quantity_received ? donation.quantity_received.toLocaleString() : 0}</span>
                  </div>
                </div>
                
                <div className="donation-meta">
                  <div className="deadline">
                    <Calendar className="icon" />
                    <span>Deadline: {donation.due_date ? new Date(donation.due_date).toLocaleDateString() : '-'}</span>
                  </div>
                </div>
                
                <div className="donation-actions">
                  <button className="btn btn-primary" onClick={() => navigate(`/users/donor/donations/${donation.request_id}/donate`)}>Donate Now</button>
                  <button className="btn btn-secondary1" onClick={() => navigate(`/users/donor/donations/${donation.request_id}/view`)}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentDonationRequests;