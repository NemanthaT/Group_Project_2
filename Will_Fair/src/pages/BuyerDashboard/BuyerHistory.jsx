import { useState } from "react";

const BuyerHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all-time');
  const itemsPerPage = 10;

  // Mock data for purchase statistics
  const monthlySpending = [
    { month: 'Jan 2024', amount: 12500, orders: 8 },
    { month: 'Feb 2024', amount: 15800, orders: 12 },
    { month: 'Mar 2024', amount: 9200, orders: 6 },
    { month: 'Apr 2024', amount: 18900, orders: 15 },
    { month: 'May 2024', amount: 22100, orders: 18 },
    { month: 'Jun 2024', amount: 16500, orders: 11 }
  ];

  // Mock data for purchases
  const allPurchases = [
    { id: 'PUR001', date: '2024-06-15', items: ['Handloom Saree', 'Cotton Scarf'], amount: 3200, status: 'Delivered', seller: 'Traditional Crafts', rating: 5 },
    { id: 'PUR002', date: '2024-06-12', items: ['Beaded Necklace'], amount: 350, status: 'Delivered', seller: 'Jewelry Corner', rating: 4 },
    { id: 'PUR003', date: '2024-06-10', items: ['Flower Vase', 'Wall Art'], amount: 1365, status: 'Delivered', seller: 'Home Decor Plus', rating: 5 },
    { id: 'PUR004', date: '2024-06-08', items: ['Summer Kurta'], amount: 900, status: 'Delivered', seller: 'Fashion Hub', rating: 4 },
    { id: 'PUR005', date: '2024-06-05', items: ['Dried Flower Art'], amount: 250, status: 'Delivered', seller: 'Art Gallery', rating: 5 },
    { id: 'PUR006', date: '2024-06-02', items: ['Printed Shirt', 'Cotton Pants'], amount: 1200, status: 'Delivered', seller: 'Clothing Store', rating: 3 },
    { id: 'PUR007', date: '2024-05-28', items: ['Ceramic Bowl'], amount: 450, status: 'Delivered', seller: 'Pottery Works', rating: 4 },
    { id: 'PUR008', date: '2024-05-25', items: ['Embroidered Bag'], amount: 650, status: 'Delivered', seller: 'Handicrafts', rating: 5 },
    { id: 'PUR009', date: '2024-05-22', items: ['Wooden Sculpture'], amount: 1800, status: 'Delivered', seller: 'Wood Works', rating: 4 },
    { id: 'PUR010', date: '2024-05-18', items: ['Silk Dupatta'], amount: 850, status: 'Delivered', seller: 'Silk House', rating: 5 },
    { id: 'PUR011', date: '2024-05-15', items: ['Bamboo Basket'], amount: 300, status: 'Delivered', seller: 'Eco Crafts', rating: 4 },
    { id: 'PUR012', date: '2024-05-12', items: ['Handmade Soap Set'], amount: 400, status: 'Delivered', seller: 'Natural Products', rating: 5 },
    { id: 'PUR013', date: '2024-05-08', items: ['Traditional Lamp'], amount: 750, status: 'Delivered', seller: 'Heritage Crafts', rating: 4 },
    { id: 'PUR014', date: '2024-05-05', items: ['Embroidered Cushion'], amount: 550, status: 'Delivered', seller: 'Home Textiles', rating: 3 },
    { id: 'PUR015', date: '2024-05-02', items: ['Clay Pot'], amount: 200, status: 'Delivered', seller: 'Pottery Corner', rating: 5 }
  ];

  const myReviews = [
    { id: 1, product: 'Handloom Saree', rating: 5, review: 'Excellent quality and beautiful design. Highly recommended!', date: '2024-06-16' },
    { id: 2, product: 'Beaded Necklace', rating: 4, review: 'Good quality but delivery was a bit slow.', date: '2024-06-13' },
    { id: 3, product: 'Flower Vase', rating: 5, review: 'Perfect for my home decor. Very satisfied with the purchase.', date: '2024-06-11' },
    { id: 4, product: 'Summer Kurta', rating: 4, review: 'Comfortable fabric and good fit.', date: '2024-06-09' }
  ];

  const totalPages = Math.ceil(allPurchases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPurchases = allPurchases.slice(startIndex, startIndex + itemsPerPage);

  const totalSpent = allPurchases.reduce((sum, purchase) => sum + purchase.amount, 0);
  const averageOrderValue = totalSpent / allPurchases.length;
  const totalOrders = allPurchases.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="buyer-history-content">
      <div className="buyer-content-header">
        <h1>Purchase History</h1>
        <p className="buyer-subtitle">Track your spending and review past purchases</p>
      </div>

      {/* Statistics Section */}
      <div className="buyer-stats-section">
        <div className="buyer-stats-cards">
          <div className="buyer-stat-card">
            <div className="buyer-stat-icon">💰</div>
            <div className="buyer-stat-details">
              <h3>Rs. {totalSpent.toLocaleString()}</h3>
              <p>Total Spent</p>
            </div>
          </div>
          <div className="buyer-stat-card">
            <div className="buyer-stat-icon">📦</div>
            <div className="buyer-stat-details">
              <h3>{totalOrders}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="buyer-stat-card">
            <div className="buyer-stat-icon">📊</div>
            <div className="buyer-stat-details">
              <h3>Rs. {Math.round(averageOrderValue).toLocaleString()}</h3>
              <p>Average Order Value</p>
            </div>
          </div>
          <div className="buyer-stat-card">
            <div className="buyer-stat-icon">⭐</div>
            <div className="buyer-stat-details">
              <h3>4.3</h3>
              <p>Average Rating Given</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Spending Chart */}
      <div className="buyer-chart-section">
        <h3>Monthly Spending</h3>
        <div className="buyer-chart-container">
          {monthlySpending.map((month, index) => (
            <div key={index} className="buyer-chart-bar">
              <div 
                className="buyer-bar" 
                style={{ height: `${(month.amount / 25000) * 100}%` }}
                title={`${month.month}: Rs. ${month.amount.toLocaleString()}`}
              ></div>
              <span className="buyer-chart-label">{month.month.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="buyer-filters-section">
        <div className="buyer-filters-left">
          <div className="buyer-filter-group">
            <label>Filter by Status:</label>
            <select 
              value={selectedFilter} 
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="buyer-filter-select"
            >
              <option value="all">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
            </select>
          </div>
          <div className="buyer-filter-group">
            <label>Date Range:</label>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="buyer-filter-select"
            >
              <option value="all-time">All Time</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Purchase History Table */}
      <div className="buyer-history-table">
        <div className="buyer-table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Seller</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="buyer-order-id">{purchase.id}</td>
                  <td className="buyer-date">{purchase.date}</td>
                  <td className="buyer-items">
                    <div className="buyer-items-list">
                      {purchase.items.map((item, index) => (
                        <span key={index} className="buyer-item">{item}</span>
                      ))}
                    </div>
                  </td>
                  <td className="buyer-seller">{purchase.seller}</td>
                  <td className="buyer-amount">Rs. {purchase.amount.toLocaleString()}</td>
                  <td>
                    <span className={`buyer-status buyer-status-${purchase.status.toLowerCase()}`}>
                      {purchase.status}
                    </span>
                  </td>
                  <td className="buyer-rating">{renderStars(purchase.rating)}</td>
                  <td className="buyer-actions">
                    <button className="buyer-action-btn buyer-view-btn">View</button>
                    <button className="buyer-action-btn buyer-reorder-btn">Reorder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="buyer-pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="buyer-pagination-btn"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`buyer-pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="buyer-pagination-btn"
          >
            Next
          </button>
        </div>
      </div>

      {/* My Reviews Section */}
      <div className="buyer-reviews-section">
        <h3>My Reviews</h3>
        <div className="buyer-reviews-grid">
          {myReviews.map((review) => (
            <div key={review.id} className="buyer-review-card">
              <div className="buyer-review-header">
                <h4>{review.product}</h4>
                <span className="buyer-review-date">{review.date}</span>
              </div>
              <div className="buyer-review-rating">{renderStars(review.rating)}</div>
              <p className="buyer-review-text">{review.review}</p>
              <div className="buyer-review-actions">
                <button className="buyer-edit-review-btn">Edit Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerHistory;
