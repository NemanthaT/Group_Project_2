import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Hopefull</h3>
            <p>
              Connecting donors with those in need through a 
              transparent and engaging platform.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook className="icon" />
              </a>
              <a href="#" className="social-link">
                <Twitter className="icon" />
              </a>
              <a href="#" className="social-link">
                <Instagram className="icon" />
              </a>
              <a href="#" className="social-link">
                <Linkedin className="icon" />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="icon" />
                <span>info@hopefull.com</span>
              </div>
              <div className="contact-item">
                <Phone className="icon" />
                <span>(123) 456-7890</span>
              </div>
              <div className="contact-item">
                <MapPin className="icon" />
                <span>123 Hope Street, City, Country</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-logo">
            <Heart className="logo-icon" />
            <span>Hopefull</span>
          </div>
          <p>© 2025 Hopefull. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;