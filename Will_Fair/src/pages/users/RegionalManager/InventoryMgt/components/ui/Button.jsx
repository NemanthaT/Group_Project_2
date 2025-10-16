import React from 'react';
import '../../styles/components.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'base',
  className = '',
  onClick,
  ...props 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'outline': return 'btn-outline';
      case 'secondary': return 'btn-secondary';
      case 'destructive': return 'btn-danger';
      case 'ghost': return 'btn-secondary';
      default: return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'btn-sm';
      case 'lg': return 'btn-lg';
      default: return '';
    }
  };

  return (
    <button 
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};