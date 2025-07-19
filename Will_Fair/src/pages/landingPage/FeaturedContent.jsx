import "./FeaturedContent.css";

function FeaturedContent() {
  return (
    <>
      <section className="fhero">
        <div className="bg-container">
          <img
            className="bg"
            src="src/assets/images/featuredBg.png"
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
            <button className="filter-btn">Sort by</button>
          </div>
          <div className="filter-dropdown">
            <button className="filter-btn">Type </button>
          </div>
          <div className="filter-dropdown">
            <button className="filter-btn">Category </button>
          </div>
          <div className="filter-dropdown">
            <button className="filter-btn">Status </button>
          </div>
          <div className="filter-dropdown">
            <button className="filter-btn">Location </button>
          </div>
        </div>
      </section>

      <section className="programs">
        <div className="programs-container">
          <div className="programs-grid">
            <div className="program-card">
              <div className="card-image childcare-bg">
                <span className="card-badge">Active</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Renovations at Early Bird Child Care - Karapitiya
                </h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "70%" }}></div>
                </div>
                <div className="funding-info">
                  <div>
                    <div className="funding-label">Raised:</div>
                    <div className="funding-amount">7,000.00</div>
                  </div>
                  <div>
                    <div className="funding-label">Target:</div>
                    <div className="funding-amount">50,000.00</div>
                  </div>
                </div>
                <div className="card-actions">
                  <a href="#" className="btn btn-outline">
                    Details
                  </a>
                  <a href="#" className="btn btn-primary">
                    Donate
                  </a>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="card-image eldercare-bg">
                <span className="card-badge">Active</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Renovations at Elderly Care - Colombo
                </h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "50%" }}></div>
                </div>
                <div className="funding-info">
                  <div>
                    <div className="funding-label">Raised:</div>
                    <div className="funding-amount">23,000.00</div>
                  </div>
                  <div>
                    <div className="funding-label">Target:</div>
                    <div className="funding-amount">40,000.00</div>
                  </div>
                </div>
                <div className="card-actions">
                  <a href="#" className="btn btn-outline">
                    Details
                  </a>
                  <a href="#" className="btn btn-primary">
                    Donate
                  </a>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="card-image specialcare-bg">
                <span className="card-badge">Active</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Renovations at Special Care - Matara
                </h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "44%" }}></div>
                </div>
                <div className="funding-info">
                  <div>
                    <div className="funding-label">Raised:</div>
                    <div className="funding-amount">22,000.00</div>
                  </div>
                  <div>
                    <div className="funding-label">Target:</div>
                    <div className="funding-amount">50,000.00</div>
                  </div>
                </div>
                <div className="card-actions">
                  <a href="#" className="btn btn-outline">
                    Details
                  </a>
                  <a href="#" className="btn btn-primary">
                    Donate
                  </a>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="card-image childcare-bg">
                <span className="card-badge">Active</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Renovations at Early Bird Child Care - Karapitiya
                </h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "70%" }}></div>
                </div>
                <div className="funding-info">
                  <div>
                    <div className="funding-label">Raised:</div>
                    <div className="funding-amount">7,000.00</div>
                  </div>
                  <div>
                    <div className="funding-label">Target:</div>
                    <div className="funding-amount">50,000.00</div>
                  </div>
                </div>
                <div className="card-actions">
                  <a href="#" className="btn btn-outline">
                    Details
                  </a>
                  <a href="#" className="btn btn-primary">
                    Donate
                  </a>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="card-image eldercare-bg">
                <span className="card-badge">Active</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Renovations at Elderly Care - Colombo
                </h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "50%" }}></div>
                </div>
                <div className="funding-info">
                  <div>
                    <div className="funding-label">Raised:</div>
                    <div className="funding-amount">23,000.00</div>
                  </div>
                  <div>
                    <div className="funding-label">Target:</div>
                    <div className="funding-amount">40,000.00</div>
                  </div>
                </div>
                <div className="card-actions">
                  <a href="#" className="btn btn-outline">
                    Details
                  </a>
                  <a href="#" className="btn btn-primary">
                    Donate
                  </a>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="card-image specialcare-bg">
                <span className="card-badge">Active</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  Renovations at Special Care - Matara
                </h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "44%" }}></div>
                </div>
                <div className="funding-info">
                  <div>
                    <div className="funding-label">Raised:</div>
                    <div className="funding-amount">22,000.00</div>
                  </div>
                  <div>
                    <div className="funding-label">Target:</div>
                    <div className="funding-amount">50,000.00</div>
                  </div>
                </div>
                <div className="card-actions">
                  <a href="#" className="btn btn-outline">
                    Details
                  </a>
                  <a href="#" className="btn btn-primary">
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedContent;
