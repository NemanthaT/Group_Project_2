import { useState } from "react";

const BuyerDashboardMain = () => {
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Cityville, State 12345",
    memberSince: "January 2023",
    totalOrders: 45,
    totalSpent: "Rs. 125,480",
    favoriteCategory: "Clothing",
    profileImage: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...userProfile });

  const recentActivity = [
    { action: "Ordered", item: "Handloom Saree", date: "2024-01-15", amount: "Rs. 2,300" },
    { action: "Reviewed", item: "Beaded Necklace", date: "2024-01-14", rating: 5 },
    { action: "Wishlisted", item: "Cotton Fabric", date: "2024-01-13" },
    { action: "Ordered", item: "Dried Flower Art", date: "2024-01-12", amount: "Rs. 250" }
  ];

  const favoriteProducts = [
    { id: 1, name: "Handloom Saree", price: "Rs. 2,300", image: "🥻", category: "Clothing" },
    { id: 2, name: "Beaded Necklace", price: "Rs. 350", image: "📿", category: "Jewelry" },
    { id: 3, name: "Flower Vase", price: "Rs. 565", image: "🏺", category: "Home Decor" }
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      setUserProfile({ ...editForm });
    } else {
      setEditForm({ ...userProfile });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm({
          ...editForm,
          profileImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="buyer-dashboard-main">
      {/* Welcome Section */}
      <div className="buyer-welcome-section">
        <div className="buyer-welcome-content">
          <h2>Welcome back, {userProfile.name}!</h2>
          <p>Here's what's happening with your account today.</p>
        </div>
        <div className="buyer-quick-actions">
          <button className="buyer-quick-action-btn buyer-primary" onClick={() => window.location.href = '/marketplace'}>
            Browse Products
          </button>
          <button className="buyer-quick-action-btn buyer-secondary" onClick={() => window.location.href = '/buyerDashboard/orders'}>
            Track Orders
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="buyer-profile-section">
        <div className="buyer-profile-card">
          <div className="buyer-profile-header">
            <h3>Profile Information</h3>
            <button 
              className={`buyer-edit-btn ${isEditing ? 'buyer-save' : 'buyer-edit'}`}
              onClick={handleEditToggle}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
          
          <div className="buyer-profile-content">
            <div className="buyer-profile-image-section">
              <div className="buyer-profile-image">
                {userProfile.profileImage ? (
                  <img src={userProfile.profileImage} alt="Profile" />
                ) : (
                  <div className="buyer-profile-placeholder">👤</div>
                )}
              </div>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="buyer-image-upload"
                />
              )}
            </div>
            
            <div className="buyer-profile-details">
              <div className="buyer-profile-grid">
                <div className="buyer-profile-field">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="buyer-profile-input"
                    />
                  ) : (
                    <span className="buyer-profile-value">{userProfile.name}</span>
                  )}
                </div>
                
                <div className="buyer-profile-field">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="buyer-profile-input"
                    />
                  ) : (
                    <span className="buyer-profile-value">{userProfile.email}</span>
                  )}
                </div>
                
                <div className="buyer-profile-field">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="buyer-profile-input"
                    />
                  ) : (
                    <span className="buyer-profile-value">{userProfile.phone}</span>
                  )}
                </div>
                
                <div className="buyer-profile-field buyer-full-width">
                  <label>Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      className="buyer-profile-textarea"
                      rows="3"
                    />
                  ) : (
                    <span className="buyer-profile-value">{userProfile.address}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="buyer-stats-card">
          <h3>Account Summary</h3>
          <div className="buyer-stats-grid">
            <div className="buyer-stat-item">
              <div className="buyer-stat-icon">📦</div>
              <div className="buyer-stat-info">
                <span className="buyer-stat-value">{userProfile.totalOrders}</span>
                <span className="buyer-stat-label">Total Orders</span>
              </div>
            </div>
            <div className="buyer-stat-item">
              <div className="buyer-stat-icon">💰</div>
              <div className="buyer-stat-info">
                <span className="buyer-stat-value">{userProfile.totalSpent}</span>
                <span className="buyer-stat-label">Total Spent</span>
              </div>
            </div>
            <div className="buyer-stat-item">
              <div className="buyer-stat-icon">❤️</div>
              <div className="buyer-stat-info">
                <span className="buyer-stat-value">{userProfile.favoriteCategory}</span>
                <span className="buyer-stat-label">Favorite Category</span>
              </div>
            </div>
            <div className="buyer-stat-item">
              <div className="buyer-stat-icon">📅</div>
              <div className="buyer-stat-info">
                <span className="buyer-stat-value">{userProfile.memberSince}</span>
                <span className="buyer-stat-label">Member Since</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Favorites */}
      <div className="buyer-activity-section">
        <div className="buyer-recent-activity">
          <h3>Recent Activity</h3>
          <div className="buyer-activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="buyer-activity-item">
                <div className="buyer-activity-info">
                  <span className="buyer-activity-action">{activity.action}</span>
                  <span className="buyer-activity-item-name">{activity.item}</span>
                </div>
                <div className="buyer-activity-details">
                  <span className="buyer-activity-date">{activity.date}</span>
                  {activity.amount && <span className="buyer-activity-amount">{activity.amount}</span>}
                  {activity.rating && (
                    <span className="buyer-activity-rating">
                      {'⭐'.repeat(activity.rating)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="buyer-favorite-products">
          <h3>Favorite Products</h3>
          <div className="buyer-favorites-grid">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="buyer-favorite-item">
                <div className="buyer-product-image">{product.image}</div>
                <div className="buyer-product-info">
                  <h4>{product.name}</h4>
                  <p className="buyer-product-category">{product.category}</p>
                  <span className="buyer-product-price">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboardMain;
