import React from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/donorreg.styles';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

const DoneeOrg = ({ visible, onClose, onLoginPress }) => {
  const navigation = useNavigation();
  const [contactno, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [fullName, setFullName] = useState('');
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Individual');
  const [proofDocument, setProofDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validatePhone = (phone) => {
    return /^\d{10,15}$/.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Phone validation
    if (!contactno.trim()) {
      newErrors.contactno = 'Contact number is required';
    } else if (!validatePhone(contactno)) {
      newErrors.contactno = 'Please enter a valid phone number (10-15 digits)';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!agreed) {
      newErrors.agreed = 'You must agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
        multiple: false,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProofDocument(result.assets[0]);
      }
    } catch (error) {
      console.log('Document pick error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  // Submit to backend
const handleSubmit = async () => {
  if (!validateForm()) {
    Alert.alert('Validation Error', 'Please fix the errors before submitting');
    return;
  }

  setLoading(true);
  try {
    // Create FormData for potential file upload
    const formData = new FormData();
    formData.append('fullName', fullName.trim());
    formData.append('contactno', contactno.trim());
    formData.append('password', password);
    
    // Append document if selected (optional for individual)
    if (proofDocument) {
      formData.append('proofDocument', {
        uri: proofDocument.uri,
        type: proofDocument.mimeType || 'application/octet-stream',
        name: proofDocument.name || 'document'
      });
    }

    console.log('Submitting form data...');

    const response = await fetch('http://192.168.71.72:5000/api/donee_ind_reg', {
      method: 'POST',
      // REMOVED: Don't set Content-Type for FormData
      body: formData,
    });

    console.log('Response status:', response.status);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.log('Non-JSON response:', textResponse);
      Alert.alert('Server Error', 'Server returned an unexpected response');
      return;
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok) {
      Alert.alert('Success', 'Individual donee account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Clear form
            setFullName('');
            setContactNo('');
            setPassword('');
            setConfirmPassword('');
            setProofDocument(null);
            setAgreed(false);
            setErrors({});
            // Navigate to login
            navigation.navigate('donee_login');
          }
        }
      ]);
    } else {
      Alert.alert('Error', data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    Alert.alert('Error', 'Network error. Please check your connection and backend server.');
  } finally {
    setLoading(false);
  }
};

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

      <View style={styles.overlay}>
        <LinearGradient
          colors={['rgba(123, 97, 255, 0.9)', 'rgba(147, 51, 234, 0.9)']}
          style={styles.background}
        >
          <View style={styles.container}>
            <View style={styles.card}>

              {/* Logo */}
              <View style={styles.logoContainer}>
                <View style={styles.logoBackground}>
                  <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Title */}
              <Text style={styles.title}>Join With Us</Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>Connecting Hearts, Changing Lives</Text>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Support Tabs */}
              <View style={styles.toggleContainer}>
                <TouchableOpacity style={[styles.toggleButton,styles.activeToggleButton]}
                onPress={() => navigation.navigate("donee_ind_reg")}>
                  <Text style={styles.activeToggleText}>Individual</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleButton}
                onPress={() => navigation.navigate("donee_rep_reg")}>
                  <Text style={styles.toggleText}>Representative</Text>
                </TouchableOpacity>
              </View>

              {/* Full Name Input */}
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Full Name"
                  style={[styles.input, errors.fullName && { borderColor: 'red' }]}
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (errors.fullName) {
                      setErrors(prev => ({ ...prev, fullName: null }));
                    }
                  }}
                />
              </View>
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

              {/* Contact No Input */}
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Contact No"
                  style={[styles.input, errors.contactno && { borderColor: 'red' }]}
                  placeholderTextColor="#999"
                  value={contactno}
                  onChangeText={(text) => {
                    setContactNo(text);
                    if (errors.contactno) {
                      setErrors(prev => ({ ...prev, contactno: null }));
                    }
                  }}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.contactno && <Text style={styles.errorText}>{errors.contactno}</Text>}

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Password"
                  style={[styles.input, errors.password && { borderColor: 'red' }]}
                  placeholderTextColor="#999"
                  secureTextEntry={secure}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors(prev => ({ ...prev, password: null }));
                    }
                  }}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Ionicons
                    name={secure ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#999"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              {/* Confirm Password Input */}
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Confirm Password"
                  style={[styles.input, errors.confirmPassword && { borderColor: 'red' }]}
                  placeholderTextColor="#999"
                  secureTextEntry={secureConfirm}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) {
                      setErrors(prev => ({ ...prev, confirmPassword: null }));
                    }
                  }}
                />
                <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
                  <Ionicons
                    name={secureConfirm ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#999"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

              {/* Document Upload (Optional for Individual) */}
              <View style={styles.inputWrapper}>
                <Ionicons name="document-outline" size={20} color="#999" style={styles.icon} />
                <TouchableOpacity onPress={pickDocument} style={styles.input}>
                  <Text
                    style={[
                      styles.documentText,
                      { color: proofDocument ? '#000' : '#999' },
                    ]}
                  >
                    {proofDocument ? proofDocument.name : 'Upload Proof Document'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Terms & Conditions Checkbox */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, errors.agreed && { borderColor: 'red' }]}
                  onPress={() => {
                    setAgreed(!agreed);
                    if (errors.agreed) {
                      setErrors(prev => ({ ...prev, agreed: null }));
                    }
                  }}
                >
                  {agreed && <Ionicons name="checkmark" size={14} color="#7B61FF" />}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to <Text style={styles.link}>Terms and Conditions</Text> of Welfair Community
                </Text>
              </View>
              {errors.agreed && <Text style={styles.errorText}>{errors.agreed}</Text>}

              {/* Sign Up Button (CHANGED) */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.loginButton, loading && { opacity: 0.6 }]}
                  onPress={handleSubmit} // Changed from navigation.navigate('login')
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#7B61FF', '#9333EA']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {loading ? 'Creating Account...' : 'Sign Up'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Login Link */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => navigation.navigate('donee_login')}
              >
                <Text style={styles.loginText}>
                  Already have an account?
                  <Text style={styles.loginLink}> Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default DoneeOrg;