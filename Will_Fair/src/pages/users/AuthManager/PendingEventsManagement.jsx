import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDetailsCard from "./components/EventDetailsCard";
import "./AuthManagerDashboard.css";

const PendingEventsManagement = () => {
  const [activeTab, setActiveTab] = useState('approval'); // 'approval' or 'deletion'
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ pending: 0, approved: 0, declined: 0, total: 0 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPendingEvents = async () => {
      try {
        setLoading(true);
        const endpoint = activeTab === 'approval' 
          ? "http://localhost:5000/authManager/pending-events"
          : "http://localhost:5000/authManager/pending-deletion-events";
        
        const res = await axios.get(endpoint);
        setEvents(res.data.events);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(`Failed to fetch ${activeTab === 'approval' ? 'pending approval' : 'pending deletion'} events`);
        setLoading(false);
      }
    };
    fetchPendingEvents();
  }, [activeTab]);

  useEffect(() => {

    setStats({
      pending: events.filter((e) => !e.is_approved).length,
      approved: 0, 
      declined: 0, 
      total: events.length,
    });
  }, [events]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const handleViewDetails = (eventId) => {
    const event = events.find(e => e.event_id === eventId);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleApproveEvent = async (eventId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/authManager/approve-event/${eventId}`
      );
      
      if (response.data.success) {
        setEvents(prev => prev.filter(e => e.event_id !== eventId));
        
        handleCloseModal();
        
        console.log("✅ Event approved successfully:", eventId);
        toast.success("Event approved successfully!");
      }
    } catch (error) {
      console.error("❌ Failed to approve event:", error);
      
      toast.error("Failed to approve event. Please try again.");
      
      handleCloseModal();
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/authManager/delete-event/${eventId}`
      );
      
      if (response.data.success) {
        setEvents(prev => prev.filter(e => e.event_id !== eventId));
        
        handleCloseModal();
        
        toast.success("Event deleted successfully!");
        console.log("✅ Event deleted successfully:", eventId);
      }
    } catch (error) {
      console.error("❌ Failed to delete event:", error);
      
      toast.error("Failed to delete event. Please try again.");
      
      handleCloseModal();
    }
  };

  const statsCards = [
    { value: stats.pending, label: "Pending", icon: "⏳", color: "#f59e0b" }
  ];

  // Helper function to format date
  const formatEventDate = (event) => {
    if (event.is_range) {
      const startDate = new Date(event.start_date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      });
      const endDate = new Date(event.end_date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      });
      return `${startDate} - ${endDate}`;
    } else {
      return new Date(event.date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="authmanager-dashboard-content">
        <div className="authmanager-welcome-section">
          <div className="authmanager-welcome-content">
            <h2>Event Management</h2>
            <p>Review and manage volunteer event submissions and deletion requests</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="pending-events-tab-navigation">
          <button 
            className={`pending-events-tab-button ${activeTab === 'approval' ? 'pending-events-tab-active' : ''}`}
            onClick={() => setActiveTab('approval')}
          >
            <span className="tab-icon">📋</span>
            Pending Approval
          </button>
          <button 
            className={`pending-events-tab-button ${activeTab === 'deletion' ? 'pending-events-tab-active' : ''}`}
            onClick={() => setActiveTab('deletion')}
          >
            <span className="tab-icon">🗑️</span>
            Pending Deletion
          </button>
        </div>

        {/* Stats Cards */}
      <div className="authmanager-stats-grid" style={{ marginBottom: 24 }}>
        {statsCards.map((card, idx) => (
          <div className="authmanager-stat-card-full" key={idx}>
            <div
              className="authmanager-stat-icon"
              style={{ backgroundColor: card.color + "15", color: card.color }}
            >
              {card.icon}
            </div>
            <div className="authmanager-stat-info">
              <div className="authmanager-stat-value">{card.value}</div>
              <div className="authmanager-stat-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Events List */}
      <div className="pending-requests-list">
        {events.length === 0 ? (
          <div className="no-events-message">
            {activeTab === 'approval' 
              ? 'No events pending approval.' 
              : 'No events pending deletion.'}
          </div>
        ) : (
          events.map((event) => (
            <div key={event.event_id} className="pending-request-card">
              <div>
                <b>Event Name:</b> {event.name}
              </div>
              <div>
                <b>Type:</b> {event.type}
              </div>
              <div>
                <b>Location:</b> {event.location}
              </div>
              <div>
                <b>Date:</b> {formatEventDate(event)}
              </div>
              <div>
                <b>Volunteers Needed:</b> {event.volunteers_needed}
              </div>
              <div className="pending-actions">
                <button
                  className="btn btn-info"
                  onClick={() => handleViewDetails(event.event_id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>

      {/* Event Details Modal */}
      <EventDetailsCard
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApprove={handleApproveEvent}
        onDelete={handleDeleteEvent}
        activeTab={activeTab}
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
};

export default PendingEventsManagement;
