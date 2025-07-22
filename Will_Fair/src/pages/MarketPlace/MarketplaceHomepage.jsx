import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryBrowseSection } from "./sections/CategoryBrowseSection";
import { ProductGridSection } from "./sections/ProductGridSection";
import { ArtisanStoriesSection } from "./sections/ArtisanStoriesSection";
import { Link } from "react-router-dom";
import "./MarketPlace.css";

function MarketplaceHomepage() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:5000"; // Change if needed (e.g., production URL)

  // Load categories
  useEffect(() => {
    setLoadingCategories(true);
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories");
      })
      .finally(() => setLoadingCategories(false));
  }, []);

  // Load products when category changes
  useEffect(() => {
    setLoadingProducts(true);
    const url = selectedCategory
      ? `${API_BASE}/products?category=${encodeURIComponent(selectedCategory)}`
      : `${API_BASE}/products`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setRecentProducts(data.map(normalizeProductFromApi)))
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
      })
      .finally(() => setLoadingProducts(false));
  }, [selectedCategory]);

  // Normalize product data
  function normalizeProductFromApi(p) {
    const price = typeof p.price === "string" ? parseFloat(p.price) : p.price;
    const image = p.image && !p.image.startsWith("http")
      ? `/images/products/${p.image}`
      : p.image || "/placeholder-product.jpg";
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price,
      quantity_available: p.quantity_available,
      type: p.type,
      image,
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    };
  }

  const filteredProducts = selectedCategory
    ? recentProducts.filter((p) => p.type === selectedCategory)
    : recentProducts;

  const handleProductClick = useCallback(
    (product) => {
      navigate(`/marketplace/product?id=${product.id}`, { state: { productId: product.id } });
    },
    [navigate]
  );

  return (
    <div className="marketplace-homepage">
      
      {/* Hero Section with Navigation */}
      <section className="hero-section">
        <img
          className="hero-background"
          alt="Hero background"
          src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1200"
        />
        <div className="hero-content">
          <h1 className="hero-title">What are you Looking for?</h1>

          <div className="search-bar-wrapper">
            <input
              type="text"
              className="search-bar-input"
              placeholder="Search for handcrafted products..."
            />
            <button className="search-bar-button" aria-label="Search">
              <svg
                className="search-bar-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <p className="seller-signup-text">
              Become a seller?{" "}
              <button
                className="signup-link-btn"
                onClick={() => navigate("/signup")}
                type="button"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryBrowseSection
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        categories={categories}
        loading={loadingCategories}
      />

      {/* Recent Products */}
      <section className="products-section">
        <h2 className="section-title">
          {selectedCategory ? `${selectedCategory} Products` : "Recent Products"}
        </h2>

        {loadingProducts && <p>Loading products...</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product)}
              style={{ cursor: "pointer" }}
            >
              <div>
                <img
                  className="marketplace-product-image"
                  alt={product.title}
                  src={product.image}
                  onError={(e) => {
    e.target.onerror = null; // prevents looping if fallback fails
    e.target.src =
      "https://images.pexels.com/photos/6461513/pexels-photo-6461513.jpeg?_gl=1*o10vko*_ga*MzcyNzE3NDYxLjE3NTMxMTMxMzA.*_ga_8JE65Q40S6*czE3NTMxMTMxMzAkbzEkZzEkdDE3NTMxMTMxNzgkajEyJGwwJGgw";
  }}
                />
              </div>
              <div className="product-content">
                <div className="product-header">
                  <p className="product-title">{product.title}</p>
                  <span
                    className={`product-type-badge ${product.type
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {product.type}
                  </span>
                </div>

                <p className="product-price">{product.price} LKR</p>
                <div className="product-actions">
                  <button className="btn btn-outline">Buy Now</button>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}

          {!loadingProducts && filteredProducts.length === 0 && (
            <p>No products found.</p>
          )}
        </div>
      </section>

      <ProductGridSection />
      <ArtisanStoriesSection />

      <Link to="/marketplace/paymentCart" className="floating-cart-button">
        <img src="/cart-icon.svg" alt="Cart" className="floating-cart-icon" />
      </Link>
    </div>
  );
}

export default MarketplaceHomepage;
