import { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Edit2, Save, X, Eye, EyeOff, Heart } from 'lucide-react';

export default function DonorProfile({user}) {
  const [donor, setDonor] = useState({
    name: '',
    email: '',
    phone: '',
    totalDonations: 0
  });

  // Fetch donor profile from backend on mount
  useEffect(() => {
    // Replace with actual donorId logic (e.g., from auth context, params, etc.)
    const donorId = user.id;
    console.log("ID ", donorId);
    fetch(`http://localhost:5000/donors/profile?donorId=${donorId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.donor) {
          setDonor({
            name: data.donor.name || '',
            email: data.donor.email || '',
            phone: data.donor.phone || '',
            totalDonations: data.donor.totalDonations || 0
          });
          console.log(data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch donor profile:', err);
      });
  }, []);

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(donor.phone);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePhoneSave = () => {
    if (phoneInput.trim()) {
      setDonor({ ...donor, phone: phoneInput });
      setIsEditingPhone(false);
      setMessage({ type: 'success', text: 'Phone number updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handlePhoneCancel = () => {
    setPhoneInput(donor.phone);
    setIsEditingPhone(false);
  };

  const handlePasswordChange = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      setMessage({ type: 'error', text: 'All password fields are required' });
      return;
    }
    
    if (passwordData.new !== passwordData.confirm) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (passwordData.new.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      return;
    }

    setMessage({ type: 'success', text: 'Password changed successfully!' });
    setPasswordData({ current: '', new: '', confirm: '' });
    setIsChangingPassword(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
      
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.avatarCircle}>
                <User style={styles.avatarIcon} />
              </div>
              <div>
                <h1 style={styles.userName}>{donor.name}</h1>
                <p style={styles.userSubtitle}>Donor Profile</p>
              </div>
            </div>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div 
              className="fade-in"
              style={message.type === 'success' ? styles.successMessage : styles.errorMessage}
            >
              {message.text}
            </div>
          )}

          {/* Profile Details */}
          <div style={styles.content}>
            {/* Donation Stats */}
            <div style={styles.donationCard}>
              <div style={styles.donationContent}>
                <div>
                  <label style={styles.donationLabel}>
                    <Heart style={styles.heartIconSmall} />
                    Total Donations
                  </label>
                  <p style={styles.donationCount}>{donor.totalDonations}</p>
                  <p style={styles.donationThankYou}>Thank you for your generosity!</p>
                </div>
                <div style={styles.heartCircle}>
                  <Heart style={styles.heartIconLarge} />
                </div>
              </div>
            </div>

            {/* Name Section */}
            <div style={styles.section}>
              <label style={styles.label}>
                <User style={styles.labelIcon} />
                Full Name
              </label>
              <p style={styles.value}>{donor.name}</p>
            </div>

            {/* Email Section */}
            <div style={styles.section}>
              <label style={styles.label}>
                <Mail style={styles.labelIcon} />
                Email Address
              </label>
              <p style={styles.value}>{donor.email}</p>
            </div>

            {/* Phone Section */}
            <div style={styles.section}>
              <label style={styles.label}>
                <Phone style={styles.labelIcon} />
                Phone Number
              </label>
              
              {!isEditingPhone ? (
                <div style={styles.flexBetween}>
                  <p style={styles.value}>{donor.phone || 'Not provided'}</p>
                  <button
                    onClick={() => setIsEditingPhone(true)}
                    style={styles.primaryButton}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                  >
                    <Edit2 style={styles.buttonIcon} />
                    {donor.phone ? 'Edit' : 'Add'}
                  </button>
                </div>
              ) : (
                <div style={styles.editContainer}>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="Enter phone number"
                    style={styles.input}
                  />
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={handlePhoneSave}
                      style={styles.saveButton}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#16a34a'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#22c55e'}
                    >
                      <Save style={styles.buttonIcon} />
                      Save
                    </button>
                    <button
                      onClick={handlePhoneCancel}
                      style={styles.cancelButton}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#9ca3af'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#d1d5db'}
                    >
                      <X style={styles.buttonIcon} />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Password Section */}
            <div style={styles.sectionLast}>
              <label style={styles.label}>
                <Lock style={styles.labelIcon} />
                Password
              </label>
              
              {!isChangingPassword ? (
                <div style={styles.flexBetween}>
                  <p style={styles.value}>••••••••</p>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    style={styles.primaryButton}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                  >
                    <Edit2 style={styles.buttonIcon} />
                    Change Password
                  </button>
                </div>
              ) : (
                <div style={styles.passwordContainer}>
                  {/* Current Password */}
                  <div>
                    <label style={styles.inputLabel}>Current Password</label>
                    <div style={styles.passwordInputWrapper}>
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        style={styles.passwordInput}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        style={styles.eyeButton}
                      >
                        {showPasswords.current ? <EyeOff style={styles.eyeIcon} /> : <Eye style={styles.eyeIcon} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label style={styles.inputLabel}>New Password</label>
                    <div style={styles.passwordInputWrapper}>
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                        style={styles.passwordInput}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        style={styles.eyeButton}
                      >
                        {showPasswords.new ? <EyeOff style={styles.eyeIcon} /> : <Eye style={styles.eyeIcon} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label style={styles.inputLabel}>Confirm New Password</label>
                    <div style={styles.passwordInputWrapper}>
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        style={styles.passwordInput}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        style={styles.eyeButton}
                      >
                        {showPasswords.confirm ? <EyeOff style={styles.eyeIcon} /> : <Eye style={styles.eyeIcon} />}
                      </button>
                    </div>
                  </div>

                  <div style={styles.buttonGroup}>
                    <button
                      onClick={handlePasswordChange}
                      style={styles.saveButton}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#16a34a'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#22c55e'}
                    >
                      <Save style={styles.buttonIcon} />
                      Update Password
                    </button>
                    <button
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({ current: '', new: '', confirm: '' });
                      }}
                      style={styles.cancelButton}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#9ca3af'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#d1d5db'}
                    >
                      <X style={styles.buttonIcon} />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    marginTop: '100px',
    background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  maxWidth: {
    maxWidth: '896px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(to right, #2563eb, #4f46e5)',
    padding: '48px 32px',
    color: 'white'
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  avatarCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    padding: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarIcon: {
    width: '48px',
    height: '48px'
  },
  userName: {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: '0'
  },
  userSubtitle: {
    color: '#bfdbfe',
    marginTop: '4px',
    margin: '0'
  },
  successMessage: {
    margin: '24px 32px 0',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#f0fdf4',
    color: '#166534',
    border: '1px solid #bbf7d0'
  },
  errorMessage: {
    margin: '24px 32px 0',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fecaca'
  },
  content: {
    padding: '32px',
  },
  donationCard: {
    background: 'linear-gradient(to right, #fef2f2, #fce7f3)',
    border: '2px solid #fecaca',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  },
  donationContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  donationLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#dc2626',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  heartIconSmall: {
    width: '16px',
    height: '16px',
    fill: '#ef4444'
  },
  donationCount: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#dc2626',
    margin: '0'
  },
  donationThankYou: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px',
    margin: '4px 0 0'
  },
  heartCircle: {
    backgroundColor: '#fecaca',
    padding: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heartIconLarge: {
    width: '48px',
    height: '48px',
    color: '#ef4444',
    fill: '#ef4444'
  },
  section: {
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '24px',
    marginBottom: '24px'
  },
  sectionLast: {
    paddingBottom: '0',
    marginBottom: '0'
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  labelIcon: {
    width: '16px',
    height: '16px'
  },
  value: {
    fontSize: '20px',
    color: '#111827',
    margin: '0'
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  editContainer: {
    marginTop: '12px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '12px'
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#22c55e',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#d1d5db',
    color: '#374151',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  buttonIcon: {
    width: '16px',
    height: '16px'
  },
  passwordContainer: {
    marginTop: '16px',
    backgroundColor: '#f9fafb',
    padding: '24px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  passwordInputWrapper: {
    position: 'relative'
  },
  passwordInput: {
    width: '100%',
    padding: '12px 48px 12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    color: '#6b7280'
  },
  eyeIcon: {
    width: '20px',
    height: '20px'
  }
};