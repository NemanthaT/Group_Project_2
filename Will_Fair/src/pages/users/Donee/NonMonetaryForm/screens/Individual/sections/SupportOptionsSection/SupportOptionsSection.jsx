import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

export const SupportOptionsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Education",
    "Healthcare", 
    "Food & Nutrition",
    "Housing",
    "Emergency Relief",
    "Community Development"
  ];

  return (
    <section className="w-full my-6">
      <label className="form-label">
        Category
      </label>

      <div className="select-container">
        <button 
          className="select-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span style={{ color: selectedCategory ? '#000' : 'rgba(0, 0, 0, 0.6)' }}>
            {selectedCategory || "Select a category"}
          </span>
          <ChevronDownIcon size={24} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
            {categories.map((category) => (
              <button
                key={category}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};