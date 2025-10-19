import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../constants/API';

const MyDonationReq = () => {  
  const navigation = useNavigation();
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserDataAndFetchRequests();
  }, []);

  const loadUserDataAndFetchRequests = async () => {
    try {
      // Get user data from AsyncStorage
      let userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        userDataString = await AsyncStorage.getItem('user');
      }

      if (!userDataString) {
        Alert.alert('Error', 'Please login to view your donation requests');
        router.replace('/(tabs)/firstpage');
        return;
      }

      const user = JSON.parse(userDataString);
      setUserData(user);
      
      // Check if user is a donee
      if (user.user_type !== 'donee') {
        Alert.alert('Access Denied', 'Only donees can view donation requests', [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]);
        return;
      }

      console.log('Fetching requests for donee_id:', user.donee_id);
      console.log('API URL:', `${API_BASE}/api/donations/my/${user.donee_id}`);

      // Fetch donation requests from backend
      const response = await fetch(`${API_BASE}/api/donations/my/${user.donee_id}`);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('API Response:', data);

      if (data.success && data.donations) {
        console.log('Successfully loaded', data.donations.length, 'requests');
        setAllRequests(data.donations);
      } else {
        console.error('Failed to fetch donation requests:', data.error || data.message);
        setAllRequests([]);
      }
    } catch (error) {
      console.error('Error loading donation requests:', error);
      Alert.alert('Error', 'Failed to load donation requests');
      setAllRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Show all requests for the logged-in user
  const filteredRequests = allRequests;

  const renderCard = (item) => {
    const raised = Number(item.quantity_received) || 0;
    const target = Number(item.quantity_needed) || 1;
    const progress = target > 0 ? (raised / target) * 100 : 0;
    // Handle both 'monetary' and 'Monetary' for type comparison
    const isMoney = item.type?.toLowerCase() === 'monetary';

    // Get status badge color
    const getStatusColor = (status) => {
      const statusLower = status?.toLowerCase() || 'pending';
      switch (statusLower) {
        case 'pending':
          return '#FF9800'; // Orange
        case 'active':
          return '#4CAF50'; // Green
        case 'completed':
          return '#2196F3'; // Blue
        case 'rejected':
          return '#F44336'; // Red
        default:
          return '#9E9E9E'; // Gray
      }
    };

    return (
      <View key={item.request_id} style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        marginHorizontal: 8,
        elevation: 3,
        width: 320,
        alignSelf: 'center',
      }}>
        <View style={{ position: 'relative', marginBottom: 12 }}>
          {item.image_url ? (
            <Image 
              source={{ uri: item.image_url }} 
              style={{
                width: '100%',
                height: 160,
                borderRadius: 12,
                resizeMode: 'cover',
              }} 
            />
          ) : (
            <View style={{
              width: '100%',
              height: 160,
              borderRadius: 12,
              backgroundColor: '#E0E0E0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Ionicons name="image-outline" size={48} color="#999" />
            </View>
          )}
          {/* Status Badge */}
          <View style={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: getStatusColor(item.status),
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', textTransform: 'capitalize' }}>
              {item.status || 'Pending'}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{item.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {/* Category */}
          <Text style={{ fontSize: 14, color: '#666', marginRight: 8 }}>{item.category}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 14, color: '#333', marginRight: 16 }}>
            {isMoney
              ? `Target: Rs. ${target.toLocaleString('en-US')}.00`
              : `Target: ${target} items`}
          </Text>
          <Text style={{ fontSize: 14, color: '#333' }}>
            {isMoney
              ? `Raised: Rs. ${raised.toLocaleString('en-US')}.00`
              : `Collected: ${raised} items`}
          </Text>
        </View>
        <View style={{ height: 8, backgroundColor: '#eee', borderRadius: 4, marginBottom: 8, overflow: 'hidden' }}>
          <View style={{
            height: 8,
            width: `${progress}%`,
            backgroundColor: isMoney ? '#7B61FF' : '#7B61FF',
            borderRadius: 4,
          }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          {/* Edit Button - Only enabled for pending status */}
          <TouchableOpacity
            style={{
              backgroundColor: item.status?.toLowerCase() === 'pending' ? '#7B61FF' : '#CCCCCC',
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flex: 1,
              marginRight: 8,
              opacity: item.status?.toLowerCase() === 'pending' ? 1 : 0.6,
            }}
            onPress={() => {
              if (item.status?.toLowerCase() === 'pending') {
                router.push(`/mydonationreq_ind?id=${item.request_id}`);
              }
            }}
            disabled={item.status?.toLowerCase() !== 'pending'}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
              Edit
            </Text>
          </TouchableOpacity>
          {/* View Button - Always enabled */}
          <TouchableOpacity
            style={{
              borderColor: '#7B61FF',
              borderWidth: 2,
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flex: 1,
              marginLeft: 8,
            }}
            onPress={() => router.push(`/mydonationreq_ind?id=${item.request_id}`)}
          >
            <Text style={{ color: '#7B61FF', fontWeight: 'bold', textAlign: 'center' }}>
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#7B61FF" }]}>
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
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
       
        <Text style={styles.headerTitle}>My Donation Requests</Text>
        <Text style={styles.headerSubtitle}>
          Connect with generous donors who want to help your cause
        </Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 100 }}>
          <ActivityIndicator size="large" color="#7B61FF" />
          <Text style={{ marginTop: 12, color: '#666' }}>Loading your requests...</Text>
        </View>
      ) : (
        <>
          {/* Results Count and New Request Button */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingHorizontal: 20, 
            paddingVertical: 16,
            backgroundColor: '#f5f5f5'
          }}>
            <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>
              Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
            </Text>
            <TouchableOpacity 
              style={{
                backgroundColor: '#7B61FF',
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
              onPress={() => navigation.navigate('monetory')}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>+ New Request</Text>
            </TouchableOpacity>
          </View>

          {/* Request Cards */}
          {filteredRequests.length > 0 ? (
            filteredRequests.map((item) => renderCard(item))
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="document-outline" size={48} color="#ccc" />
              <Text style={styles.noResultsText}>No requests found</Text>
              <Text style={styles.noResultsSubtext}>Create your first donation request</Text>
              <TouchableOpacity 
                style={{
                  backgroundColor: '#7B61FF',
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginTop: 16,
                }}
                onPress={() => navigation.navigate('monetory')}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Create Request</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default MyDonationReq;