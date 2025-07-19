import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryBrowseSection } from "./sections/CategoryBrowseSection";
import { ProductGridSection } from "./sections/ProductGridSection";
import { ArtisanStoriesSection } from "./sections/ArtisanStoriesSection";
import "./MarketPlace.css";

function MarketplaceHomepage() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const recentProducts = [
    {
      id: 1,
      title: "Handcrafted Ceramic Jewelry Set",
      description: "Beautifully crafted ceramic jewelry set with intricate patterns and vibrant colors.",
      price: "2000",
      quantity_available: 5,
      type: "Jewelry",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 2,
      title: "Traditional Woven Basket",
      description: "A sturdy hand-woven basket made from natural fibers, ideal for home storage or decor.",
      price: "1500",
      quantity_available: 8,
      type: "Handicraft",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 3,
      title: "Embroidered Table Runner",
      description: "Elegant table runner with hand-embroidered floral designs to enhance your dining table.",
      price: "2500",
      quantity_available: 3,
      type: "Textiles",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 4,
      title: "Wooden Carved Decorative Bowl",
      description: "A beautifully carved wooden bowl perfect as a centerpiece or for serving dry fruits.",
      price: "1800",
      quantity_available: 10,
      type: "Home Decor",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 5,
      title: "Hand-painted Silk Scarf",
      description: "Luxurious silk scarf with hand-painted traditional motifs and vibrant hues.",
      price: "3000",
      quantity_available: 6,
      type: "Textiles",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 6,
      title: "Beaded Bracelet Collection",
      description: "A set of colorful beaded bracelets that blend traditional and modern designs.",
      price: "1200",
      quantity_available: 12,
      type: "Jewelry",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 7,
      title: "Macrame Wall Hanging",
      description: "Handmade macrame wall hanging, adding a boho-chic touch to any living space.",
      price: "2200",
      quantity_available: 4,
      type: "Home Decor",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 8,
      title: "Clay Pottery Vase Set",
      description: "Set of handcrafted clay pottery vases with a rustic finish, perfect for flowers or decor.",
      price: "2500",
      quantity_available: 7,
      type: "Handicraft",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
  ];

  const filteredProducts = selectedCategory
    ? recentProducts.filter((p) => p.type === selectedCategory)
    : recentProducts;



  const handleProductClick = useCallback(
    (product) => {
      navigate("/marketplace/product", { state: { product } });
    },
    [navigate]
  );

  return (
    <div className="marketplace-homepage">
      {/* Hero Section with New Search Bar */}
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
            <button className="search-bar-button">
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
          </div>
        </div>
      </section>

      <CategoryBrowseSection
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Recent Products Section */}
      <section className="products-section">
        <h2 className="section-title">
          {selectedCategory ? `${selectedCategory} Products` : "Recent Products"}
        </h2>
        
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product)}
              style={{ cursor: "pointer" }}
            >
              <div>
                <img className="product-image" alt="Product" src={product.image} />
              </div>
              <div className="product-content">
                <div className="product-header">

                  <p className="product-title">{product.title}</p>
                  <span className={`product-type-badge ${product.type.toLowerCase()}`}>{product.type}</span>

                  {/* <img className="heart-icon" alt="Heart icon" src={product.heartIcon} /> */}
                </div>

                <p className="product-price">{product.price}</p>
                <div className="product-actions">
                  <button className="btn btn-outline">Buy Now</button>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProductGridSection />
      <ArtisanStoriesSection />
    </div>
  );
}

export default MarketplaceHomepage;
