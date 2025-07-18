import React from "react";

export const MainContentWrapperSection = () => {
  return (
    <section className="file-upload-section">
      <div className="file-upload-header">
        <h1 className="section-title">
          Proof Documents
        </h1>

        <button className="choose-files-button">
          Choose files
        </button>
      </div>

      <div className="file-display">
        Documents
      </div>
    </section>
  );
};