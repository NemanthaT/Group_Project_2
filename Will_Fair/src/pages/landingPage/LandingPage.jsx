import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  // Initialize the useNavigate hook from react-router-dom
  const navigate = useNavigate();

  const goToFeatured = () => {
    navigate("/featured");
  };
  return (
    <>
      <section className="hero" id="home">
        <div className="bg-container">
          <img
            className="bg"
            src="src/assets/images/homeBg.jpeg"
            alt="Hero Background"
          />
        </div>
        <div className="container">
          <div className="hero-content">
            <h1>
              Empowering Generosity,
              <br />
              One Gift at a Time
            </h1>
            <p>
              Every donation has the power to transform lives. Whether it's
              food, education, healthcare, or emergency relief, your
              contribution makes a meaningful difference in someone's life.
            </p>
            <div className="hero-buttons">
              <a href="#programs" className="btn-primary">
                Get Started
              </a>
              <a href="#about" className="btn-secondary">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="programs" id="programs">
        <div className="container">
          <h2 className="section-title">Featured Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-image">🧸</div>
              <div className="program-content">
                <h3>Renovations at Early Bird Child Care - Karnataka</h3>
                <div className="program-stats">
                  <span>
                    <strong>Raised:</strong> 1,000.00
                  </span>
                  <span>
                    <strong>Target:</strong> 50,000.00
                  </span>
                </div>
                <div className="program-progress">
                  <div className="progress-bar" style={{ width: "20%" }}></div>
                </div>
                <div className="program-buttons">
                  <a href="#" className="btn-outline">
                    Learn
                  </a>
                  <a href="#" className="btn-small">
                    Donate
                  </a>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="program-image">👵</div>
              <div className="program-content">
                <h3>Renovations at Elderly Care - Colombia</h3>
                <div className="program-stats">
                  <span>
                    <strong>Raised:</strong> 25,000.00
                  </span>
                  <span>
                    <strong>Target:</strong> 45,000.00
                  </span>
                </div>
                <div className="program-progress">
                  <div className="progress-bar" style={{ width: "55%" }}></div>
                </div>
                <div className="program-buttons">
                  <a href="#" className="btn-outline">
                    Learn
                  </a>
                  <a href="#" className="btn-small">
                    Donate
                  </a>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="program-image">♿</div>
              <div className="program-content">
                <h3>Renovations at Special Care - Motors</h3>
                <div className="program-stats">
                  <span>
                    <strong>Raised:</strong> 30,000.00
                  </span>
                  <span>
                    <strong>Target:</strong> 60,000.00
                  </span>
                </div>
                <div className="program-progress">
                  <div className="progress-bar" style={{ width: "50%" }}></div>
                </div>
                <div className="program-buttons">
                  <a href="#" className="btn-outline">
                    Learn
                  </a>
                  <a href="#" className="btn-small">
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="see-more">
            <button className="btn-small" onClick={goToFeatured}>
              See more
            </button>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="testimonial-content">
            <div className="testimonial-text">
              <h2>What they say about us</h2>
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">
                "The donation platform is simple, secure, and well-designed.
                It's easy to find causes that truly matter. I appreciate the
                clear communication about how donations are used and the impact
                that real and personal. It's further how this platform is going
                beyond just fundraising."
              </p>
              <p className="testimonial-author">- Tim Berners Lee</p>
            </div>
            <div className="testimonial-image">
              <div
                style={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  width: "300px",
                  height: "200px",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                }}
              >
                <img
                  className="bg"
                  src="src/assets/images/crowd.png"
                  alt="hands image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="impact">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="impact-stats">
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">People with clean water</div>
              <div className="stat-description">
                Communities now have access to clean drinking water
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">12,000+</div>
              <div className="stat-label">Children educated</div>
              <div className="stat-description">
                Students now have access to quality education
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-number">25,000+</div>
              <div className="stat-label">Medical treatments</div>
              <div className="stat-description">
                Patients received essential medical care
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>"Be the Change—Donate Now and Transform Lives!"</h2>
              <p>
                Every contribution, big or small, creates a ripple of hope,
                offers in making a real difference—your kindness can bring food
                to a family, education to a child, medical care to someone in
                need or disaster relief during critical times. Together, we can
                build a better tomorrow.
              </p>
            </div>
            <div className="cta-image">
              <img
                className="bg"
                src="src/assets/images/hands.png"
                alt="hands image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title">
            Are you willing to make a DIFFERENCE?
          </h2>
          <div className="contact-container">
            <div className="contact-form">
              <h3>Make a Direct Impact Today!</h3>
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="First Name" required />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Last Name" required />
                  </div>
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Contact No" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Description" required></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>

            <div className="contact-info">
              <h3>Contact Us</h3>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <strong>Reid Avenue, Colombo</strong>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <strong>+94 77 1234567890</strong>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <strong>info@willfair.org</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                This donation platform is dedicated to making giving simple,
                meaningful, and impactful. We connect compassionate individuals
                with causes and communities that need support most, ensuring
                every contribution has a direct and measurable impact.
              </p>
              <p>
                With a focus on transparency, security, and ease of use, our
                platform empowers you to give confidently and they informed
                about the difference they're making. Whether you're supporting
                emergency relief, education, healthcare, or community
                development, we make it easy to be the change you want to see in
                the world.
              </p>
            </div>
            <div className="about-image">
              <img
                src="src/assets/images/logo.png"
                alt="Logo"
                className="ab-image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
