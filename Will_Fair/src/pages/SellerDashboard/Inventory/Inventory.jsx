import React, { useState } from 'react';

const Inventory = () => {
  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>Inventory Dashboard</h2>
          <p>Manage your products and track stock levels</p>
        </div>
      </div>
      
      <InventoryStats />
      
      <div className="overview-grid">
        <TopSelling />
        <LowStockAlerts />
      </div>
      
      <AllInventory />
    </div>
  );
};

const InventoryStats = () => {
  const stats = [
    { icon: '📦', value: '10', label: 'Total Products', color: 'green', percentage: '+15%' },
    { icon: '🛒', value: '204', label: 'Total Sold', color: 'red', percentage: '+8%' },
    { icon: '⏳', value: '1', label: 'Pending', color: 'blue', percentage: '+0%' },
    { icon: '🗑️', value: '264', label: 'Low Stock', color: 'purple', percentage: '+5%' }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-info">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
          <div className="stat-trend" style={{ color: stat.percentage.startsWith('+') ? '#10b981' : '#ef4444' }}>{stat.percentage}</div>
        </div>
      ))}
    </div>
  );
};

const TopSelling = () => {
  const products = [
    { name: 'Scented Soap', sold: 23, stock: 23, status: 'active' },
    { name: 'Dried flower art', sold: 14, stock: 15, status: 'active' },
    { name: 'Wall art', sold: 8, stock: 12, status: 'active' },
    { name: 'Beaded bracelet', sold: 11, stock: 300, status: 'active' }
  ];

  return (
    <div className="overview-card">
      <div className="card-header">
        <h3>Top Selling Products</h3>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="card-content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Sold</th>
                <th>Current Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.sold}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`status-badge ${product.status}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view">👁️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LowStockAlerts = () => {
  const alerts = [
    { name: 'Handmade canoe', stock: 2, category: 'Crafting', status: 'low' }
  ];

  return (
    <div className="overview-card">
      <div className="card-header">
        <h3>Low Stock Alerts</h3>
        <button className="view-all-btn">Manage Stock</button>
      </div>
      <div className="card-content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, index) => (
                <tr key={index}>
                  <td>{alert.name}</td>
                  <td className="stock-warning">{alert.stock}</td>
                  <td>{alert.category}</td>
                  <td>
                    <button className="reorder-btn">Restock</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AllInventory = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  const inventory = [
    { id: 'PR031', name: 'Straw basket', category: 'Home', price: 2000.00, stock: 40, status: 'active', updated: '2023/07/02' },
    { id: 'PR032', name: 'Scented soap', category: 'Home', price: 100.00, stock: 23, status: 'active', updated: '2023/07/01' },
    { id: 'PR034', name: 'Boots', category: 'Stationery', price: 200.00, stock: 49, status: 'active', updated: '2023/07/03' },
    { id: 'PR035', name: 'Luxury golden toothbrush', category: 'Home', price: 1500.00, stock: 34, status: 'active', updated: '2023/07/04' },
    { id: 'PR036', name: 'Beaded bracelet', category: 'Jewelry', price: 210.00, stock: 300, status: 'active', updated: '2023/07/01' },
    { id: 'PR037', name: 'Flower vase', category: 'Home', price: 500.00, stock: 25, status: 'active', updated: '2023/06/12' },
    { id: 'PR038', name: 'Dried flower art', category: 'Home', price: 300.00, stock: 18, status: 'active', updated: '2023/06/12' },
    { id: 'PR039', name: 'Wall décor art', category: 'Home', price: 800.00, stock: 48, status: 'active', updated: '2023/06/12' },
    { id: 'PR040', name: 'Wall hanging pictures', category: 'Home', price: 1000.00, stock: 18, status: 'active', updated: '2023/06/23' },
    { id: 'PR041', name: 'Flower bouquet', category: 'Home', price: 120.00, stock: 0, status: 'out-of-stock', updated: '2023/05/26' },
    { id: 'PR042', name: 'Handmade canoe', category: 'Crafting', price: 4000.00, stock: 2, status: 'low-stock', updated: '2023/07/30' }
  ];

  const filteredInventory = inventory.filter(item => {
    const categoryMatch = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter;
    const stockMatch = stockFilter === 'all' || 
      (stockFilter === 'low' && item.stock < 10) ||
      (stockFilter === 'out' && item.stock === 0);
    return categoryMatch && stockMatch;
  });

  return (
    <div className="table-section">
      <div className="section-header">
        <h3>All Inventory</h3>
        <div className="table-actions">
          <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="home">Home</option>
            <option value="jewelry">Jewelry</option>
            <option value="stationery">Stationery</option>
            <option value="crafting">Crafting</option>
          </select>
          <select className="filter-select" value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
            <option value="all">Stock level</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
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
              <th>Last updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <div className="product-cell">
                    <div className="product-name">{item.name}</div>
                  </div>
                </td>
                <td>
                  <span className="category-badge">{item.category}</span>
                </td>
                <td className="price-cell">Rs. {item.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-indicator ${item.stock < 10 ? 'low' : 'good'}`}>
                    {item.stock}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status === 'out-of-stock' ? 'Out of Stock' : 
                     item.status === 'low-stock' ? 'Low Stock' : 'Active'}
                  </span>
                </td>
                <td>{item.updated}</td>
                <td>
                  <div className="action-buttons">
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
  );
};

export default Inventory;