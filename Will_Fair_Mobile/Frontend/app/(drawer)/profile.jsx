import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Try 'userData' first, then fall back to 'user'
      let userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        userDataString = await AsyncStorage.getItem('user');
      }

      console.log('Profile - Raw user data:', userDataString);

      if (userDataString) {
        const user = JSON.parse(userDataString);
        console.log('Profile - Parsed user:', user);
        setUserData(user);
        setUserType(user.user_type || 'donor');
      } else {
        Alert.alert('Error', 'No user data found. Please login again.');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userData');
              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('authToken');
              console.log('User logged out successfully');
              router.replace('/(tabs)/firstpage');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality coming soon!');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B61FF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
        <Text style={styles.errorText}>No user data found</Text>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.replace('/(tabs)/firstpage')}
        >
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Gradient */}
      <LinearGradient colors={['#7B61FF', '#9333EA']} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuButton}
        >
          <Ionicons name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.profileHeaderContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/images/profile.jpg')}
              style={styles.avatar}
            />
            <View style={styles.userTypeBadge}>
              <Text style={styles.userTypeBadgeText}>
                {userType === 'donee' ? '👤 Donee' : '💰 Donor'}
              </Text>
            </View>
          </View>

          <Text style={styles.userName}>
            {userData.first_name || userData.firstName || ''} {userData.last_name || userData.lastName || ''}
          </Text>

          <Text style={styles.userContact}>
            {userData.email || userData.phone || 'No contact info'}
          </Text>
        </View>
      </LinearGradient>

      {/* Profile Information Cards */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        {/* Account Type Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-circle-outline" size={24} color="#7B61FF" />
            <Text style={styles.cardTitle}>Account Type</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>
              {userType === 'donee' ? 'Donee (Recipient)' : 'Donor (Contributor)'}
            </Text>
          </View>
        </View>

        {/* Contact Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="mail-outline" size={24} color="#7B61FF" />
            <Text style={styles.cardTitle}>Contact Information</Text>
          </View>
          <View style={styles.cardContent}>
            {userData.email && (
              <>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{userData.email}</Text>
              </>
            )}
            {userData.phone && (
              <>
                <Text style={styles.infoLabel}>Phone Number</Text>
                <Text style={styles.infoValue}>{userData.phone}</Text>
              </>
            )}
            {!userData.email && !userData.phone && (
              <Text style={styles.infoValue}>No contact information available</Text>
            )}
          </View>
        </View>

        {/* User ID Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="card-outline" size={24} color="#7B61FF" />
            <Text style={styles.cardTitle}>Account Details</Text>
          </View>
          <View style={styles.cardContent}>
            {userData.donor_id && (
              <>
                <Text style={styles.infoLabel}>User ID</Text>
                <Text style={styles.infoValue}>{userData.donor_id}</Text>
              </>
            )}
            {userData.donee_id && (
              <>
                <Text style={styles.infoLabel}>Donee ID</Text>
                <Text style={styles.infoValue}>{userData.donee_id}</Text>
              </>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Debug Information (Optional - can be removed in production) */}
        {__DEV__ && (
          <View style={styles.debugCard}>
            <Text style={styles.debugTitle}>Debug Info</Text>
            <Text style={styles.debugText}>
              {JSON.stringify(userData, null, 2)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#7B61FF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  profileHeaderContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  userTypeBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#7B61FF',
  },
  userTypeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7B61FF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userContact: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  cardContent: {
    paddingTop: 5,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#7B61FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  debugCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
});

export default Profile;
