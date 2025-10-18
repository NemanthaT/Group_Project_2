import "./EventsMain.css";
import FeaturedBg from '@/assets/images/featuredBg.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AddEventModal from './AddEventModal';

function FeaturedContent() {

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    sort: '',
    type: '',
    commitment: '',
    location: '',
    skills: ''
  });

  // Add Event modal state
  const [showAddModal, setShowAddModal] = useState(false);

  const [opportunities, setOpportunities] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  // fetch events on mount (use axios pattern)
  const fetchEvents = async () => {
    setLoadingEvents(true);
    setEventsError(null);
    try {
      const res = await axios.get('http://localhost:5000/events');
      const data = res.data;
      if (!data || !data.success) throw new Error(data?.message || 'Failed to load events');

      // Backend now returns frontend-ready event objects. Use them directly.
      setOpportunities(data.events || []);
    } catch (err) {
      console.error('Error fetching events', err);
      setEventsError(err.message || 'Error loading events');
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  
//Save scroll position on mount
  useEffect(() => {
    const scrollY = sessionStorage.getItem('eventsScroll');
    if(scrollY){
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem('eventsScroll'); //Clear saved position(optional)
    }

  },[]);

  const handleFilterChange = (e, filterName) => {
    setFilters({
      ...filters,
      [filterName]: e.target.value
    });
  };

  const filteredOpportunities = opportunities.filter(opp => {
    return (
      (filters.type === '' || opp.type === filters.type) &&
      (filters.commitment === '' || opp.commitment === filters.commitment) &&
      (filters.location === '' || opp.location === filters.location) &&
      (filters.skills === '' || opp.skills === filters.skills)
    );
  });

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (filters.sort === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (filters.sort === 'popular') {
      return (b.volunteersSigned / Math.max(1, b.volunteersNeeded)) - (a.volunteersSigned / Math.max(1, a.volunteersNeeded));
    } else if (filters.sort === 'urgent') {
      return (a.volunteersNeeded - a.volunteersSigned) - (b.volunteersNeeded - b.volunteersSigned);
    }
    return 0;
  });

  if (loadingEvents) return (
    <div className="events-loading-container">
      <div className="events-loading-spinner"></div>
      <p className="events-loading-text">Loading events...</p>
    </div>
  );
  if (eventsError) return (
    <div className="events-error-container">
      <p className="events-error-text">{eventsError}</p>
    </div>
  );

  return (
    <>
      <section className="fhero">
        <div className="bg-container">
          <img
            className="bg"
            src={FeaturedBg}
            alt="Hero Background"
          />
        </div>
        <div className="hero-content">
          <h1>Featured Programs</h1>
          <p>
            Every act of giving fuels a story of hope. Explore programs where
            your kindness sparks lasting change — in communities, lives, and
            futures.
          </p>
        </div>
      </section>

      <section className="filters">
        <div className="filter-container">
          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={filters.sort}
              onChange={(e) => handleFilterChange(e, 'sort')}
            >
              <option value="">Sort by</option>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="urgent">Most Urgent</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={filters.type}
              onChange={(e) => handleFilterChange(e, 'type')}
            >
              <option value="">Volunteer Type</option>
              <option value="environment">Environment</option>
              <option value="teaching">Teaching</option>
              <option value="caregiving">Caregiving</option>
              <option value="construction">Construction</option>
              <option value="admin">Administrative</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={filters.commitment}
              onChange={(e) => handleFilterChange(e, 'commitment')}
            >
              <option value="">Time Commitment</option>
              <option value="one-time">One-time</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={filters.location}
              onChange={(e) => handleFilterChange(e, 'location')}
            >
              <option value="">Location</option>
              <option value="Colombo">Colombo</option>
              <option value="Galle">Galle</option>
              <option value="Kandy">Kandy</option>
              <option value="Matara">Matara</option>
              <option value="Yala">Yala</option>
            </select>
          </div>

          <div className="filter-button-row">
            <div className="filter-dropdown">
              <select
                className="filter-select"
                value={filters.skills}
                onChange={(e) => handleFilterChange(e, 'skills')}
              >
                <option value="">Skills Needed</option>
                <option value="teaching">Teaching</option>
                <option value="caregiving">Caregiving</option>
                <option value="manual">Manual Labor</option>
                <option value="technical">Technical</option>
                <option value="none">No Experience Needed</option>
              </select>
            </div>

            {/* Add Event button placed beside the skills filter */}
            <div className="filter-dropdown">
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
                type="button"
              >
                + Add Event
              </button>
            </div>
          </div>
        </div>
      </section>
      <AddEventModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchEvents}
      />

      <section className="programs">
        <div className="programs-container">
          <div className="programs-grid">
            {sortedOpportunities.map(opp => (
              <div className="program-card" key={opp.id}>
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${opp.image})` }}
                >
                  <span className="card-badge">Active</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{opp.title}</h3>
                  <p className="card-description">{opp.description}</p>

                  {/* Volunteer progress bar */}
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(opp.volunteersSigned / opp.volunteersNeeded) * 100}%`,
                        background: 'linear-gradient(90deg, #4CAF50, #8BC34A)'
                      }}
                    ></div>
                  </div>

                  <div className="funding-info">
                    <div>
                      <div className="funding-label">Volunteers Signed:</div>
                      <div className="funding-amount">{opp.volunteersSigned}</div>
                    </div>
                    <div>
                      <div className="funding-label">Volunteers Needed:</div>
                      <div className="funding-amount">{opp.volunteersNeeded}</div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        sessionStorage.setItem('eventsScroll', window.scrollY); //Save Scroll Position
                        navigate(`/Events/${opp.id}`, { state: { opp } });
                      }}
                    >
                      Details
                    </button>
                    <button className="btn btn-primary">
                      Volunteer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedContent;
