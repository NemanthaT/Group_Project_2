import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

export const RequestDetailsSection = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const provinces = [
    "Alberta",
    "British Columbia", 
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan"
  ];

  return (
    <section className="w-full my-6">
      <label className="form-label">
        Province
      </label>

      <div className="select-container">
        <button 
          className="select-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span style={{ color: selectedProvince ? '#000' : 'rgba(0, 0, 0, 0.6)' }}>
            {selectedProvince || "Select province"}
          </span>
          <ChevronDownIcon size={24} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
            {provinces.map((province) => (
              <button
                key={province}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                onClick={() => {
                  setSelectedProvince(province);
                  setIsOpen(false);
                }}
              >
                {province}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};