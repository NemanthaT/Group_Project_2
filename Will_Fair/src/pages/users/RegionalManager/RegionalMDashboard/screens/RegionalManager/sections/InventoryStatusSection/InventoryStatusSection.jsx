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

export const InventoryStatusSection = () => {
  const donationRequests = [
    {
      title: "Stationary Required",
      recipient: "R. Peiris",
      item: "Stationary",
      quantityNeeded: "2000",
      quantityReceived: "2000",
      progress: "5%",
    },
    {
      title: "Books Needed",
      recipient: "C. Kawmini",
      item: "Books",
      quantityNeeded: "300",
      quantityReceived: "300",
      progress: "20%",
    },
    {
      title: "Wheelchairs Needed",
      recipient: "A. Kulathunga",
      item: "Wheelchairs",
      quantityNeeded: "10",
      quantityReceived: "10",
      progress: "55%",
    },
  ];

  return (
    <section style={{ width: "100%", maxWidth: "1356px", margin: "2rem auto" }}>
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
              Pending Donation Requests
            </h2>
            <Button variant="primary">
              View all requests
            </Button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity Needed</TableHead>
                  <TableHead>Quantity Received</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donationRequests.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{request.recipient}</TableCell>
                    <TableCell>{request.item}</TableCell>
                    <TableCell>{request.quantityNeeded}</TableCell>
                    <TableCell>{request.quantityReceived}</TableCell>
                    <TableCell>{request.progress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};