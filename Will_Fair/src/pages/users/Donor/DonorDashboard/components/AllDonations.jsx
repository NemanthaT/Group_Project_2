import React, { useState, useEffect } from "react";
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllDonations.css";

const AllDonations = ({ user }) => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 6,
    hasNext: false,
    hasPrev: false,
  });

  const fetchDonations = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/donations/active?page=${page}&limit=6`
      );
      if (response.data.success) {
        setDonations(response.data.donations);
        setPagination(response.data.pagination);
      } else {
        setError("Failed to fetch donations");
      }
    } catch (err) {
      setError("Failed to fetch donations");
      console.error("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchDonations(newPage);
    }
  };

  if (loading) return <div className="loading">Loading donations...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="all-donations-container">
      <div className="all-donations-header">
        <h1>All Active Donations</h1>
        <p>
          Help make a difference by supporting these active donation campaigns
        </p>
      </div>

      {donations.length === 0 ? (
        <div className="no-donations">
          <p>No active donations found at the moment.</p>
        </div>
      ) : (
        <>
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
                  <button className="btn btn-secondary" onClick={() => navigate(`/users/donor/donations/${donation.request_id}/view`)}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn prev"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
              >
                Previous
              </button>

              <div className="pagination-info">
                <span>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <span className="total-items">
                  ({pagination.totalItems} total donations)
                </span>
              </div>

              <button
                className="pagination-btn next"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllDonations;
