import React from "react";
import { Button } from "../../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/Table";

export const InventorySection = () => {
  // Inventory data for the table
  const inventoryItems = [
    {
      id: "1",
      name: "Stationary",
      category: "Education",
      quantity: "2000",
      status: "Available",
    },
    {
      id: "2",
      name: "Books",
      category: "Education",
      quantity: "300",
      status: "Available",
    },
    {
      id: "3",
      name: "Wheelchairs",
      category: "Health",
      quantity: "10",
      status: "Available",
    },
    {
      id: "4",
      name: "Hospital Items",
      category: "Health",
      quantity: "200",
      status: "Available",
    },
    {
      id: "5",
      name: "Slippers",
      category: "Health",
      quantity: "40",
      status: "Available",
    },
  ];

  return (
    <section className="w-full p-2">
      <Card>
        <CardHeader>
          <CardTitle>
            Recent Inventory Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">
                  Item ID
                </TableHead>
                <TableHead className="text-center">
                  Item Name
                </TableHead>
                <TableHead className="text-center mobile-hidden">
                  Category
                </TableHead>
                <TableHead className="text-center">
                  Quantity
                </TableHead>
                <TableHead className="text-center small-mobile-hidden">
                  Status
                </TableHead>
                <TableHead className="text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    {item.name}
                  </TableCell>
                  <TableCell className="mobile-hidden">
                    {item.category}
                  </TableCell>
                  <TableCell>
                    {item.quantity}
                  </TableCell>
                  <TableCell className="small-mobile-hidden">
                    {item.status}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-center mobile-flex-column">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};