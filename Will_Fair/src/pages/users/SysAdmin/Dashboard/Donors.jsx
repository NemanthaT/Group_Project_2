

const Donors = ({ donors, search, setSearch, onEdit, onDelete }) => {
  const filtered = donors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Donors Management</h2>
        <input type="text" placeholder="Search donors..." value={search} onChange={e => setSearch(e.target.value)} style={styles.searchBar} />
      </div>
      <div style={styles.recentSection}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Total Donations</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} style={styles.tr}>
                <td style={styles.td}>{d.name}</td>
                <td style={styles.td}>{d.email}</td>
                <td style={styles.td}>{d.phone}</td>
                <td style={styles.td}>${d.totalDonations}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...(d.status === 'Active' ? styles.badgeActive : styles.badgeInactive)}}>{d.status}</span>
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

export default Donors;