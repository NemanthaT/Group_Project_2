import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import { ApprovedRequestsSection } from "./sections/ApprovedRequestsSection";
import { NavigationSidebarSection } from "./sections/NavigationSidebarSection";
import '../../styles/RegionalManager.css';

export const RegionalManager = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="regional-manager">
      <button className="nav-toggle" onClick={toggleMobileNav}>
        ☰
      </button>
      
      <div 
        className={`nav-overlay ${isMobileNavOpen ? 'open' : ''}`}
        onClick={closeMobileNav}
      />

      <NavigationSidebarSection 
        isOpen={isMobileNavOpen} 
        onClose={closeMobileNav}
      />

      <div className="main-content">
        <div className="header">
          <div className="header-actions">
            <Button variant="outline">
              Logout
            </Button>
            <img
              className="profile-icon"
              alt="Profile icon"
              src="/profile-icon-5.png"
            />
          </div>
        </div>

        <div className="content-area">
          <h1 className="page-title">
            Approved Requests
          </h1>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Approved Requests</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ApprovedRequestsSection />
        </div>
      </div>
    </div>
  );
};