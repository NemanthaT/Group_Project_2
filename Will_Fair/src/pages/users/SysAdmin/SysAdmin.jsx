import React, { useState } from 'react';
import Overview from './Dashboard/Overview';
import Donors from './Dashboard/Donors';
import Donees from './Dashboard/Donees';
import DonationsHistory from './Dashboard/DonationsHistory';
import Categories from './Dashboard/Categories';
import AdminManagement from './Dashboard/AdminManagement';
import Modal from './Dashboard/Modal';
import DocumentViewer from './Dashboard/Documentviewer';


const styles = {
  dashboard: { fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#1f2937', color: 'white', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { margin: 0, fontSize: '24px' },
  headerActions: { display: 'flex', alignItems: 'center', gap: '15px' },
  adminName: { fontSize: '14px' },
  nav: { backgroundColor: 'white', padding: '0 30px', display: 'flex', gap: '5px', borderBottom: '1px solid #e5e7eb' },
  navBtn: { padding: '15px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: '#6b7280', borderBottom: '2px solid transparent', transition: 'all 0.2s' },
  navBtnActive: { color: '#4f46e5', borderBottomColor: '#4f46e5' },
  content: { padding: '30px', maxWidth: '1400px', margin: '0 auto' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' },
  statCard: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  statIcon: { width: '50px', height: '50px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statContent: { flex: 1 },
  statTitle: { margin: 0, fontSize: '14px', color: '#6b7280', fontWeight: '500' },
  statValue: { margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' },
  recentSection: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  sectionTitle: { margin: '0 0 20px 0', fontSize: '20px', fontWeight: 'bold', color: '#1f2937' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' },
  th: { padding: '12px', textAlign: 'left', backgroundColor: '#f9fafb', fontWeight: '600', fontSize: '13px', color: '#374151', borderBottom: '1px solid #e5e7eb' },
  td: { padding: '12px', borderBottom: '1px solid #e5e7eb', fontSize: '14px', color: '#1f2937' },
  tr: { transition: 'background-color 0.2s' },
  badge: { padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', display: 'inline-block' },
  badgeCompleted: { backgroundColor: '#d1fae5', color: '#065f46' },
  badgePending: { backgroundColor: '#fef3c7', color: '#92400e' },
  badgeActive: { backgroundColor: '#dbeafe', color: '#1e40af' },
  badgeInactive: { backgroundColor: '#e5e7eb', color: '#374151' },
  badgeMonetary: { backgroundColor: '#dbeafe', color: '#1e40af' },
  badgeNonMonetary: { backgroundColor: '#fef3c7', color: '#92400e' },
  verificationBadge: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' },
  verifiedBadge: { backgroundColor: '#d1fae5', color: '#065f46' },
  btnPrimary: { padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
  btnSecondary: { padding: '10px 20px', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
  btnIcon: { padding: '6px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'inline-flex', alignItems: 'center' },
  btnIconDelete: { color: '#ef4444' },
  btnLink: { padding: '4px 8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#4f46e5', fontSize: '14px', textDecoration: 'underline' },
  actionButtons: { display: 'flex', gap: '8px' },
  searchBar: { padding: '10px 15px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', width: '100%', maxWidth: '300px' },
  filterContainer: { display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' },
  filterLabel: { fontSize: '14px', fontWeight: '500', color: '#374151' },
  select: { padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: 'white', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' },
  modalHeader: { padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { margin: 0, fontSize: '18px', fontWeight: 'bold' },
  closeBtn: { padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' },
  modalBody: { padding: '20px' },
  formGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500', color: '#374151' },
  input: { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' },
  formActions: { display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' },
  documentList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  documentItem: { padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px' },
  docName: { flex: 1, fontSize: '14px' }
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDocViewer, setShowDocViewer] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState({ docs: [], title: '' });
  const [donorSearch, setDonorSearch] = useState('');
  const [doneeSearch, setDoneeSearch] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState('all');
  const [donationTypeFilter, setDonationTypeFilter] = useState('all');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  const [donors, setDonors] = useState([
    { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+1234567890', totalDonations: 5000, status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1234567891', totalDonations: 3200, status: 'Active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@email.com', phone: '+1234567892', totalDonations: 7500, status: 'Inactive' }
  ]);

  const [donees, setDonees] = useState([
    { id: 1, name: 'Emma Brown', email: 'emma@email.com', phone: '+1234567893', totalReceived: 2000, status: 'Accepted', verified: true, documents: ['ID Card', 'Proof of Income'] },
    { id: 2, name: 'David Lee', email: 'david@email.com', phone: '+1234567894', totalReceived: 1500, status: 'Pending', verified: false, documents: ['ID Card'] },
    { id: 3, name: 'Lisa Garcia', email: 'lisa@email.com', phone: '+1234567895', totalReceived: 3000, status: 'Accepted', verified: true, documents: ['ID Card', 'Proof of Income', 'Medical Bills'] }
  ]);

  const [donations, setDonations] = useState([
    { id: 1, donorName: 'John Smith', doneeName: 'Emma Brown', amount: 500, date: '2025-10-10', status: 'Completed', type: 'Monetary', documents: ['Receipt', 'Transfer Proof'] },
    { id: 2, donorName: 'Sarah Johnson', doneeName: 'David Lee', amount: 300, date: '2025-10-12', status: 'Pending', type: 'Monetary', documents: ['Request Form'] },
    { id: 3, donorName: 'Mike Wilson', doneeName: 'Lisa Garcia', amount: 1000, date: '2025-10-14', status: 'Completed', type: 'Non-Monetary', documents: ['Receipt'] }
  ]);

  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin User', email: 'admin@welfare.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Jane Moderator', email: 'jane@welfare.com', role: 'Moderator', status: 'Active' }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Medical Emergency', description: 'Medical bills, surgeries', status: 'Active' },
    { id: 2, name: 'Education', description: 'School fees, books', status: 'Active' },
    { id: 3, name: 'Housing', description: 'Rent, repairs', status: 'Active' }
  ]);

  const stats = {
    totalDonors: donors.length,
    totalDonees: donees.length,
    totalDonations: donations.reduce((s, d) => s + d.amount, 0),
    pendingVerifications: donees.filter(d => !d.verified).length
  };

  const handleDelete = (type, id) => {
    if (!window.confirm('Delete this item?')) return;
    if (type === 'donor') setDonors(donors.filter(d => d.id !== id));
    if (type === 'donee') setDonees(donees.filter(d => d.id !== id));
    if (type === 'admin') setAdmins(admins.filter(a => a.id !== id));
    if (type === 'category') setCategories(categories.filter(c => c.id !== id));
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      alert('Enter category name');
      return;
    }
    setCategories([...categories, { id: Date.now(), name: newCategoryName, description: newCategoryDesc, status: 'Active' }]);
    setNewCategoryName('');
    setNewCategoryDesc('');
  };

  const toggleCategoryStatus = (id) => {
    setCategories(categories.map(c => c.id === id ? {...c, status: c.status === 'Active' ? 'Inactive' : 'Active'} : c));
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
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Welfare Platform Admin Dashboard</h1>
        <div style={styles.headerActions}>
          <span style={styles.adminName}>Admin User</span>
        </div>
      </header>

      <nav style={styles.nav}>
        <button style={{...styles.navBtn, ...(activeTab === 'overview' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('overview')}>Overview</button>
        <button style={{...styles.navBtn, ...(activeTab === 'donors' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('donors')}>Donors</button>
        <button style={{...styles.navBtn, ...(activeTab === 'donees' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('donees')}>Donees</button>
        <button style={{...styles.navBtn, ...(activeTab === 'donations' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('donations')}>Donations</button>
        <button style={{...styles.navBtn, ...(activeTab === 'categories' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('categories')}>Categories</button>
        <button style={{...styles.navBtn, ...(activeTab === 'admins' ? styles.navBtnActive : {})}} onClick={() => setActiveTab('admins')}>Admin Management</button>
      </nav>

      <main style={styles.content}>
        {activeTab === 'overview' && <Overview stats={stats} donations={donations} />}
        {activeTab === 'donors' && <Donors donors={donors} search={donorSearch} setSearch={setDonorSearch} onEdit={(item) => openModal('edit', item)} onDelete={(id) => handleDelete('donor', id)} />}
        {activeTab === 'donees' && <Donees donees={donees} search={doneeSearch} setSearch={setDoneeSearch} filter={verifiedFilter} setFilter={setVerifiedFilter} onView={viewDocuments} onEdit={(item) => openModal('edit', item)} onDelete={(id) => handleDelete('donee', id)} />}
        {activeTab === 'donations' && <DonationsHistory donations={donations} filter={donationTypeFilter} setFilter={setDonationTypeFilter} onView={viewDocuments} />}
        {activeTab === 'categories' && <Categories categories={categories} name={newCategoryName} setName={setNewCategoryName} desc={newCategoryDesc} setDesc={setNewCategoryDesc} onAdd={handleAddCategory} onToggle={toggleCategoryStatus} onDelete={(id) => handleDelete('category', id)} />}
        {activeTab === 'admins' && <AdminManagement admins={admins} onAdd={() => openModal('add')} onEdit={(item) => openModal('edit', item)} onDelete={(id) => handleDelete('admin', id)} />}
      </main>

      <Modal show={showModal} onClose={() => setShowModal(false)} type={modalType} item={selectedItem} />
      <DocumentViewer show={showDocViewer} onClose={() => setShowDocViewer(false)} docs={selectedDocs} />
    </div>
  );
};

export default AdminDashboard;