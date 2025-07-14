import React, { useState } from "react";

export default function MonetoryForm() {
  const [activeTab, setActiveTab] = useState("monetary");

  // Define the support options data for easy maintenance
  const supportOptions = [
    { id: "monetary", label: "Monetary Support" },
    { id: "non-monetary", label: "Non Monetary Support" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Medical Support",
    "Education Support",
    "Emergency Relief",
    "Community Development",
    "Other",
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="hero-section">
        <div className="hero-bg">
          <img
            className="hero-image"
            alt="Close up people"
            src="/close-up-people-holding-box-3.png"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">Submit Donation Request</h1>
          <p className="hero-subtitle">
            Connect with generous donors who wants to help your cause
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-card">
          {/* Instruction Text */}
          <div className="instruction-text">
            <p>
              Submit your donation request with detailed information about what
              you need. Once approved, your request will be visible to potential
              donors.
            </p>
          </div>

          <div className="support-tabs">
            <div className="tabs-list">
              {supportOptions.map((option) => (
                <button
                  key={option.id}
                  className={`tab-trigger ${
                    activeTab === option.id ? "active" : "inactive"
                  }`}
                  onClick={() => setActiveTab(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <section className="form-section">
            <h2 className="section-title">Category</h2>

            <div className="select-wrapper">
              <div
                className="select-trigger"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedCategory || "Select a category"}</span>
                <svg
                  className="chevron-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>

              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    border: "0.5px solid rgba(0, 0, 0, 0.2)",
                    borderRadius: "15px",
                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                    zIndex: 10,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "16px 40px",
                        cursor: "pointer",
                        fontSize: "24px",
                        borderBottom:
                          index < categories.length - 1
                            ? "1px solid rgba(0, 0, 0, 0.1)"
                            : "none",
                      }}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsOpen(false);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <div className="form-section">
            <div className="mb-4">
              <h2 className="section-title">Reason</h2>
            </div>

            <div className="form-card">
              <input className="form-input" placeholder="Enter request name" />
            </div>
          </div>

          <section className="form-section">
            <h2 className="section-title">Target Amount</h2>

            <div className="form-card">
              <div className="amount-wrapper">
                <span className="currency-symbol">Rs.</span>
                <input
                  className="form-input amount-input"
                  aria-label="Target amount in Rupees"
                  placeholder="0"
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">Deadline</h2>

            <div className="form-card">
              <div className="date-wrapper">
                <input
                  className="date-input"
                  placeholder="DD/MM/YYYY"
                  type="date"
                />
                <button className="calendar-button" type="button">
                  <svg
                    className="calendar-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span className="sr-only">Open calendar</span>
                </button>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">Request Image (optional)</h2>

            <div className="image-upload-card">
              <button className="choose-file-button">Choose file</button>
            </div>
          </section>

          <div className="form-section">
            <section className="file-upload-section">
              <div className="file-upload-header">
                <h1 className="section-title">Proof Documents</h1>

                <button className="choose-files-button">Choose files</button>
              </div>

              <div className="file-display">Documents</div>
            </section>

            <p
              className="mt-4"
              style={{
                fontSize: "26px",
                fontWeight: "200",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              Upload&nbsp;&nbsp;PDF document/s as proof for your request
              (medical reports, school documents, etc.). PDF only, max 5MB.
            </p>
          </div>

          {/* Create Request Button */}
          <div className="create-request-wrapper">
            <button className="create-request-button">Create Request</button>
          </div>
        </div>
      </div>
    </div>
  );
}
