import React from "react";
import "../MarketPlace.css";

export function ProductSearchResultsSection({
    results,
    loading,
    error,
    searchTerm,
    sortOrder,
    onSortChange,
    onProductClick,
}) {
    return (
        <section className="products-section search-active">
            <div className="search-results-header products-grid-header">
                <h2 className="section-title">
                    Search Results{searchTerm ? ` for "${searchTerm}"` : ""}
                </h2>
                <div className="sort-container">
                    <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                    <select
                        id="sort-select"
                        value={sortOrder}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="search-sort-select"
                    >
                        <option value="price_asc">Price: Low → High</option>
                        <option value="price_desc">Price: High → Low</option>
                    </select>
                </div>
            </div>

            {loading && <p>Searching...</p>}
            {error && <p className="error-text">{error}</p>}
            {!loading && !error && results.length === 0 && (
                <p>No products match your search.</p>
            )}

            <div className="products-grid">
                {results.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => onProductClick(product)}
                        style={{ cursor: "pointer" }}
                    >
                        <div>
                            <img
                                className="product-image"
                                alt={product.title}
                                src={product.image}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://images.pexels.com/photos/6461513/pexels-photo-6461513.jpeg";
                                }}
                            />
                        </div>
                        <div className="product-content">
                            <div className="product-header">
                                <p className="product-title">{product.title}</p>
                                <span
                                    className={`product-type-badge ${product.type
                                        ?.toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                >
                                    {product.type}
                                </span>
                            </div>
                            <p className="product-price">{product.price} LKR</p>
                            <div className="product-actions">
                                <button className="btn btn-outline">Buy Now</button>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
