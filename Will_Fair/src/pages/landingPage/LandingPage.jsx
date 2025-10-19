import "./LandingPage.css";
import HomeBg from '@/assets/images/homeBg.jpeg';
import CrowdImg from '@/assets/images/crowd.png';
import HandsImg from '@/assets/images/hands.png';
import LogoImg from '@/assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import {MapPin, Phone, Mail} from "lucide-react";
import { useState } from 'react';

function LandingPage({user}) {
  // Initialize the useNavigate hook from react-router-dom
  const navigate = useNavigate();

  const goToFeatured = () => {
    navigate("/featured");
  };

  const [volunteerOpportunities] = useState([
  {
    id: 1,
    title: "Beach Cleanup in Mount Lavinia",
    description: "Help clean up Mount Lavinia beach to protect marine life",
    type: "environment",
    commitment: "one-time",
    location: "Colombo",
    volunteersNeeded: 15,
    volunteersSigned: 5,
    image: "https://plus.unsplash.com/premium_photo-1663039947303-0fad26f737b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBjbGVhbnVwfGVufDB8fDB8fHww",
    date: "2023-08-15"
  },
  {
    id: 2,
    title: "Elderly Care Assistance - Panadura",
    description: "Provide companionship and basic care for elderly in Panadura homes",
    type: "caregiving",
    commitment: "weekly",
    location: "Panadura",
    volunteersNeeded: 8,
    volunteersSigned: 2,
    image: "https://plus.unsplash.com/premium_photo-1661274147223-116687829d26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxkZXJseSUyMGNhcmV8ZW58MHx8MHx8fDA%3D",
    date: "2023-08-10"
  },
  {
    id: 3,
    title: "Special Needs Center Support",
    description: "Assist at centers for people with special needs in Colombo",
    type: "caregiving",
    commitment: "flexible",
    location: "Colombo",
    volunteersNeeded: 10,
    volunteersSigned: 3,
    image: "https://plus.unsplash.com/premium_photo-1713457016406-5e2c34fe501b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3BlY2lhbCUyMG5lZWRzJTIwY2VudGVyfGVufDB8fDB8fHww",
    date: "2023-08-20"
  }
]);

  return (
    <>
      <section className="hero" id="home">
        <div className="bg-container">
          <img
            className="bg"
            src={HomeBg}
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
              { !user ? (
                <a href="loginD" className="btn-secondary">
                  Donate Now
                </a>
              ) : (
                user.role !== 'donor' ? (
                  <a href="loginD" className="btn-secondary">
                    Donate Now
                  </a>
                ) : (
                  <a href="users/donor/all-donations" className="btn-secondary">
                    Donate Now
                  </a>
                )
              )}
              
            </div>
          </div>
        </div>
      </section>

      <section className="programs" id="programs">
        <div className="container">
          <h2 className="section-title">Featured Programs</h2>
          <div className="programs-grid">
            {volunteerOpportunities.map(opp => (
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
                    <button className="btn btn-outline">
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
          <div className="see-more">
            <button className="btn-small1" onClick={goToFeatured}>
              See more
            </button>
          </div>
        </div>
      </section>

      
      {/*<section className="marketplace-cta">
        <div className="container">
          <div className="marketplace-cta-content">
            <div className="marketplace-cta-text">
              <h2>Support Artisans with Disabilities</h2>
              <p>
                Discover unique handcrafted products or join our community of sellers.
                Every purchase supports independence and creativity.
              </p>
              <div className="marketplace-cta-buttons">
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/marketplace')}
                >
                  Shop now 
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => navigate('/marketplace/seller')}
                >
                  Become a Seller
                </button>
              </div>
            </div>
            <div className="marketplace-cta-image">
              <img 
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg" 
                alt="Artisans at work" 
              />
            </div>
          </div>
        </div>
      </section>*/}


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
                  src={CrowdImg}
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
                src={HandsImg}
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
                <div className="contact-icon">
                  <MapPin size={20}/>
                </div>
                <div>
                  <strong>Reid Avenue, Colombo</strong>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={20}/>
                </div>
                <div>
                  <strong>+94 77 1234567890</strong>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={20}/>
                </div>
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
                src={LogoImg}
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
