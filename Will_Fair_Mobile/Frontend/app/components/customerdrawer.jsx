import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useUser } from '../contexts/UserContext';

export default function CustomDrawer(props) {
  const router = useRouter();
  const { user, logout } = useUser();
  const [username, setUsername] = React.useState('');
  const [userType, setUserType] = React.useState(''); // donor or donee

  React.useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Try 'userData' first (used by saveUserData function), then fall back to 'user'
        let userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          userData = await AsyncStorage.getItem('user');
        }
        
        console.log('=== DRAWER DEBUG ===');
        console.log('Raw userData from AsyncStorage:', userData);
        
        if (userData) {
          const user = JSON.parse(userData);
          console.log('Parsed user object:', user);
          console.log('User type:', user.user_type);
          
          setUsername(user.firstName || user.first_name || user.username || 'User');
          setUserType(user.user_type || 'donor'); // Default to donor if not specified
          
          console.log('Setting userType to:', user.user_type || 'donor');
        } else {
          console.log('No user data found in AsyncStorage');
          setUsername('User');
          setUserType('donor');
        }
      } catch (error) {
        console.error('Error reading user data:', error);
        setUsername('User');
        setUserType('donor');
      }
    };
    fetchUsername();
  }, []);

  const navigateTo = (route) => {
    router.push(route);
    props.navigation.closeDrawer();
  };

  const handleLogout = async () => {
    await logout();
    navigateTo('/(tabs)/firstpage');
  };

  // Get display name from user object
  // const username = user?.name || user?.firstName || user?.username || 'User';

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Image
            source={require('../../assets/images/profile.jpg')} // 🔁 Use your image path here
            style={styles.profileImage}
          />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.userTypeLabel}>
            {userType === 'donee' ? '👤 Donee' : '💰 Donor'}
          </Text>
      </View>

      <View style={styles.menuItems}>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/homescreen')} style={styles.menuButton}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        
        {/* Show for DONEES only */}
        {userType === 'donee' && (
          <>
            <TouchableOpacity onPress={() => navigateTo('/(drawer)/monetory')} style={styles.menuButton}>
              <Text style={styles.menuText}>Donation Request Form</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/(drawer)/mydonationreq')} style={styles.menuButton}>
              <Text style={styles.menuText}>My Donation Requests</Text>
            </TouchableOpacity>
          </>
        )}
        
        {/* Show for DONORS only */}
        {userType === 'donor' && (
          <TouchableOpacity onPress={() => navigateTo('/(drawer)/request_view')} style={styles.menuButton}>
            <Text style={styles.menuText}>View Donations</Text>
          </TouchableOpacity>
        )}
        
        {/* Show for BOTH */}
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/events/events')} style={styles.menuButton}>
          <Text style={styles.menuText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/profile')} style={styles.menuButton}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B61FF', // gradient-like color
    paddingTop: 100,
    paddingHorizontal: 15,
    width:'100%',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  username: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  userTypeLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  menuItems: {
    marginTop: 10,
  },
  label: {
    color: '#fff',
    marginTop: 0,
  },
  menuButton: {
    backgroundColor: '#fbfaffff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginBottom: 5,
  },
  menuText: {
    color: '#000000ff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
 logoutButton: {
    backgroundColor: '#fbfaffff',
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    width: '60%',
    marginBottom: 30,
    marginTop: 50,
  },
  logoutText: {
    color: '#000000ff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
