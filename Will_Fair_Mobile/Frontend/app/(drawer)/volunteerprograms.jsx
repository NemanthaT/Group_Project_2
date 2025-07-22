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
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { volunteerProgramStyles as styles } from '../../assets/styles/volunteerprogramstyles';
import { MaterialIcons } from '@expo/vector-icons'; // add this import at the top with others

const donationRequests = [
  {
    id: 1,
    title: 'Blood Donation Camp',
    about: 'Help us to save a life by donating blood. Your contribution can make a significant difference in the lives of those in need.',
    image: require('../../assets/images/blood.jpg'),
  },
  {
    id: 2,
    title: 'Cleaning at Sathkara Elderly Care Centre',
    about: 'Join us in making a difference at the Sathkara Elderly Care Centre by participating in our cleaning and maintenance program. ',
    image: require('../../assets/images/volunteer.png'),
  },
  {
    id: 3,
    title: 'Shramadana at Pet Centre',
    about: 'Join us for a Shramadana (community service) event at the Pet Centre, where we will help care for and clean the facilities for our furry friends.',
    image: require('../../assets/images/volunteer.png'),
  },
];

const VolunteerPrograms = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#7B61FF', '#9333EA']} style={styles.header}>
        <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 5,
            }}
          >
            <Ionicons name="menu-outline" size={30} color="#fff" />
          </TouchableOpacity>
        <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.headerTitle}>Volunteer with Purpose</Text>
        <Text style={styles.headerSubtitle}>
          Make an impact by giving your time where it matters most.
        </Text>
      </LinearGradient>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Sort by ▾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Type ▾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>category ▾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Status ▾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Location ▾</Text>
        </TouchableOpacity>
      </View>

    {donationRequests.map((item) => (
      <View key={item.id} style={styles.card}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <MaterialIcons name="location-on" size={16} color="#0047AB" />
              <Text style={styles.locationText}>
                Panadura
              </Text>
            </View>
            <View style={styles.badgeBackground}>
              <Text style={styles.badgeText}>Volunteer</Text>
            </View>
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>About:</Text>
            <Text style={styles.aboutValue} numberOfLines={2} ellipsizeMode="tail">{item.about}</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigation.navigate('program', {
                programId: item.id,
                programTitle: item.title,
                programAbout: item.about,
                programImage: item.image,
                programLocation: 'Panadura',
                programCategory: 'Volunteer'
              })}
            >
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.donateButton}>
              <Text style={styles.donateButtonText}>Donate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ))}
    </ScrollView>
  );
};

export default VolunteerPrograms;
