import React from "react";

export const RequestImageSection = () => {
  return (
    <section className="form-section">
      <h2 className="section-title">
        Request Image (optional)
      </h2>

      <div className="image-upload-card">
        <button className="choose-file-button">
          Choose file
        </button>
      </div>
    </section>
  );
};