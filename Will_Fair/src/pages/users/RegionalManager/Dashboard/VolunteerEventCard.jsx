import { Calendar, Clock, MapPin, Send, Eye } from 'lucide-react';
import styles from "../Styles";

const VolunteerEventCard = ({ event, onView, onSend }) => (
  <div style={styles.eventCard}>
    <div style={styles.eventHeader}>
      <div style={styles.eventTitleSection}>
        <div style={styles.eventIconTitle}>
          <Calendar size={24} style={{ color: '#667eea' }} />
          <h3 style={styles.eventTitle}>{event.name}</h3>
        </div>
        <span style={{...styles.statusBadge, backgroundColor: '#8b5cf6'}}>
          {event.volunteers} VOLUNTEERS
        </span>
      </div>
    </div>

    <div style={styles.eventBody}>
      <div style={styles.eventInfo}>
        <div style={styles.eventDetail}>
          <Calendar size={16} style={{ color: '#6b7280' }} />
          <span style={styles.eventDetailText}>{event.date}</span>
        </div>
        <div style={styles.eventDetail}>
          <Clock size={16} style={{ color: '#6b7280' }} />
          <span style={styles.eventDetailText}>{event.time}</span>
        </div>
        <div style={styles.eventDetail}>
          <MapPin size={16} style={{ color: '#6b7280' }} />
          <span style={styles.eventDetailText}>{event.location}</span>
        </div>
      </div>

      <div style={styles.organizerSection}>
        <div>
          <p style={styles.detailLabel}>Event Organizer</p>
          <p style={styles.detailValue}>{event.organizer}</p>
          <p style={styles.detailContact}>{event.organizerContact}</p>
        </div>
      </div>

      <div style={styles.eventDescription}>
        <p style={styles.descriptionLabel}>Description</p>
        <p style={styles.descriptionText}>{event.description}</p>
      </div>

      <div style={styles.eventActions}>
        <button style={styles.viewBtn} onClick={() => onView(event.id)}>
          <Eye size={18} />
          View Event Details
        </button>
        <button style={styles.sendBtn} onClick={() => onSend(event.id)}>
          <Send size={18} />
          Send Participants to Organizer
        </button>
      </div>
    </div>
  </div>
);

export default VolunteerEventCard;