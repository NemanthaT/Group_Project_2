import React from "react";
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

  // Format commitment and type for display
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
      {/* Modal Overlay */}
      <div className="event-details-overlay" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="event-details-modal">
        {/* Close Button */}
        <button className="event-details-close" onClick={onClose}>
          ✕
        </button>

        {/* Modal Body */}
        <div className="event-details-body">
          {/* Event Title */}
          <h2 className="event-details-title">{event.name}</h2>

          {/* Event Image */}
          {event.image_path && (
            <div className="event-details-image-container">
              <img 
                src={`http://localhost:5000/${event.image_path}`} 
                alt={event.name}
                className="event-details-image"
              />
            </div>
          )}

          {/* Event Info Grid */}
          <div className="event-details-grid">
            {/* Date */}
            <div className="event-detail-item">
              <span className="event-detail-label">📅 Date</span>
              <span className="event-detail-value">{formatEventDate()}</span>
            </div>

            {/* Location */}
            <div className="event-detail-item">
              <span className="event-detail-label">📍 Location</span>
              <span className="event-detail-value">{event.location}</span>
            </div>

            {/* Type */}
            <div className="event-detail-item">
              <span className="event-detail-label">🏷️ Type</span>
              <span className="event-detail-value">{formatLabel(event.type)}</span>
            </div>

            {/* Commitment */}
            <div className="event-detail-item">
              <span className="event-detail-label">⏰ Commitment</span>
              <span className="event-detail-value">{formatLabel(event.commitment)}</span>
            </div>

            {/* Skills */}
            <div className="event-detail-item">
              <span className="event-detail-label">🎯 Skills Required</span>
              <span className="event-detail-value">{formatLabel(event.skills)}</span>
            </div>

            {/* Volunteers */}
            <div className="event-detail-item">
              <span className="event-detail-label">👥 Volunteers Needed</span>
              <span className="event-detail-value">{event.volunteers_needed}</span>
            </div>
          </div>

          {/* Description */}
          <div className="event-detail-section">
            <h3 className="event-detail-section-title">📝 Description</h3>
            <p className="event-detail-description">{event.description}</p>
          </div>

          {/* Organiser Information */}
          <div className="event-detail-section">
            <h3 className="event-detail-section-title">👤 Organiser Information</h3>
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

          {/* Documents */}
          {event.documents && event.documents.length > 0 && (
            <div className="event-detail-section">
              <h3 className="event-detail-section-title">📎 Attached Documents</h3>
              <div className="event-documents-list">
                {event.documents.map((doc, index) => (
                  <div key={doc.document_id || index} className="event-document-item">
                    <span className="event-document-icon">📄</span>
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

        {/* Modal Footer */}
        <div className="event-details-footer">
          {activeTab === 'approval' ? (
            <>
              <button className="event-details-btn event-details-btn-reject" onClick={onClose}>
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
