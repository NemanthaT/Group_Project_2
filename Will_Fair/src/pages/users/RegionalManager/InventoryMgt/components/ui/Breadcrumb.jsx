import React from 'react';
import '../../styles/components.css';

export const Breadcrumb = ({ children, className = '' }) => {
  return (
    <nav className={`breadcrumb ${className}`}>
      {children}
    </nav>
  );
};

export const BreadcrumbList = ({ children }) => {
  return <div className="flex align-center gap-1">{children}</div>;
};

export const BreadcrumbItem = ({ children }) => {
  return <div>{children}</div>;
};

export const BreadcrumbLink = ({ href, children }) => {
  return <a href={href}>{children}</a>;
};

export const BreadcrumbSeparator = ({ children }) => {
  return <span className="breadcrumb-separator">{children}</span>;
};