import styles from "../Styles";
import { Edit, Trash2, UserPlus, Check, X } from "lucide-react";

const AdminManagement = ({ admins, onAdd, onEdit, onDelete }) => (
  <div>
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>Admin Management</h2>
      <button style={{...styles.btnPrimary, display: 'flex', alignItems: 'center', gap: '8px'}} onClick={onAdd}>
        <UserPlus size={18} />Add Admin
      </button>
    </div>
    <div style={styles.recentSection}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(a => (
            <tr key={a.id} style={styles.tr}>
              <td style={styles.td}>{a.name}</td>
              <td style={styles.td}>{a.email}</td>
              <td style={styles.td}>{a.role}</td>
              <td style={styles.td}>
                <span style={{...styles.badge, ...(a.status === 'Active' ? styles.badgeActive : styles.badgeInactive)}}>{a.status}</span>
              </td>
              <td style={styles.td}>
                <div style={styles.actionButtons}>
                  <button style={styles.btnIcon} onClick={() => onEdit(a)}><Edit size={16} /></button>
                  <button style={{...styles.btnIcon, ...styles.btnIconDelete}} onClick={() => onDelete(a.id)}><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminManagement;