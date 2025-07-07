import React, { useState } from "react";
import { SidebarNavigationSection } from "./sections/SidebarNavigationSection";
import { DonorTableSection } from "./sections/DonorTableSection";

export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="dashboard-container">
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-button"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Sidebar overlay for mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Navigation */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <SidebarNavigationSection />
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <button className="logout-button">
            Logout
          </button>
          <img
            className="profile-icon"
            alt="Profile icon"
            src="/profile-icon-7.png"
          />
        </div>

        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            Donor Management
          </h1>
          <div className="breadcrumb">
            Dashboard > Donors
          </div>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-section">
          <div className="search-container">
            <input
              className="search-input"
              placeholder="Search by name, address, or phone..."
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="filter-button">
            Filter
            <svg className="chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Donor Table */}
        <DonorTableSection searchTerm={searchTerm} />
      </div>
    </div>
  );
};