import { Package, DollarSign, CheckCircle, Clock, TrendingUp, Filter } from 'lucide-react';
import styles from "../Styles";
import ContactDetails from './ContactDetails';
import ProgressBar from './ProgressBar';

const MonetaryDonationCard = ({ donation, onComplete, onSent, getStatusColor, isTargetReached }) => (
  <div style={styles.donationCard}>
    <div style={styles.cardHeader}>
      <div style={styles.cardTitleSection}>
        <h3 style={styles.cardTitle}>{donation.category}</h3>
        <span 
          style={{
            ...styles.statusBadge,
            backgroundColor: getStatusColor(donation.status)
          }}
        >
          {donation.status.toUpperCase()}
        </span>
      </div>
      <p style={styles.cardDate}>{donation.request_date}</p>
    </div>

    <div style={styles.cardBody}>
      <div style={styles.detailsGrid}>
        {/*<ContactDetails label="Donor" name={donation.donorName} contact={donation.donorContact} />*/}
        <ContactDetails label="Donee" name={donation.doneeName} contact={donation.phone} />
      </div>

      <div style={styles.amountSection}>
        <div style={styles.amountInfo}>
          <span style={styles.amountLabel}>Current:</span>
          <span style={styles.amountValue}>LKR {donation.quantity_received.toLocaleString()}</span>
        </div>
        <div style={styles.amountInfo}>
          <span style={styles.amountLabel}>Target:</span>
          <span style={styles.amountValue}>LKR {donation.quantity_needed.toLocaleString()}</span>
        </div>
      </div>

      <ProgressBar current={donation.quantity_received} target={donation.quantity_needed} type="monetary" />

      {donation.status === 'active' && (
        <>
          <button style={styles.completeBtn} onClick={() => onComplete(donation.request_id, 'monetary')}>
            <CheckCircle size={18} />
            Mark as Completed
          </button>
          {/* <button style={styles.sentBtnDonation} onClick={() => onSent(donation.request_id, 'monetary')}>
            <TrendingUp size={18} />
            Mark as Sent to Donee
          </button>*/}
        </>
      )}

      {donation.status === 'completed' && (
        <button style={styles.sentBtnDonation} onClick={() => onSent(donation.request_id, 'monetary')}>
          <TrendingUp size={18} />
          Mark as Sent to Donee
        </button>
      )}
    </div>
  </div>
);

export default MonetaryDonationCard;