import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryBrowseSection } from "./sections/CategoryBrowseSection";
import { ProductGridSection } from "./sections/ProductGridSection";
import { ArtisanStoriesSection } from "./sections/ArtisanStoriesSection";
import "./MarketPlace.css";

function MarketplaceHomepage() {
  const navigate = useNavigate();

  const recentProducts = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Handcrafted Ceramic Jewelry Set",
      price: "Rs: 2000",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Traditional Woven Basket",
      price: "Rs: 1500",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Embroidered Table Runner",
      price: "Rs: 2500",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Wooden Carved Decorative Bowl",
      price: "Rs: 1800",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Hand-painted Silk Scarf",
      price: "Rs: 3000",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Beaded Bracelet Collection",
      price: "Rs: 1200",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 7,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Macrame Wall Hanging",
      price: "Rs: 2200",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
    {
      id: 8,
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Clay Pottery Vase Set",
      price: "Rs: 2800",
      heartIcon: "/heart-svgrepo-com--1--1.svg",
    },
  ];

  const handleProductClick = (product) => {
    navigate("/marketplace/product", { state: { product } });
  };

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
          <div className="search-container">
            <div className="search-box">
              <input
                className="search-input"
                placeholder="Search for handcrafted products..."
                type="text"
              />
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <CategoryBrowseSection />

      {/* Recent Products Section */}
      <section className="products-section">
        <h2 className="section-title">Recent Products</h2>
        <div className="products-grid">
          {recentProducts.map((product) => (
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
                  <img className="heart-icon" alt="Heart icon" src={product.heartIcon} />
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
