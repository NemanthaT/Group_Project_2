import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles";
import { Edit, Trash2 } from "lucide-react";

const Donors = ({ onEdit, onDelete }) => {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/admin/donors");
        if (res.data.success) {
          setDonors(res.data.donors.map(d => ({
            id: d.id,
            name: d.name,
            email: d.email,
            phone: d.phone,
            totalDonations: d.totalDonations
          })));
        } else {
          setError(res.data.error || "Failed to fetch donors");
        }
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const filtered = donors.filter(d => d.name?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div>Loading donors...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

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
              {/*<th style={styles.th}>Status</th>*/}
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
                {/*<td style={styles.td}>
                  <span style={{...styles.badge, ...(d.status === 'Active' ? styles.badgeActive : styles.badgeInactive)}}>{d.status}</span>
                </td>*/}
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