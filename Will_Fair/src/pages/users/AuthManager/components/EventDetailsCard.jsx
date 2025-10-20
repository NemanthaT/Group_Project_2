import React from "react";
import { CalendarDays, MapPin, Tag, Clock, Target, Users, FileText, Paperclip, User, StickyNote } from "lucide-react";
import "./EventDetailsCard.css";

const EventDetailsCard = ({ event, isOpen, onClose, onApprove, onDelete, activeTab }) => {
  if (!isOpen || !event) return null;

  // Helper function to format date
  const formatEventDate = () => {
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

  // Helper function to format commitment and type for display
  const formatLabel = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleApprove = () => {
    onApprove(event.event_id);
  };

  const handleDelete = () => {
    onDelete(event.event_id);
  };

  return (
    <>
      <div className="event-details-overlay" onClick={onClose}></div>

      <div className="event-details-modal">

        <button className="event-details-close" onClick={onClose}>
          ✕
        </button>

        <div className="event-details-body">
          
          <h2 className="event-details-title">{event.name}</h2>
          {event.image_path && (
            <div className="event-details-image-container">
              <img 
                src={`http://localhost:5000/${event.image_path}`} 
                alt={event.name}
                className="event-details-image"
              />
            </div>
          )}

          <div className="event-details-grid">

            <div className="event-detail-item">
              <span className="event-detail-label"><CalendarDays size={16} style={{marginRight:4}} /> Date</span>
              <span className="event-detail-value">{formatEventDate()}</span>
            </div>

            <div className="event-detail-item">
              <span className="event-detail-label"><MapPin size={16} style={{marginRight:4}} /> Location</span>
              <span className="event-detail-value">{event.location}</span>
            </div>

            <div className="event-detail-item">
              <span className="event-detail-label"><Tag size={16} style={{marginRight:4}} /> Type</span>
              <span className="event-detail-value">{formatLabel(event.type)}</span>
            </div>

            <div className="event-detail-item">
              <span className="event-detail-label"><Clock size={16} style={{marginRight:4}} /> Commitment</span>
              <span className="event-detail-value">{formatLabel(event.commitment)}</span>
            </div>

            <div className="event-detail-item">
              <span className="event-detail-label"><Target size={16} style={{marginRight:4}} /> Skills Required</span>
              <span className="event-detail-value">{formatLabel(event.skills)}</span>
            </div>

            <div className="event-detail-item">
              <span className="event-detail-label"><Users size={16} style={{marginRight:4}} /> Volunteers Needed</span>
              <span className="event-detail-value">{event.volunteers_needed}</span>
            </div>
          </div>

          <div className="event-detail-section">
            <h3 className="event-detail-section-title"><StickyNote size={16} style={{marginRight:4}} /> Description</h3>
            <p className="event-detail-description">{event.description}</p>
          </div>

          <div className="event-detail-section">
            <h3 className="event-detail-section-title"><User size={16} style={{marginRight:4}} /> Organiser Information</h3>
            <div className="event-organiser-info">
              <div className="event-organiser-item">
                <span className="event-organiser-label">Name:</span>
                <span className="event-organiser-value">{event.organiser.name}</span>
              </div>
              <div className="event-organiser-item">
                <span className="event-organiser-label">Email:</span>
                <span className="event-organiser-value">{event.organiser.email}</span>
              </div>
              <div className="event-organiser-item">
                <span className="event-organiser-label">Phone:</span>
                <span className="event-organiser-value">{event.organiser.phone}</span>
              </div>
            </div>
          </div>

          {event.documents && event.documents.length > 0 && (
            <div className="event-detail-section">
              <h3 className="event-detail-section-title"><Paperclip size={16} style={{marginRight:4}} /> Attached Documents</h3>
              <div className="event-documents-list">
                {event.documents.map((doc, index) => (
                  <div key={doc.document_id || index} className="event-document-item">
                    <span className="event-document-icon"><FileText size={16} style={{marginRight:4}} /></span>
                    <span className="event-document-name">{doc.filename}</span>
                    <a 
                      href={`http://localhost:5000/${doc.path}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="event-document-view"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="event-details-footer">
          {activeTab === 'approval' ? (
            <>
              <button className="event-details-btn event-details-btn-reject" onClick={handleDelete}>
                Reject
              </button>
              <button className="event-details-btn event-details-btn-approve" onClick={handleApprove}>
                Approve Event
              </button>
            </>
          ) : (
            <button className="event-details-btn event-details-btn-reject" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetailsCard;
