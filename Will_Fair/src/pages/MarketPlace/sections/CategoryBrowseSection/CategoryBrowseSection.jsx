import React from "react";

export const CategoryBrowseSection = () => {
  const categories = [
    {
      name: "Textiles",
      image: "https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Handicraft",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Jewelry",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Home Decor",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  return (
    <section className="category-section">
      <div className="container">
        <h2 className="section-title">
          Browse By Category
        </h2>

        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <img
                className="category-image"
                alt={category.name}
                src={category.image}
              />
              <div className="category-overlay" />
              <div className="category-name">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};