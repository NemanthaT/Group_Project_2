import React from 'react';
import { Users, Gift, Award, Heart } from 'lucide-react';
import './ImpactSection.css';

const ImpactSection = () => {
  const impacts = [
    {
      icon: Users,
      title: 'Total Donations',
      value: 'Rs. 37,500',
      color: '#667eea'
    },
    {
      icon: Gift,
      title: 'Donations Made',
      value: '39',
      color: '#f093fb'
    },
    {
      icon: Award,
      title: 'Badges Earned',
      value: '8',
      color: '#feca57'
    },
    {
      icon: Heart,
      title: 'Lives Impacted',
      value: '180',
      color: '#ff6b6b'
    }
  ];

  return (
    <section className="section impact-section">
      <div className="container">
        <h2 className="section-title">Your Impact</h2>
        <p className="section-subtitle">
          See the difference you're making in your community
        </p>
        
        <div className="impact-grid">
          {impacts.map((impact, index) => (
            <div key={index} className="impact-card card">
              <div className="impact-icon" style={{ color: impact.color }}>
                <impact.icon className="icon-lg" />
              </div>
              
              <div className="impact-content">
                <div className="impact-value">{impact.value}</div>
                <div className="impact-title">{impact.title}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="impact-message">
          <h3>Thank you for making a difference!</h3>
          <p>Your contributions have helped transform lives and build stronger communities.</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;