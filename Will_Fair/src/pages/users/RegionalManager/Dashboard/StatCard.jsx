

const StatCard = ({ icon: Icon, label, value, gradientClass }) => (
  <div style={styles.statCard}>
    <div style={{...styles.statIcon, ...gradientClass}}>
      <Icon size={24} />
    </div>
    <div style={styles.statContent}>
      <p style={styles.statLabel}>{label}</p>
      <p style={styles.statValue}>{value}</p>
    </div>
  </div>
);

export default StatCard;