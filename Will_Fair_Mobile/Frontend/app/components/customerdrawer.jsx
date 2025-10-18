import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '../contexts/UserContext';

export default function CustomDrawer(props) {
  const router = useRouter();
  const { user, logout } = useUser();

  const navigateTo = (route) => {
    router.push(route);
    props.navigation.closeDrawer();
  };

  const handleLogout = async () => {
    await logout();
    navigateTo('/(tabs)/firstpage');
  };

  // Get display name from user object
  const username = user?.name || user?.firstName || user?.username || 'User';

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Image
            source={require('../../assets/images/profile.jpg')} // 🔁 Use your image path here
            style={styles.profileImage}
          />
          <Text style={styles.username}>{username}</Text>
          {user?.email && <Text style={styles.userEmail}>{user.email}</Text>}
      </View>

      <View style={styles.menuItems}>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/homescreen')} style={styles.menuButton}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/monetory')} style={styles.menuButton}>
          <Text style={styles.menuText}>Donee - Donation Request</Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => navigateTo('/(drawer)/mydonationreq')} style={styles.menuButton}>
          <Text style={styles.menuText}>My Donation Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/request_view')} style={styles.menuButton}>
          <Text style={styles.menuText}>Donor - Requests View </Text>
        </TouchableOpacity>
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
  userEmail: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    opacity: 0.9,
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
