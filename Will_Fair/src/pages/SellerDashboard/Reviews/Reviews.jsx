import React, { useState } from 'react';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  const reviews = [
    {
      id: 'REV001',
      productName: 'Saree dupatta',
      productId: 'PR01',
      productImage: '/src/assets/images/featured1.jpg',
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
      productImage: '/src/assets/images/featured2.jpg',
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
      productImage: '/src/assets/images/featured3.jpg',
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
      productImage: '/src/assets/images/featured4.jpg',
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
      productImage: '/src/assets/images/featured5.jpg',
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
      productImage: '/src/assets/images/featured6.jpg',
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
      productImage: '/src/assets/images/featured7.jpg',
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
      productImage: '/src/assets/images/featured8.jpg',
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
      productImage: '/src/assets/images/featured2.jpg',
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
      productImage: '/src/assets/images/featured4.jpg',
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
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = ratingFilter === '' || review.rating.toString() === ratingFilter;
    const matchesStatus = statusFilter === '' || review.status === statusFilter;

    return matchesSearch && matchesRating && matchesStatus;
  });

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setShowReviewModal(true);
    setReplyText('');
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
    setSelectedReview(null);
    setReplyText('');
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log('Reply sent:', replyText);
      // Here you would typically send the reply to your backend
      alert('Reply sent successfully!');
      setReplyText('');
    }
  };

  const handleFlagReview = () => {
    if (selectedReview) {
      console.log('Review flagged:', selectedReview.id);
      // Here you would typically update the review status in your backend
      alert('Review has been flagged for moderation.');
      handleCloseModal();
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'seller-active';
      case 'pending':
        return 'seller-pending';
      case 'flagged':
        return 'seller-inactive';
      default:
        return 'seller-active';
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
    <div className="seller-dashboard-content">
      {/* Header Section */}
      <div className="seller-welcome-section">
        <div className="seller-welcome-content">
          <h2>Customer Reviews</h2>
          <p>Manage and monitor customer feedback for your products</p>
        </div>
        <div className="seller-quick-actions">
          <button className="seller-quick-action-btn seller-secondary">Export Reviews</button>
          <button className="seller-quick-action-btn seller-primary">Review Analytics</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="seller-stats-grid">
        <div className="seller-stat-card">
          <div className="seller-stat-icon" style={{ backgroundColor: '#22c55e15', color: '#22c55e' }}>
            ⭐
          </div>
          <div className="seller-stat-info">
            <div className="seller-stat-value">{getAverageRating()}</div>
            <div className="seller-stat-label">Average Rating</div>
            <div className="seller-stat-trend" style={{ color: '#10b981' }}>
              +0.2 this month
            </div>
          </div>
        </div>
        <div className="seller-stat-card">
          <div className="seller-stat-icon" style={{ backgroundColor: '#3b82f615', color: '#3b82f6' }}>
            💬
          </div>
          <div className="seller-stat-info">
            <div className="seller-stat-value">{reviews.length}</div>
            <div className="seller-stat-label">Total Reviews</div>
            <div className="seller-stat-trend" style={{ color: '#10b981' }}>
              +{reviews.filter(r => r.status === 'Published').length} published
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="seller-overview-grid">
        <div className="seller-overview-card">
          <div className="seller-card-header">
            <h3>Rating Distribution</h3>
            <button className="seller-view-all-btn">View Details</button>
          </div>
          <div className="seller-card-content">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="seller-order-item" style={{ alignItems: 'center' }}>
                <div className="seller-order-info" style={{ flex: 'none', minWidth: '100px' }}>
                  <div className="seller-order-id">{rating} Stars</div>
                  <div className="seller-customer-name">{renderStars(rating)}</div>
                </div>
                <div className="seller-order-details" style={{ flex: 1, textAlign: 'left' }}>
                  <div className="seller-order-amount">{ratingDistribution[rating]} reviews</div>
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
      <div className="seller-table-section">
        <div className="seller-section-header">
          <h3>All Reviews</h3>
          <div className="seller-table-actions">
            <div className="seller-search-box">
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="seller-search-icon">🔍</span>
            </div>
            <select
              className="seller-filter-select"
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
              className="seller-filter-select"
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
        <div className="seller-table-container">
          <table>
            <thead>
              <tr>
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
                  <td>
                    <div className="seller-product-cell">
                      <div className="seller-product-name">{review.productName}</div>
                    </div>
                  </td>
                  <td>
                    <div className="seller-product-cell">
                      <div className="seller-product-name">{review.customerName}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#f59e0b', fontSize: '1.2rem' }}>
                        {renderStars(review.rating)}
                      </span>
                      <span className="seller-price-cell">({review.rating})</span>
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
                    <span className={`seller-status-badge ${getStatusClass(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="seller-price-cell">{review.helpful}</td>
                  <td>
                    <div className="seller-action-buttons">
                      <button 
                        className="seller-action-btn seller-view" 
                        title="View Full Review"
                        onClick={() => handleViewReview(review)}
                      >
                        👁️
                      </button>
                      <button className="seller-action-btn seller-edit" title="Moderate">✏️</button>
                      <button className="seller-action-btn seller-delete" title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedReview && (
        <div className="seller-modal-overlay" onClick={handleCloseModal}>
          <div className="seller-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="seller-modal-header">
              <h3>Review Details</h3>
              <button className="seller-modal-close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="seller-product-form">
              {/* Product Information */}
              <div className="seller-review-product-section">
                <div className="seller-review-product-info">
                  <img 
                    src={selectedReview.productImage} 
                    alt={selectedReview.productName}
                    className="seller-review-product-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x150?text=Product+Image';
                    }}
                  />
                  <div className="seller-review-product-details">
                    <h4 className="seller-review-product-name">{selectedReview.productName}</h4>
                    <p className="seller-review-product-id">Product ID: {selectedReview.productId}</p>
                  </div>
                </div>
              </div>

              {/* Customer and Review Information */}
              <div className="seller-review-customer-section">
                <div className="seller-form-grid">
                  <div className="seller-form-group">
                    <label>Customer Name</label>
                    <div className="seller-review-display-value">{selectedReview.customerName}</div>
                  </div>
                  <div className="seller-form-group">
                    <label>Review Date</label>
                    <div className="seller-review-display-value">{selectedReview.date}</div>
                  </div>
                  <div className="seller-form-group">
                    <label>Rating</label>
                    <div className="seller-review-display-value">
                      <span style={{ color: '#f59e0b', fontSize: '1.2rem', marginRight: '0.5rem' }}>
                        {renderStars(selectedReview.rating)}
                      </span>
                      ({selectedReview.rating}/5)
                    </div>
                  </div>
                  <div className="seller-form-group">
                    <label>Status</label>
                    <div className="seller-review-display-value">
                      <span className={`seller-status-badge ${getStatusClass(selectedReview.status)}`}>
                        {selectedReview.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="seller-form-group seller-full-width">
                  <label>Customer Review</label>
                  <div className="seller-review-text-display">
                    {selectedReview.reviewText}
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              <div className="seller-review-reply-section">
                <div className="seller-form-group seller-full-width">
                  <label>Reply to Customer</label>
                  <textarea
                    className="seller-form-textarea"
                    placeholder="Write your response to the customer's review..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows="4"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="seller-review-actions">
                <button 
                  className="seller-review-action-btn seller-flag-btn"
                  onClick={handleFlagReview}
                >
                  🚩 Flag Review
                </button>
                <button 
                  className="seller-review-action-btn seller-reply-btn"
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                >
                  📤 Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
