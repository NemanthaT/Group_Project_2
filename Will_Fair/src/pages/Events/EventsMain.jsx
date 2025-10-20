import "./EventsMain.css";
import FeaturedBg from '@/assets/images/featuredBg.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEventModal from './components/AddEventModal';
import VolunteerEventModal from './VolunteerEventModal';
import { EVENT_OPTIONS, withPlaceholder } from '@/constants/eventOptions';

function FeaturedContent() {

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    sort: '',
    type: '',
    commitment: '',
    location: '',
    skills: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const [showAddModal, setShowAddModal] = useState(false);

  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [opportunities, setOpportunities] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    setEventsError(null);
    try {
      const res = await axios.get('http://localhost:5000/events');
      const data = res.data;
      if (!data || !data.success) throw new Error(data?.message || 'Failed to load events');

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

    // Don't start interval if any modal is open
    if (showAddModal || showVolunteerModal) {
      return;
    }

    let interval = setInterval(() => {
      fetchEvents();
    }, 30000);
    
    const resetTimer = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        fetchEvents();
      }, 30000);
    };

    window.addEventListener('click', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('mousemove', resetTimer);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('mousemove', resetTimer);
    };
  }, [showAddModal, showVolunteerModal]);

  useEffect(() => {
    const scrollY = sessionStorage.getItem('eventsScroll');
    if (scrollY) {
      // Use requestAnimationFrame to ensure the scroll happens after render
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(scrollY));
        sessionStorage.removeItem('eventsScroll');
      });
    }
  }, []);

  const handleFilterChange = (e, filterName) => {
    setFilters({
      ...filters,
      [filterName]: e.target.value
    });
    setCurrentPage(1); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const filteredOpportunities = opportunities.filter(opp => {

    const matchesSearch = searchQuery === '' || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesSearch &&
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

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedOpportunities.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(sortedOpportunities.length / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  const handleEventSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:5000/events/createEvent', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      toast.success('Event submitted for approval!');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await fetchEvents();
      
      setShowAddModal(false);
      
      return { success: true };
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit event. Please try again.');
      return { success: false, error };
    }
  };

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
          <h1>Featured Events</h1>
          <p>
            Every act of giving fuels a story of hope. Explore programs where
            your kindness sparks lasting change — in communities, lives, and
            futures.
          </p>
        </div>
      </section>

      <section className="filters">
        <div className="filter-container">
          <div className="filter-search-row">
            <div className="search-bar">
              <svg 
                className="search-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search events by name..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button 
                  className="search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="search-results-info">
                Found {filteredOpportunities.length} event{filteredOpportunities.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </div>
            )}
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={filters.sort}
              onChange={(e) => handleFilterChange(e, 'sort')}
            >
              {EVENT_OPTIONS.sort.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={filters.type}
              onChange={(e) => handleFilterChange(e, 'type')}
            >
              {withPlaceholder(EVENT_OPTIONS.type, 'Volunteer Type').map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={filters.commitment}
              onChange={(e) => handleFilterChange(e, 'commitment')}
            >
              {withPlaceholder(EVENT_OPTIONS.commitment, 'Time Commitment').map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={filters.location}
              onChange={(e) => handleFilterChange(e, 'location')}
            >
              {withPlaceholder(EVENT_OPTIONS.location, 'Location').map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-button-row">
            <div className="filter-dropdown">
              <select
                className="filter-select"
                value={filters.skills}
                onChange={(e) => handleFilterChange(e, 'skills')}
              >
                {withPlaceholder(EVENT_OPTIONS.skills, 'Skills Needed').map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

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
        onClose={() => {
          setShowAddModal(false);
          fetchEvents();
        }}
        onSubmit={handleEventSubmit}
      />

      <VolunteerEventModal
        isOpen={showVolunteerModal}
        onClose={() => {
          setShowVolunteerModal(false);
          setSelectedEvent(null);
          fetchEvents();
        }}
        eventId={selectedEvent?.id}
        eventTitle={selectedEvent?.title}
      />


      <section className="programs">
        <div className="programs-container">
          <div className="programs-grid">
            {currentEvents.map(opp => (
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
                      className="btn-main btn-outline-main"
                      onClick={() => {
                        sessionStorage.setItem('eventsScroll', window.scrollY.toString());
                        navigate(`/Events/${opp.id}`, { state: { opp } });
                      }}
                    >
                      Details
                    </button>
                    <button
                      className="btn-main btn-primary-main"
                      onClick={() => {
                        const currentPosition = window.scrollY;
                        document.body.style.position = 'fixed';
                        document.body.style.top = `-${currentPosition}px`;
                        document.body.style.width = '100%';
                        sessionStorage.setItem('eventsScroll', currentPosition.toString());
                        setSelectedEvent(opp);
                        setShowVolunteerModal(true);
                      }}
                    >
                      Volunteer
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedOpportunities.length > 0 && (
            <div className="pagination-info">
              Showing {indexOfFirstEvent + 1} - {Math.min(indexOfLastEvent, sortedOpportunities.length)} of {sortedOpportunities.length} events
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination-container">
              <button 
                className="pagination-btn" 
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                « Previous
              </button>

              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                  }
                  return null;
                })}
              </div>

              <button 
                className="pagination-btn" 
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next »
              </button>
            </div>
          )}
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default FeaturedContent;
