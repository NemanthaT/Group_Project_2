import React from 'react';
import { View, Text, TouchableOpacity, Modal, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Required for navigation
import { styles } from '../../assets/styles/signupstyles'; // Adjust the path if necessary

const FirstPage = ({ visible, onClose, onDonorPress, onDoneePress }) => {
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
              <Text style={styles.title}>Welcome Back</Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>Connecting Hearts, Changing Lives</Text>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Question */}
              <Text style={styles.question}>If you are</Text>

              {/* Donor Button */}
              <View style={styles.buttonsContainer}>
                 <TouchableOpacity
                    style={[styles.button, styles.donorButton]}
                    onPress={() => navigation.navigate('login')} 
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
                  onPress={() => navigation.navigate('donee_login')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#7B61FF', '#9333EA']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Donee</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Volunteer Button */}
                <TouchableOpacity
                  style={[styles.button, styles.volunteerButton]}
                  onPress={() => navigation.navigate('/(drawer)/homescreen')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#7B61FF', '#9333EA']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Volunteer</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default FirstPage;
