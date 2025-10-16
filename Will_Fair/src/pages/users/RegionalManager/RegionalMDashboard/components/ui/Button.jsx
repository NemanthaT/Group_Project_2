import React from "react";

export const Button = ({ children, variant = "primary", className = "", onClick, ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "btn-outline";
      case "secondary":
        return "btn-secondary";
      case "active":
        return "btn-active";
      case "primary":
      default:
        return "btn-primary";
    }
  };

  return (
    <button
      className={`btn ${getVariantClass()} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};