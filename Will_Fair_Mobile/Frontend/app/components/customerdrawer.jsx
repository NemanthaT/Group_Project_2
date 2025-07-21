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

export default function CustomDrawer(props) {
  const router = useRouter();

  const navigateTo = (route) => {
    router.push(route);
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Image
            source={require('../../assets/images/program1.png')} // 🔁 Use your image path here
            style={styles.profileImage}
          />
          <Text style={styles.username}>Ms. Kawmini</Text>
      </View>

      <View style={styles.menuItems}>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/homescreen')} style={styles.menuButton}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/monetory')} style={styles.menuButton}>
          <Text style={styles.menuText}>Donation</Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => navigateTo('/(drawer)/mydonationreq')} style={styles.menuButton}>
          <Text style={styles.menuText}>My Donation Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/volunteerprograms')} style={styles.menuButton}>
          <Text style={styles.menuText}>Programs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('/(drawer)/marketplace')} style={styles.menuButton}>
          <Text style={styles.menuText}>Marketplace</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo({ pathname: '/(drawer)/homescreen', params: { scrollTo: 'about' } })} style={styles.menuButton}>
        <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo({ pathname: '/(drawer)/homescreen', params: { scrollTo: 'contact' } })} style={styles.menuButton}>
        <Text style={styles.menuText}>Contact Us</Text>
      </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigateTo('/(tabs)/firstpage')}>
          <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a46ffff', // gradient-like color
    paddingTop: 40,
    paddingHorizontal: 15,
    width:'100%',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
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
  menuItems: {
    marginTop: 10,
  },
  menuButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuText: {
    color: '#9333EA',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
 logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
    width: '60%',
    marginBottom: 30,
    marginTop: 10,
  },
  logoutText: {
    color: '#FF5252',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
