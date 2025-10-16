import styles from "../Styles";
import { X } from 'lucide-react';

const Modal = ({ show, onClose, type, item }) => {
  if (!show) return null;
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{type === 'add' ? 'Add' : 'Edit'} User</h2>
          <button style={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input type="text" defaultValue={item?.name || ''} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" defaultValue={item?.email || ''} style={styles.input} />
          </div>
          <div style={styles.formActions}>
            <button style={styles.btnSecondary} onClick={onClose}>Cancel</button>
            <button style={styles.btnPrimary}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;