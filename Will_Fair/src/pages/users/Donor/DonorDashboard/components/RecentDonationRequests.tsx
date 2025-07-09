import React from 'react';
import { Calendar, Target, ArrowRight } from 'lucide-react';
import './RecentDonationRequests.css';

const RecentDonationRequests: React.FC = () => {
  const donations = [
    {
      id: 1,
      title: 'Need Books',
      description: 'Requested for Shareable Education',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 5,
      target: 20000,
      raised: 1000,
      deadline: 'Jul 31, 2025',
      urgent: true
    },
    {
      id: 2,
      title: 'School Supplies',
      description: 'Educational materials for underprivileged children',
      image: 'https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 15,
      target: 15000,
      raised: 2250,
      deadline: 'Aug 15, 2025',
      urgent: false
    },
    {
      id: 3,
      title: 'Medical Equipment',
      description: 'Life-saving equipment for local clinic',
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400',
      progress: 25,
      target: 50000,
      raised: 12500,
      deadline: 'Sep 10, 2025',
      urgent: false
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Recent Donation Requests</h2>
          <button className="btn btn-outline">
            View All Requests
            <ArrowRight className="icon" />
          </button>
        </div>
        
        <div className="donation-grid">
          {donations.map(donation => (
            <div key={donation.id} className="donation-card card">
              <div className="donation-image">
                <img src={donation.image} alt={donation.title} />
                {donation.urgent && <span className="urgent-badge">Urgent</span>}
              </div>
              
              <div className="donation-content">
                <h3 className="donation-title">{donation.title}</h3>
                <p className="donation-description">{donation.description}</p>
                
                <div className="donation-progress">
                  <div className="progress-header">
                    <span className="progress-text">{donation.raised.toLocaleString()} of {donation.target.toLocaleString()} items</span>
                    <span className="progress-percentage">{donation.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${donation.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="donation-meta">
                  <div className="deadline">
                    <Calendar className="icon" />
                    <span>Deadline: {donation.deadline}</span>
                  </div>
                </div>
                
                <div className="donation-actions">
                  <button className="btn btn-primary">Donate Now</button>
                  <button className="btn btn-secondary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentDonationRequests;