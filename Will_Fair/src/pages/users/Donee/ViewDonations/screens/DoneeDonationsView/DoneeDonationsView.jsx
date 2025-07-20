import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import axios from "axios";

function DoneeDonationsView({ user }) {
  const navigate = useNavigate();
  const [donationCards, setDonationCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goToViewDonation = () => navigate("/users/view");
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
                <select className="select">
                  <option value="all">All Types</option>
                  <option value="monetary">Monetary</option>
                  <option value="non-monetary">Non-monetary</option>
                </select>
              </div>

              <div className="select-wrapper">
                <select className="select">
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

          {donationCards.length === 0 ? (
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
              {donationCards.map((card) => (
                <div key={card.request_id} className="donation-card">
                  <div className="card-image-container">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="card-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                    <div className="card-badge"><p>{card.category}</p><p>{card.status}</p></div>
                  </div>

                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-type">{card.type}</p>

                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${card.quantity_recieved/card.quantity_needed}%` }}
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
                        {console.log("quantity_needed:", card.quantity_needed)}
                        {console.log("quantity_recieved:", card.quantity_received)}
                        {card.type === "Monetary" 
                          ? `Rs.${card.quantity_needed}` 
                          : card.quantity_needed}
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="btn btn-outline">Edit</button>
                    <button className="btn btn-primary" onClick={goToViewDonation}>
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