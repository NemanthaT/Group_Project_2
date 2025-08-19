import React, { useState, useMemo } from "react";

const allProductsData = [
  {
    id: 1,
    title: "Very Nice Beautiful Asa Hithena Smart Jewelry",
    price: "Rs. 2,000",
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "jewelry",
    seller: "Artisan Collective",
    status: "pending",
    submittedDate: "2024-01-15",
    description: "Traditional handcrafted jewelry with modern design elements"
  },
  {
    id: 2,
    title: "Elegant Gold Ring with Diamond",
    price: "Rs. 5,000",
    image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "jewelry",
    seller: "Gold Smiths Ltd",
    status: "approved",
    submittedDate: "2024-01-14",
    description: "Premium gold ring with authentic diamond setting"
  },
  {
    id: 3,
    title: "Silver Necklace with Pearl",
    price: "Rs. 3,500",
    image: "https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "jewelry",
    seller: "Pearl Crafters",
    status: "pending",
    submittedDate: "2024-01-13",
    description: "Elegant silver necklace with natural pearls"
  },
  {
    id: 4,
    title: "Smart Watch with Health Monitoring",
    price: "Rs. 8,000",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "electronics",
    seller: "Tech Solutions",
    status: "declined",
    submittedDate: "2024-01-12",
    description: "Advanced smartwatch with comprehensive health tracking"
  },
  {
    id: 5,
    title: "Beautiful Earrings Set",
    price: "Rs. 1,500",
    image: "https://images.pexels.com/photos/1191537/pexels-photo-1191537.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "jewelry",
    seller: "Fashion Jewelry Co",
    status: "approved",
    submittedDate: "2024-01-11",
    description: "Stunning earrings set perfect for special occasions"
  },
  {
    id: 6,
    title: "Luxury Bracelet Collection",
    price: "Rs. 4,200",
    image: "https://images.pexels.com/photos/1191538/pexels-photo-1191538.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "jewelry",
    seller: "Luxury Accessories",
    status: "pending",
    submittedDate: "2024-01-10",
    description: "Premium bracelet collection with intricate designs"
  }
];

const ProductReviewPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredProducts = useMemo(() => {
    return allProductsData.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'declined': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleApprove = (id) => {
    console.log(`Approving product with ID: ${id}`);
  };

  const handleDecline = (id) => {
    console.log(`Declining product with ID: ${id}`);
  };

  const handleView = (id) => {
    console.log(`Viewing product with ID: ${id}`);
  };

  const statsCards = [
    { value: filteredProducts.filter(p => p.status === 'pending').length, label: 'Pending Reviews', icon: '⏳', color: '#f59e0b' },
    { value: filteredProducts.filter(p => p.status === 'approved').length, label: 'Approved Products', icon: '✅', color: '#10b981' },
    { value: filteredProducts.filter(p => p.status === 'declined').length, label: 'Declined Products', icon: '❌', color: '#ef4444' },
    { value: filteredProducts.length, label: 'Total Products', icon: '📦', color: '#3b82f6' }
  ];

  return (
    <div className="authmanager-dashboard-content">
      {/* Welcome Section */}
      <div className="authmanager-welcome-section">
        <div className="authmanager-welcome-content">
          <h2>Product Reviews</h2>
          <p>Review and manage product submissions from sellers</p>
        </div>
        <div className="authmanager-quick-actions">
          <button className="authmanager-quick-action-btn authmanager-primary">Bulk Actions</button>
          <button className="authmanager-quick-action-btn authmanager-secondary">Export Data</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="authmanager-stats-grid">
        {statsCards.map((card, index) => (
          <div key={index} className="authmanager-stat-card">
            <div className="authmanager-stat-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
              {card.icon}
            </div>
            <div className="authmanager-stat-info">
              <div className="authmanager-stat-value">{card.value}</div>
              <div className="authmanager-stat-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="authmanager-table-section">
        <div className="authmanager-section-header">
          <h3>Product Submissions</h3>
          <div className="authmanager-table-actions">
            <div className="authmanager-search-box">
              <input 
                type="text" 
                placeholder="Search products or sellers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="authmanager-search-icon">🔍</span>
            </div>
            <select 
              className="authmanager-filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="jewelry">Jewelry</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
            </select>
            <select 
              className="authmanager-filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="authmanager-table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Seller</th>
                <th>Category</th>
                <th>Price</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="authmanager-product-cell">
                      <img src={product.image} alt={product.title} className="authmanager-product-image" />
                      <div className="authmanager-product-info">
                        <div className="authmanager-product-title">{product.title}</div>
                        <div className="authmanager-product-description">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product.seller}</td>
                  <td>
                    <span className="authmanager-category-badge">{product.category}</span>
                  </td>
                  <td className="authmanager-price-cell">{product.price}</td>
                  <td>{product.submittedDate}</td>
                  <td>
                    <span className="authmanager-status-badge" style={{ backgroundColor: getStatusColor(product.status) }}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="authmanager-action-buttons">
                      <button className="authmanager-action-btn authmanager-view" title="View Details" onClick={() => handleView(product.id)}>👁️</button>
                      {product.status === 'pending' && (
                        <>
                          <button className="authmanager-action-btn authmanager-approve" title="Approve" onClick={() => handleApprove(product.id)}>✅</button>
                          <button className="authmanager-action-btn authmanager-decline" title="Decline" onClick={() => handleDecline(product.id)}>❌</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Cards View (Alternative) */}
      <div className="authmanager-cards-section" style={{ display: 'none' }}>
        <div className="authmanager-product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="authmanager-product-card">
              <div className="authmanager-product-image-container">
                <img src={product.image} alt={product.title} />
                <span className="authmanager-status-badge" style={{ backgroundColor: getStatusColor(product.status) }}>
                  {product.status}
                </span>
              </div>
              <div className="authmanager-product-card-content">
                <h4 className="authmanager-product-card-title">{product.title}</h4>
                <p className="authmanager-product-card-description">{product.description}</p>
                <div className="authmanager-product-card-meta">
                  <span className="authmanager-product-price">{product.price}</span>
                  <span className="authmanager-product-seller">by {product.seller}</span>
                </div>
                <div className="authmanager-product-card-actions">
                  <button className="authmanager-card-action-btn authmanager-view" onClick={() => handleView(product.id)}>View</button>
                  {product.status === 'pending' && (
                    <>
                      <button className="authmanager-card-action-btn authmanager-approve" onClick={() => handleApprove(product.id)}>Approve</button>
                      <button className="authmanager-card-action-btn authmanager-decline" onClick={() => handleDecline(product.id)}>Decline</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewPage;