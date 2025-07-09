import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecentDonationRequests from './components/RecentDonationRequests';
import WaysToHelp from './components/WaysToHelp';
import Marketplace from './components/Marketplace';
import ImpactSection from './components/ImpactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <RecentDonationRequests />
      <WaysToHelp />
      <Marketplace />
      <ImpactSection />
      <Footer />
    </div>
  );
}

export default App;