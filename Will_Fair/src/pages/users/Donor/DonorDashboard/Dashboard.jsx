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
      <HeroSection user={user} />
      <RecentDonationRequests user={user} />
      <WaysToHelp user={user} />
      <Marketplace user={user} />
      <ImpactSection user={user} />
    </div>
  );
}

export default Dashboard;