import '../styles/main.css';

function IndividualDonation() {

  // Timeline data
  const timelineData = [
    {
      id: 1,
      label: "Request Created",
      date: "March 15, 2024",
      status: "completed",
      icon: "1"
    },
    {
      id: 2,
      label: "Request Approved",
      date: "March 18, 2024",
      status: "completed",
      icon: "2"
    },
    {
      id: 3,
      label: "Campaign End Date",
      date: "June 15, 2024",
      status: "pending",
      icon: "3"
    }
  ];

  // Progress calculation
  const target = 60000;
  const progressPercentage = 11.67; // Static percentage for display

  return (
    <div className="page-wrapper">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Renovations at Early Bird Child Care
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Column */}
        <div className="left-column">
          <img
            className="main-image"
            alt="Child care center"
            src="https://assets.aecf.org/m/blogimg/_1200x630_crop_center-center_82_none/blog-highcostchildcare-2023.jpg?mtime=1724866501"
          />

          <div className="location-category">
            <div className="location">
              <img
                className="location-icon"
                alt="Location pin"
                src="https://cdn-icons-png.flaticon.com/512/535/535137.png"
              />
              <span className="location-text">Karapitiya</span>
            </div>

            <div className="category-badge">Education</div>
          </div>

          <div className="description">
            Early Bird Child Care is in need of essential renovations to provide
            a safer, more engaging, and nurturing environment for our children.
            With your generous support, we aim to upgrade classrooms, improve
            play areas, and ensure our facilities meet the highest standards of
            care and learning. Every contribution brings us closer to giving
            these young learners the bright and supportive space they deserve.
          </div>

          <button className="feedback-btn">
            Send feedback to Donors
          </button>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Timeline Card */}
          <div className="timeline-card">
            <h2 className="timeline-title">Timeline</h2>
            <div className="timeline-content">
              {timelineData.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className={`timeline-icon ${item.status === 'completed' ? (item.id === 1 ? 'created' : 'approved') : item.id === 3 ? 'end' : 'pending'}`}>
                    {item.icon}
                  </div>
                  <div className="timeline-details">
                    <div className="timeline-label">{item.label}</div>
                    <div className="timeline-date">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fundraising Progress */}
          <div className="progress-section">
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <img
                className="tick-icon"
                alt="Tick"
                src="https://static.vecteezy.com/system/resources/thumbnails/019/465/852/small/tick-mark-icon-symbol-on-transparent-background-free-png.png"
              />
            </div>

            <div className="progress-info">
              <div className="progress-amounts">
                <div>
                  <span className="label">Target:</span>
                  <span className="amount">{target.toLocaleString()}.00</span>
                </div>
              </div>

              <button className="status-btn">Active</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn delete">
              <svg className="action-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"/>
              </svg>
              Delete
            </button>

            <button className="action-btn edit">
              <svg className="action-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IndividualDonation;