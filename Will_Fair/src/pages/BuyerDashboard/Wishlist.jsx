import { useState } from "react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Traditional Handloom Saree',
      price: 2500,
      originalPrice: 3000,
      image: '🥻',
      seller: 'Heritage Weaves',
      rating: 4.8,
      inStock: true,
      discount: 17,
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Antique Brass Lamp',
      price: 1200,
      originalPrice: 1200,
      image: '🪔',
      seller: 'Antique Collection',
      rating: 4.6,
      inStock: true,
      discount: 0,
      addedDate: '2024-01-12'
    },
    {
      id: 3,
      name: 'Handcrafted Wooden Box',
      price: 800,
      originalPrice: 950,
      image: '📦',
      seller: 'Wood Artisans',
      rating: 4.9,
      inStock: false,
      discount: 16,
      addedDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Embroidered Silk Cushion',
      price: 450,
      originalPrice: 600,
      image: '🛏️',
      seller: 'Textile Paradise',
      rating: 4.5,
      inStock: true,
      discount: 25,
      addedDate: '2024-01-08'
    },
    {
      id: 5,
      name: 'Ceramic Tea Set',
      price: 1500,
      originalPrice: 1800,
      image: '🍵',
      seller: 'Pottery Works',
      rating: 4.7,
      inStock: true,
      discount: 17,
      addedDate: '2024-01-05'
    },
    {
      id: 6,
      name: 'Hand-painted Wall Art',
      price: 2200,
      originalPrice: 2200,
      image: '🖼️',
      seller: 'Art Gallery',
      rating: 4.9,
      inStock: true,
      discount: 0,
      addedDate: '2024-01-03'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('date-added');
  const [filterBy, setFilterBy] = useState('all');

  const removeFromWishlist = (itemId) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
    setSelectedItems(selected => selected.filter(id => id !== itemId));
  };

  const moveToCart = (itemId) => {
    const item = wishlistItems.find(item => item.id === itemId);
    if (item && item.inStock) {
      // Add to cart logic here
      console.log('Moving to cart:', item.name);
      // Optionally remove from wishlist after adding to cart
      // removeFromWishlist(itemId);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const removeSelectedItems = () => {
    if (selectedItems.length > 0 && window.confirm(`Remove ${selectedItems.length} items from wishlist?`)) {
      setWishlistItems(items => items.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const moveSelectedToCart = () => {
    const availableItems = wishlistItems.filter(item => 
      selectedItems.includes(item.id) && item.inStock
    );
    
    if (availableItems.length > 0) {
      console.log('Moving to cart:', availableItems.map(item => item.name));
      // Add cart logic here
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '⭐' : '');
  };

  const filteredAndSortedItems = wishlistItems
    .filter(item => {
      if (filterBy === 'in-stock') return item.inStock;
      if (filterBy === 'out-of-stock') return !item.inStock;
      if (filterBy === 'on-sale') return item.discount > 0;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'date-added': 
        default: return new Date(b.addedDate) - new Date(a.addedDate);
      }
    });

  return (
    <div className="buyer-wishlist-content">
      <div className="buyer-content-header">
        <h1>My Wishlist</h1>
        <p className="buyer-subtitle">Items you've saved for later</p>
      </div>

      {/* Wishlist Stats */}
      <div className="buyer-wishlist-stats">
        <div className="buyer-stat-item">
          <span className="buyer-stat-number">{wishlistItems.length}</span>
          <span className="buyer-stat-label">Total Items</span>
        </div>
        <div className="buyer-stat-item">
          <span className="buyer-stat-number">{wishlistItems.filter(item => item.inStock).length}</span>
          <span className="buyer-stat-label">In Stock</span>
        </div>
        <div className="buyer-stat-item">
          <span className="buyer-stat-number">{wishlistItems.filter(item => item.discount > 0).length}</span>
          <span className="buyer-stat-label">On Sale</span>
        </div>
        <div className="buyer-stat-item">
          <span className="buyer-stat-number">
            Rs. {wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
          </span>
          <span className="buyer-stat-label">Total Value</span>
        </div>
      </div>

      {/* Controls */}
      <div className="buyer-wishlist-controls">
        <div className="buyer-controls-left">
          <div className="buyer-select-controls">
            <input
              type="checkbox"
              checked={selectedItems.length === wishlistItems.length && wishlistItems.length > 0}
              onChange={handleSelectAll}
              className="buyer-select-all-checkbox"
            />
            <label>Select All ({selectedItems.length})</label>
          </div>
          
          {selectedItems.length > 0 && (
            <div className="buyer-bulk-actions">
              <button 
                className="buyer-bulk-action-btn buyer-move-to-cart"
                onClick={moveSelectedToCart}
              >
                Move to Cart ({selectedItems.length})
              </button>
              <button 
                className="buyer-bulk-action-btn buyer-remove-items"
                onClick={removeSelectedItems}
              >
                Remove ({selectedItems.length})
              </button>
            </div>
          )}
        </div>

        <div className="buyer-controls-right">
          <div className="buyer-filter-group">
            <label>Filter:</label>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="buyer-filter-select"
            >
              <option value="all">All Items</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="on-sale">On Sale</option>
            </select>
          </div>
          
          <div className="buyer-sort-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="buyer-sort-select"
            >
              <option value="date-added">Date Added</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="buyer-wishlist-grid">
        {filteredAndSortedItems.length === 0 ? (
          <div className="buyer-empty-wishlist">
            <div className="buyer-empty-icon">💝</div>
            <h3>Your wishlist is empty</h3>
            <p>Browse products and add items you love to your wishlist!</p>
            <button 
              className="buyer-browse-btn"
              onClick={() => window.location.href = '/marketplace'}
            >
              Browse Products
            </button>
          </div>
        ) : (
          filteredAndSortedItems.map((item) => (
            <div key={item.id} className={`buyer-wishlist-item ${!item.inStock ? 'out-of-stock' : ''}`}>
              <div className="buyer-item-checkbox">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </div>
              
              <div className="buyer-item-image">
                {item.image}
                {item.discount > 0 && (
                  <span className="buyer-discount-badge">-{item.discount}%</span>
                )}
                {!item.inStock && (
                  <div className="buyer-out-of-stock-overlay">Out of Stock</div>
                )}
              </div>
              
              <div className="buyer-item-details">
                <h3 className="buyer-item-name">{item.name}</h3>
                <p className="buyer-item-seller">by {item.seller}</p>
                
                <div className="buyer-item-rating">
                  {renderStars(item.rating)}
                  <span className="buyer-rating-number">({item.rating})</span>
                </div>
                
                <div className="buyer-item-price">
                  <span className="buyer-current-price">Rs. {item.price.toLocaleString()}</span>
                  {item.originalPrice !== item.price && (
                    <span className="buyer-original-price">Rs. {item.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <p className="buyer-added-date">Added on {item.addedDate}</p>
              </div>
              
              <div className="buyer-item-actions">
                <button 
                  className={`buyer-action-btn buyer-add-to-cart ${!item.inStock ? 'disabled' : ''}`}
                  onClick={() => moveToCart(item.id)}
                  disabled={!item.inStock}
                >
                  {item.inStock ? 'Add to Cart' : 'Notify Me'}
                </button>
                
                <button 
                  className="buyer-action-btn buyer-remove"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
                
                <button className="buyer-action-btn buyer-view-details">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Continue Shopping */}
      <div className="buyer-continue-shopping">
        <h3>Continue Shopping</h3>
        <p>Discover more amazing products from our artisans</p>
        <button 
          className="buyer-continue-btn"
          onClick={() => window.location.href = '/marketplace'}
        >
          Browse Marketplace
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
