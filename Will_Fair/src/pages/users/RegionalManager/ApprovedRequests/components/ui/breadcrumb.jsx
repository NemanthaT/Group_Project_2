import React from 'react';

export const Breadcrumb = ({ children, className = '' }) => {
  return (
    <nav className={`breadcrumb ${className}`}>
      {children}
    </nav>
  );
};

export const BreadcrumbList = ({ children, className = '' }) => {
  return (
    <ol className={`breadcrumb-list ${className}`}>
      {children}
    </ol>
  );
};

export const BreadcrumbItem = ({ children }) => {
  return (
    <li className="breadcrumb-item">
      {children}
    </li>
  );
};

export const BreadcrumbLink = ({ href, children }) => {
  return (
    <a href={href} className="breadcrumb-link">
      {children}
    </a>
  );
};

export const BreadcrumbSeparator = ({ children }) => {
  return (
    <span className="breadcrumb-separator">
      {children}
    </span>
  );
};