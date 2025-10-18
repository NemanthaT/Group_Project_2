import './EventDetails.css';
import FeaturedBg from '@/assets/images/featuredBg.png';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddEventModal from './AddEventModal';
import VolunteerEventModal from './VolunteerEventModal';

function EventDetails({ opportunities = [] }) {

  const [showAddModal, setShowAddModal] = useState(false);

  //Volunteer Modal State
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();


  const oppId = Number(id);
  const oppFromState = location.state && location.state.opp;
  const oppFromProps = opportunities.find(o => Number(o.id) === oppId);
  const opp = oppFromState || oppFromProps || null;

  if (!opp) {
    return (
      <div className="event-details not-found">
        <h2>Event not found</h2>
        <button className="btn" onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const percent = opp.volunteersNeeded ? Math.round((opp.volunteersSigned / opp.volunteersNeeded) * 100) : 0;



  return (
    <>

      <div className="event-details">


        <section className="event-title-banner">
          <div className="container">
            <div className="event-title-content">
              <h1>{opp.title}</h1>
            </div>
          </div>
        </section>

        <div className="event-body">
          <div
            className="event-image"
            style={{ backgroundImage: `url(${opp.image || ''})` }}
          />
          <div className="event-info">
            <p className="event-date"><strong>Date:</strong> {opp.date || 'TBD'}</p>
            <p className="event-location"><strong>Location:</strong> {opp.location}</p>
            <p className="event-type"><strong>Type:</strong> {opp.type}</p>
            <p className="event-commitment"><strong>Commitment:</strong> {opp.commitment}</p>

            <div className="progress-row">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
              <div className="progress-text">
                {opp.volunteersSigned} / {opp.volunteersNeeded} volunteers registered
              </div>
            </div>

            <h3>Description</h3>
            <p className="event-description">{opp.description}</p>

            <div className="event-actions">
              <button className="btn btn-outline" onClick={() => navigate('/Events')}>Back to Events</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedEvent(opp);        // store which event was clicked
                  setShowVolunteerModal(true);  // open modal
                }}
              >
                Volunteer
              </button>
              
            </div>
          </div>
        </div>
      </div>
      <VolunteerEventModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
        onSubmit={(data) => {
          console.log("Volunteer registered:", data);
          console.log("For event:", selectedEvent);
          // You can add your POST request to backend here
        }}
        event={selectedEvent}
      />
    </>
  );
}

export default EventDetails;