import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { programStyles as styles } from '../../assets/styles/programstyles';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Program = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
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

        <Image
          source={require('../../assets/images/logo-white.png')}
          style={styles.headerLogo}
        />
        <Text style={styles.headerTitle}>Renovations at Early Bird Child Care</Text>
      </LinearGradient>

      {/* Image */}
      <Image
        source={require('../../assets/images/volunteer.png')}
        style={styles.mainImage}
      />

      {/* Location & Category */}
      <View style={styles.locationCategoryRow}>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={16} color="#0047AB" />
          <Text style={styles.locationText}>Karapitiya</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Education</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressFill, { width: '12%' }]} />
        </View>
        <View style={styles.progressKnob}>
            <MaterialIcons name="check" size={16} color="#5600abff" />
        </View>
      </View>

      {/* Raised/Target */}
      <View style={styles.amountRow}>
        <View>
          <Text style={styles.label}>Raised: <Text style={styles.value}>7,000.00</Text></Text>
          <Text style={styles.label}>Target: <Text style={styles.value}>60,000.00</Text></Text>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>Active</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Early Bird Child Care is in need of essential renovations to provide a safer,
        more engaging, and nurturing environment for our children. With your generous support,
        we aim to upgrade classrooms, improve play areas, and ensure our facilities meet
        the highest standards of care and learning. Every contribution brings us closer
        to giving these young learners the bright and supportive space they deserve.
      </Text>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.feedbackButton}>
          <Text style={styles.headerTitle}>Would you like to volunteer that event ? Please click the volunteer button</Text>
          <Text style={styles.feedbackText}>Volunteer</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton}>
          <Ionicons name="trash-outline" size={16} color="#fff" />
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default Program;
