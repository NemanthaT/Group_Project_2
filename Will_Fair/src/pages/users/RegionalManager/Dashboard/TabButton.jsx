

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    style={active ? {...styles.tab, ...styles.activeTab} : styles.tab}
    onClick={onClick}
  >
    <Icon size={18} />
    {label}
  </button>
);

export default TabButton;