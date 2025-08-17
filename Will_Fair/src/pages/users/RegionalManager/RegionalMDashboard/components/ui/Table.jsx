import React from "react";

export const Table = ({ children, className = "" }) => {
  return (
    <table className={`table ${className}`}>
      {children}
    </table>
  );
};

export const TableHeader = ({ children, className = "" }) => {
  return (
    <thead className={className}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = "" }) => {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className = "" }) => {
  return (
    <tr className={className}>
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className = "" }) => {
  return (
    <th className={className}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = "" }) => {
  return (
    <td className={className}>
      {children}
    </td>
  );
};