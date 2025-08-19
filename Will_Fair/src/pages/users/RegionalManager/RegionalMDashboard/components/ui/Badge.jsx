import React from "react";

export const Badge = ({ children, className = "" }) => {
  return (
    <span className={`badge ${className}`}>
      {children}
    </span>
  );
};