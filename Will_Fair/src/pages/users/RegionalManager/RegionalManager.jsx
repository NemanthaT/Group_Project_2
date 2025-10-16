import { useState } from 'react';
import { Package, DollarSign, CheckCircle, Clock, TrendingUp, Filter } from 'lucide-react';
import StatCard from './Dashboard/StatCard';
import TabButton from './Dashboard/TabButton';
import FilterButton from './Dashboard/FilterButton';
import MonetaryDonationCard from './Dashboard/MonetaryDonationCard';
import NonMonetaryDonationCard from './Dashboard/NonMonetaryDonationCard';
import EmptyState from './Dashboard/EmptyState';
import ContactDetails from './Dashboard/ContactDetails';
import ProgressBar from './Dashboard/ProgressBar';


const WelfareDashboard = () => {
  const [activeTab, setActiveTab] = useState('monetary');
  const [filterStatus, setFilterStatus] = useState('all');
  const [donations, setDonations] = useState({
    monetary: [
      {
        id: 1,
        donorName: 'John Smith',
        donorContact: '+94 77 123 4567',
        doneeName: 'Green Valley School',
        doneeContact: '+94 11 234 5678',
        amount: 50000,
        targetAmount: 100000,
        status: 'active',
        date: '2025-10-10',
        category: 'Education'
      },
      {
        id: 2,
        donorName: 'Sarah Johnson',
        donorContact: '+94 76 987 6543',
        doneeName: 'Hope Children\'s Home',
        doneeContact: '+94 11 345 6789',
        amount: 150000,
        targetAmount: 150000,
        status: 'completed',
        date: '2025-10-08',
        category: 'Child Welfare'
      },
      {
        id: 3,
        donorName: 'Michael Brown',
        donorContact: '+94 75 555 1234',
        doneeName: 'Community Health Center',
        doneeContact: '+94 11 456 7890',
        amount: 75000,
        targetAmount: 200000,
        status: 'active',
        date: '2025-10-12',
        category: 'Healthcare'
      },
      {
        id: 7,
        donorName: 'David Wilson',
        donorContact: '+94 77 888 9999',
        doneeName: 'Sunrise Orphanage',
        doneeContact: '+94 11 999 0000',
        amount: 300000,
        targetAmount: 300000,
        status: 'sent',
        date: '2025-10-05',
        category: 'Child Welfare'
      }
    ],
    nonMonetary: [
      {
        id: 4,
        donorName: 'Tech Corp Ltd',
        donorContact: '+94 11 111 2222',
        doneeName: 'Rural Education Center',
        doneeContact: '+94 31 222 3333',
        items: 'Laptops',
        quantity: 10,
        targetQuantity: 20,
        status: 'active',
        date: '2025-10-11',
        category: 'Technology'
      },
      {
        id: 5,
        donorName: 'Food Bank Co',
        donorContact: '+94 77 333 4444',
        doneeName: 'Elderly Care Home',
        doneeContact: '+94 21 444 5555',
        items: 'Food Packages',
        quantity: 100,
        targetQuantity: 100,
        status: 'sent',
        date: '2025-10-09',
        category: 'Food Aid'
      },
      {
        id: 6,
        donorName: 'Book Lovers Society',
        donorContact: '+94 76 666 7777',
        doneeName: 'Mountain View Library',
        doneeContact: '+94 41 777 8888',
        items: 'Books',
        quantity: 250,
        targetQuantity: 500,
        status: 'active',
        date: '2025-10-13',
        category: 'Education'
      },
      {
        id: 8,
        donorName: 'Medical Supplies Inc',
        donorContact: '+94 11 234 5678',
        doneeName: 'District Hospital',
        doneeContact: '+94 25 345 6789',
        items: 'Medical Equipment',
        quantity: 15,
        targetQuantity: 15,
        status: 'completed',
        date: '2025-10-07',
        category: 'Healthcare'
      }
    ]
  });

  const markAsCompleted = (id, type) => {
    setDonations(prev => ({
      ...prev,
      [type]: prev[type].map(donation =>
        donation.id === id ? { ...donation, status: 'completed' } : donation
      )
    }));
  };

  const markAsSent = (id, type) => {
    setDonations(prev => ({
      ...prev,
      [type]: prev[type].map(donation =>
        donation.id === id ? { ...donation, status: 'sent' } : donation
      )
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: '#3b82f6',
      sent: '#10b981',
      active: '#f59e0b',
    };
    return colors[status] || '#6b7280';
  };

  const isTargetReached = (donation) => {
    return activeTab === 'monetary' 
      ? donation.amount >= donation.targetAmount
      : donation.quantity >= donation.targetQuantity;
  };

  const getFilteredDonations = () => {
    const currentDonations = donations[activeTab];
    
    const filters = {
      active: d => d.status === 'active' && !isTargetReached(d),
      completed: d => d.status === 'completed' || (d.status === 'active' && isTargetReached(d)),
      sent: d => d.status === 'sent',
      all: () => true
    };

    return currentDonations.filter(filters[filterStatus]);
  };

  const getTotalStats = () => {
    const { monetary, nonMonetary } = donations;
    
    const activeMonetary = monetary.filter(d => d.status === 'active' && d.amount < d.targetAmount).length;
    const activeNonMonetary = nonMonetary.filter(d => d.status === 'active' && d.quantity < d.targetQuantity).length;
    
    const completedMonetary = monetary.filter(d => d.status === 'completed' || (d.status === 'active' && d.amount >= d.targetAmount)).length;
    const completedNonMonetary = nonMonetary.filter(d => d.status === 'completed' || (d.status === 'active' && d.quantity >= d.targetQuantity)).length;
    
    return {
      totalMonetary: monetary.reduce((sum, d) => sum + d.amount, 0),
      activeRequests: activeMonetary + activeNonMonetary,
      completedNotSent: completedMonetary + completedNonMonetary,
      sentDonations: monetary.filter(d => d.status === 'sent').length + nonMonetary.filter(d => d.status === 'sent').length
    };
  };

  const stats = getTotalStats();
  const filteredDonations = getFilteredDonations();

  return (
    <div style={styles.dashboard}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
      `}</style>
      
      <header style={styles.dashboardHeader}>
        <div style={styles.headerContent}>
          <h1 style={styles.dashboardTitle}>Regional Manager Dashboard</h1>
          <p style={styles.dashboardSubtitle}>Welfare Platform - Donation Tracking</p>
        </div>
      </header>

      <div style={styles.statsGrid}>
        <StatCard 
          icon={DollarSign} 
          label="Total Monetary Donations" 
          value={`LKR ${stats.totalMonetary.toLocaleString()}`}
          gradientClass={styles.monetaryIcon}
        />
        <StatCard 
          icon={Clock} 
          label="Active Requests" 
          value={stats.activeRequests}
          gradientClass={styles.activeIcon}
        />
        <StatCard 
          icon={CheckCircle} 
          label="Completed (Not Sent)" 
          value={stats.completedNotSent}
          gradientClass={styles.completedIcon}
        />
        <StatCard 
          icon={TrendingUp} 
          label="Sent to Donee" 
          value={stats.sentDonations}
          gradientClass={styles.sentIcon}
        />
      </div>

      <div style={styles.tabsContainer}>
        <div style={styles.tabs}>
          <TabButton 
            active={activeTab === 'monetary'} 
            icon={DollarSign} 
            label="Monetary Donations"
            onClick={() => setActiveTab('monetary')}
          />
          <TabButton 
            active={activeTab === 'nonMonetary'} 
            icon={Package} 
            label="Non-Monetary Donations"
            onClick={() => setActiveTab('nonMonetary')}
          />
        </div>
      </div>

      <div style={styles.filtersContainer}>
        <div style={styles.filterHeader}>
          <Filter size={18} />
          <span style={styles.filterTitle}>Filter by Status:</span>
        </div>
        <div style={styles.filterButtons}>
          <FilterButton active={filterStatus === 'all'} label="All Donations" onClick={() => setFilterStatus('all')} />
          <FilterButton active={filterStatus === 'active'} label="Active (Target Not Reached)" onClick={() => setFilterStatus('active')} />
          <FilterButton active={filterStatus === 'completed'} label="Completed (Not Sent)" onClick={() => setFilterStatus('completed')} />
          <FilterButton active={filterStatus === 'sent'} label="Sent to Donee" onClick={() => setFilterStatus('sent')} />
        </div>
      </div>

      <div style={styles.donationsContainer}>
        {filteredDonations.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={styles.donationsList}>
            {activeTab === 'monetary' 
              ? filteredDonations.map(donation => (
                  <MonetaryDonationCard 
                    key={donation.id}
                    donation={donation}
                    onComplete={markAsCompleted}
                    onSent={markAsSent}
                    getStatusColor={getStatusColor}
                    isTargetReached={isTargetReached}
                  />
                ))
              : filteredDonations.map(donation => (
                  <NonMonetaryDonationCard 
                    key={donation.id}
                    donation={donation}
                    onComplete={markAsCompleted}
                    onSent={markAsSent}
                    getStatusColor={getStatusColor}
                    isTargetReached={isTargetReached}
                  />
                ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default WelfareDashboard;
