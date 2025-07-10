import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import "./Marketplace.css";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const navigate = useNavigate();
  const goToMarket = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling
    });
    navigate("/marketplace");
  };
  return (
    <section className="section marketplace">
      <div className="container">
        <div className="marketplace-content">
          <div className="marketplace-text">
            <h2 className="section-title">Shop at Our Marketplace</h2>
            <p className="section-subtitle">
              Discover unique handcrafted products made by individuals with
              disabilities. Every purchase supports their independence and
              creativity while bringing beautiful artisanal items into your
              life.
            </p>

            <div className="marketplace-features">
              <div className="feature">
                <div className="feature-icon">✨</div>
                <span>Handcrafted with love</span>
              </div>
              <div className="feature">
                <div className="feature-icon">🎨</div>
                <span>Support local artisans</span>
              </div>
              <div className="feature">
                <div className="feature-icon">💝</div>
                <span>100% of proceeds go to creators</span>
              </div>
            </div>

            <button className="btn btn-primary" onClick={goToMarket}>
              <ShoppingBag className="icon" />
              Shop Now
              <ArrowRight className="icon" />
            </button>
          </div>

          <div className="marketplace-image">
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Diverse group of people crafting"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
