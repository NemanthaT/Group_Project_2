import { API_BASE } from '../constants/API';
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/donorreg.styles';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import BackButton from '../components/backbutton'

const GuestUser = ({ visible, onClose, onLoginPress }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // 10 digit phone number
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
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

// Submit to database
const handleSubmit = async () => {
  if (!validateForm()) {
    Alert.alert('Validation Error', 'Please fix the errors before submitting');
    return;
  }

  setLoading(true);
  try {
  const response = await fetch(`${API_BASE}/api/guestuser_reg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Clear form
            setUsername('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            setAgreed(false);
            setErrors({});
            // Navigate to login or close modal
            navigation.navigate('guestuser_login');
          }
        }
      ]);
    } else {
      Alert.alert('Error', data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    Alert.alert('Error', 'Network error. Please try again.');
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
              <BackButton />
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

              {/* Username Input */}
              {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Username"
                  style={[styles.input, errors.username && { borderColor: 'red' }]}
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (errors.username) {
                      setErrors(prev => ({ ...prev, username: null }));
                    }
                  }}
                  autoCapitalize="none"
                />
              </View>

              {/* Email Input */}
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Email"
                  style={[styles.input, errors.email && { borderColor: 'red' }]}
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: null }));
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Phone Input */}
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder="Phone Number"
                  style={[styles.input, errors.phone && { borderColor: 'red' }]}
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    if (errors.phone) {
                      setErrors(prev => ({ ...prev, phone: null }));
                    }
                  }}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              {/* Password Input */}
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
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

              {/* Confirm Password Input */}
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
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

              {/* Terms & Conditions Checkbox */}
              {errors.agreed && <Text style={styles.errorText}>{errors.agreed}</Text>}
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

              {/* Sign Up Button */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.loginButton, loading && { opacity: 0.6 }]}
                  onPress={handleSubmit}
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
                onPress={() => navigation.navigate('guestuser_login')}
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

export default GuestUser;