import React, { useState } from "react";

export const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleView = () => {
    console.log("View product:", product.id);
  };

  const handleAccept = () => {
    console.log("Accept product:", product.id);
  };

  return (
    <div className="authmanager-product-card">
      <div className="authmanager-product-image-container">
        <img
          className="authmanager-product-image"
          alt={product.title}
          src={product.image}
        />
        <button 
          className="authmanager-heart-btn" 
          onClick={toggleLike}
          aria-label="Add to favorites"
        >
          <svg 
            className="authmanager-heart-icon" 
            fill={isLiked ? "#ff6b6b" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>

      <div className="authmanager-product-content">
        <h3 className="authmanager-product-title">
          {product.title}
        </h3>

        <p className="authmanager-product-price">
          {product.price}
        </p>

        <div className="authmanager-product-actions">
          <button className="authmanager-view-btn" onClick={handleView}>
            View
          </button>
          <button className="authmanager-accept-btn" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};