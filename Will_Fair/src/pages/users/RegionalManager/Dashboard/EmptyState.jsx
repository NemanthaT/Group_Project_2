

const EmptyState = () => (
  <div style={styles.emptyState}>
    <Package size={48} style={{ color: '#9ca3af' }} />
    <p style={styles.emptyText}>No donations found for this filter</p>
  </div>
);

export default EmptyState;