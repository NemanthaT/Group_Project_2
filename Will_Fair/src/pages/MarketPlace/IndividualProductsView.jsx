import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MarketPlace.css";

function IndividualProductsView() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state?.product;

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      navigate("/marketplace");
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) of "${product.title}" to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} item(s) of "${product.title}"!`);
  };

  return (
    <div className="individual-product-page-wrapper">
    <div className="individual-product-page">
      <div className="individual-product-container">
        <div className="individual-product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="individual-product-details">
          <h1 className="individual-product-title">{product.title}</h1>

          <p className="individual-product-description">
            This is a beautifully handcrafted item. Description and details can go here based on backend data.
          </p>

          <div className="individual-product-meta">
            <div className="price">{product.price}</div>

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="btn btn-outline"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="btn btn-outline"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="individual-product-actions">
            <button className="btn btn-outline" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default IndividualProductsView;
