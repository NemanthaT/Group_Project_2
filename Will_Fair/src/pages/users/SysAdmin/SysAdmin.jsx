import React, { useState } from 'react';
import Overview from './Dashboard/Overview';
import Donors from './Dashboard/Donors';
import Donees from './Dashboard/Donees';
import DonationsHistory from './Dashboard/DonationsHistory';
import Categories from './Dashboard/Categories';
import AdminManagement from './Dashboard/AdminManagement';
import Modal from './Dashboard/Modal';
import DocumentViewer from './Dashboard/Documentviewer';
import { Users, DollarSign, AlertCircle } from 'lucide-react';

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