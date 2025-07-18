import React from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import RecentDonationRequests from './components/RecentDonationRequests';
import WaysToHelp from './components/WaysToHelp';
import Marketplace from './components/Marketplace';
import ImpactSection from './components/ImpactSection';

function Dashboard({ user }) {
  return (
    <div className="donor-dashboard">
      <HeroSection />
      <RecentDonationRequests />
      <WaysToHelp />
      <Marketplace />
      <ImpactSection />
    </div>
  );
}

export default Dashboard;