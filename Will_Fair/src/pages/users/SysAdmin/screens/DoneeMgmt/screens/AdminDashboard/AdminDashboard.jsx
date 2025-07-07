import React, { useState } from "react";
import { SidebarSection } from "./sections/SidebarSection";
import { NavbarSection } from "./sections/NavbarSection";
import { DonorListSection } from "./sections/DonorListSection";

export const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="dashboard-container">
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      <div className={`sidebar-container ${isMobileMenuOpen ? 'open' : ''}`}>
        <SidebarSection />
      </div>

      <div className="main-content">
        <div className="top-nav">
          <button className="logout-btn">
            Logout
          </button>
          <img
            className="profile-icon"
            alt="Profile icon"
            src="/profile-icon-7.png"
          />
        </div>

        <div className="page-header">
          <h1 className="page-title">
            Donee Management
          </h1>

          <div className="header-controls">
            <div className="breadcrumb">
              <a href="#">Dashboard</a> > <a href="#">Donees</a>
            </div>

            <div className="search-filter-container">
              <div className="search-card">
                <input
                  className="search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="filter-dropdown">
                <button className="filter-btn" onClick={toggleFilter}>
                  Filter
                  <svg className="dropdown-arrow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isFilterOpen && (
                  <div className="filter-menu">
                    <button 
                      className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
                      onClick={() => handleFilterChange('all')}
                    >
                      All Records
                    </button>
                    <button 
                      className={`filter-option ${filterType === 'name' ? 'active' : ''}`}
                      onClick={() => handleFilterChange('name')}
                    >
                      Filter by Name
                    </button>
                    <button 
                      className={`filter-option ${filterType === 'address' ? 'active' : ''}`}
                      onClick={() => handleFilterChange('address')}
                    >
                      Filter by Address
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="content-area">
          <NavbarSection />
          <DonorListSection 
            searchTerm={searchTerm}
            filterType={filterType}
          />
        </div>
      </div>
    </div>
  );
};