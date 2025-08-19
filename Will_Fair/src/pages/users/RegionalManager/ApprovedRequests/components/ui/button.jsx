import React from 'react';

export const Button = ({ 
  children, 
  variant = 'default', 
  className = '', 
  onClick,
  ...props 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'outline':
        return 'btn-outline';
      case 'ghost':
        return '';
      default:
        return 'btn';
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