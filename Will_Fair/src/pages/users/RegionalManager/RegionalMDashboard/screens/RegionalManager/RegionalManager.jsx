import React, { useState } from "react";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { DashboardMetricsSection } from "./sections/DashboardMetricsSection";
import { InventoryStatusSection } from "./sections/InventoryStatusSection";
import { PendingDonationRequestsSection } from "./sections/PendingDonationRequestsSection";
import { RecentInventoryItemsSection } from "./sections/RecentInventoryItemsSection";
import { SidebarNavigationSection } from "./sections/SidebarNavigationSection";
import { WarehouseInformationSection } from "./sections/WarehouseInformationSection";
import "../../styles/dashboard.css";

export const RegionalManager = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const metricCards = [
    {
      id: 1,
      value: "30",
      label: "Total Categories",
      bgColor: "#3bba00",
      percentage: "+12%",
      iconSrc: "/category-svgrepo-com.svg",
    },
    {
      id: 2,
      value: "200",
      label: "Total Items",
      bgColor: "#ff4f4f",
      percentage: "+12%",
      icon: "📋",
    },
    {
      id: 3,
      value: "Rs.150,000",
      label: "Monthly Donations",
      bgColor: "#005dd9",
      percentage: "+12%",
      iconSrc: "/vector.svg",
    },
    {
      id: 4,
      value: "300",
      label: "Monthly Donations",
      bgColor: "#d700ba",
      percentage: "+12%",
      icon: "#",
    },
  ];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="dashboard-container">
      <button 
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div 
        className={`mobile-overlay ${sidebarVisible ? 'active' : ''}`}
        onClick={toggleSidebar}
      />

      <SidebarNavigationSection 
        isVisible={sidebarVisible}
        onClose={toggleSidebar}
      />

      <div className="main-content">
        <header className="header">
          <div className="header-actions">
            <Button variant="outline">
              Logout
            </Button>
            <Avatar>
              <img src="/profile-icon-5.png" alt="Profile icon" />
            </Avatar>
          </div>
        </header>

        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Dashboard</p>

          <div className="metric-cards">
            {metricCards.map((card) => (
              <Card key={card.id} className="metric-card">
                <div 
                  className="metric-card-icon"
                  style={{ backgroundColor: card.bgColor }}
                >
                  {card.iconSrc ? (
                    <img
                      src={card.iconSrc}
                      alt={card.label}
                      style={{
                        width: card.id === 3 ? "35px" : "60px",
                        height: card.id === 3 ? "50px" : "60px"
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "2rem", color: "white" }}>
                      {card.icon}
                    </span>
                  )}
                </div>
                <div className="metric-card-content">
                  <div className="metric-value">{card.value}</div>
                  <div className="metric-label-row">
                    <span className="metric-label">{card.label}</span>
                    <Badge className="metric-percentage">{card.percentage}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="dashboard-sections">
            <DashboardMetricsSection />
            <PendingDonationRequestsSection />
          </div>

          <div className="section-full-width">
            <WarehouseInformationSection />
          </div>

          <div className="section-full-width">
            <RecentInventoryItemsSection />
          </div>

          <div className="section-full-width mb-10">
            <InventoryStatusSection />
          </div>
        </div>
      </div>
    </div>
  );
};