import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { programStyles as styles } from '../../assets/styles/programstyles';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Program = () => {
  const navigation = useNavigation();
    const handleSubmit = () => {
    // You can add form validation here if needed
    // For now, just show success message
    Alert.alert(
      "Success! 🎉",
      "Thank you for your interest in volunteering for this event. Your support is greatly appreciated!",
      [
        {
          text: "OK",
          onPress: () => {
            // Optional: Navigate back to previous screen or clear form
            navigation.navigate("homescreen");
            // Or navigate to a specific screen:
            // navigation.navigate('mydonationreq');
          }
        }
      ]
    );
  };
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
        source={require('../../assets/images/blood.jpg')}
        style={styles.mainImage}
      />

      {/* Location & Category */}
      <View style={styles.locationCategoryRow}>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={16} color="#0047AB" />
          <Text style={styles.locationText}>Colombo</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Blood Donation Camp</Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.locationCategoryRow}>
        <View style={styles.locationRow}>
      <Text style={styles.locationText}>Volunteers Signed: 10</Text>
      <Text style={styles.locationText}>Volunteers Needed: 30</Text>
      </View>
      </View>
  
      <View style={styles.amountRow}>
              <View>
                  <Text style={styles.label}>
                  Date : 2022 -05 -05
                  </Text>
                  <Text style={styles.label}>
                    Time : 9.30 AM - 3.00 PM
                  </Text>
                  <Text style={styles.label}>
                    Venue : Sagra Building Near by Sri Jayawardhanapura University
                  </Text>
                  <Text style={styles.label}>
                    Volunteer Signed : 20
                  </Text>
                  <Text style={styles.label}>
                    Volunteer Needed : 50
                  </Text>
              </View>
              </View>

      {/* Description */}
      <Text style={styles.description}>
       Our local hospitals are facing a critical blood shortage, especially 
       for O-negative and B-positive blood types. This emergency blood donation
        drive is our urgent response to help save lives in our community. Every 
        donation counts and every donor is a lifesaver. The process is safe, simple, 
        and takes less than an hour of your time, but the impact lasts a lifetime for 
        those who receive your gift. Please join us in this life-saving mission and help
         us replenish the blood banks that serve our community&#39;s most vulnerable patients.
      </Text>

      {/* Action Buttons */}
      <Text style={styles.headerSubtitle}>Would you like to volunteer this event ? Please click the volunteer button</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.feedbackButton}
        onPress={handleSubmit}>
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
