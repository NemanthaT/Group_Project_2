import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [accountSettings, setAccountSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    password: '••••••••',
    twoFactorEnabled: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: true,
    newProductAlerts: false,
    reviewReminders: true,
    wishlistUpdates: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    showPurchaseHistory: false,
    shareDataForRecommendations: true,
    allowThirdPartyTracking: false
  });

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Credit Card', details: '**** **** **** 4567', expiry: '12/26', isDefault: true },
    { id: 2, type: 'Debit Card', details: '**** **** **** 8901', expiry: '08/25', isDefault: false },
    { id: 3, type: 'PayPal', details: 'john.doe@email.com', expiry: null, isDefault: false }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Cityville',
      state: 'State',
      zipCode: '12345',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Ave',
      city: 'Cityville',
      state: 'State',
      zipCode: '12346',
      phone: '+1 (555) 123-4567',
      isDefault: false
    }
  ]);

  const handleAccountChange = (field, value) => {
    setAccountSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacySettings(prev => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    console.log('Saving settings...');
    // Add save logic here
    alert('Settings saved successfully!');
  };

  const removePaymentMethod = (id) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
    }
  };

  const setDefaultPaymentMethod = (id) => {
    setPaymentMethods(prev => 
      prev.map(method => ({ ...method, isDefault: method.id === id }))
    );
  };

  const removeAddress = (id) => {
    if (window.confirm('Are you sure you want to remove this address?')) {
      setAddresses(prev => prev.filter(address => address.id !== id));
    }
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => 
      prev.map(address => ({ ...address, isDefault: address.id === id }))
    );
  };

  const exportData = () => {
    // Export user data logic
    console.log('Exporting user data...');
    alert('Data export request submitted. You will receive an email with your data within 24 hours.');
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (window.confirm('This will permanently delete all your data. Are you absolutely sure?')) {
        console.log('Deleting account...');
        // Add account deletion logic here
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="buyer-settings-section">
            <h3>Account Information</h3>
            <div className="buyer-settings-form">
              <div className="buyer-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={accountSettings.name}
                  onChange={(e) => handleAccountChange('name', e.target.value)}
                  className="buyer-form-input"
                />
              </div>
              
              <div className="buyer-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={accountSettings.email}
                  onChange={(e) => handleAccountChange('email', e.target.value)}
                  className="buyer-form-input"
                />
              </div>
              
              <div className="buyer-form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={accountSettings.phone}
                  onChange={(e) => handleAccountChange('phone', e.target.value)}
                  className="buyer-form-input"
                />
              </div>
              
              <div className="buyer-form-group">
                <label>Password</label>
                <div className="buyer-password-field">
                  <input
                    type="password"
                    value={accountSettings.password}
                    className="buyer-form-input"
                    readOnly
                  />
                  <button className="buyer-change-password-btn">Change Password</button>
                </div>
              </div>
              
              <div className="buyer-form-group">
                <label className="buyer-checkbox-label">
                  <input
                    type="checkbox"
                    checked={accountSettings.twoFactorEnabled}
                    onChange={(e) => handleAccountChange('twoFactorEnabled', e.target.checked)}
                  />
                  Enable Two-Factor Authentication
                </label>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="buyer-settings-section">
            <h3>Notification Preferences</h3>
            <div className="buyer-notification-settings">
              <div className="buyer-notification-group">
                <h4>Communication Preferences</h4>
                <label className="buyer-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                  />
                  Email Notifications
                </label>
                <label className="buyer-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.smsNotifications}
                    onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                  />
                  SMS Notifications
                </label>
              </div>
              
              <div className="buyer-notification-group">
                <h4>Order & Shopping</h4>
                <label className="buyer-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.orderUpdates}
                    onChange={(e) => handleNotificationChange('orderUpdates', e.target.checked)}
                  />
                  Order Status Updates
                </label>
                <label className="buyer-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.wishlistUpdates}
                    onChange={(e) => handleNotificationChange('wishlistUpdates', e.target.checked)}
                  />
                  Wishlist Price Drops
                </label>
                <label className="buyer-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.reviewReminders}
                    onChange={(e) => handleNotificationChange('reviewReminders', e.target.checked)}
                  />
                  Review Reminders
                </label>
              </div>
              
              <div className="buyer-notification-group">
                <h4>Marketing</h4>
                <label className="buyer-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.promotionalEmails}
                    onChange={(e) => handleNotificationChange('promotionalEmails', e.target.checked)}
                  />
                  Promotional Emails
                </label>
                <label className="buyer-checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.newProductAlerts}
                    onChange={(e) => handleNotificationChange('newProductAlerts', e.target.checked)}
                  />
                  New Product Alerts
                </label>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="buyer-settings-section">
            <h3>Privacy Settings</h3>
            <div className="buyer-privacy-settings">
              <div className="buyer-privacy-group">
                <label>Profile Visibility</label>
                <select
                  value={privacySettings.profileVisibility}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="buyer-form-select"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>
              
              <label className="buyer-checkbox-label">
                <input
                  type="checkbox"
                  checked={privacySettings.showPurchaseHistory}
                  onChange={(e) => handlePrivacyChange('showPurchaseHistory', e.target.checked)}
                />
                Show Purchase History in Profile
              </label>
              
              <label className="buyer-checkbox-label">
                <input
                  type="checkbox"
                  checked={privacySettings.shareDataForRecommendations}
                  onChange={(e) => handlePrivacyChange('shareDataForRecommendations', e.target.checked)}
                />
                Share Data for Product Recommendations
              </label>
              
              <label className="buyer-checkbox-label">
                <input
                  type="checkbox"
                  checked={privacySettings.allowThirdPartyTracking}
                  onChange={(e) => handlePrivacyChange('allowThirdPartyTracking', e.target.checked)}
                />
                Allow Third-Party Tracking
              </label>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="buyer-settings-section">
            <h3>Payment Methods</h3>
            <div className="buyer-payment-methods">
              {paymentMethods.map((method) => (
                <div key={method.id} className="buyer-payment-method">
                  <div className="buyer-payment-info">
                    <h4>{method.type}</h4>
                    <p>{method.details}</p>
                    {method.expiry && <p>Expires: {method.expiry}</p>}
                    {method.isDefault && <span className="buyer-default-badge">Default</span>}
                  </div>
                  <div className="buyer-payment-actions">
                    {!method.isDefault && (
                      <button 
                        className="buyer-action-btn buyer-set-default"
                        onClick={() => setDefaultPaymentMethod(method.id)}
                      >
                        Set as Default
                      </button>
                    )}
                    <button 
                      className="buyer-action-btn buyer-remove"
                      onClick={() => removePaymentMethod(method.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button className="buyer-add-payment-btn">Add New Payment Method</button>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="buyer-settings-section">
            <h3>Shipping Addresses</h3>
            <div className="buyer-addresses">
              {addresses.map((address) => (
                <div key={address.id} className="buyer-address">
                  <div className="buyer-address-info">
                    <h4>{address.type} {address.isDefault && <span className="buyer-default-badge">Default</span>}</h4>
                    <p>{address.name}</p>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.phone}</p>
                  </div>
                  <div className="buyer-address-actions">
                    <button className="buyer-action-btn buyer-edit">Edit</button>
                    {!address.isDefault && (
                      <button 
                        className="buyer-action-btn buyer-set-default"
                        onClick={() => setDefaultAddress(address.id)}
                      >
                        Set as Default
                      </button>
                    )}
                    <button 
                      className="buyer-action-btn buyer-remove"
                      onClick={() => removeAddress(address.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button className="buyer-add-address-btn">Add New Address</button>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="buyer-settings-section">
            <h3>Data Management</h3>
            <div className="buyer-data-settings">
              <div className="buyer-data-option">
                <h4>Export Your Data</h4>
                <p>Download a copy of all your account data including orders, reviews, and preferences.</p>
                <button className="buyer-action-btn buyer-export" onClick={exportData}>
                  Request Data Export
                </button>
              </div>
              
              <div className="buyer-data-option buyer-danger-zone">
                <h4>Delete Account</h4>
                <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                <button className="buyer-action-btn buyer-delete" onClick={deleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="buyer-settings-content">
      <div className="buyer-content-header">
        <h1>Settings</h1>
        <p className="buyer-subtitle">Manage your account preferences and settings</p>
      </div>

      <div className="buyer-settings-container">
        {/* Settings Navigation */}
        <div className="buyer-settings-nav">
          <button
            className={`buyer-settings-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            👤 Account
          </button>
          <button
            className={`buyer-settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            🔔 Notifications
          </button>
          <button
            className={`buyer-settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            🔒 Privacy
          </button>
          <button
            className={`buyer-settings-tab ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            💳 Payment
          </button>
          <button
            className={`buyer-settings-tab ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            📍 Addresses
          </button>
          <button
            className={`buyer-settings-tab ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            📊 Data
          </button>
        </div>

        {/* Settings Content */}
        <div className="buyer-settings-main">
          {renderTabContent()}
          
          {activeTab !== 'data' && (
            <div className="buyer-settings-actions">
              <button className="buyer-save-btn" onClick={saveSettings}>
                Save Changes
              </button>
              <button className="buyer-cancel-btn">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
