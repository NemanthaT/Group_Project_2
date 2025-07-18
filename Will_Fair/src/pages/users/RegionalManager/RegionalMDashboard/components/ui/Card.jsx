import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
};