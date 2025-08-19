import React from "react";

export const TableHeader = () => {
  const columns = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "contact", label: "Contact No" },
    { id: "actions", label: "Actions" },
  ];

  return (
    <div className="table-header">
      <div className="table-header-card">
        <div className="table-header-row">
          {columns.map((column) => (
            <div key={column.id} className="table-header-cell">
              {column.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};