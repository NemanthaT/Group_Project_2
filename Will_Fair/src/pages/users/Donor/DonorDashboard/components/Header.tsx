import React from 'react';
import { Heart, ShoppingCart, User, Bell } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Heart className="logo-icon" />
            <span className="logo-text">Hopefull</span>
          </div>
          
          <nav className="nav">
            <a href="#" className="nav-link active">Home</a>
            <a href="#" className="nav-link">Donations</a>
            <a href="#" className="nav-link">Events</a>
            <a href="#" className="nav-link">Marketplace</a>
          </nav>
          
          <div className="header-actions">
            <button className="icon-button">
              <ShoppingCart className="icon" />
              <span className="badge">2</span>
            </button>
            <button className="icon-button">
              <Bell className="icon" />
              <span className="badge">5</span>
            </button>
            <button className="icon-button">
              <User className="icon" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;