import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Mail, Phone, Lock, Edit2, Save, X, Eye, EyeOff, Heart } from 'lucide-react';

export default function DonorProfile({user}) {
  const [donor, setDonor] = useState({
    name: '',
    email: '',
    phone: '',
    totalDonations: 0
  });
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 

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

  // Remove message state, use toast instead

  // Fetch donor profile from backend when user is available
  useEffect(() => {
    const fetchDonorProfile = async () => {
      if (!user || !user.id) {
        console.log("User not available yet:", user);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const donorId = user.id;
        console.log("Fetching profile for ID:", donorId);
        
  const response = await fetch(`http://localhost:5000/donors/profile?donorId=${donorId}`);
        const data = await response.json();
        
        console.log("Full API Response:", data);
        
        if (data && data.success && data.donor) {
          console.log("Raw donor data:", data.donor);
          
          // FIX: Handle the actual backend response structure
          const donorFromBackend = data.donor;
          setDonor({
            name: `${donorFromBackend.first_name || ''} ${donorFromBackend.last_name || ''}`.trim(),
            email: donorFromBackend.email || '',
            phone: donorFromBackend.phone || '',
            totalDonations: donorFromBackend.totalDonations || 0
          });
        } else {
          setError(data.error || 'Failed to fetch donor profile');
        }
      } catch (err) {
        console.error('Failed to fetch donor profile:', err);
        setError('Network error while fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchDonorProfile();
  }, [user]);

  // Update phone input when donor data changes
  useEffect(() => {
    setPhoneInput(donor.phone);
  }, [donor.phone]);

  const handlePhoneSave = async () => {
    if (phoneInput.trim()) {
      try {
        const donorId = user.id;
        const response = await fetch('http://localhost:5000/donors/updatePhone', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ donorId, phone: phoneInput })
        });
        const data = await response.json();
        if (data.success) {
          setDonor({ ...donor, phone: phoneInput });
          setIsEditingPhone(false);
          toast.success('Phone number updated successfully!');
        } else {
          toast.error(data.error || 'Failed to update phone number');
        }
      } catch (err) {
        toast.error('Network error while updating phone number');
      }
    }
  };

  const handlePhoneCancel = () => {
    setPhoneInput(donor.phone);
    setIsEditingPhone(false);
  };

  const handlePasswordChange = async () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error('All password fields are required');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.new.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    try {
      const donorId = user.id;
      const response = await fetch('http://localhost:5000/donors/updatePassword', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donorId, newPassword: passwordData.new })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Password changed successfully!');
        setPasswordData({ current: '', new: '', confirm: '' });
        setIsChangingPassword(false);
      } else {
        toast.error(data.error || 'Failed to change password');
      }
    } catch (err) {
      toast.error('Network error while changing password');
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  // Loading State
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.maxWidth}>
          <div style={styles.card}>
            <div style={{...styles.header, textAlign: 'center', padding: '48px'}}>
              <div style={styles.avatarCircle}>
                <User style={styles.avatarIcon} />
              </div>
              <h1 style={styles.userName}>Loading...</h1>
              <p style={styles.userSubtitle}>Please wait while we load your profile</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.maxWidth}>
          <div style={styles.card}>
            <div style={{...styles.header, textAlign: 'center', padding: '48px'}}>
              <div style={styles.avatarCircle}>
                <User style={styles.avatarIcon} />
              </div>
              <h1 style={styles.userName}>Error</h1>
              <p style={styles.userSubtitle}>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                style={styles.primaryButton}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <h1 style={styles.userName}>{donor.name || 'Donor'}</h1>
                <p style={styles.userSubtitle}>Donor Profile</p>
              </div>
            </div>
          </div>

          {/* Toast Container for notifications */}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

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
              <p style={styles.value}>{donor.name || 'Not available'}</p>
            </div>

            {/* Email Section */}
            <div style={styles.section}>
              <label style={styles.label}>
                <Mail style={styles.labelIcon} />
                Email Address
              </label>
              <p style={styles.value}>{donor.email || 'Not available'}</p>
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

// Keep your existing styles object exactly as it was
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