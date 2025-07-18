import React from 'react';
import { Heart, Facebook, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <Heart size={20} />
              </div>
              <span className="footer-logo-text">WillFair</span>
            </div>
            <p className="footer-tagline">Connecting Hearts, Changing Lives</p>
            <p className="footer-description">
              Connecting generous hearts with communities in need, creating lasting 
              positive change through transparent and impactful giving.
            </p>
            <div className="social-links">
              <a href="#" className="social-link facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-link instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="social-link linkedin">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Programs</a></li>
              <li><a href="#">Our Marketplace</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                Reid Avenue, Colombo
              </div>
              <div className="contact-item">
                +94 77 1234567890
              </div>
              <div className="contact-item">
                info@willfair.org
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 WillFair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;