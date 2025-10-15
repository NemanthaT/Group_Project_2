import styles from "../Styles";
import { Edit, Trash2, UserPlus, Check, X } from "lucide-react";


const DonationsHistory = ({ donations, filter, setFilter, onView }) => {
  const filtered = donations.filter(d => filter === 'all' || d.type === filter);
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Donations History</h2>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span style={styles.filterLabel}>Filter:</span>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={styles.select}>
            <option value="all">All Types</option>
            <option value="Monetary">Monetary</option>
            <option value="Non-Monetary">Non-Monetary</option>
          </select>
        </div>
      </div>
      <div style={styles.recentSection}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Donor</th>
              <th style={styles.th}>Donee</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Documents</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} style={styles.tr}>
                <td style={styles.td}>{d.donorName}</td>
                <td style={styles.td}>{d.doneeName}</td>
                <td style={styles.td}>${d.amount}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...(d.type === 'Monetary' ? styles.badgeMonetary : styles.badgeNonMonetary)}}>{d.type}</span>
                </td>
                <td style={styles.td}>{d.date}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...(d.status === 'Completed' ? styles.badgeCompleted : styles.badgePending)}}>{d.status}</span>
                </td>
                <td style={styles.td}>
                  <button style={styles.btnLink} onClick={() => onView(d.documents, 'Donation Documents')}>View ({d.documents.length})</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationsHistory;