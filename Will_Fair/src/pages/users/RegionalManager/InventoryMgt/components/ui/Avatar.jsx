import React from 'react';
import '../../styles/components.css';

export const Avatar = ({ children, className = '' }) => {
  return (
    <div className={`avatar ${className}`}>
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};