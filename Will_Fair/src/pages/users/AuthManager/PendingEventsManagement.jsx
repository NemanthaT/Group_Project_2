import React, { useEffect, useState } from "react";
import { Clock, ClipboardList, Trash2 } from "lucide-react";
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from "../../../components/ConfirmationModal";
import EventDetailsCard from "./components/EventDetailsCard";
import "./AuthManagerDashboard.css";

const PendingEventsManagement = ({ onCountChange }) => {
  const [activeTab, setActiveTab] = useState('approval');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ pending: 0, approved: 0, declined: 0, total: 0 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [tabCounts, setTabCounts] = useState({
    approval: 0,
    deletion: 0
  });

  // Fetch counts for both tabs
  useEffect(() => {
    const fetchTabCounts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/authManager/event-counts");
        
        if (response.data.success) {
          setTabCounts({
            approval: response.data.counts.pendingApproval,
            deletion: response.data.counts.pendingDeletion
          });
        }
      } catch (error) {
        console.error("Failed to fetch tab counts:", error);
      }
    };
    
    fetchTabCounts();
  }, []);

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
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

  const handleApproveClick = (eventId) => {
    setConfirmAction({ type: 'approve', eventId });
    setShowConfirm(true);
    handleCloseModal();
  };

  const handleDeleteClick = (eventId) => {
    setConfirmAction({ type: 'delete', eventId });
    setShowConfirm(true);
    handleCloseModal();
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    const { type, eventId } = confirmAction;

    try {
      if (type === 'approve') {
        const response = await axios.post(
          `http://localhost:5000/authManager/approve-event/${eventId}`
        );
        
        if (response.data.success) {
          setEvents(prev => prev.filter(e => e.event_id !== eventId));
          
          setTabCounts(prev => ({
            ...prev,
            approval: Math.max(0, prev.approval - 1)
          }));
          
          if (onCountChange) {
            onCountChange();
          }
          
          toast.success("Event approved successfully!");
        }
      } else if (type === 'reject') {
        const response = await axios.post(
          `http://localhost:5000/authManager/reject-event/${eventId}`,
          {
            rejectionReason: ''
          }
        );
        
        if (response.data.success) {
          setEvents(prev => prev.filter(e => e.event_id !== eventId));
          
          setTabCounts(prev => ({
            ...prev,
            approval: Math.max(0, prev.approval - 1)
          }));
          
          if (onCountChange) {
            onCountChange();
          }
          
          toast.success("Event rejected successfully!");
        }
      } else if (type === 'delete') {
        const response = await axios.delete(
          `http://localhost:5000/authManager/delete-event/${eventId}`
        );
        
        if (response.data.success) {
          setEvents(prev => prev.filter(e => e.event_id !== eventId));
          
          setTabCounts(prev => ({
            ...prev,
            [activeTab]: Math.max(0, prev[activeTab] - 1)
          }));
          
          if (onCountChange) {
            onCountChange();
          }
          
          toast.success("Event deleted successfully!");
        }
      }
    } catch (error) {
      console.error(`❌ Failed to ${type} event:`, error);
      toast.error(`Failed to ${type} event. Please try again.`);
    } finally {
      setShowConfirm(false);
      setConfirmAction(null);
    }
  };

  const handleRejectClick = (eventId) => {
    setConfirmAction({ type: 'reject', eventId });
    setShowConfirm(true);
    handleCloseModal();
  };

  const cancelAction = () => {
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const getConfirmMessage = () => {
    if (!confirmAction) return '';
    const event = events.find(e => e.event_id === confirmAction.eventId);
    if (!event) return '';
    
    if (confirmAction.type === 'approve') {
      return `Are you sure you want to approve the event "${event.name}"? This will make it visible to volunteers.`;
    } else if (confirmAction.type === 'reject') {
      return `Are you sure you want to reject the event "${event.name}"? This action cannot be undone.`;
    } else if (confirmAction.type === 'delete') {
      return `Are you sure you want to delete the event "${event.name}"? This action cannot be undone.`;
    }
    return '';
  };

  const statsCards = [
    { value: stats.pending, label: "Pending", icon: <Clock size={28} />, color: "#f59e0b" }
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
      <ToastContainer position="top-right" autoClose={3000} />
      <ConfirmationModal
        show={showConfirm}
        title={
          confirmAction?.type === 'approve' ? 'Approve Event' : 
          confirmAction?.type === 'reject' ? 'Reject Event' : 
          'Delete Event'
        }
        message={getConfirmMessage()}
        onConfirm={handleConfirmAction}
        onCancel={cancelAction}
      />
      <div className="authmanager-dashboard-content">
        <div className="authmanager-welcome-section">
          <div className="authmanager-welcome-content">
            <h2>Event Management</h2>
            <p>Review and manage volunteer event submissions and deletion requests</p>
          </div>
        </div>

        <div className="pending-events-tab-navigation">
          <button 
            className={`pending-events-tab-button ${activeTab === 'approval' ? 'pending-events-tab-active' : ''}`}
            onClick={() => setActiveTab('approval')}
          >
            <span className="tab-icon"><ClipboardList size={20} /></span>
            Pending Approval
            {tabCounts.approval > 0 && (
              <span className="pending-events-tab-badge">{tabCounts.approval}</span>
            )}
          </button>
          <button 
            className={`pending-events-tab-button ${activeTab === 'deletion' ? 'pending-events-tab-active' : ''}`}
            onClick={() => setActiveTab('deletion')}
          >
            <span className="tab-icon"><Trash2 size={20} /></span>
            Pending Deletion
            {tabCounts.deletion > 0 && (
              <span className="pending-events-tab-badge">{tabCounts.deletion}</span>
            )}
          </button>
        </div>

      <div className="authmanager-stats-grid" style={{ marginBottom: 24 }}>
        {statsCards.map((card, idx) => (
          <div className="authmanager-stat-card-full" key={idx}>
            <div
              className="authmanager-stat-icon"
              style={{ color: card.color }}
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

      <EventDetailsCard
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApprove={handleApproveClick}
        onReject={handleRejectClick}
        onDelete={handleDeleteClick}
        activeTab={activeTab}
      />
    </>
  );
};

export default PendingEventsManagement;
