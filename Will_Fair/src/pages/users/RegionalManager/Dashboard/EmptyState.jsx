import { Package } from 'lucide-react';
import styles from "../Styles";

const EmptyState = ({ message }) => (
  <div style={styles.emptyState}>
    <Package size={48} style={{ color: '#9ca3af' }} />
    <p style={styles.emptyText}>{message || 'No items found'}</p>
  </div>
);

export default EmptyState;