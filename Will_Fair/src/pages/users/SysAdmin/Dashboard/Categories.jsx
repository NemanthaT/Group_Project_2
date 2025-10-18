import React, { useEffect, useState } from "react";
import styles from "../Styles";
import { Edit, Trash2, UserPlus, Check, X } from "lucide-react";
import axios from "axios";

const Categories = ({ name, setName, desc, setDesc, onToggle, onDelete }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('Monetary');

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
      alert('Enter category name');
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
      } else {
        alert('Failed to add category');
      }
    } catch {
      alert('Error adding category');
    }
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div>
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
                <td style={styles.td}><strong>{c.name}</strong></td>
                <td style={styles.td}>{c.description}</td>
                <td style={styles.td}>{c.type}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, ...(c.status === 'Active' ? styles.badgeActive : styles.badgeInactive)}}>{c.status}</span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button style={styles.btnIcon} onClick={() => onToggle(c.id)}>
                      {c.status === 'Active' ? <X size={16} /> : <Check size={16} />}
                    </button>
                    <button style={{...styles.btnIcon, ...styles.btnIconDelete}} onClick={() => onDelete(c.id)}><Trash2 size={16} /></button>
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