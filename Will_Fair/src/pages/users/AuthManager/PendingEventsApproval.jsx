import React, { useEffect, useState } from "react";
import axios from "axios"; 
import EventDetailsCard from "./components/EventDetailsCard";
import "./AuthManagerDashboard.css";

// Dummy data for testing/rendering purposes
const DUMMY_EVENTS = [
  {
    event_id: 1,
    name: "Beach Cleanup Initiative",
    type: "environment",
    location: "Colombo",
    is_range: false,
    date: "2025-11-15",
    start_date: null,
    end_date: null,
    volunteers_needed: 25,
    volunteers_signed: 8,
    description: "Join us for a morning beach cleanup to help preserve our coastal ecosystem.",
    commitment: "one-time",
    skills: "none",
    is_approved: false,
    organiser: {
      organiser_id: 1,
      name: "Samantha Fernando",
      email: "samantha.fernando@gmail.com",
      phone: "+94771234567"
    },
    documents: [
      { document_id: 1, filename: "permit.pdf", path: "uploads/events/1/docs/document_1.pdf" }
    ]
  },
  {
    event_id: 2,
    name: "Children's Education Program",
    type: "teaching",
    location: "Kandy",
    is_range: true,
    date: null,
    start_date: "2025-11-20",
    end_date: "2025-11-25",
    volunteers_needed: 15,
    volunteers_signed: 3,
    description: "Week-long tutoring program for underprivileged children in rural areas.",
    commitment: "weekly",
    skills: "teaching",
    is_approved: false,
    organiser: {
      organiser_id: 2,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      phone: "+94772345678"
    },
    documents: [
      { document_id: 2, filename: "school_approval.pdf", path: "uploads/events/2/docs/document_1.pdf" },
      { document_id: 3, filename: "curriculum.pdf", path: "uploads/events/2/docs/document_2.pdf" }
    ]
  },
  {
    event_id: 3,
    name: "Community Garden Construction",
    type: "construction",
    location: "Galle",
    is_range: true,
    date: null,
    start_date: "2025-12-01",
    end_date: "2025-12-10",
    volunteers_needed: 30,
    volunteers_signed: 12,
    description: "Help build a community garden to promote sustainable urban farming.",
    commitment: "flexible",
    skills: "manual",
    is_approved: false,
    organiser: {
      organiser_id: 3,
      name: "Nimal Perera",
      email: "nimal.perera@gmail.com",
      phone: "+94773456789"
    },
    documents: [
      { document_id: 4, filename: "land_permit.pdf", path: "uploads/events/3/docs/document_1.pdf" },
      { document_id: 5, filename: "safety_plan.pdf", path: "uploads/events/3/docs/document_2.pdf" }
    ]
  },
  {
    event_id: 4,
    name: "Elder Care Assistance",
    type: "caregiving",
    location: "Matara",
    is_range: false,
    date: "2025-11-18",
    start_date: null,
    end_date: null,
    volunteers_needed: 10,
    volunteers_signed: 5,
    description: "Provide companionship and assistance to elderly residents at local care homes.",
    commitment: "monthly",
    skills: "caregiving",
    is_approved: false,
    organiser: {
      organiser_id: 4,
      name: "Anura Wijesinghe",
      email: "anura.w@gmail.com",
      phone: "+94774567890"
    },
    documents: [
      { document_id: 6, filename: "care_home_approval.pdf", path: "uploads/events/4/docs/document_1.pdf" }
    ]
  }
];

const PendingEventsApproval = () => {
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
      // Uncomment when backend is ready
      // await axios.post(`http://localhost:5000/authManager/approve-event/${eventId}`);
      
      // For now, just remove from list (simulate approval)
      setEvents(prev => prev.filter(e => e.event_id !== eventId));
      handleCloseModal();
      
      console.log("Event approved:", eventId);
      // You can add a success toast notification here
    } catch (error) {
      console.error("Failed to approve event:", error);
      // You can add an error toast notification here
    }
  };

  const statsCards = [
    { value: stats.pending, label: "Pending", icon: "⏳", color: "#f59e0b" },
    { value: stats.approved, label: "Approved", icon: "✅", color: "#10b981" },
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
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'approval' ? 'active' : ''}`}
            onClick={() => setActiveTab('approval')}
          >
            📋 Pending Approval
          </button>
          <button 
            className={`tab-button ${activeTab === 'deletion' ? 'active' : ''}`}
            onClick={() => setActiveTab('deletion')}
          >
            🗑️ Pending Deletion
          </button>
        </div>

        {/* Stats Cards */}
      <div className="authmanager-stats-grid" style={{ marginBottom: 24 }}>
        {statsCards.map((card, idx) => (
          <div className="authmanager-stat-card" key={idx}>
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
      />
    </>
  );
};

export default PendingEventsApproval;
