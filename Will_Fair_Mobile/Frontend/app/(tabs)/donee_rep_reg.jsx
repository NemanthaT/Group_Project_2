import React from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Required for navigation
import { styles } from '../../assets/styles/donorreg.styles'; // Adjust the path if necessary
import { TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
 // Adjust the path if necessary

import { useState } from 'react';

const Donee = ({ visible, onClose, onLoginPress }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [fullName, setFullName] = useState('');
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Individual');
  const [proofDocument, setProofDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*',copyToCacheDirectory: true,
      multiple: false, });
      if (result.type === 'success') {
        setProofDocument(result);
      }
    } catch (error) {
      console.log('Document pick error:', error);
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
            <TouchableOpacity style={[styles.toggleButton]}
                onPress={() => navigation.navigate("donee_ind_reg")}>
                <Text style={styles.toggleText}>Individual</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toggleButton,styles.activeToggleButton]}
                onPress={() => navigation.navigate("donee_rep_reg")}>
            <Text style={styles.activeToggleText}>Representative</Text>
            </TouchableOpacity>
            </View>

            {/* Question */}
            {/* Full Name Input */}
            <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
                placeholder="Full Name/Orginization Name"
                style={styles.input}
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
            />
            </View>

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

            {/* Confirm Password Input */}
            <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                placeholderTextColor="#999"
                secureTextEntry={secureConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                style={styles.checkbox}
                onPress={() => setAgreed(!agreed)}
            >
            {agreed && <Ionicons name="checkmark" size={14} color="#7B61FF" />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
                I agree to <Text style={styles.link}>Terms and Conditions</Text> of Welfair Community
            </Text>
            </View>

            {/* Sign In Button */}
            <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                // onPress={onLoginPress}
                onPress={() => navigation.navigate('login')} 

                activeOpacity={0.8}
            >
                <LinearGradient
                colors={['#7B61FF', '#9333EA']}
                style={styles.buttonGradient}
                >
                <Text style={styles.buttonText}>Sign In</Text>
                </LinearGradient>
            </TouchableOpacity>
            </View>

            {/* Login Link */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => navigation.navigate('login')} // Must match your route name
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

export default Donee;
