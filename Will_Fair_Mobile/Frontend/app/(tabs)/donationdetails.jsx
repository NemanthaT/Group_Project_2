import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { donationStyles } from '../../assets/styles/donationstyles';

const DonationDetails = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Impact');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Details':
        return (
          <View style={donationStyles.tabContent}>
            <Text style={donationStyles.sectionTitle}>About the Project:</Text>
            <Text style={donationStyles.text}>Early Bird Child Care has served our community for over 15 years, providing safe and nurturing care for children aged 2–6. The facility urgently needs renovations to maintain a healthy and inspiring learning environment.</Text>
            <Text style={donationStyles.sectionTitle}>What the funds will cover:</Text>
            <Text style={donationStyles.text}>- Repairing broken windows and doors for child safety</Text>
            <Text style={donationStyles.text}>- Repainting classrooms and play areas with non-toxic paint</Text>
            <Text style={donationStyles.text}>- Replacing old flooring with safe, slip-resistant materials</Text>
            <Text style={donationStyles.text}>- Upgrading outdoor play equipment</Text>
            <Text style={donationStyles.sectionTitle}>Total target:</Text>
            <Text style={donationStyles.text}>40 donations — 23 received so far.</Text>
            <Text style={donationStyles.sectionTitle}>How this helps:</Text>
            <Text style={donationStyles.text}>Your support ensures that young children have a safe, clean, and welcoming place to learn and grow.</Text>
          </View>
        );
      case 'Impact':
        return (
          <View style={donationStyles.tabContent}>
            <Text style={donationStyles.sectionTitle}>Who benefits:</Text>
            <Text style={donationStyles.text}>35–40 children currently enrolled will have safer, brighter classrooms. Teachers will have a healthier workspace. Parents can have peace of mind knowing their children are cared for in a secure setting.</Text>
            <Text style={donationStyles.sectionTitle}>What will change:</Text>
            <Text style={donationStyles.text}>Safer spaces reduce the risk of injuries. Improved facilities boost early childhood learning and development. The child care center can serve more families for years to come.</Text>
            <Text style={donationStyles.sectionTitle}>Long-term benefits:</Text>
            <Text style={donationStyles.text}>Renovations will extend the life of the building by 10+ years and help the center stay licensed and compliant with safety standards.</Text>
          </View>
        );
      case 'Updates':
        return (
          <View style={donationStyles.tabContent}>
            <Text style={donationStyles.sectionTitle}>Recent Updates:</Text>
            <Text style={donationStyles.text}>May 10: Fundraising campaign launched! 23 out of 40 donations received so far.</Text>
            <Text style={donationStyles.text}>June 2: New paint and flooring materials ordered. Work scheduled to begin on June 15.</Text>
            <Text style={donationStyles.text}>June 20: Painting completed in two classrooms. Children are excited about their bright new space!</Text>
            <Text style={donationStyles.text}>July 5: Playground equipment delivery delayed due to weather. New expected date: July 12.</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView style={donationStyles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#9333EA", "#2622A8"]} style={donationStyles.header}>
        <Image
          source={require('../../assets/images/logo-white.png')}
          style={donationStyles.logo}
          resizeMode="contain"
        />
        <Text style={donationStyles.title}>Renovations at Early Bird Child Care</Text>
      </LinearGradient>

      {/* Image */}
      <Image
        source={require('../../assets/images/program2.png')}
        style={donationStyles.mainImage}
        resizeMode="cover"
      />

      {/* Progress */}
      <View style={donationStyles.progressBarWrapper}>
        <View style={donationStyles.progressBarBackground}>
          <View style={[donationStyles.progressBarFill, { width: '57%' }]} />
        </View>
        <Ionicons name="checkmark-circle" size={20} color="#B2C8FF" style={{ marginLeft: 4 }} />
      </View>
      <View style={donationStyles.statusRow}>
        <View>
          <Text style={donationStyles.statusText}><Text style={donationStyles.bold}>Received:</Text> 23</Text>
          <Text style={donationStyles.statusText}><Text style={donationStyles.bold}>Target:</Text> 40</Text>
        </View>
        <View style={donationStyles.activePill}><Text style={donationStyles.activeText}>Active</Text></View>
      </View>

      {/* Tabs */}
      <View style={donationStyles.tabRow}>
        {['Details', 'Impact', 'Updates'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[donationStyles.tabButton, activeTab === tab && donationStyles.activeTab]}
          >
            <Text style={[donationStyles.tabText, activeTab === tab && donationStyles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Buttons */}
      <View style={donationStyles.buttonRow}>
        <LinearGradient colors={["#9333EA", "#7B61FF"]} style={donationStyles.gradientButton}>
          <TouchableOpacity><Text style={donationStyles.buttonText}>Donate Now</Text></TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={["#9333EA", "#7B61FF"]} style={donationStyles.gradientButton}>
          <TouchableOpacity><Text style={donationStyles.buttonText}>View Proof</Text></TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default DonationDetails;