import React from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Required for navigation
import { styles } from '../../assets/styles/loginstyles'; // Adjust the path if necessary
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


 // Adjust the path if necessary

import { useState } from 'react';

const Signup = ({ visible, onClose, onLoginPress }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

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
              <Text style={styles.title}>Welcome Back</Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>Connecting Hearts, Changing Lives</Text>

              {/* Divider */}
              <View style={styles.divider} />

             

              {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="#999"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
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

        {/*login button */}
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              // onPress={onLoginPress}
              onPress={() => router.push('/(drawer)/homescreen')}

              activeOpacity={0.8}
              >
              <LinearGradient
                colors={['#7B61FF', '#9333EA']}
                style={styles.buttonGradient}
              >
            <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
             </TouchableOpacity>
        </View>
            
              {/* Login Link */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => navigation.navigate('signup')} 
              >
                {/* Signup Link */}
                <Text style={styles.loginText}>
                  Don’t have an account?{' '}
                  <Text
                    style={styles.loginLink}
                    onPress={() => router.push('signup')}
                  >
                    Sign in
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

export default Signup;
