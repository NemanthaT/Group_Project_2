import './EventDetails.css';
import FeaturedBg from '@/assets/images/featuredBg.png';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddEventModal from './components/AddEventModal';
import VolunteerEventModal from './VolunteerEventModal';
import RequestEventDeletionModal from './components/RequestEventDeletionModal';
import WithdrawRegistrationModal from './components/WithdrawRegistrationModal';
import RequestVolunteerListModal from './components/RequestVolunteerListModal';
import VolunteerListDisplayModal from './components/VolunteerListDisplayModal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showRequestVolunteerListModal, setShowRequestVolunteerListModal] = useState(false);
  const [showVolunteerListDisplayModal, setShowVolunteerListDisplayModal] = useState(false);
  const [volunteerList, setVolunteerList] = useState([]);
  const [volunteerListEmail, setVolunteerListEmail] = useState('');
  const [volunteerListEventKey, setVolunteerListEventKey] = useState('');

  const [loadingEvent, setLoadingEvent] = useState(true);
  const [eventError, setEventError] = useState(null);

  const handleRequestDeletion = () => {
    setShowDeletionModal(true);
  };

  const handleUnvolunteer = () => {
    setShowWithdrawModal(true);
  };

  const handleRequestVolunteerList = () => {
    setShowRequestVolunteerListModal(true);
  };

  // Handle withdraw submission
  const handleWithdrawSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:5000/events/withdrawVolunteer', formData);

      toast.success('Registration withdrawn successfully!');

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to events main page
      navigate('/Events');

      return { success: true };
    } catch (error) {
      console.error(error);
      toast.error('Failed to withdraw registration. Please try again.');
      return { success: false, error };
    }
  };

  // Handle delete request submission
  const handleDeleteRequestSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:5000/events/deleteRequest', formData);

      toast.success('Event deletion request submitted successfully!');

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to events main page
      navigate('/Events');

      return { success: true };
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit deletion request. Please try again.');
      return { success: false, error };
    }
  };

  const handleVolunteerListRequestSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/events/getVolunteerList', formData);

      if (response.data.success) {
        toast.success('Volunteer list retrieved successfully!');
        setVolunteerList(response.data.volunteers);
        setVolunteerListEmail(formData.email);
        setVolunteerListEventKey(formData.eventKey);
        setShowRequestVolunteerListModal(false);
        setShowVolunteerListDisplayModal(true);
        return { success: true };
      } else {
        toast.error(response.data.message || 'Failed to retrieve volunteer list.');
        return { success: false };
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Failed to retrieve volunteer list. Please try again.';
      toast.error(errorMessage);
      return { success: false, error };
    }
  };

  // Handle sending volunteer list via email
  const handleSendVolunteerListEmail = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/events/sendVolunteerListEmail', formData);

      if (response.data.success) {
        toast.success('Volunteer list has been sent to your email!');
      } else {
        toast.error(response.data.message || 'Failed to send email.');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Failed to send email. Please try again.';
      toast.error(errorMessage);
    }
  };

  // Helper to ensure image URL is absolute
  const getImageUrl = (imagePath) => {
    if (!imagePath) return FeaturedBg;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000/${imagePath.replace(/^\/+/, '')}`;
  };



  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoadingEvent(true);
      setEventError(null);
      try {
        const res = await axios.get(`http://localhost:5000/events/${id}`);
        const data = res.data;

        if (!data || !data.success) throw new Error(data?.message || 'Failed to load event');
        const eventData = data.event;

        // Map the event here
        const mappedEvent = {
          id: eventData.event_id,
          title: eventData.name,
          description: eventData.description,
          type: eventData.type,
          commitment: eventData.commitment,
          location: eventData.location,
          skills: eventData.skills,
          volunteersNeeded: eventData.volunteers_needed,
          volunteersSigned: eventData.volunteers_signed,
          organizer: eventData.organiser?.name,
          organizerEmail: eventData.organiser?.email,
          date: eventData.date,
          startDate: eventData.start_date,
          endDate: eventData.end_date,
          image: eventData.image_path
        };


        setEvent(mappedEvent);

      } catch (err) {
        setEventError(err.message || 'Error loading event details');
      } finally {
        setLoadingEvent(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loadingEvent) return (
    <div className="event-details-loading-container">
      <div className="event-details-loading-spinner"></div>
      <p className="event-details-loading-text">Loading event details...</p>
    </div>
  );

  if (eventError) return (
    <div className="event-details-error-container">
      <p className="event-details-error-text">{eventError}</p>
    </div>
  );

  return (
    <>
      <div className="event-details">

        {/* Banner */}
        <div className="event-title-banner">
          <div className="container">
            <div className="event-title-content">
              <h1>{event.title}</h1>
              <p>{event.location}</p>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="event-body">
          <div
            className="event-image"
            style={{
              backgroundImage: `url(${getImageUrl(event.image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>

          <div className="event-info">


            <div className="event-date">
              Date: {event.startDate && event.endDate
                ? `${new Date(event.startDate).toLocaleDateString()} – ${new Date(event.endDate).toLocaleDateString()}`
                : event.date
                  ? new Date(event.date).toLocaleDateString()
                  : 'TBA'}
            </div>

            <div className="progress-row">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(event.volunteersSigned / event.volunteersNeeded) * 100}%`
                  }}
                ></div>
              </div>
              <div className="funding-info">
                <div>
                  <div className="funding-label">Volunteers Signed:</div>
                  <div className="funding-amount">{event.volunteersSigned}</div>
                </div>
                <div>
                  <div className="funding-label">Volunteers Needed:</div>
                  <div className="funding-amount">{event.volunteersNeeded}</div>
                </div>
              </div>

              {/* Request Volunteer List Button */}
              <button
                className="btn-request-volunteer-list"
                onClick={handleRequestVolunteerList}
                title="Request list of registered volunteers"
              >
                Request Volunteer List
              </button>
            </div>            {/* Description */}
            <div className="event-description">
              <span className="label">Description: </span>
              <span className="content">{event.description}</span>
            </div>


            {/* Organizer */}
            <div className="event-organizer">
              <span className="label">Event Organizer: </span>
              <span className="content">{event.organizer} – {event.organizerEmail}</span>
            </div>

            {/* Action Buttons - Split into two groups */}
            <div className="event-actions-container">
              {/* Primary Actions */}
              <div className="primary-actions">
                <button
                  className="btn btn-back-to-events"
                  onClick={() => {
                    // The scroll position was saved when navigating to details
                    navigate('/Events');
                  }}
                >
                  ← Back to Events
                </button>
                <button
                  className="btn btn-volunteer"
                  onClick={() => setShowVolunteerModal(true)}
                >
                  Join as Volunteer
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="secondary-actions">
                <button
                  className="btn btn-withdraw"
                  onClick={handleUnvolunteer}
                  title="Withdraw from this event"
                >
                  Withdraw Registration
                </button>
                <button
                  className="btn btn-delete-request"
                  onClick={handleRequestDeletion}
                  title="Request event deletion (organizers only)"
                >
                  Request Event Deletion
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddEventModal onClose={() => setShowAddModal(false)} />
        )}

        {showVolunteerModal && (
          <VolunteerEventModal
            isOpen={showVolunteerModal}
            onClose={() => setShowVolunteerModal(false)}
            eventId={event.id}
            eventTitle={event.title}
            eventOrganiserEmail={event.organizerEmail}
            onVolunteerSuccess={() => {
              setEvent(prev => ({
                ...prev,
                volunteersSigned: prev.volunteersSigned + 1
              }));
            }}
          />
        )}

        {showDeletionModal && (
          <RequestEventDeletionModal
            isOpen={showDeletionModal}
            onClose={() => setShowDeletionModal(false)}
            onSubmit={handleDeleteRequestSubmit}
          />
        )}

        {showWithdrawModal && (
          <WithdrawRegistrationModal
            isOpen={showWithdrawModal}
            onClose={() => setShowWithdrawModal(false)}
            onSubmit={handleWithdrawSubmit}
          />
        )}

        {showRequestVolunteerListModal && (
          <RequestVolunteerListModal
            isOpen={showRequestVolunteerListModal}
            onClose={() => setShowRequestVolunteerListModal(false)}
            onSubmit={handleVolunteerListRequestSubmit}
          />
        )}

        {showVolunteerListDisplayModal && (
          <VolunteerListDisplayModal
            isOpen={showVolunteerListDisplayModal}
            onClose={() => setShowVolunteerListDisplayModal(false)}
            volunteers={volunteerList}
            email={volunteerListEmail}
            eventKey={volunteerListEventKey}
            onSendEmail={handleSendVolunteerListEmail}
          />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default EventDetails;
