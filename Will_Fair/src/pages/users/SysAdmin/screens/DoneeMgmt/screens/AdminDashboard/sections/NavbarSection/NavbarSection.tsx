import React from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export const NavbarSection = (): JSX.Element => {
  // Table header columns data
  const columns = [
    { id: "name", label: "Name", className: "pl-16" },
    { id: "email", label: "Email", className: "pl-16" },
    { id: "contact", label: "Contact No", className: "" },
    { id: "actions", label: "Actions", className: "pl-8" },
  ];

  return (
    <div className="w-full py-4">
      <div className="w-full bg-white rounded-[10px] shadow-[4px_2px_2px_#0000000d]">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={`h-12 font-medium text-2xl text-black font-['Outfit',Helvetica] ${column.className}`}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
};
