import React from "react";
import { Card, CardContent } from "../../../../components/ui/Card";

export const PendingDonationRequestsSection = () => {
  const legendItems = [
    { color: "#3977af", label: "Available" },
    { color: "#519d3e", label: "Reserved" },
    { color: "#ef8536", label: "Distributed" },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Card className="inventory-status-card">
        <CardContent>
          <h2 className="section-title-small">
            Inventory status
          </h2>

          <div style={{ 
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div style={{ 
              position: "relative", 
              width: "220px", 
              height: "230px",
              maxWidth: "100%"
            }}>
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                alt="Inventory status chart"
                src="/image-12.png"
              />
            </div>

            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "1rem",
              marginTop: "1rem"
            }}>
              {legendItems.map((item, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="legend-label">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};