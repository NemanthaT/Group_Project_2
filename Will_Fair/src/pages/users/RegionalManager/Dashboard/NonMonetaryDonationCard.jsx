import { Package, DollarSign, CheckCircle, Clock, TrendingUp, Filter } from 'lucide-react';

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
        <ContactDetails label="Donor" name={donation.donorName} contact={donation.donorContact} />
        <ContactDetails label="Donee" name={donation.doneeName} contact={donation.doneeContact} />
      </div>

      <div style={styles.itemsSection}>
        <div style={styles.itemsInfo}>
          <Package size={18} />
          <span style={styles.itemsText}>{donation.items}</span>
        </div>
        <div style={styles.quantityInfo}>
          <span style={styles.quantityLabel}>Quantity:</span>
          <span style={styles.quantityValue}>
            {donation.quantity} / {donation.targetQuantity}
          </span>
        </div>
      </div>

      <ProgressBar current={donation.quantity} target={donation.targetQuantity} type="nonMonetary" />

      {donation.quantity >= donation.targetQuantity && donation.status === 'active' && (
        <button style={styles.completeBtn} onClick={() => onComplete(donation.id, 'nonMonetary')}>
          <CheckCircle size={18} />
          Mark as Completed
        </button>
      )}
      
      {donation.status === 'completed' && (
        <button style={styles.sentBtn} onClick={() => onSent(donation.id, 'nonMonetary')}>
          <TrendingUp size={18} />
          Mark as Sent to Donee
        </button>
      )}
    </div>
  </div>
);

export default NonMonetaryDonationCard;