import React from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/loginstyles';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import BackButton from '../components/backbutton'


const Login = ({ visible, onClose, onLoginPress }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
 // Handle login
const handleLogin = async () => {
  if (!validateForm()) {
    Alert.alert('Validation Error', 'Please fix the errors before submitting');
    return;
  }

  setLoading(true);
  try {
    console.log('Attempting login...');
    
    const response = await fetch('http://192.168.197.72:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.log('Non-JSON response:', textResponse);
      Alert.alert('Server Error', 'Server returned an unexpected response');
      return;
    }

    const data = await response.json();
    console.log('Login response:', data);

    if (response.ok) {
      Alert.alert('Success', `Welcome back, ${data.user.firstName}!`, [
        {
          text: 'OK',
          onPress: () => {
            // Clear form
            setEmail('');
            setPassword('');
            setErrors({});
            // Navigate to home screen
            router.push('/(drawer)/homescreen');
          }
        }
      ]);
    } else {
      Alert.alert('Login Failed', data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
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
              <Text style={styles.title}>Welcome Back</Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>Connecting Hearts, Changing Lives</Text>

              {/* Divider */}
              <View style={styles.divider} />

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

              {/* Login button */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.loginButton, loading && { opacity: 0.6 }]}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#7B61FF', '#9333EA']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {loading ? 'Logging in...' : 'Login'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
                
              {/* Signup Link */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => navigation.navigate('donor_reg')} 
              >
                <Text style={styles.loginText}>
                  Don&#39;t have an account?{' '}
                  <Text
                    style={styles.loginLink}
                    onPress={() => router.push('donor_reg')}
                  >
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default Login;