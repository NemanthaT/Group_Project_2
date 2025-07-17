import React from 'react';

export const Table = ({ children, className = '' }) => {
  return (
    <table className={`table ${className}`}>
      {children}
    </table>
  );
};

export const TableHeader = ({ children, className = '' }) => {
  return (
    <thead className={`table-header ${className}`}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = '' }) => {
  return (
    <tbody className={`table-body ${className}`}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className = '' }) => {
  return (
    <tr className={`table-row ${className}`}>
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className = '' }) => {
  return (
    <th className={`table-head ${className}`}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = '' }) => {
  return (
    <td className={`table-cell ${className}`}>
      {children}
    </td>
  );
};