import React, { useState } from 'react';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const reviews = [
    {
      id: 'REV001',
      productName: 'Saree dupatta',
      productId: 'PR01',
      customerName: 'Amara Perera',
      email: 'amara.perera@gmail.com',
      rating: 5,
      reviewText: 'Beautiful quality saree dupatta! The fabric is excellent and the colors are vibrant. Highly recommend this seller.',
      date: '2024/07/15',
      status: 'Published',
      helpful: 12
    },
    {
      id: 'REV002',
      productName: 'Beaded necklace',
      productId: 'PR05',
      customerName: 'Nimal Silva',
      email: 'nimal.silva@yahoo.com',
      rating: 4,
      reviewText: 'Good quality necklace. The beadwork is intricate and well-crafted. Delivery was on time.',
      date: '2024/07/14',
      status: 'Published',
      helpful: 8
    },
    {
      id: 'REV003',
      productName: 'Handloom saree',
      productId: 'PR04',
      customerName: 'Kumari Fernando',
      email: 'kumari.fernando@hotmail.com',
      rating: 3,
      reviewText: 'The saree is okay but the color was slightly different from what was shown in the picture.',
      date: '2024/07/13',
      status: 'Pending',
      helpful: 3
    },
    {
      id: 'REV004',
      productName: 'Flower vase',
      productId: 'PR12',
      customerName: 'Rashika Jayawardena',
      email: 'rashika.jaya@gmail.com',
      rating: 5,
      reviewText: 'Absolutely love this vase! Perfect size and the craftsmanship is outstanding. Will definitely order again.',
      date: '2024/07/12',
      status: 'Published',
      helpful: 15
    },
    {
      id: 'REV005',
      productName: 'Wall decor art',
      productId: 'PR14',
      customerName: 'Sandun Wickramasinghe',
      email: 'sandun.w@outlook.com',
      rating: 2,
      reviewText: 'Not satisfied with the quality. The artwork had some damage when it arrived.',
      date: '2024/07/11',
      status: 'Flagged',
      helpful: 1
    },
    {
      id: 'REV006',
      productName: 'Dried flower art',
      productId: 'PR13',
      customerName: 'Malini Rajapaksa',
      email: 'malini.rajapaksa@gmail.com',
      rating: 4,
      reviewText: 'Beautiful dried flower arrangement. Very creative and unique design. Good value for money.',
      date: '2024/07/10',
      status: 'Published',
      helpful: 9
    },
    {
      id: 'REV007',
      productName: 'Summertime kurta',
      productId: 'PR02',
      customerName: 'Tharanga Mendis',
      email: 'tharanga.mendis@yahoo.com',
      rating: 5,
      reviewText: 'Perfect fit and very comfortable. The fabric quality is excellent and the stitching is neat.',
      date: '2024/07/09',
      status: 'Published',
      helpful: 11
    },
    {
      id: 'REV008',
      productName: 'Shirts',
      productId: 'PR03',
      customerName: 'Kamal Dissanayake',
      email: 'kamal.dissanayake@gmail.com',
      rating: 3,
      reviewText: 'Average quality shirt. The material is decent but nothing special. Delivery was quick though.',
      date: '2024/07/08',
      status: 'Published',
      helpful: 4
    },
    {
      id: 'REV009',
      productName: 'Beaded necklace',
      productId: 'PR05',
      customerName: 'Chamari Gunasekara',
      email: 'chamari.guna@hotmail.com',
      rating: 1,
      reviewText: 'Very disappointed. The necklace broke within a week of purchase. Poor quality materials.',
      date: '2024/07/07',
      status: 'Pending',
      helpful: 2
    },
    {
      id: 'REV010',
      productName: 'Flower vase',
      productId: 'PR12',
      customerName: 'Priyanka Abeysinghe',
      email: 'priyanka.abey@gmail.com',
      rating: 4,
      reviewText: 'Nice vase with good finishing. Looks great in my living room. Fast shipping too.',
      date: '2024/07/06',
      status: 'Published',
      helpful: 7
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = ratingFilter === '' || review.rating.toString() === ratingFilter;
    const matchesStatus = statusFilter === '' || review.status === statusFilter;

    return matchesSearch && matchesRating && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'active';
      case 'pending':
        return 'pending';
      case 'flagged':
        return 'inactive';
      default:
        return 'active';
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getAverageRating = () => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="reviews-content">
      {/* Header Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>Customer Reviews</h2>
          <p>Manage and monitor customer feedback for your products</p>
        </div>
        <div className="quick-actions">
          <button className="quick-action-btn secondary">Export Reviews</button>
          <button className="quick-action-btn primary">Review Analytics</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#22c55e15', color: '#22c55e' }}>
            ⭐
          </div>
          <div className="stat-info">
            <div className="stat-value">{getAverageRating()}</div>
            <div className="stat-label">Average Rating</div>
            <div className="stat-trend" style={{ color: '#10b981' }}>
              +0.2 this month
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
            💬
          </div>
          <div className="stat-info">
            <div className="stat-value">{reviews.length}</div>
            <div className="stat-label">Total Reviews</div>
            <div className="stat-trend" style={{ color: '#10b981' }}>
              +{reviews.filter(r => r.status === 'Published').length} published
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-header">
            <h3>Rating Distribution</h3>
            <button className="view-all-btn">View Details</button>
          </div>
          <div className="card-content">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="order-item" style={{ alignItems: 'center' }}>
                <div className="order-info" style={{ flex: 'none', minWidth: '100px' }}>
                  <div className="order-id">{rating} Stars</div>
                  <div className="customer-name">{renderStars(rating)}</div>
                </div>
                <div className="order-details" style={{ flex: 1, textAlign: 'left' }}>
                  <div className="order-amount">{ratingDistribution[rating]} reviews</div>
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    backgroundColor: '#f1f5f9', 
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginTop: '4px'
                  }}>
                    <div style={{
                      width: `${(ratingDistribution[rating] / reviews.length) * 100}%`,
                      height: '100%',
                      backgroundColor: rating >= 4 ? '#10b981' : rating >= 3 ? '#f59e0b' : '#ef4444',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="table-section">
        <div className="section-header">
          <h3>All Reviews</h3>
          <div className="table-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            <select
              className="filter-select"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Status</th>
                <th>Helpful</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>
                    <div className="product-cell">
                      <div className="product-name">{review.productName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{review.productId}</div>
                    </div>
                  </td>
                  <td>
                    <div className="product-cell">
                      <div className="product-name">{review.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{review.email}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#f59e0b', fontSize: '1.2rem' }}>
                        {renderStars(review.rating)}
                      </span>
                      <span className="price-cell">({review.rating})</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ 
                      maxWidth: '200px', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {review.reviewText}
                    </div>
                  </td>
                  <td>{review.date}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="price-cell">{review.helpful}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View Full Review">👁️</button>
                      <button className="action-btn edit" title="Moderate">✏️</button>
                      <button className="action-btn delete" title="Delete">🗑️</button>
                    </div>
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

export default Reviews;
