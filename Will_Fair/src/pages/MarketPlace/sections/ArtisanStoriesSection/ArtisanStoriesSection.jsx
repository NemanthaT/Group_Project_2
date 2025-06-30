import React from "react";

export const ArtisanStoriesSection = () => {
  // How it Works cards data
  const howItWorksCards = [
    {
      icon: (
        <svg width="50" height="50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <circle cx="12" cy="16" r="1"></circle>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      title: "Shop Products",
      description:
        "Browse and purchase unique handcrafted products made by artisans with disabilities",
    },
    {
      icon: (
        <img
          width="50"
          height="50"
          alt="Delivery"
          src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=50"
        />
      ),
      title: "Fast Delivery",
      description:
        "We deliver your purchases directly to your doorstep anywhere in Sri Lanka",
    },
    {
      icon: (
        <svg width="50" height="50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      title: "Support Artisans",
      description:
        "Your purchase directly supports artisans with disabilities, helping them achieve financial independence",
    },
  ];

  // Impact cards data
  const impactCards = [
    {
      title: "10 +",
      subtitle: "Products Available",
      description: "Handicraft with care",
    },
    {
      title: "Rs.17,900 +",
      subtitle: "Income Generated",
      description: "For artisans and their families",
    },
    {
      title: "100%",
      subtitle: "Fair Trade",
      description: "Ethical practices guaranteed",
    },
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        {/* How it Works Section */}
        <div>
          <h2 className="section-title">
            How it Works
          </h2>

          <div className="how-it-works-grid">
            {howItWorksCards.map((card, index) => (
              <div key={`how-it-works-${index}`} className="how-it-works-card">
                <div className="how-it-works-icon">
                  {card.icon}
                </div>
                <h3 className="how-it-works-title">
                  {card.title}
                </h3>
                <p className="how-it-works-description">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Impact Section */}
        <div className="impact-section">
          <h2 className="section-title">
            Our Impact
          </h2>

          <div className="impact-grid">
            {impactCards.map((card, index) => (
              <div key={`impact-${index}`} className="impact-card">
                <h3 className="impact-number">
                  {card.title}
                </h3>
                <h4 className="impact-subtitle">
                  {card.subtitle}
                </h4>
                <p className="impact-description">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};