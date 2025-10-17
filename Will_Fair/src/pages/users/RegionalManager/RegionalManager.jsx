import { useState } from 'react';
import { Package, DollarSign, CheckCircle, Clock, TrendingUp, Filter, Users, Calendar, Send, Eye, MapPin } from 'lucide-react';
import StatCard from './Dashboard/StatCard';
import TabButton from './Dashboard/TabButton';
import FilterButton from './Dashboard/FilterButton';
import MonetaryDonationCard from './Dashboard/MonetaryDonationCard';
import NonMonetaryDonationCard from './Dashboard/NonMonetaryDonationCard';
import EmptyState from './Dashboard/EmptyState';
import VolunteerEventCard from './Dashboard/VolunteerEventCard';
import NavButton from './Dashboard/NavButton';
import styles from "./Styles";


const WelfareDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
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

  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Community Beach Cleanup',
      date: '2025-10-25',
      time: '8:00 AM - 12:00 PM',
      location: 'Negombo Beach',
      volunteers: 45,
      organizer: 'Environmental Care Foundation',
      organizerContact: '+94 11 234 5678',
      description: 'Join us for a morning of beach cleanup to preserve our coastal environment. All equipment will be provided.'
    },
    {
      id: 2,
      name: 'Food Distribution Drive',
      date: '2025-10-28',
      time: '9:00 AM - 3:00 PM',
      location: 'Community Center, Colombo',
      volunteers: 32,
      organizer: 'Hunger Relief Network',
      organizerContact: '+94 77 345 6789',
      description: 'Help distribute food packages to families in need. Transportation and meals provided for volunteers.'
    },
    {
      id: 3,
      name: 'Children\'s Education Workshop',
      date: '2025-11-02',
      time: '2:00 PM - 5:00 PM',
      location: 'Rural School, Kurunegala',
      volunteers: 18,
      organizer: 'Education For All',
      organizerContact: '+94 37 456 7890',
      description: 'Conduct educational activities and tutoring sessions for underprivileged children. Teaching materials provided.'
    }
  ]);

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

  const handleViewEvent = (eventId) => {
    alert(`Viewing details for event ID: ${eventId}`);
  };

  const handleSendParticipants = (eventId) => {
    const event = events.find(e => e.id === eventId);
    alert(`Sending ${event.volunteers} participants' details to ${event.organizer}`);
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
      active: d => d.status === 'active',
      completed: d => d.status === 'completed',
      sent: d => d.status === 'sent',
      all: () => true
    };

    return currentDonations.filter(filters[filterStatus]);
  };

  const getTotalStats = () => {
    const { monetary, nonMonetary } = donations;
    
    const activeMonetary = monetary.filter(d => d.status === 'active' && d.amount < d.targetAmount).length;
    const activeNonMonetary = nonMonetary.filter(d => d.status === 'active' && d.quantity < d.targetQuantity).length;
    
    const completedMonetary = monetary.filter(d => d.status === 'completed').length;
    const completedNonMonetary = nonMonetary.filter(d => d.status === 'completed').length;
    
    const totalVolunteers = events.reduce((sum, e) => sum + e.volunteers, 0);
    
    return {
      totalMonetary: monetary.reduce((sum, d) => sum + d.amount, 0),
      activeRequests: activeMonetary + activeNonMonetary,
      completedNotSent: completedMonetary + completedNonMonetary,
      sentDonations: monetary.filter(d => d.status === 'sent').length + nonMonetary.filter(d => d.status === 'sent').length,
      totalEvents: events.length,
      totalVolunteers: totalVolunteers
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
          <p style={styles.dashboardSubtitle}>Welfare Platform Management</p>
        </div>
      </header>

      <div style={styles.navContainer}>
        <NavButton active={currentPage === 'overview'} label="Overview" onClick={() => setCurrentPage('overview')} />
        <NavButton active={currentPage === 'donations'} label="Donations" onClick={() => setCurrentPage('donations')} />
        <NavButton active={currentPage === 'volunteer'} label="Volunteer" onClick={() => setCurrentPage('volunteer')} />
      </div>

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
          label={currentPage === 'volunteer' ? 'Total Volunteers' : 'Sent to Donee'}
          value={currentPage === 'volunteer' ? stats.totalVolunteers : stats.sentDonations}
          gradientClass={styles.sentIcon}
        />
      </div>

      {currentPage === 'overview' && (
        <div style={styles.overviewContainer}>
          <div style={styles.overviewCard}>
            <h2 style={styles.overviewTitle}>Welcome to Your Dashboard</h2>
            <p style={styles.overviewText}>
              Manage all donations and volunteer events from this central hub. Use the navigation above to access different sections.
            </p>
            <div style={styles.overviewStats}>
              <div style={styles.overviewStatItem}>
                <DollarSign size={32} style={{ color: '#8b5cf6' }} />
                <div>
                  <p style={styles.overviewStatValue}>{donations.monetary.length + donations.nonMonetary.length}</p>
                  <p style={styles.overviewStatLabel}>Total Donations</p>
                </div>
              </div>
              <div style={styles.overviewStatItem}>
                <Users size={32} style={{ color: '#10b981' }} />
                <div>
                  <p style={styles.overviewStatValue}>{stats.totalEvents}</p>
                  <p style={styles.overviewStatLabel}>Volunteer Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'donations' && (
        <>
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
              <FilterButton active={filterStatus === 'active'} label="Active" onClick={() => setFilterStatus('active')} />
              <FilterButton active={filterStatus === 'completed'} label="Completed (Not Sent)" onClick={() => setFilterStatus('completed')} />
              <FilterButton active={filterStatus === 'sent'} label="Sent to Donee" onClick={() => setFilterStatus('sent')} />
            </div>
          </div>

          <div style={styles.donationsContainer}>
            {filteredDonations.length === 0 ? (
              <EmptyState message="No donations found for this filter" />
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
        </>
      )}

      {currentPage === 'volunteer' && (
        <div style={styles.donationsContainer}>
          {events.length === 0 ? (
            <EmptyState message="No volunteer events available" />
          ) : (
            <div style={styles.donationsList}>
              {events.map(event => (
                <VolunteerEventCard 
                  key={event.id}
                  event={event}
                  onView={handleViewEvent}
                  onSend={handleSendParticipants}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WelfareDashboard;
