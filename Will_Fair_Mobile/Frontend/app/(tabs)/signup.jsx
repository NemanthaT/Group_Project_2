import React from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Required for navigation
import { styles } from '../../assets/styles/signupstyles'; // Adjust the path if necessary

const Signup = ({ visible, onClose, onDonorPress, onDoneePress }) => {
  const navigation = useNavigation();

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
              <Text style={styles.title}>Join with us</Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>Connecting Hearts, Changing Lives</Text>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Question */}
              <Text style={styles.question}>Do you want to register as?</Text>

              {/* Donor Button */}
              <View style={styles.buttonsContainer}>
                 <TouchableOpacity
                    style={[styles.button, styles.donorButton]}
                    onPress={() => navigation.navigate('donor_reg')} 
                    activeOpacity={0.8}
      >
                  <LinearGradient
                    colors={['#7B61FF', '#9333EA']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Donor</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Donee Button */}
                <TouchableOpacity
                  style={[styles.button, styles.doneeButton]}
                  onPress={() => navigation.navigate('donee_ind_reg')} 
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#7B61FF', '#9333EA']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Donee</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Login Link */}
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => navigation.navigate('login')} // Must match your route name
              >
                <Text style={styles.loginText}>
                  Already have a Donor account?
                  <Text style={styles.loginLink}> Login</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => navigation.navigate('donee_login')} // Must match your route name
              >
                <Text style={styles.loginText}>
                  Already have a Donee account?
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

export default Signup;
