import React, { useState } from "react";
import { Avatar, AvatarImage } from "../../components/ui/Avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/Breadcrumb";
import { Button } from "../../components/ui/Button";
import { InventorySection } from "./sections/InventorySection";
import { NavigationSidebarSection } from "./sections/NavigationSidebarSection";
import '../../styles/layout.css';

export const RegionalManager = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Mobile overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'visible' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Navigation Sidebar */}
      <NavigationSidebarSection 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <header className="header">
          <Button
            variant="outline"
            className="btn-rounded mr-2"
          >
            Logout
          </Button>
          <Avatar>
            <AvatarImage src="/profile-icon-5.png" alt="Profile icon" />
          </Avatar>
        </header>

        {/* Page Header */}
        <div className="page-content">
          <h1 className="page-title">
            Inventory Management
          </h1>

          <Breadcrumb className="mt-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Inventory</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Add New Item Button */}
          <div className="page-actions">
            <Button className="btn-rounded">
              Add New Item
            </Button>
          </div>

          {/* Inventory Section */}
          <InventorySection />
        </div>
      </div>
    </div>
  );
};