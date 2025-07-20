import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    businessName: 'John\'s Handcrafts',
    businessType: 'Handicrafts & Art',
    address: '123 Main Street',
    city: 'Colombo',
    postalCode: '10001',
    country: 'Sri Lanka',
    website: 'www.johnshandcrafts.lk'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data if needed
    setIsEditing(false);
  };

  return (
    <div className="dashboard-content profile-page">
      {/* Header Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>Profile Settings</h2>
          <p>Manage your personal and business information</p>
        </div>
        <div className="quick-actions">
          {!isEditing ? (
            <button 
              className="quick-action-btn primary"
              onClick={() => setIsEditing(true)}
            >
              📝 Edit Profile
            </button>
          ) : (
            <>
              <button 
                className="quick-action-btn secondary"
                onClick={handleCancel}
              >
                ❌ Cancel
              </button>
              <button 
                className="quick-action-btn primary"
                onClick={handleSave}
              >
                💾 Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Information Grid */}
      <div className="overview-grid">
        {/* Personal Information */}
        <div className="overview-card">
          <div className="card-header">
            <h3>👤 Personal Information</h3>
          </div>
          <div className="card-content">
            <div className="profile-form-grid">
              <div className="profile-form-group">
                <label>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your first name"
                  />
                ) : (
                  <div className="profile-display-value">{profileData.firstName}</div>
                )}
              </div>
              <div className="profile-form-group">
                <label>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your last name"
                  />
                ) : (
                  <div className="profile-display-value">{profileData.lastName}</div>
                )}
              </div>
              <div className="profile-form-group profile-form-group-full">
                <label>📧 Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                ) : (
                  <div className="profile-display-value">{profileData.email}</div>
                )}
              </div>
              <div className="profile-form-group profile-form-group-full">
                <label>📱 Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <div className="profile-display-value">{profileData.phone}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="overview-card">
          <div className="card-header">
            <h3>🏢 Business Information</h3>
          </div>
          <div className="card-content">
            <div className="profile-form-grid">
              <div className="profile-form-group profile-form-group-full">
                <label>Business Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="businessName"
                    value={profileData.businessName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <div className="profile-display-value">{profileData.businessName}</div>
                )}
              </div>
              <div className="profile-form-group profile-form-group-full">
                <label>Business Type</label>
                {isEditing ? (
                  <select
                    name="businessType"
                    value={profileData.businessType}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Handicrafts & Art">Handicrafts & Art</option>
                    <option value="Clothing & Textiles">Clothing & Textiles</option>
                    <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div className="profile-display-value">{profileData.businessType}</div>
                )}
              </div>
              <div className="profile-form-group profile-form-group-full">
                <label>🌐 Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="www.yourbusiness.com"
                  />
                ) : (
                  <div className="profile-display-value">
                    {profileData.website ? (
                      <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer" className="profile-link">
                        🔗 {profileData.website}
                      </a>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>Not provided</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="overview-card">
          <div className="card-header">
            <h3>📍 Address Information</h3>
          </div>
          <div className="card-content">
            <div className="profile-form-grid">
              <div className="profile-form-group profile-form-group-full">
                <label>Street Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <div className="profile-display-value">{profileData.address}</div>
                )}
              </div>
              <div className="profile-form-group">
                <label>City</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <div className="profile-display-value">{profileData.city}</div>
                )}
              </div>
              <div className="profile-form-group">
                <label>Postal Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="postalCode"
                    value={profileData.postalCode}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <div className="profile-display-value">{profileData.postalCode}</div>
                )}
              </div>
              <div className="profile-form-group profile-form-group-full">
                <label>Country</label>
                {isEditing ? (
                  <select
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div className="profile-display-value">{profileData.country}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="table-section">
        <div className="section-header">
          <h3>⚙️ Account Settings</h3>
        </div>
        <div className="card-content" style={{ padding: '2rem' }}>
          <div className="profile-settings-grid">
            <div className="profile-setting-item">
              <div className="setting-info">
                <h4>🔒 Change Password</h4>
                <p>Update your account password for security</p>
              </div>
              <button className="quick-action-btn secondary">Change Password</button>
            </div>
            <div className="profile-setting-item">
              <div className="setting-info">
                <h4> Email Notifications</h4>
                <p>Manage your email notification preferences</p>
              </div>
              <button className="quick-action-btn secondary">Configure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
