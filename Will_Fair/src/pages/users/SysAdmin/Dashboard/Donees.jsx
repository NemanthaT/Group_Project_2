import styles from "../Styles";
import { Edit, Trash2, UserPlus, Check, X, AlertCircle } from "lucide-react";

const Donees = ({ donees, search, setSearch, filter, setFilter, onView, onEdit, onDelete }) => {
  const filtered = donees.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'verified' && d.verified) || (filter === 'unverified' && !d.verified);
    return matchSearch && matchFilter;
  });
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Donees Management</h2>
        <div style={styles.filterContainer}>
          <input type="text" placeholder="Search donees..." value={search} onChange={e => setSearch(e.target.value)} style={styles.searchBar} />
          <span style={styles.filterLabel}>Filter:</span>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={styles.select}>
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>
      <div style={styles.recentSection}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Total Received</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Verified</th>
              <th style={styles.th}>Documents</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} style={styles.tr}>
                <td style={styles.td}>{d.name}</td>
                <td style={styles.td}>{d.email}</td>
                <td style={styles.td}>{d.phone}</td>
                <td style={styles.td}>${d.totalReceived}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...(d.status === 'Accepted' ? styles.badgeCompleted : styles.badgePending)}}>{d.status}</span>
                </td>
                <td style={styles.td}>
                  {d.verified ? (
                    <span style={{...styles.verificationBadge, ...styles.verifiedBadge}}><Check size={14} /> Verified</span>
                  ) : (
                    <span style={{...styles.verificationBadge, ...styles.badgePending}}><AlertCircle size={14} /> Pending</span>
                  )}
                </td>
                <td style={styles.td}>
                  <button style={styles.btnLink} onClick={() => onView(d.documents, `${d.name}'s Documents`)}>View ({d.documents.length})</button>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button style={styles.btnIcon} onClick={() => onEdit(d)}><Edit size={16} /></button>
                    <button style={{...styles.btnIcon, ...styles.btnIconDelete}} onClick={() => onDelete(d.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donees;