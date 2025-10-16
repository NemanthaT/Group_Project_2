import "./EventsMain.css";
import FeaturedBg from '@/assets/images/featuredBg.png';
import { useState, useEffect, use } from 'react';
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

  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: "Beach Cleanup in Mount Lavinia",
      description: "Help clean up Mount Lavinia beach to protect marine life",
      type: "environment",
      commitment: "one-time",
      location: "Colombo",
      skills: "none",
      volunteersNeeded: 50,
      volunteersSigned: 32,
      image: "https://images.unsplash.com/photo-1604871000636-3a3462c4d0e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "2023-08-15"
    },
    {
      id: 2,
      title: "English Teaching in Rural Schools",
      description: "Teach English to children in rural areas of Galle District",
      type: "teaching",
      commitment: "weekly",
      location: "Galle",
      skills: "teaching",
      volunteersNeeded: 20,
      volunteersSigned: 15,
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "2023-08-01"
    },
    {
      id: 3,
      title: "Elderly Care Assistance",
      description: "Provide companionship and basic care for elderly in Colombo homes",
      type: "caregiving",
      commitment: "flexible",
      location: "Colombo",
      skills: "caregiving",
      volunteersNeeded: 30,
      volunteersSigned: 18,
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "2023-08-10"
    },
    {
      id: 4,
      title: "Tsunami Rebuilding Project",
      description: "Help rebuild homes in areas affected by past tsunami damage",
      type: "construction",
      commitment: "monthly",
      location: "Matara",
      skills: "manual",
      volunteersNeeded: 40,
      volunteersSigned: 25,
      image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "2023-09-01"
    },
    {
      id: 5,
      title: "Disability Center Support",
      description: "Assist at centers for people with disabilities in Kandy",
      type: "caregiving",
      commitment: "weekly",
      location: "Kandy",
      skills: "none",
      volunteersNeeded: 15,
      volunteersSigned: 10,
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "2023-08-20"
    },
    {
      id: 6,
      title: "Wildlife Conservation",
      description: "Help with wildlife conservation efforts in Yala National Park",
      type: "environment",
      commitment: "flexible",
      location: "Yala",
      skills: "none",
      volunteersNeeded: 25,
      volunteersSigned: 12,
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "2023-09-05"
    }
  ]);
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
      return (b.volunteersSigned / b.volunteersNeeded) - (a.volunteersSigned / a.volunteersNeeded);
    } else if (filters.sort === 'urgent') {
      return (a.volunteersNeeded - a.volunteersSigned) - (b.volunteersNeeded - b.volunteersSigned);
    }
    return 0;
  });

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
        onCreate={(formData) => {
          const id = opportunities.length ? Math.max(...opportunities.map(o => o.id)) + 1 : 1;
          const date = formData.isRange ? formData.startDate : formData.date;
          const newOpp = {
            id,
            title: formData.name || 'Untitled Event',
            description: formData.description,
            type: formData.type || 'other',
            commitment: formData.commitment || 'flexible',
            location: formData.location || 'TBD',
            skills: formData.skills || 'none',
            volunteersNeeded: Number(formData.volunteersNeeded) || 0,
            volunteersSigned: 0,
            image: '',
            date: date || ''
          };
          setOpportunities([newOpp, ...opportunities]);
          setShowAddModal(false);
        }}
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
