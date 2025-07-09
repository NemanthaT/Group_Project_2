import React from 'react';
import { Heart, Package, Users, ArrowRight } from 'lucide-react';
import './WaysToHelp.css';

const WaysToHelp: React.FC = () => {
  const ways = [
    {
      icon: Heart,
      title: 'Make a Donation',
      description: 'Support causes that matter with monetary donations. Every contribution counts towards creating meaningful impact in the lives of those in need.',
      action: 'Donate Now'
    },
    {
      icon: Package,
      title: 'Donate Items',
      description: 'Contribute non-monetary items like books, clothing, and supplies to those in need. Your items can make a significant difference in someone\'s life.',
      action: 'Donate Items'
    },
    {
      icon: Users,
      title: 'Volunteer',
      description: 'Offer your time and skills to help others. Join volunteer opportunities and make a direct impact in your community through personal engagement.',
      action: 'Volunteer'
    }
  ];

  return (
    <section className="section ways-to-help">
      <div className="container">
        <h2 className="section-title">Ways You Can Help</h2>
        <p className="section-subtitle">
          Choose how you'd like to make a difference in your community and beyond
        </p>
        
        <div className="ways-grid">
          {ways.map((way, index) => (
            <div key={index} className="way-card card">
              <div className="way-icon">
                <way.icon className="icon-lg" />
              </div>
              
              <h3 className="way-title">{way.title}</h3>
              <p className="way-description">{way.description}</p>
              
              <button className="btn btn-outline">
                {way.action}
                <ArrowRight className="icon" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaysToHelp;