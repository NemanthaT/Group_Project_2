import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryBrowseSection } from "./sections/CategoryBrowseSection";
import { ProductGridSection } from "./sections/ProductGridSection";
import { ArtisanStoriesSection } from "./sections/ArtisanStoriesSection";
import { ProductSearchResultsSection } from "./sections/ProductSearchResultsSection";
import "./MarketPlace.css";

function MarketplaceHomepage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState("price_asc");
  const API_BASE = "http://localhost:5000";

  // Load categories
  useEffect(() => {
    setLoadingCategories(true);
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoadingCategories(false));
  }, []);

  // Load products by category (when no search)
  useEffect(() => {
    if (searchTerm.trim() !== "") return;
    setLoadingProducts(true);
    const url = selectedCategory
      ? `${API_BASE}/products?category=${encodeURIComponent(selectedCategory)}`
      : `${API_BASE}/products`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setRecentProducts(data.map(normalizeProductFromApi)))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoadingProducts(false));
  }, [selectedCategory, searchTerm]);

  // Search (debounced)
  useEffect(() => {
    const term = searchTerm.trim();
    if (term === "") {
      setSearchResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      setLoadingSearch(true);
      fetch(
        `${API_BASE}/products?search=${encodeURIComponent(term)}&sort=${sortOrder}`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data.map(normalizeProductFromApi)))
        .catch(() => setError("Failed to search products"))
        .finally(() => setLoadingSearch(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, sortOrder]);

  function normalizeProductFromApi(p) {
    const price = typeof p.price === "string" ? parseFloat(p.price) : p.price;
    const image =
      p.image && !p.image.startsWith("http")
        ? `/images/products/${p.image}`
        : p.image || "/placeholder-product.jpg";
    return { ...p, price, image, heartIcon: "/heart-svgrepo-com--1--1.svg" };
  }

  const handleProductClick = useCallback(
    (product) => {
      navigate(`/marketplace/product?id=${product.id}`, { state: { productId: product.id } });
    },
    [navigate]
  );

  return (
    <div className="marketplace-homepage">
      {/* Hero Section */}
      <section className="hero-section marketplace-hero">
        <img
          className="hero-background"
          alt="Hero background"
          src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1200"
        />
        <div className="hero-content marketplace-hero-content">
          <h1 className="hero-title">What are you Looking for?</h1>

          <div className="search-bar-wrapper">
            <input
              type="text"
              className="search-bar-input"
              placeholder="Search for handcrafted products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Search Results OR Default Sections */}
      {searchTerm.trim() !== "" ? (
        <ProductSearchResultsSection
          results={searchResults}
          loading={loadingSearch}
          error={error}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onProductClick={handleProductClick}
        />
      ) : (
        <>
          <CategoryBrowseSection
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            categories={categories}
            loading={loadingCategories}
          />

          <section className="products-section">
            <h2 className="section-title">
              {selectedCategory ? `${selectedCategory} Products` : "Recent Products"}
            </h2>
            {loadingProducts && <p>Loading products...</p>}
            {error && <p className="error-text">{error}</p>}

            <div className="products-grid">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                className="product-image"
                alt={product.title}
                src={product.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.pexels.com/photos/6461513/pexels-photo-6461513.jpeg";
                }}
              />
                  <div className="product-content">
                    <div className="product-header">
                      <p className="product-title">{product.title}</p>
                      <span
                        className={`product-type-badge ${product.type
                          ?.toLowerCase()
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
              {!loadingProducts && recentProducts.length === 0 && <p>No products found.</p>}
            </div>
          </section>

          <ProductGridSection />
          <ArtisanStoriesSection />
        </>
      )}
    </div>
  );
}

export default MarketplaceHomepage;
