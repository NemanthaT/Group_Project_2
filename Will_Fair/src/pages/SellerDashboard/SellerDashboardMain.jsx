import React, { useState } from 'react';
import "./SellerDashboard.css";

const statsCards = [
  { value: '10', label: 'Total products', icon: '📦', color: '#22c55e', trend: '+5%' },
  { value: '204', label: 'Total orders', icon: '🛒', color: '#ef4444', trend: '+12%' },
  { value: 'Rs. 290,000', label: 'Total revenue', icon: '💰', color: '#3b82f6', trend: '+8%' },
  { value: '264', label: 'Stock status', icon: '🛍️', color: '#e879f9', trend: '-2%' }
];

const recentOrders = [
  { id: 'ORD32', customer: 'B T Mr. Saman', date: '2023/04/24', status: 'Pending', statusColor: '#f59e0b', amount: 'Rs. 2,300' },
  { id: 'ORD43', customer: 'J.S. Jayasena', date: '2023/05/07', status: 'Delivered', statusColor: '#10b981', amount: 'Rs. 900' },
  { id: 'ORD44', customer: 'K.A. Perera', date: '2023/05/08', status: 'Processing', statusColor: '#3b82f6', amount: 'Rs. 1,200' }
];

const lowStockProducts = [
  { product: 'Handloom saree', stock: 6, stockColor: '#ef4444', reorder: 'High Priority' },
  { product: 'Cotton fabric', stock: 23, stockColor: '#f59e0b', reorder: 'Medium Priority' },
  { product: 'Dried flower art', stock: 11, stockColor: '#f59e0b', reorder: 'Low Priority' }
];

const topProducts = [
  { name: 'Saree dupatta', sales: 45, revenue: 'Rs. 103,500' },
  { name: 'Beaded necklace', sales: 38, revenue: 'Rs. 13,300' },
  { name: 'Summertime kurta', sales: 29, revenue: 'Rs. 26,100' }
];

const products = [
  { id: 'PR01', name: 'Saree dupatta', price: 'Rs. 2300.00', stock: 63, status: 'Active', category: 'Clothing' },
  { id: 'PR02', name: 'Summertime kurta', price: 'Rs. 900.00', stock: 23, status: 'Active', category: 'Clothing' },
  { id: 'PR03', name: 'Shirts', price: 'Rs. 500.00', stock: 45, status: 'Active', category: 'Clothing' },
  { id: 'PR04', name: 'Saree - printed handloom', price: 'Rs. 1200.00', stock: 12, status: 'Active', category: 'Clothing' },
  { id: 'PR05', name: 'Beaded necklace', price: 'Rs. 350.00', stock: 200, status: 'Active', category: 'Jewelry' },
  { id: 'PR12', name: 'Flower vase', price: 'Rs. 565.00', stock: 45, status: 'Active', category: 'Home Decor' },
  { id: 'PR13', name: 'Dried flower art', price: 'Rs. 250.00', stock: 11, status: 'Active', category: 'Home Decor' },
  { id: 'PR14', name: 'Wall decor art', price: 'Rs. 800.00', stock: 84, status: 'Active', category: 'Home Decor' }
];

