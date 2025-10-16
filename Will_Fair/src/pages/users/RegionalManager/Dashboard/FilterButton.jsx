import { Package, DollarSign, CheckCircle, Clock, TrendingUp, Filter } from 'lucide-react';

const FilterButton = ({ active, label, onClick }) => (
  <button
    style={active ? {...styles.filterBtn, ...styles.filterBtnActive} : styles.filterBtn}
    onClick={onClick}>
{label}
  </button>
);

export default FilterButton;