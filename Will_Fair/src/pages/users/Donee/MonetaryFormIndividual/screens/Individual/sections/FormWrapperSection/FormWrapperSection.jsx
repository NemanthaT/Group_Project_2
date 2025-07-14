import React, { useState } from "react";

export const FormWrapperSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Medical Support",
    "Education Support", 
    "Emergency Relief",
    "Community Development",
    "Other"
  ];

  return (
    <section className="form-section">
      <h2 className="section-title">
        Category
      </h2>

      <div className="select-wrapper">
        <div 
          className="select-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedCategory || "Select a category"}</span>
          <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
        
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '0.5px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '15px',
            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
            zIndex: 10,
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {categories.map((category, index) => (
              <div
                key={index}
                style={{
                  padding: '16px 40px',
                  cursor: 'pointer',
                  fontSize: '24px',
                  borderBottom: index < categories.length - 1 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};