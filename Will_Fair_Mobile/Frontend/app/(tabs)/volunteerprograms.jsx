import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { volunteerProgramStyles as styles } from '../../assets/styles/volunteerprogramstyles';

const donationRequests = [
  {
    id: 1,
    title: 'Renovations at Early Bird Child Care',
    about: 'Help us renovate the Early Bird Child Care center to create a better environment for our children.',
    image: require('../../assets/images/volunteer.png'),
  },
  {
    id: 2,
    title: 'Wheelchairs at Sathkara Elderly Care Centre',
    about: 'Help us renovate the Early Bird Child Care center to create a better environment for our children.',
    image: require('../../assets/images/volunteer.png'),
  },
  {
    id: 3,
    title: 'Renovations at Early Bird Child Care',
    about: 'Help us renovate the Early Bird Child Care center to create a better environment for our children.',
    image: require('../../assets/images/volunteer.png'),
  },
];

const VolunteerPrograms = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#7B61FF', '#9333EA']} style={styles.hero}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Ionicons name="menu-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heroTitle}>Volunteer with Purpose</Text>
        <Text style={styles.heroSubtitle}>
          Make an impact by giving your time where it matters most.
        </Text>
      </LinearGradient>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Type ▾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Status ▾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newRequestButton}>
          <Ionicons name="add" size={16} color="#fff" />
          <Text style={styles.newRequestText}>New Request</Text>
        </TouchableOpacity>
      </View>

      {donationRequests.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            
            <View style={styles.aboutRow}>
              <Text style={styles.aboutLabel}>About:</Text>
              <Text style={styles.aboutValue}>{item.about}</Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default VolunteerPrograms;
