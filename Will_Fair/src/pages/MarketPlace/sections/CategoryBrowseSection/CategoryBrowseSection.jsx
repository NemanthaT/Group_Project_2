import React from "react";

export const CategoryBrowseSection = ({ selectedCategory, onCategorySelect = () => { } }) => {
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
          {/* "All" button as first card */}
          <div
            className={`category-card all-category ${!selectedCategory ? "active" : ""}`}
            onClick={() => onCategorySelect(null)}
            role="button"
            tabIndex={0}
          >
            <img
  className="category-image"
  
  src="https://images.pexels.com/photos/33041565/pexels-photo-33041565.jpeg?_gl=1*dde6oo*_ga*NDYxNjUyODUyLjE3NTI5NDIyODc.*_ga_8JE65Q40S6*czE3NTI5NDIyODYkbzEkZzEkdDE3NTI5NDI3MzIkajQ0JGwwJGgw"
/>
<div className="category-overlay" />
<div className="category-name">All</div>

          </div>

          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-card ${selectedCategory === category.name ? "active" : ""}`}
              onClick={() => onCategorySelect(category.name)}
              role="button"
              tabIndex={0}
            >
              <img className="category-image" alt={category.name} src={category.image} />
              <div className="category-overlay" />
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};