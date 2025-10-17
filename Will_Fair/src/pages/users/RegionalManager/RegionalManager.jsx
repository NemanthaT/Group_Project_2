import { useState, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  
  const [donations, setDonations] = useState({ monetary: [], nonMonetary: [] });
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalMonetary: 0,
    activeRequests: 0,
    completedNotSent: 0,
    sentDonations: 0,
    totalEvents: 0,
    totalVolunteers: 0
  });

  // Fetch data from backend on mount
  useEffect(() => {
    // Fetch stats
    fetch('http://localhost:5000/donations/stats')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.stats) {
          setStats({
            totalMonetary: data.stats.totalRaised || 0,
            activeRequests: data.stats.activeCampaigns || 0,
            completedNotSent: data.stats.completeCampaigns || 0,
            sentDonations: data.stats.sentCampaigns || 0,
            totalEvents: data.stats.totalEvents || 0,
            totalVolunteers: data.stats.totalVolunteers || 0
          });
        } else {
          setStats({
            totalMonetary: 0,
            activeRequests: 0,
            completedNotSent: 0,
            sentDonations: 0,
            totalEvents: 0,
            totalVolunteers: 0
          });
        }
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err);
      });

    // Fetch monetary donations
    fetch('http://localhost:5000/donations/donationsReg/?type=monetary')
      .then(res => res.json())
      
      .then(data => {
        console.log('Monetary donations data:', data);
        if (data && data.success && Array.isArray(data.donations)) {
          setDonations(prev => ({ ...prev, monetary: data.donations }));
        } else {
          setDonations(prev => ({ ...prev, monetary: [] }));
        }
      })
      .catch(err => {
        console.error('Failed to fetch monetary donations:', err);
      });

    // Fetch non-monetary donations
    fetch('http://localhost:5000/donations/donationsReg?type=nonMonetary')
      .then(res => res.json())
      .then(data => {
        console.log('Non-monetary donations data:', data);
        if (data && data.success && Array.isArray(data.donations)) {
          setDonations(prev => ({ ...prev, nonMonetary: data.donations }));
        } else {
          setDonations(prev => ({ ...prev, nonMonetary: [] }));
        }
      })
      .catch(err => {
        console.error('Failed to fetch non-monetary donations:', err);
      });

    // Fetch events (if backend endpoint exists)
    /*fetch('http://localhost:5000/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
      })
      .catch(err => {
        // If no backend for events, ignore error
        // console.error('Failed to fetch events:', err);
      });*/
  }, []);

  const markAsCompleted = async (id, type) => {
    try {
      const res = await fetch(`http://localhost:5000/donations/${id}/completed`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setDonations(prev => ({
          ...prev,
          [type]: prev[type].map(donation =>
            donation.request_id === id ? { ...donation, status: 'completed' } : donation
          )
        }));
      } else {
        alert('Failed to mark as completed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error marking as completed: ' + err.message);
    }
  };

  const markAsSent = async (id, type) => {
    try {
      const res = await fetch(`http://localhost:5000/donations/${id}/sent`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setDonations(prev => ({
          ...prev,
          [type]: prev[type].map(donation =>
            donation.request_id === id ? { ...donation, status: 'sent' } : donation
          )
        }));
      } else {
        alert('Failed to mark as sent: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error marking as sent: ' + err.message);
    }
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
    // Filter by status and then by donee name (case-insensitive)
    return currentDonations
      .filter(filters[filterStatus])
      .filter(donation =>
        !searchTerm || (donation.doneeName && donation.doneeName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  };

  // Pagination state for donation cards
  const [donationPage, setDonationPage] = useState(1);
  const itemsPerPage = 6;

  const filteredDonations = getFilteredDonations();
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const paginatedDonations = filteredDonations.slice((donationPage - 1) * itemsPerPage, donationPage * itemsPerPage);

  return (
    <div style={styles.dashboard}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #f3f4f6;
          min-height: 100vh;
        }
          {/*background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);*/}
      `}</style>
      
      {/*<header style={styles.dashboardHeader}>
        <div style={styles.headerContent}>
          <h1 style={styles.dashboardTitle}>Regional Manager Dashboard</h1>
          <p style={styles.dashboardSubtitle}>Welfare Platform Management</p>
        </div>
      </header>*/}

      <div style={styles.navContainer}>
        <NavButton active={currentPage === 'overview'} label="Overview" onClick={() => setCurrentPage('overview')} />
        <NavButton active={currentPage === 'donations'} label="Donations" onClick={() => setCurrentPage('donations')} />
        <NavButton active={currentPage === 'volunteer'} label="Volunteer" onClick={() => setCurrentPage('volunteer')} />
      </div>

      <div style={styles.statsGrid}>
        <StatCard 
          icon={DollarSign} 
          label="Total Monetary Donations" 
          value={`LKR ${typeof stats.totalMonetary === 'number' ? stats.totalMonetary.toLocaleString() : 0}`}
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
            <div>
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
            {/* Search bar for donee name */}
            <div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search by Donee Name..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    marginTop: '24px',
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    fontSize: 16,
                    width: 240,
                    marginRight: 8
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.donationsContainer}>
            {filteredDonations.length === 0 ? (
              <EmptyState message="No donations found for this filter" />
            ) : (
              <>
                <div style={styles.donationsList}>
                  {activeTab === 'monetary'
                    ? paginatedDonations.map(donation => (
                        <MonetaryDonationCard
                          key={donation.request_id}
                          donation={donation}
                          onComplete={markAsCompleted}
                          onSent={markAsSent}
                          getStatusColor={getStatusColor}
                          isTargetReached={isTargetReached}
                        />
                      ))
                    : paginatedDonations.map(donation => (
                        <NonMonetaryDonationCard
                          key={donation.request_id}
                          donation={donation}
                          onComplete={markAsCompleted}
                          onSent={markAsSent}
                          getStatusColor={getStatusColor}
                          isTargetReached={isTargetReached}
                        />
                      ))
                  }
                </div>
                {/* Pagination Controls */}
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setDonationPage(donationPage - 1)}
                    disabled={donationPage === 1}
                  >
                    Previous
                  </button>
                  <div className="pagination-info">
                    <span>Page {donationPage} of {totalPages}</span>
                    <span className="total-items">Total: {filteredDonations.length} donations</span>
                  </div>
                  <button
                    className="pagination-btn"
                    onClick={() => setDonationPage(donationPage + 1)}
                    disabled={donationPage === totalPages || totalPages === 0}
                  >
                    Next
                  </button>
                </div>
              </>
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
