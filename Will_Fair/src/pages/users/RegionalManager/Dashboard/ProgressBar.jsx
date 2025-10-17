import styles from "../Styles";

const ProgressBar = ({ current, target, type }) => {
  const progress = Math.min((current / target) * 100, 100);
  const backgroundColor = current >= target ? '#10b981' : (type === 'monetary' ? '#3b82f6' : '#8b5cf6');
  
  return (
    <div style={styles.progressSection}>
      <div style={styles.progressBar}>
        <div 
          style={{
            ...styles.progressFill,
            width: `${progress}%`,
            backgroundColor
          }}
        />
      </div>
      <span style={styles.progressText}>
        {progress.toFixed(0)}% of target reached
      </span>
    </div>
  );
};

export default ProgressBar;