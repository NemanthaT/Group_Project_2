import React, { useState } from "react";
import { SearchIcon } from "./components/SearchIcon";
import { Sidebar } from "./components/Sidebar";
import { TableHeader } from "./components/TableHeader";
import { DataCard } from "./components/DataCard";

export const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - in a real app this would come from an API
  const userData = [
    {
      id: 1,
      name: "Christopher Bang",
      email: "chris@gmail.com",
      phone: "0771234659",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@gmail.com",
      phone: "0771234660",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@gmail.com",
      phone: "0771234661",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu}
        />
        
        {/* Mobile Overlay */}
        <div 
          className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
        />

        {/* Main Content Container */}
        <div className={`main-content ${isMobileMenuOpen ? '' : 'full-width-mobile'}`}>
          {/* Top Navigation Bar */}
          <div className="top-nav">
            <button 
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              ☰
            </button>
            
            <div className="top-nav-right">
              <button className="logout-btn">
                Logout
              </button>
              <img
                className="profile-icon"
                alt="Profile"
                src="/profile-icon-7.png"
              />
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="dashboard-content">
            {/* Title Section */}
            <h1 className="page-title">
              Regional Managers
            </h1>

            {/* Breadcrumb Section */}
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol className="breadcrumb-list">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-separator">/</li>
                <li className="breadcrumb-item">Regional Managers</li>
              </ol>
            </nav>

            {/* Search and Filter Section */}
            <div className="search-filter-section">
              <div className="search-container">
                <input
                  className="search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  type="text"
                />
                <SearchIcon className="search-icon" />
              </div>

              <button className="filter-btn">
                Filter
                <img
                  className="dropdown-arrow"
                  alt="Dropdown"
                  src="/dropdown-arrow-svgrepo-com-1.svg"
                />
              </button>
            </div>

            {/* Table Header */}
            <TableHeader />

            {/* Data Section */}
            <div className="data-section">
              {filteredData.map((user) => (
                <DataCard key={user.id} user={user} />
              ))}
              
              {filteredData.length === 0 && (
                <div className="data-card">
                  <div className="data-row">
                    <div className="data-cell" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                      No results found for "{searchTerm}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};