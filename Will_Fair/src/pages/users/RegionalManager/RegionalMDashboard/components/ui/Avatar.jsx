import React from "react";

export const Avatar = ({ children, className = "" }) => {
  return (
    <div className={`avatar ${className}`}>
      {children}
    </div>
  );
};