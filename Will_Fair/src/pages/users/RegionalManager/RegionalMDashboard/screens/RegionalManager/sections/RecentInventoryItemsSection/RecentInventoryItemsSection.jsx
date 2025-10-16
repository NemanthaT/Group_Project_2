import React from "react";
import { Button } from "../../../../components/ui/Button";
import { Card, CardContent } from "../../../../components/ui/Card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../../../components/ui/Table";

export const RecentInventoryItemsSection = () => {
  const inventoryItems = [
    {
      name: "Stationary",
      category: "Education",
      quantity: "2000",
      status: "Available",
    },
    {
      name: "Books",
      category: "Education",
      quantity: "300",
      status: "Available",
    },
    {
      name: "Wheelchairs",
      category: "Health",
      quantity: "10",
      status: "Available",
    },
    {
      name: "Hospital Items",
      category: "Health",
      quantity: "200",
      status: "Available",
    },
    {
      name: "Slippers",
      category: "Health",
      quantity: "40",
      status: "Available",
    },
  ];

  return (
    <div style={{ width: "100%", paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
      <Card className="table-card">
        <CardContent>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <h2 className="section-title">
              Recent Inventory Items
            </h2>
            <Button variant="primary">
              Manage Inventory
            </Button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item, index) => (
                  <TableRow key={`inventory-item-${index}`}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};