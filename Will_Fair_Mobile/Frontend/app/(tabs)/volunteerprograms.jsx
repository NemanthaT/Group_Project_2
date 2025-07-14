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
    raised: '7,000.00',
    target: '60,000.00',
    image: require('../../assets/images/program1.png'),
  },
  {
    id: 2,
    title: 'Wheelchairs at Sathkara Elderly Care Centre',
    raised: '23',
    target: '40',
    image: require('../../assets/images/program2.png'),
  },
  {
    id: 3,
    title: 'Renovations at Early Bird Child Care',
    raised: '7,000.00',
    target: '60,000.00',
    image: require('../../assets/images/program1.png'),
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
        <Text style={styles.heroTitle}>My Donation Requests</Text>
        <Text style={styles.heroSubtitle}>
          Connect with generous donors who want to help your cause
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
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar} />
              <Ionicons
                name="checkmark-circle"
                size={16}
                color="#7B61FF"
                style={styles.checkIcon}
              />
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Raised:</Text>
              <Text style={styles.amountValue}>{item.raised}</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Target:</Text>
              <Text style={styles.amountValue}>{item.target}</Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
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
