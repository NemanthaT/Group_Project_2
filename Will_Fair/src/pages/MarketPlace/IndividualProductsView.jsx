import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MarketPlace.css";

function IndividualProductsView() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recover productId from router state OR from ?id= query param (works on refresh)
  const stateProductId = location?.state?.productId;
  const queryProductId = new URLSearchParams(window.location.search).get("id");
  const productId = stateProductId ?? queryProductId;

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:5000"; // change for production

  useEffect(() => {
    if (!productId) {
      // No ID -> go back to marketplace
      navigate("/marketplace");
      return;
    }
    window.scrollTo(0, 0);
    fetchProductDetails(productId);
  }, [productId, navigate]);

  async function fetchProductDetails(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product details");
      const data = await res.json();
      setProduct(normalizeProductFromApi(data));
    } catch (err) {
      console.error(err);
      setError("Could not load product details");
    } finally {
      setLoading(false);
    }
  }

  function normalizeProductFromApi(p) {
    const price = typeof p.price === "string" ? parseFloat(p.price) : p.price;

    // API returns either p.images (array) or p.image (string) depending on endpoint
    const firstImage =
      Array.isArray(p.images) && p.images.length > 0
        ? p.images[0]
        : p.image;

    const image = firstImage && !String(firstImage).startsWith("http")
      ? `/images/products/${firstImage}`
      : firstImage || "/placeholder-product.jpg";

    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price,
      quantity_available: p.quantity_available,
      type: p.type,
      image,
      images: Array.isArray(p.images) ? p.images : [image],
    };
  }

  function handleQuantityChange(change) {
    const newQty = quantity + change;
    if (newQty >= 1) setQuantity(newQty);
  }

  function handleAddToCart() {
    alert(`Added ${quantity} item(s) of "${product.title}" to cart!`);
  }

  function handleBuyNow() {
    alert(`Proceeding to checkout with ${quantity} item(s) of "${product.title}"!`);
  }

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!product) return null;

  return (
    <div className="individual-product-page-wrapper">
      <div className="product-detail-hero">
        <h1 className="product-detail-heading">
          Product Details: <span>{product.title}</span>
        </h1>
      </div>

      <div className="individual-product-page">
        <div className="individual-product-container">
          <div className="individual-product-image">
            <img src={product.image} alt={product.title}
              onError={(e) => {
                e.target.onerror = null; // prevents looping if fallback fails
                e.target.src =
                  "https://images.pexels.com/photos/6461513/pexels-photo-6461513.jpeg?_gl=1*o10vko*_ga*MzcyNzE3NDYxLjE3NTMxMTMxMzA.*_ga_8JE65Q40S6*czE3NTMxMTMxMzAkbzEkZzEkdDE3NTMxMTMxNzgkajEyJGwwJGgw";
              }}
            />
          </div>

          <div className="individual-product-details">
            <span
              className={`product-type-badge ${product.type
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {product.type}
            </span>
            <h1 className="individual-product-title">{product.title}</h1>

            <p className="individual-product-description">{product.description}</p>
            <p className="individual-product-type">
              <strong>Type:</strong> {product.type}
            </p>
            <p className="individual-product-stock">
              <strong>In Stock:</strong> {product.quantity_available}
            </p>

            <div className="individual-product-meta">
              <div className="price">{product.price} LKR</div>

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
              <button className="btn btn-outline" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-primary" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Optional: small gallery if multiple images in DB */}
        {product.images && product.images.length > 1 && (
          <div className="individual-product-gallery">
            {product.images.map((img, i) => {
              const src =
                img && !String(img).startsWith("http")
                  ? `/images/products/${img}`
                  : img;
              return (
                <img
                  key={i}
                  src={src}
                  alt={`${product.title} alt ${i + 1}`}
                  className="product-thumb"
                  onClick={() =>
                    setProduct((prev) => ({ ...prev, image: src }))
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default IndividualProductsView;
