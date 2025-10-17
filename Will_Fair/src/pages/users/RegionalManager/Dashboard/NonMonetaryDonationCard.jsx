import { Package, DollarSign, CheckCircle, Clock, TrendingUp, Filter } from 'lucide-react';
import styles from "../Styles";
import ContactDetails from './ContactDetails';
import ProgressBar from './ProgressBar';

const NonMonetaryDonationCard = ({ donation, onComplete, onSent, getStatusColor, isTargetReached }) => (
  <div style={styles.donationCard}>
    <div style={styles.cardHeader}>
      <div style={styles.cardTitleSection}>
        <h3 style={styles.cardTitle}>{donation.category}</h3>
        <span 
          style={{
            ...styles.statusBadge,
            backgroundColor: getStatusColor(donation.status === 'active' && isTargetReached(donation) ? 'completed' : donation.status)
          }}
        >
          {donation.status === 'active' && isTargetReached(donation) ? 'COMPLETED' : donation.status.toUpperCase()}
        </span>
      </div>
      <p style={styles.cardDate}>{donation.date}</p>
    </div>

    <div style={styles.cardBody}>
      <div style={styles.detailsGrid}>
        {/* <ContactDetails label="Donor" name={donation.donorName} contact={donation.donorContact} /> */}
        <ContactDetails label="Donee" name={donation.doneeName} contact={donation.phone} />
      </div>

      <div style={styles.itemsSection}>
        <div style={styles.itemsInfo}>
          <Package size={18} />
          <span style={styles.itemsText}>{donation.items}</span>
        </div>
        <div style={styles.quantityInfo}>
          <span style={styles.quantityLabel}>Quantity:</span>
          <span style={styles.quantityValue}>
            {donation.quantity_received} / {donation.quantity_needed}
          </span>
        </div>
      </div>

      <ProgressBar current={donation.quantity_received} target={donation.quantity_needed} type="nonMonetary" />

      {donation.status === 'active' && (
        <>
          <button style={styles.completeBtn} onClick={() => onComplete(donation.request_id, 'nonMonetary')}>
            <CheckCircle size={18} />
            Mark as Completed
          </button>
          <button style={styles.sentBtnDonation} onClick={() => onSent(donation.request_id, 'nonMonetary')}>
            <TrendingUp size={18} />
            Mark as Sent to Donee
          </button>
        </>
      )}

      {donation.status === 'completed' && (
        <button style={styles.sentBtnDonation} onClick={() => onSent(donation.request_id, 'nonMonetary')}>
          <TrendingUp size={18} />
          Mark as Sent to Donee
        </button>
      )}
    </div>
  </div>
);

export default NonMonetaryDonationCard;