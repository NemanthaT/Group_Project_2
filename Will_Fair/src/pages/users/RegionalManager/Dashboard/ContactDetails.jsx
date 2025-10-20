import styles from "../Styles";

const ContactDetails = ({ label, name, contact }) => (
  <div style={styles.detailSection}>
    <p style={styles.detailLabel}>{label}</p>
    <p style={styles.detailValue}>{name}</p>
    <p style={styles.detailContact}>{contact}</p>
  </div>
);

export default ContactDetails;