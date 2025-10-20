import React, { useState } from "react";
import styles from "../Styles";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal";

const AdminManagement = ({ admins, onAdd, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedAdmin) {
      onDelete(selectedAdmin.id);
      toast.success("Admin deleted successfully!");
      setShowConfirm(false);
      setSelectedAdmin(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedAdmin(null);
  };

  return (
  <div>
    <ToastContainer position="top-right" autoClose={3000} />
    <ConfirmationModal
      show={showConfirm}
      title="Delete Admin"
      message={`Are you sure you want to delete admin "${selectedAdmin?.name}"? This action cannot be undone.`}
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
    />
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>Admin Management</h2>
      <button style={{...styles.btnPrimary, display: 'flex', alignItems: 'center', gap: '8px'}} onClick={onAdd}>
        <UserPlus size={18} />Add Admin
      </button>
    </div>
    <div style={styles.recentSection}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(a => (
            <tr key={a.id} style={styles.tr}>
              <td style={styles.td}>{a.name}</td>
              <td style={styles.td}>{a.email}</td>
              <td style={styles.td}>{a.role}</td>
              <td style={styles.td}>
                <span style={{...styles.badge, ...(a.status === 'Active' ? styles.badgeActive : styles.badgeInactive)}}>{a.status}</span>
              </td>
              <td style={styles.td}>
                <div style={styles.actionButtons}>
                  <button style={styles.btnIcon} onClick={() => onEdit(a)}><Edit size={24} /></button>
                  <button style={{...styles.btnIcon, ...styles.btnIconDelete}} onClick={() => handleDeleteClick(a)}><Trash2 size={24} /></button>
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

export default AdminManagement;