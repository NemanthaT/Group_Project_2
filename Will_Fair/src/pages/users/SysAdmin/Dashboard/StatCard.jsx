


const StatCard = ({ icon: Icon, title, value, color }) => (
  <div style={styles.statCard}>
    <div style={{...styles.statIcon, backgroundColor: color}}>
      <Icon size={24} color="#fff" />
    </div>
    <div style={styles.statContent}>
      <h3 style={styles.statTitle}>{title}</h3>
      <p style={styles.statValue}>{value}</p>
    </div>
  </div>
);

export default StatCard;