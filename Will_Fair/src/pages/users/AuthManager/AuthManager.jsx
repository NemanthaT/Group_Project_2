import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart3, Heart, CalendarCheck } from 'lucide-react';
import DashboardPage from "./DashboardPage";
import PendingDonationRequests from "./PendingDonationRequests";
import PendingEventsManagement from "./PendingEventsManagement";
import "./AuthManagerDashboard.css";

const AuthManager = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  const [activeTab, setActiveTab] = useState("overview");
  
  const [stats, setStats] = useState({
    totalAcceptedDonations: 0,
    totalMonetaryDonations: 0,
    totalAcceptedEvents: 0,
    pendingDonations: 0,
    pendingEvents: 0
  });

  const [donationCounts, setDonationCounts] = useState({
    pending: 0,
    accepted: 0,
    declined: 0,
    total: 0
  });

  // Fetch all dashboard stats
  const fetchDashboardStats = async () => {
    try {
      // Fetch donation stats
      const donationResponse = await axios.get("http://localhost:5000/authManager/donation-stats");
      if (donationResponse.data.success) {
        setStats(prev => ({
          ...prev,
          totalAcceptedDonations: donationResponse.data.stats.totalAccepted,
          totalMonetaryDonations: donationResponse.data.stats.totalMonetary,
          pendingDonations: donationResponse.data.stats.pending
        }));
        setDonationCounts(donationResponse.data.stats);
      }

      // Fetch event stats
      const eventResponse = await axios.get("http://localhost:5000/authManager/event-stats");
      if (eventResponse.data.success) {
        setStats(prev => ({
          ...prev,
          totalAcceptedEvents: eventResponse.data.stats.totalAccepted,
          pendingEvents: eventResponse.data.stats.total
        }));
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  // Fetch event counts
  const fetchEventCounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/authManager/event-counts");
      if (response.data.success) {
        setStats(prev => ({
          ...prev,
          pendingEvents: response.data.counts.total
        }));
      }
    } catch (error) {
      console.error("Failed to fetch event counts:", error);
    }
  };

  // Fetch donation counts
  const fetchDonationCounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/authManager/donation-counts");
      if (response.data.success) {
        setDonationCounts(response.data.counts);
        setStats(prev => ({
          ...prev,
          pendingDonations: response.data.counts.pending
        }));
      }
    } catch (error) {
      console.error("Failed to fetch donation counts:", error);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchDashboardStats();
    fetchEventCounts();
    fetchDonationCounts();
  }, []);

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>Authentication Manager Dashboard</h2>
          <p>Here's what's happening with your platform today</p>
        </div>
      </div>
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={18} />
          Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'donations' ? 'active' : ''}`}
          onClick={() => setActiveTab('donations')}
        >
          <Heart size={18} />
          Donation Requests
          {donationCounts.pending > 0 && (
            <span className="nav-badge">{donationCounts.pending}</span>
          )}
        </button>
        <button 
          className={`nav-tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <CalendarCheck size={18} />
          Volunteering Events
          {stats.pendingEvents > 0 && (
            <span className="nav-badge">{stats.pendingEvents}</span>
          )}
        </button>
      </nav>

      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <DashboardPage 
            user={user}
            stats={stats}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'donations' && (
          <PendingDonationRequests 
            onCountChange={fetchDonationCounts}
            onStatsChange={fetchDashboardStats}
          />
        )}
        {activeTab === 'events' && (
          <PendingEventsManagement 
            onCountChange={fetchEventCounts}
            onStatsChange={fetchDashboardStats}
          />
        )}
      </main>
    </div>
  );
};

export default AuthManager;