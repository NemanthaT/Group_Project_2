import React from "react";

export const ProductGridSection = () => {
  // Data for artisan story cards
  const artisanStories = [
    {
      id: 1,
      content: "Creating beautiful handicrafts has given me purpose and independence. Every piece I make tells a story of resilience and hope.",
      artisan: "Artisan - Handicraft",
    },
    {
      id: 2,
      content: "Through this platform, I've been able to share my traditional weaving skills and support my family. It's more than just work - it's my passion.",
      artisan: "Artisan - Textiles",
    },
  ];

  return (
    <section className="artisan-stories-section">
      <div className="container">
        <h2 className="section-title">
          Artisan Stories
        </h2>

        <div>
          {artisanStories.map((story) => (
            <div key={story.id} className="story-card">
              <div>
                <p className="story-content">
                  "{story.content}"
                </p>
                <div>
                  <p className="story-author">
                    - {story.artisan}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};