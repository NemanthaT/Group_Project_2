import React, { useEffect, useState } from "react";
import styles from "../Styles";
import { Edit, Trash2, UserPlus, Check, X, Save } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal";

const Categories = ({ name, setName, desc, setDesc }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('Monetary');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editType, setEditType] = useState("Monetary");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const resp = await axios.get("http://localhost:5000/admin/categories");
        if (resp.data && resp.data.success) {
          setCategories(resp.data.categories);
        } else {
          setError("Failed to fetch categories");
        }
      } catch {
        setError("Error fetching categories");
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) {
      toast.warn('Enter category name');
      return;
    }
    try {
      const resp = await axios.post('http://localhost:5000/admin/categories', {
        name,
        description: desc,
        type,
      });
      if (resp.data && resp.data.success) {
        setCategories(prev => [...prev, resp.data.category]);
        setName('');
        setDesc('');
        setType('Monetary');
        toast.success('Category added successfully!');
      } else {
        toast.error('Failed to add category');
      }
    } catch {
      toast.error('Error adding category');
    }
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setConfirmAction('delete');
    setShowConfirm(true);
  };

  const handleToggleClick = (category) => {
    setSelectedCategory(category);
    setConfirmAction('toggle');
    setShowConfirm(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedCategory) return;

    if (confirmAction === 'delete') {
      try {
        const resp = await axios.delete(`http://localhost:5000/admin/categories/${selectedCategory.id}`);
        if (resp.data && resp.data.success) {
          setCategories(prev => prev.filter(c => c.id !== selectedCategory.id));
          toast.success('Category deleted!');
        } else {
          toast.error('Failed to delete category');
        }
      } catch {
        toast.error('Error deleting category');
      }
    } else if (confirmAction === 'toggle') {
      try {
        const resp = await axios.patch(`http://localhost:5000/admin/categories/${selectedCategory.id}/toggle`);
        if (resp.data && resp.data.success) {
          setCategories(prev =>
            prev.map(c =>
              c.id === selectedCategory.id ? { ...c, status: resp.data.status } : c
            )
          );
          toast.success('Category status updated!');
        } else {
          toast.error('Failed to update status');
        }
      } catch {
        toast.error('Error updating status');
      }
    }

    setShowConfirm(false);
    setSelectedCategory(null);
    setConfirmAction(null);
  };

  const cancelAction = () => {
    setShowConfirm(false);
    setSelectedCategory(null);
    setConfirmAction(null);
  };

  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description);
    setEditType(cat.type);
  };

  const handleEditSave = async (id) => {
    try {
      const resp = await axios.put(`http://localhost:5000/admin/categories/${id}`,
        { name: editName, description: editDesc, type: editType });
      if (resp.data && resp.data.success) {
        setCategories(prev =>
          prev.map(c =>
            c.id === id
              ? { ...c, name: editName, description: editDesc, type: editType }
              : c
          )
        );
        setEditId(null);
        toast.success('Category updated!');
      } else {
        toast.error('Failed to update category');
      }
    } catch {
      toast.error('Error updating category');
    }
  };

  const getConfirmMessage = () => {
    if (confirmAction === 'delete') {
      return `Are you sure you want to delete the category "${selectedCategory?.name}"? This action cannot be undone.`;
    } else if (confirmAction === 'toggle') {
      const newStatus = selectedCategory?.status === 'Active' ? 'Inactive' : 'Active';
      return `Are you sure you want to change the status of "${selectedCategory?.name}" to ${newStatus}?`;
    }
    return '';
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div style={{color: 'red'}}>{error}<ToastContainer /></div>;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <ConfirmationModal
        show={showConfirm}
        title={confirmAction === 'delete' ? 'Delete Category' : 'Change Status'}
        message={getConfirmMessage()}
        onConfirm={handleConfirmAction}
        onCancel={cancelAction}
      />
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Donation Categories</h2>
      </div>
      <div style={{...styles.recentSection, marginBottom: '20px'}}>
        <h3 style={{margin: '0 0 15px 0', fontSize: '16px', fontWeight: '600'}}>Add New Category</h3>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <input type="text" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} style={{...styles.input, flex: 1, minWidth: '200px'}} />
          <input type="text" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} style={{...styles.input, flex: 2, minWidth: '250px'}} />
          <select value={type} onChange={e => setType(e.target.value)} style={{...styles.input, flex: 1, minWidth: '150px'}}>
            <option value="Monetary">Monetary</option>
            <option value="Non-Monetary">Non-Monetary</option>
          </select>
          <button style={{...styles.btnPrimary, display: 'flex', alignItems: 'center', gap: '8px'}} onClick={handleAdd}>
            <UserPlus size={18} />Add
          </button>
        </div>
      </div>
      <div style={styles.recentSection}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Category Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} style={styles.tr}>
                <td style={styles.td}>
                  {editId === c.id ? (
                    <input value={editName} onChange={e => setEditName(e.target.value)} style={styles.input} />
                  ) : (
                    <strong>{c.name}</strong>
                  )}
                </td>
                <td style={styles.td}>
                  {editId === c.id ? (
                    <input value={editDesc} onChange={e => setEditDesc(e.target.value)} style={styles.input} />
                  ) : (
                    c.description
                  )}
                </td>
                <td style={styles.td}>
                  {editId === c.id ? (
                    <select value={editType} onChange={e => setEditType(e.target.value)} style={styles.input}>
                      <option value="Monetary">Monetary</option>
                      <option value="Non-Monetary">Non-Monetary</option>
                    </select>
                  ) : (
                    c.type
                  )}
                </td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...(c.status === 'Active' ? styles.badgeActive : styles.badgeInactive)}}>{c.status}</span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    {editId === c.id ? (
                      <button style={styles.btnIcon} onClick={() => handleEditSave(c.id)}><Save size={24} /></button>
                    ) : (
                      <button style={styles.btnIcon} onClick={() => startEdit(c)}><Edit size={24} /></button>
                    )}
                    <button style={styles.btnIcon} onClick={() => handleToggleClick(c)}>
                      {c.status === 'Active' ? <X size={24} /> : <Check size={24} />}
                    </button>
                    <button style={{...styles.btnIcon, ...styles.btnIconDelete}} onClick={() => handleDeleteClick(c)}><Trash2 size={24} /></button>
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

export default Categories;