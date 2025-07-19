import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

function DoneeDonationsView() {
  const navigate = useNavigate();

  const goToViewDonation = () => {
    navigate("/users/view");
  }

  const goToMonetaryFormIndividual = () => {
    navigate("/users/donee/form");
  }

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Donation card data
  const donationCards = [
    {
      id: 1,
      title: "Renovations at Early Bird Child Care",
      image: "https://assets.aecf.org/m/blogimg/_1200x630_crop_center-center_82_none/blog-highcostchildcare-2023.jpg?mtime=1724866501",
      type: "Monetary",
      category: "Education",
      raised: "7,000.00",
      target: "60,000.00",
      progress: 12, // Percentage of progress (7000/60000 ≈ 12%)
    },
    {
      id: 2,
      title: "Wheelchairs at Sathkara Elderly Care Centre",
      image: "https://jeewakapharmacy.lk/wp-content/uploads/2020/12/Wheel-Chair-With-Commode-YJ-8100-C.jpg",
      type: "Non-monetary",
      category: "Education",
      received: "23",
      target: "40",
      progress: 58, // Percentage of progress (23/40 ≈ 58%)
    },
    {
      id: 3,
      title: "Renovations at Magalle Special Care",
      image: "https://mylifesite.net/wp-content/uploads/2019/09/special-care.jpg",
      type: "Monetary",
      category: "Education",
      raised: "22,000.00",
      target: "50,000.00",
      progress: 44, // Percentage of progress (22000/50000 = 44%)
    },
    {
      id: 4,
      title: "Renovations at Early Bird Child Care",
      image: "https://assets.aecf.org/m/blogimg/_1200x630_crop_center-center_82_none/blog-highcostchildcare-2023.jpg?mtime=1724866501",
      type: "Monetary",
      category: "Education",
      raised: "7,000.00",
      target: "60,000.00",
      progress: 12, // Percentage of progress (7000/60000 ≈ 12%)
    },
    {
      id: 5,
      title: "Wheelchairs at Sathkara Elderly Care Centre",
      image: "https://jeewakapharmacy.lk/wp-content/uploads/2020/12/Wheel-Chair-With-Commode-YJ-8100-C.jpg",
      type: "Non-monetary",
      category: "Education",
      received: "23",
      target: "40",
      progress: 58, // Percentage of progress (23/40 ≈ 58%)
    },
    {
      id: 6,
      title: "Renovations at Magalle Special Care",
      image: "https://mylifesite.net/wp-content/uploads/2019/09/special-care.jpg",
      type: "Monetary",
      category: "Education",
      raised: "22,000.00",
      target: "50,000.00",
      progress: 44, // Percentage of progress (22000/50000 = 44%)
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}

      {/* Main Content */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">My Donation Requests</h1>
          <p className="hero-subtitle">
            Track and Manage your submitted donation requests
          </p>
        </div>
      </section>
      <main className="donationView-content">
        <div className="container">
          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-controls">
              <div className="select-wrapper">
                <select className="select">
                  <option value="all">All Types</option>
                  <option value="monetary">Monetary</option>
                  <option value="non-monetary">Non-monetary</option>
                </select>
              </div>

              <div className="select-wrapper">
                <select className="select">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <button onClick={goToMonetaryFormIndividual} className="new-request-btn">
              <span>+ New Request</span>
            </button>
          </div>

          {/* Donation Cards Grid */}
          <div className="cards-grid">
            {donationCards.map((card) => (
              <div key={card.id} className="donation-card">
                <div className="card-image-container">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                  <div className="card-badge">{card.category}</div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-type">{card.type}</p>

                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${card.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="card-stats">
                    <div className="stats-labels">
                      {card.type === "Monetary" ? "Raised:" : "Received:"}
                      <br />
                      Target:
                    </div>
                    <div className="stats-values">
                      {card.type === "Monetary" ? card.raised : card.received}
                      <br />
                      {card.target}
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn btn-outline">Edit</button>
                  <button className="btn btn-primary" onClick={goToViewDonation}>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DoneeDonationsView;
