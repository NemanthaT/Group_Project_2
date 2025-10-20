import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles";
import { Edit, Trash2, Check, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal";

const Donees = ({ onEdit }) => {
  const [donees, setDonees] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDonee, setSelectedDonee] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const fetchDonees = async () => {
      setLoading(true);
      try {
        const resp = await axios.get("http://localhost:5000/admin/donees");
        if (resp.data && resp.data.success) {
          setDonees(resp.data.donees);
        } else {
          setError("Failed to fetch donees");
        }
      } catch {
        setError("Error fetching donees");
      }
      setLoading(false);
    };
    fetchDonees();
  }, []);

  const handleDeleteClick = (donee) => {
    setSelectedDonee(donee);
    setConfirmAction('delete');
    setShowConfirm(true);
  };

  const handleToggleClick = (donee) => {
    setSelectedDonee(donee);
    setConfirmAction('toggle');
    setShowConfirm(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedDonee) return;

    if (confirmAction === 'delete') {
      try {
        const resp = await axios.delete(`http://localhost:5000/admin/donees/${selectedDonee.id}`);
        if (resp.data && resp.data.success) {
          setDonees(prev => prev.filter(d => d.id !== selectedDonee.id));
          toast.success("Donee deleted successfully!");
        } else {
          toast.error('Failed to delete donee');
        }
      } catch {
        toast.error('Error deleting donee');
      }
    } else if (confirmAction === 'toggle') {
      try {
        const resp = await axios.patch(`http://localhost:5000/admin/donees/${selectedDonee.id}/toggle`);
        if (resp.data && resp.data.success) {
          setDonees(prev =>
            prev.map(d =>
              d.id === selectedDonee.id ? { ...d, status: resp.data.status, verified: resp.data.status === 'Accepted' } : d
            )
          );
          toast.success(`Status updated to ${resp.data.status}!`);
        } else {
          toast.error('Failed to update status');
        }
      } catch {
        toast.error('Error updating status');
      }
    }

    setShowConfirm(false);
    setSelectedDonee(null);
    setConfirmAction(null);
  };

  const cancelAction = () => {
    setShowConfirm(false);
    setSelectedDonee(null);
    setConfirmAction(null);
  };

  const filtered = donees.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ||
      (filter === 'active' && d.status === 'Accepted') ||
      (filter === 'pending' && d.status === 'Pending');
    return matchSearch && matchFilter;
  });

  if (loading) return <div>Loading donees...</div>;
  if (error) return <div style={{color: 'red'}}>{error}<ToastContainer /></div>;

  const getConfirmMessage = () => {
    if (confirmAction === 'delete') {
      return `Are you sure you want to delete "${selectedDonee?.name}"? This action cannot be undone and will remove all associated records.`;
    } else if (confirmAction === 'toggle') {
      const newStatus = selectedDonee?.status === 'Accepted' ? 'Pending' : 'Accepted';
      return `Are you sure you want to change the status of "${selectedDonee?.name}" to ${newStatus}?`;
    }
    return '';
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <ConfirmationModal
        show={showConfirm}
        title={confirmAction === 'delete' ? 'Delete Donee' : 'Change Status'}
        message={getConfirmMessage()}
        onConfirm={handleConfirmAction}
        onCancel={cancelAction}
      />
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Donees Management</h2>
        <div style={styles.filterContainer}>
          <input type="text" placeholder="Search donees..." value={search} onChange={e => setSearch(e.target.value)} style={styles.searchBar} />
          <span style={styles.filterLabel}>Filter:</span>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={styles.select}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <div style={styles.recentSection}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Total Received</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Document</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id} style={styles.tr}>
                <td style={styles.td}>{d.name}</td>
                <td style={styles.td}>{d.email}</td>
                <td style={styles.td}>{d.phone}</td>
                <td style={styles.td}>${d.totalReceived}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...(d.status === 'Accepted' ? styles.badgeCompleted : styles.badgePending)}}>{d.status}</span>
                </td>
                <td style={styles.td}>
                  {d.documents.length > 0 ? (
                    <a href={'http://localhost:5173/'+d.documents[0]} target="_blank" rel="noopener noreferrer" style={styles.btnLink}>
                      View Document
                    </a>
                  ) : (
                    <span style={{color: '#888'}}>No document</span>
                  )}
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button style={styles.btnIcon} onClick={() => onEdit(d)}><Edit size={24} /></button>
                    <button style={styles.btnIcon} onClick={() => handleToggleClick(d)}>
                      {d.status === 'Accepted' ? <X size={24} /> : <Check size={24} />}
                    </button>
                    <button style={{...styles.btnIcon, ...styles.btnIconDelete}} onClick={() => handleDeleteClick(d)}><Trash2 size={24} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donees;