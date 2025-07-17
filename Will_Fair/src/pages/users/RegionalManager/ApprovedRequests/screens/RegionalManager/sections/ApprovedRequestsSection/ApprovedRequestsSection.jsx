import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export const ApprovedRequestsSection = () => {
  const requestsData = [
    {
      detailId: "NMD59803",
      itemName: "Stationary",
      quantityNeeded: "2000",
      quantityReceived: "1220",
      province: "Western",
      dropoffLocation: "Colombo community Center",
      dropoffTime: "2025/05/31  13:30:00",
    },
    {
      detailId: "NMD43524",
      itemName: "Books",
      quantityNeeded: "300",
      quantityReceived: "200",
      province: "Western",
      dropoffLocation: "Reid community Center",
      dropoffTime: "2025/05/23  10:34:04",
    },
    {
      detailId: "NMD63745",
      itemName: "Wheelchairs",
      quantityNeeded: "10",
      quantityReceived: "8",
      province: "Western",
      dropoffLocation: "Colombo community Center",
      dropoffTime: "2025/04/15  13:35:09",
    },
    {
      detailId: "NMD87986",
      itemName: "Hospital Items",
      quantityNeeded: "200",
      quantityReceived: "199",
      province: "Southern",
      dropoffLocation: "Reid community Center",
      dropoffTime: "2025/04/01  16:18:56",
    },
    {
      detailId: "NMD52334",
      itemName: "Slippers",
      quantityNeeded: "40",
      quantityReceived: "38",
      province: "Southern",
      dropoffLocation: "Colombo community Center",
      dropoffTime: "2025/01/31  12:09:11",
    },
  ];

  return (
    <Card className="approved-requests-card">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Detail ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity Needed</TableHead>
              <TableHead>Quantity Received</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Drop-off Location</TableHead>
              <TableHead>Drop-off Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requestsData.map((request) => (
              <TableRow key={request.detailId}>
                <TableCell style={{ textAlign: 'center' }}>
                  {request.detailId}
                </TableCell>
                <TableCell>{request.itemName}</TableCell>
                <TableCell>{request.quantityNeeded}</TableCell>
                <TableCell>{request.quantityReceived}</TableCell>
                <TableCell>{request.province}</TableCell>
                <TableCell>{request.dropoffLocation}</TableCell>
                <TableCell>{request.dropoffTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};