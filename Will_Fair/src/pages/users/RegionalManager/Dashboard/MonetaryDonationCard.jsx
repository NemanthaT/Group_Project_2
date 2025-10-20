import React, { useState } from 'react';
import { Package, DollarSign, CheckCircle, Clock, TrendingUp, Filter, Eye } from 'lucide-react';
import styles from "../Styles";
import ContactDetails from './ContactDetails';
import ProgressBar from './ProgressBar';

const MonetaryDonationCard = ({ donation, onComplete, onSent, getStatusColor }) => {
  const [showModal, setShowModal] = useState(false);
  const [donors, setDonors] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(false);
  const [errorDonors, setErrorDonors] = useState(null);

  const handleView = async () => {
    setShowModal(true);
    setLoadingDonors(true);
    setErrorDonors(null);
    try {
      const response = await fetch(`http://localhost:5000/donations/${donation.request_id}/contributors`);
      const data = await response.json();
      if (data.success) {
        setDonors(data.contributors);
      } else {
        setErrorDonors(data.error || 'Failed to fetch donor data');
      }
    } catch {
      setErrorDonors('Failed to fetch donor data');
    } finally {
      setLoadingDonors(false);
    }
  };

  return (
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
        <button style={styles.viewBtn} onClick={handleView}>
          <Eye size={18} /> View Donation Details
        </button>
        {donation.status === 'active' && (
          <>
            <button style={styles.completeBtn} onClick={() => onComplete(donation.request_id, 'monetary')}>
              <CheckCircle size={18} />
              Mark as Completed
            </button>
          </>
        )}

        {donation.status === 'completed' && (
          <button style={styles.sentBtnDonation} onClick={() => onSent(donation.request_id, 'monetary')}>
            <TrendingUp size={18} />
            Mark as Sent to Donee
          </button>
        )}
      </div>

      {/* Popup Modal for viewing donors */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: 0, minWidth: 420, maxWidth: '60%', boxShadow: '0 2px 24px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{padding: '24px 32px 8px 32px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <h2 style={{margin: 0, fontSize: 22, fontWeight: 600}}>Donors & Contributions</h2>
              <button style={{background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', color: '#888'}} onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div style={{padding: '20px 32px 32px 32px'}}>
              {loadingDonors ? (
                <div style={{padding: '24px 0'}}>Loading donors...</div>
              ) : errorDonors ? (
                <div style={{ color: 'red', padding: '24px 0' }}>{errorDonors}</div>
              ) : donors.length === 0 ? (
                <div style={{padding: '24px 0'}}>No donors have contributed yet.</div>
              ) : (
                <div style={{overflowX: 'auto'}}>
                  <table style={{width: '100%', borderCollapse: 'collapse', marginTop: 0, fontSize: 16}}>
                    <thead>
                      <tr style={{background: '#f7f7f7'}}>
                        <th style={{textAlign: 'left', padding: '10px 8px', fontWeight: 600, borderBottom: '1px solid #eee'}}>Donor Name</th>
                        <th style={{textAlign: 'left', padding: '10px 8px', fontWeight: 600, borderBottom: '1px solid #eee'}}>Amount (LKR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors.map((donor, idx) => (
                        <tr key={idx} style={{borderBottom: '1px solid #f0f0f0'}}>
                          <td style={{padding: '10px 8px'}}>{donor.name || 'Anonymous'}</td>
                          <td style={{padding: '10px 8px'}}>LKR {donor.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonetaryDonationCard;