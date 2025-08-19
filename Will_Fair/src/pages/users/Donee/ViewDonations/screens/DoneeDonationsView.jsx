import React from 'react';
import { useNavigate } from 'react-router-dom';
import HealthcareImg from 'http://localhost:5173/src/assets/images/Healthcare.jpg';
import EducationSupportImg from 'http://localhost:5173/src/assets/images/EducationSupport.jpg';
import DisasterReliefImg from 'http://localhost:5173/src/assetsimages/DisasterRelief.jpg';
import UsedToysImg from 'http://localhost:5173/src/assetsimages/UsedToys.jpg';
import BasicNeedsImg from 'http://localhost:5173/src/assetsimages/BasicNeeds.jpg';
import ChildrenCareImg from 'http://localhost:5173/src/assetsimages/childrenCare.jpg';

const DonationCards = ({ filteredCards }) => {
  const navigate = useNavigate();

  return (
    <div className="cards-grid">
      {filteredCards.map((card) => (
        <div key={card.request_id} className="donation-card">
          <div className="card-image-container">
            <img
              src={
                card.image_path && card.image_path.startsWith('uploads/')
                  ? `http://localhost:5000/${card.image_path.replace(/\\/g, '/')}`
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
                {card.type === "Monetary" 
                  ? `Rs.${card.quantity_needed}` 
                  : card.quantity_needed}
              </div>
            </div>
          </div>

          <div className="card-actions">
            <button
              className="btn btn-outline"
              onClick={() => navigate(`/users/donee/donation/${card.request_id}/edit`)}
            >
              Edit
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/users/donee/donation/${card.request_id}/view`)}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationCards;
