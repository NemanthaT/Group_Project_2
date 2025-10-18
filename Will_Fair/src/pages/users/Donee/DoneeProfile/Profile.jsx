import { useState } from 'react';
import { User, Mail, Phone, Lock, Edit2, Save, X, Eye, EyeOff, FileText, Download, Users, UserCircle } from 'lucide-react';

export default function DoneeProfile() {
  const [donee, setDonee] = useState({
    name: 'Sarah Williams',
    email: '', // empty initially since not asked during account creation
    phone: '+1 (555) 987-6543',
    category: 'individual', // 'individual' or 'representative'
    subcategory: 'student', // student, differently-abled, senior-citizen, unemployed, crisis-affected, medical-needs
    proofDocuments: [
      { id: 1, name: 'Student_ID_Card.pdf', uploadDate: '2024-10-15', size: '2.4 MB' },
      { id: 2, name: 'Enrollment_Verification.pdf', uploadDate: '2024-10-15', size: '1.8 MB' }
    ]
  });

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(donee.email);
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

  const subcategoryOptions = [
    { value: 'student', label: 'Student' },
    { value: 'differently-abled', label: 'Differently Abled' },
    { value: 'senior-citizen', label: 'Senior Citizen' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'crisis-affected', label: 'Crisis Affected' },
    { value: 'medical-needs', label: 'Medical Needs' }
  ];

  const handleEmailSave = () => {
    if (emailInput.trim() && emailInput.includes('@')) {
      setDonee({ ...donee, email: emailInput });
      setIsEditingEmail(false);
      setMessage({ type: 'success', text: 'Email address updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } else {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
    }
  };

  const handleEmailCancel = () => {
    setEmailInput(donee.email);
    setIsEditingEmail(false);
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

  const handleDocumentDownload = (doc) => {
    setMessage({ type: 'success', text: `Downloading ${doc.name}...` });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const getCategoryLabel = (category) => {
    return category === 'individual' ? 'Individual' : 'Representative';
  };

  const getSubcategoryLabel = (subcategory) => {
    const option = subcategoryOptions.find(opt => opt.value === subcategory);
    return option ? option.label : subcategory;
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

        .doc-item:hover {
          background-color: #f9fafb;
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
                <h1 style={styles.userName}>{donee.name}</h1>
                <p style={styles.userSubtitle}>Donee Profile</p>
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
            {/* Category & Subcategory Card */}
            <div style={styles.categoryCard}>
              <div style={styles.categoryRow}>
                <div style={styles.categoryItem}>
                  <label style={styles.categoryLabel}>
                    {donee.category === 'individual' ? (
                      <UserCircle style={styles.categoryIcon} />
                    ) : (
                      <Users style={styles.categoryIcon} />
                    )}
                    Category
                  </label>
                  <p style={styles.categoryValue}>{getCategoryLabel(donee.category)}</p>
                </div>
                <div style={styles.categoryDivider}></div>
                <div style={styles.categoryItem}>
                  <label style={styles.categoryLabel}>
                    <FileText style={styles.categoryIcon} />
                    Subcategory
                  </label>
                  <p style={styles.categoryValue}>{getSubcategoryLabel(donee.subcategory)}</p>
                </div>
              </div>
            </div>

            {/* Name Section */}
            <div style={styles.section}>
              <label style={styles.label}>
                <User style={styles.labelIcon} />
                Full Name
              </label>
              <p style={styles.value}>{donee.name}</p>
            </div>

            {/* Email Section */}
            <div style={styles.section}>
              <label style={styles.label}>
                <Mail style={styles.labelIcon} />
                Email Address
              </label>
              
              {!isEditingEmail ? (
                <div style={styles.flexBetween}>
                  <p style={styles.value}>{donee.email || 'Not provided'}</p>
                  <button
                    onClick={() => setIsEditingEmail(true)}
                    style={styles.primaryButton}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                  >
                    <Edit2 style={styles.buttonIcon} />
                    {donee.email ? 'Edit' : 'Add'}
                  </button>
                </div>
              ) : (
                <div style={styles.editContainer}>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email address"
                    style={styles.input}
                  />
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={handleEmailSave}
                      style={styles.saveButton}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#16a34a'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#22c55e'}
                    >
                      <Save style={styles.buttonIcon} />
                      Save
                    </button>
                    <button
                      onClick={handleEmailCancel}
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

            {/* Phone Section */}
            <div style={styles.section}>
              <label style={styles.label}>
                <Phone style={styles.labelIcon} />
                Phone Number
              </label>
              <p style={styles.value}>{donee.phone}</p>
            </div>

            {/* Proof Documents Section */}
            <div style={styles.section}>
              <label style={styles.label}>
                <FileText style={styles.labelIcon} />
                Proof Documents
              </label>
              
              <div style={styles.documentsContainer}>
                {donee.proofDocuments.length > 0 ? (
                  donee.proofDocuments.map((doc) => (
                    <div key={doc.id} className="doc-item" style={styles.documentItem}>
                      <div style={styles.documentInfo}>
                        <div style={styles.documentIconWrapper}>
                          <FileText style={styles.documentIcon} />
                        </div>
                        <div>
                          <p style={styles.documentName}>{doc.name}</p>
                          <p style={styles.documentMeta}>
                            Uploaded: {doc.uploadDate} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDocumentDownload(doc)}
                        style={styles.downloadButton}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#dbeafe'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#eff6ff'}
                      >
                        <Download style={styles.buttonIcon} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={styles.noDocuments}>No proof documents uploaded</p>
                )}
              </div>
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
    background: 'linear-gradient(to bottom right, #fef3c7, #fde68a)',
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
    background: 'linear-gradient(to right, #f59e0b, #d97706)',
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
    color: '#fed7aa',
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
  categoryCard: {
    background: 'linear-gradient(to right, #fef3c7, #fde68a)',
    border: '2px solid #fcd34d',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  },
  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: '24px'
  },
  categoryItem: {
    flex: '1',
    textAlign: 'center'
  },
  categoryDivider: {
    width: '2px',
    height: '60px',
    backgroundColor: '#fbbf24'
  },
  categoryLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#92400e',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  categoryIcon: {
    width: '16px',
    height: '16px'
  },
  categoryValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#92400e',
    margin: '0'
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
  documentsContainer: {
    marginTop: '12px'
  },
  documentItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '12px',
    transition: 'background-color 0.2s'
  },
  documentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  documentIconWrapper: {
    backgroundColor: '#dbeafe',
    padding: '12px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  documentIcon: {
    width: '24px',
    height: '24px',
    color: '#3b82f6'
  },
  documentName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 4px 0'
  },
  documentMeta: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0'
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  noDocuments: {
    color: '#6b7280',
    fontSize: '14px',
    fontStyle: 'italic',
    padding: '16px',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    margin: '0'
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