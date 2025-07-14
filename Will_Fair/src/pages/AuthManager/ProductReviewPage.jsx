import React, { useState, useMemo } from "react";
import { ProductCard } from "./components/ProductCard.jsx";

const ProductReviewPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allProducts = [
    {
      id: 1,
      title: "Very Nice Beautiful Asa Hithena Smart Jewelry",
      price: "Rs: 2000",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 2,
      title: "Elegant Gold Ring with Diamond",
      price: "Rs: 5000",
      image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 3,
      title: "Silver Necklace with Pearl",
      price: "Rs: 3500",
      image: "https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 4,
      title: "Smart Watch with Health Monitoring",
      price: "Rs: 8000",
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "electronics"
    },
    {
      id: 5,
      title: "Beautiful Earrings Set",
      price: "Rs: 1500",
      image: "https://images.pexels.com/photos/1191537/pexels-photo-1191537.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 6,
      title: "Luxury Bracelet Collection",
      price: "Rs: 4200",
      image: "https://images.pexels.com/photos/1191538/pexels-photo-1191538.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 7,
      title: "Designer Ring with Gemstone",
      price: "Rs: 6500",
      image: "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 8,
      title: "Traditional Jewelry Set",
      price: "Rs: 7800",
      image: "https://images.pexels.com/photos/1191539/pexels-photo-1191539.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 9,
      title: "Rose Gold Wedding Ring",
      price: "Rs: 4500",
      image: "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 10,
      title: "Vintage Pocket Watch",
      price: "Rs: 3200",
      image: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "accessories"
    },
    {
      id: 11,
      title: "Crystal Pendant Necklace",
      price: "Rs: 2800",
      image: "https://images.pexels.com/photos/1191540/pexels-photo-1191540.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    },
    {
      id: 12,
      title: "Luxury Diamond Earrings",
      price: "Rs: 9500",
      image: "https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "jewelry"
    }
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="content">
      <h1 className="page-title">Product Reviews</h1>

      <div className="search-filter-section">
        <div className="search-container">
          <input
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img className="search-icon" alt="Search" src="/search.svg" />
        </div>

        <button className="filter-btn">
          Filter
          <img
            className="filter-icon"
            alt="Dropdown"
            src="/dropdown-arrow-svgrepo-com-1.svg"
          />
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviewPage;