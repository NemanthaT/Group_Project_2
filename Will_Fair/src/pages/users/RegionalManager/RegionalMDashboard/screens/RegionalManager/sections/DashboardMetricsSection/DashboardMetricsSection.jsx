import React from "react";
import { Card, CardContent } from "../../../../components/ui/Card";

export const DashboardMetricsSection = () => {
  const warehouseInfo = [
    {
      label: "Location",
      value: ["Colombo Regional Warehouse,", "123 Main Street,", "Colombo"],
    },
    {
      label: "Officer-in-charge",
      value: ["Regional Officer"],
    },
    {
      label: "Contact",
      value: ["0777959594"],
    },
  ];

  return (
    <Card className="warehouse-info-card">
      <CardContent>
        <h2 className="section-title">
          Warehouse Information
        </h2>

        <div style={{ paddingLeft: "2rem" }}>
          {warehouseInfo.map((item, index) => (
            <div key={index} className="warehouse-info-item">
              <div className="warehouse-info-label">
                {item.label}
              </div>
              <div className="warehouse-info-value">
                :&nbsp;&nbsp;
                {item.value.map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <>&nbsp;&nbsp;</>}
                    {line}
                    {i < item.value.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};