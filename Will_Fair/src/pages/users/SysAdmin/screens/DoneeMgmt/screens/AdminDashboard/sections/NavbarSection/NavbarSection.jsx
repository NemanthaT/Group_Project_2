import React from "react";

export const NavbarSection = () => {
  const columns = [
    { id: "name", label: "Name" },
    { id: "contact", label: "Contact No" },
    { id: "address", label: "Address" },
    { id: "actions", label: "Actions" },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        {columns.map((column) => (
          <div key={column.id} className="table-header-cell">
            {column.label}
          </div>
        ))}
      </div>
    </div>
  );
};