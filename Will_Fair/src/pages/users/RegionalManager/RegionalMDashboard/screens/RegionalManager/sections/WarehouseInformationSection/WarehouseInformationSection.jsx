import React from "react";
import { Button } from "../../../../components/ui/Button";
import { Card, CardContent } from "../../../../components/ui/Card";

export const WarehouseInformationSection = () => {
  return (
    <Card className="pending-requests-card">
      <CardContent>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "end", 
            gap: "1.25rem" 
          }}>
            <span className="pending-number">
              15
            </span>
            <span className="pending-label">
              Pending Requests
            </span>
          </div>

          <Button variant="primary">
            View requests
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};