import styles from "../Styles";


const NavButton = ({ active, label, onClick }) => (
  <button
    style={active ? {...styles.navBtn, ...styles.navBtnActive} : styles.navBtn}
    onClick={onClick}
  >
    {label}
  </button>
);

export default NavButton;