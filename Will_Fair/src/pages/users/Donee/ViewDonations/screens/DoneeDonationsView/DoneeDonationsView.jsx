import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import axios from "axios";
import HealthcareImg from 'http://localhost:5173/src/assets/images/Healthcare.jpg';
import EducationSupportImg from 'http://localhost:5173/src/assets/images/EducationSupport.jpg';
import DisasterReliefImg from 'http://localhost:5173/src/assetsimages/DisasterRelief.jpg';
import UsedToysImg from 'http://localhost:5173/src/assetsimages/UsedToys.jpg';
import BasicNeedsImg from 'http://localhost:5173/src/assetsimages/BasicNeeds.jpg';
import ChildrenCareImg from 'http://localhost:5173/src/assetsimages/childrenCare.jpg';

function DoneeDonationsView({ user }) {
  const navigate = useNavigate();
  const [donationCards, setDonationCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const goToMonetaryFormIndividual = () => navigate("/users/donee/form");

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/donations/getDonationsById",
          { doneeId: user.id }
        );
        setDonationCards(response.data.donations);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  // Filtering logic
  const filteredCards = donationCards.filter(card => {
    let typeMatch = true;
    let statusMatch = true;
    if (typeFilter !== 'all') {
      typeMatch = (typeFilter === 'monetary' && card.type === 'Monetary') ||
                  (typeFilter === 'non-monetary' && card.type === 'NonMonetary');
    }
    if (statusFilter !== 'all') {
      statusMatch = card.status && card.status.toLowerCase() === statusFilter;
    }
    return typeMatch && statusMatch;
  });

  const handleDeleteDonation = async (requestId) => {
    if (!window.confirm("Are you sure you want to delete this donation request?")) return;
    try {
      await axios.delete(`http://localhost:5000/donations/${requestId}`);
      setDonationCards((prev) => prev.filter((c) => c.request_id !== requestId));
    } catch (err) {
      alert("Failed to delete donation");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="min-h-screen">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">My Donation Requests</h1>
          <p className="hero-subtitle">
            Track and Manage your submitted donation requests
          </p>
        </div>
      </section>

      <main className="donationView-content">
        <div className="container">
          <div className="filter-section">
            <div className="filter-controls">
              <div className="select-wrapper">
                <select className="select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="monetary">Monetary</option>
                  <option value="non-monetary">Non-monetary</option>
                </select>
              </div>

              <div className="select-wrapper">
                <select className="select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <button onClick={goToMonetaryFormIndividual} className="new-request-btn">
              <span>+ New Request</span>
            </button>
          </div>

          {filteredCards.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg">No donation requests found.</p>
              <button 
                onClick={goToMonetaryFormIndividual}
                className="mt-4 btn btn-primary"
              >
                Create Your First Request
              </button>
            </div>
          ) : (
            <div className="cards-grid">
              {filteredCards.map((card) => (
                <div key={card.request_id} className="donation-card">
                  <div className="card-image-container">
                  <img
                    src={
                      card.image_path && card.image_path.startsWith('uploads/')
                        ? `http://localhost:5173/server/${card.image_path.replace(/\\/g, '/')}`
                        : card.category === 'Healthcare'
                        ? HealthcareImg
                        : card.category === 'Education'
                        ? EducationSupportImg
                        : card.category === 'Disaster Relief'
                        ? DisasterReliefImg
                        : card.category === 'Basic Needs'
                        ? BasicNeedsImg
                        : card.category === 'Children Care'
                        ? ChildrenCareImg
                        : UsedToysImg
                    }
                    alt={card.title}
                    className="card-image"
                    onError={(e) => {
                      e.target.src = "http://localhost:5173/src/assets/images/hands.jpg";
                    }}
                  />
                  <div className="card-badge"><p>{card.category}</p><p className="status">{card.status}</p></div>
                </div>

                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-type">{card.type}</p>

                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ 
                            width: `${Math.min(100, (card.quantity_received / card.quantity_needed) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="card-stats">
                      <div className="stats-labels">
                        {card.type === "Monetary" ? "Raised:" : "Received:"}
                        <br />
                        Target:
                      </div>
                      <div className="stats-values">
                        {card.type === "Monetary" 
                          ? `Rs.${card.quantity_received}` 
                          : card.quantity_received}
                        <br />
                        {card.type === "Monetary" 
                          ? `Rs.${card.quantity_needed}` 
                          : card.quantity_needed}
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    {card.status && card.status.toLowerCase() === 'pending' && (
                      <>
                        <button className="btn btn-outline" onClick={() => navigate(`/users/donee/donation/${card.request_id}/edit`)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteDonation(card.request_id)}>Delete</button>
                      </>
                    )}
                    <button className="btn btn-primary" onClick={() => navigate(`/users/donee/donation/${card.request_id}/view`)}>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DoneeDonationsView;