const SellerDashboardMain = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    status: 'Active',
    images: []
  });

  // Configure accepted file types (can be easily modified)
  const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const acceptedExtensions = ['.png', '.jpg', '.jpeg'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
  const maxFiles = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      // Check file type
      if (!acceptedFileTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Only PNG and JPG files are allowed.`);
        return;
      }

      // Check file size
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File too large. Maximum size is 5MB.`);
        return;
      }

      validFiles.push(file);
    });

    // Check total number of files
    const currentImages = productForm.images.length;
    if (currentImages + validFiles.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} images allowed. You can upload ${maxFiles - currentImages} more.`);
      return;
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // Add valid files to the form
    setProductForm(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));

    // Clear the input
    e.target.value = '';
  };

  const removeImage = (index) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Product submitted:', productForm);
    // Reset form and close modal
    setProductForm({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      status: 'Active',
      images: []
    });
    setShowAddProductForm(false);
  };

  const handleClose = () => {
    // Reset form and close modal
    setProductForm({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      status: 'Active',
      images: []
    });
    setShowAddProductForm(false);
  };

  return (
    <div className="dashboard-content">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome back, John!</h2>
          <p>Here's what's happening with your store today</p>
        </div>
        <div className="quick-actions">
          <button 
            className="quick-action-btn primary"
            onClick={() => setShowAddProductForm(true)}
          >
            Add Product
          </button>
          <button className="quick-action-btn secondary">View Orders</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statsCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
              {card.icon}
            </div>
            <div className="stat-info">
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
              <div className="stat-trend" style={{ color: card.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>
                {card.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="overview-grid">
        {/* Recent Orders */}
        <div className="overview-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="card-content">
            <div className="orders-list">
              {recentOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <div className="order-id">{order.id}</div>
                    <div className="customer-name">{order.customer}</div>
                    <div className="order-date">{order.date}</div>
                  </div>
                  <div className="order-details">
                    <div className="order-amount">{order.amount}</div>
                    <span className="status-badge" style={{ backgroundColor: order.statusColor }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="overview-card">
          <div className="card-header">
            <h3>Low Stock Alert</h3>
            <button className="view-all-btn">Manage Stock</button>
          </div>
          <div className="card-content">
            <div className="stock-list">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="stock-item">
                  <div className="stock-info">
                    <div className="product-name">{product.product}</div>
                    <div className="reorder-priority">{product.reorder}</div>
                  </div>
                  <div className="stock-details">
                    <div className="stock-count" style={{ color: product.stockColor }}>
                      {product.stock} left
                    </div>
                    <button className="reorder-btn">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="overview-card">
          <div className="card-header">
            <h3>Top Selling Products</h3>
            <button className="view-all-btn">View Reports</button>
          </div>
          <div className="card-content">
            <div className="products-list">
              {topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-sales">{product.sales} sales</div>
                  </div>
                  <div className="product-revenue">{product.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="table-section">
        <div className="section-header">
          <h3>Your Products</h3>
          <div className="table-actions">
            <div className="search-box">
              <input type="text" placeholder="Search products..." />
              <span className="search-icon">🔍</span>
            </div>
            <select className="filter-select">
              <option>All Categories</option>
              <option>Clothing</option>
              <option>Jewelry</option>
              <option>Home Decor</option>
            </select>
            <button 
              className="add-product-btn"
              onClick={() => setShowAddProductForm(true)}
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div className="product-cell">
                      <div className="product-name">{product.name}</div>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td className="price-cell">{product.price}</td>
                  <td>
                    <span className={`stock-indicator ${product.stock < 20 ? 'low' : 'good'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View">👁️</button>
                      <button className="action-btn edit" title="Edit">✏️</button>
                      <button className="action-btn delete" title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductForm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="modal-close-btn" onClick={handleClose}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="name"
                    value={productForm.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={productForm.category}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Art & Crafts">Art & Crafts</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price (Rs.)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productForm.price}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock Quantity</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={productForm.status}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Enter product description..."
                  rows="4"
                />
              </div>
              
              {/* Image Upload Section */}
              <div className="form-group full-width">
                <label htmlFor="images">Product Images</label>
                <div className="image-upload-container">
                  <div className="image-upload-dropzone">
                    <input
                      type="file"
                      id="images"
                      name="images"
                      accept={acceptedExtensions.join(',')}
                      onChange={handleImageUpload}
                      className="image-input"
                      multiple
                    />
                    <div className="upload-content">
                      <div className="upload-icon">📁</div>
                      <div className="upload-text">
                        <span>Click to upload images</span>
                        <small>PNG, JPG up to 5MB each (max {maxFiles} files)</small>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Preview Section */}
                  {productForm.images.length > 0 && (
                    <div className="image-preview-container">
                      <h4>Selected Images ({productForm.images.length}/{maxFiles})</h4>
                      <div className="image-preview-grid">
                        {productForm.images.map((file, index) => (
                          <div key={index} className="image-preview-item">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Preview ${index + 1}`}
                              className="preview-image"
                            />
                            <div className="image-info">
                              <span className="image-name">{file.name}</span>
                              <span className="image-size">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="remove-image-btn"
                              title="Remove image"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboardMain;