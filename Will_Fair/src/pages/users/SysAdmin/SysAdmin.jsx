import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './Dashboard/Overview';
import Donors from './Dashboard/Donors';
import Donees from './Dashboard/Donees';
import DonationsHistory from './Dashboard/DonationsHistory';
import Categories from './Dashboard/Categories';
import AdminManagement from './Dashboard/AdminManagement';
import Modal from './Dashboard/Modal';
import DocumentViewer from './Dashboard/DocumentViewer';

import styles from "./Styles";
import "./AdminStyles.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDocViewer, setShowDocViewer] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState({ docs: [], title: '' });
  const [donationTypeFilter, setDonationTypeFilter] = useState('all');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const [donees, setDonees] = useState([
    { id: 1, name: 'Emma Brown', email: 'emma@email.com', phone: '+1234567893', totalReceived: 2000, status: 'Accepted', verified: true, documents: ['ID Card', 'Proof of Income'] },
    { id: 2, name: 'David Lee', email: 'david@email.com', phone: '+1234567894', totalReceived: 1500, status: 'Pending', verified: false, documents: ['ID Card'] },
    { id: 3, name: 'Lisa Garcia', email: 'lisa@email.com', phone: '+1234567895', totalReceived: 3000, status: 'Accepted', verified: true, documents: ['ID Card', 'Proof of Income', 'Medical Bills'] }
  ]);

  const [donations] = useState([
    { id: 1, donorName: 'John Smith', doneeName: 'Emma Brown', amount: 500, date: '2025-10-10', status: 'Completed', type: 'Monetary', documents: ['Receipt', 'Transfer Proof'] },
    { id: 2, donorName: 'Sarah Johnson', doneeName: 'David Lee', amount: 300, date: '2025-10-12', status: 'Pending', type: 'Monetary', documents: ['Request Form'] },
    { id: 3, donorName: 'Mike Wilson', doneeName: 'Lisa Garcia', amount: 1000, date: '2025-10-14', status: 'Completed', type: 'Non-Monetary', documents: ['Receipt'] }
  ]);

  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin User', email: 'admin@welfare.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Jane Moderator', email: 'jane@welfare.com', role: 'Moderator', status: 'Active' }
  ]);

  const [stats, setStats] = useState({
    totalDonors: 0,
    totalDonees: 0,
    totalDonations: 0,
    pendingVerifications: 0
  });
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    // Fetch admin dashboard stats and recent donations
    const fetchOverview = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/admin/overview');
        if (resp.data && resp.data.success) {
          setStats(resp.data.stats);
          setRecentDonations(resp.data.recentDonations);
        }
      } catch (err) {
        console.error('Failed to fetch admin overview', err);
      }
    };
    fetchOverview();
  }, []);

  const handleDelete = (type, id) => {
    if (!window.confirm('Delete this item?')) return;
    if (type === 'donee') setDonees(donees.filter(d => d.id !== id));
    if (type === 'admin') setAdmins(admins.filter(a => a.id !== id));
  };

  const viewDocuments = (docs, title) => {
    setSelectedDocs({ docs, title });
    setShowDocViewer(true);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div style={styles.dashboard} className='adminDashboard'>
      {/*<header style={styles.header}>
        <h1 style={styles.headerTitle}>Welfare Platform Admin Dashboard</h1>
        <div style={styles.headerActions}>
          <span style={styles.adminName}>Admin User</span>
        </div>
      </header>*/}

      <nav style={styles.nav}>
        <button style={{...styles.navBtn, ...(activeTab === 'overview' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('overview')}>Overview</button>
        <button style={{...styles.navBtn, ...(activeTab === 'donors' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('donors')}>Donors</button>
        <button style={{...styles.navBtn, ...(activeTab === 'donees' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('donees')}>Donees</button>
        {/*<button style={{...styles.navBtn, ...(activeTab === 'donations' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('donations')}>Donations</button>*/}
        <button style={{...styles.navBtn, ...(activeTab === 'categories' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('categories')}>Categories</button>
        <button style={{...styles.navBtn, ...(activeTab === 'admins' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('admins')}>Admin Management</button>
      </nav>

      <main style={styles.content}>
        {activeTab === 'overview' && <Overview stats={stats} donations={recentDonations} />}
        {activeTab === 'donors' && <Donors />}
        {activeTab === 'donees' && <Donees onEdit={(item) => openModal('edit', item)} onDelete={(id) => handleDelete('donee', id)} />}
        {activeTab === 'donations' && <DonationsHistory donations={donations} filter={donationTypeFilter} setFilter={setDonationTypeFilter} onView={viewDocuments} />}
        {activeTab === 'categories' && <Categories name={newCategoryName} setName={setNewCategoryName} desc={newCategoryDesc} setDesc={setNewCategoryDesc} onAdd={() => {}} onToggle={() => {}} onDelete={(id) => handleDelete('category', id)} />}
        {activeTab === 'admins' && <AdminManagement admins={admins} onAdd={() => openModal('add')} onEdit={(item) => openModal('edit', item)} onDelete={(id) => handleDelete('admin', id)} />}
      </main>

      <Modal show={showModal} onClose={() => setShowModal(false)} type={modalType} item={selectedItem} />
      <DocumentViewer show={showDocViewer} onClose={() => setShowDocViewer(false)} docs={selectedDocs} />
    </div>
  );
};

export default AdminDashboard;