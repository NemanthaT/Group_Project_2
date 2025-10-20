import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import { router } from 'expo-router';
import { API_BASE } from '../constants/API';

const RequestView = () => {  
  const navigation = useNavigation();
  
  // Removed filter states

  // Backend data state
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);


  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = showAll ? '/api/donations/all' : '/api/donations/recent';
        const response = await fetch(`${API_BASE}${endpoint}`);
        const data = await response.json();
        if (data.success && Array.isArray(data.donations)) {
          // Sort by latest due date descending
          const sorted = [...data.donations].sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
          // Show all requests
          const mapped = sorted.map((item) => ({
            id: item.request_id,
            title: item.title,
            image_url: item.image_url, // Full URL from backend (based on category)
            raised: item.quantity_received,
            target: item.quantity_needed,
            due_date: item.due_date,
            status: getStatus(item),
            type: getType(item),
            category: item.category || item.category_name || '',
          }));
          setAllRequests(mapped);
        } else {
          setAllRequests([]);
        }
      } catch (_err) {
        setError('Failed to load requests');
        setAllRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
    // eslint-disable-next-line
  }, [showAll]);

  function getStatus(item) {
    if (item.quantity_received >= item.quantity_needed) return 'Completed';
    return 'Active';
  }
  function getType(item) {
    return item.type || 'Non-Monetary';
  }

  // Show all requests directly
  const filteredRequests = allRequests;

  const renderCard = (item) => {
    const progress = item.target > 0 ? (item.raised / item.target) * 100 : 0;
    const isMoney = item.type === 'Monetary';
    
    // Only use image_url from backend, no fallback
    const imageSource = item.image_url ? { uri: item.image_url } : null;
    if (item.image_url) {
      console.log('Image URL:', item.image_url);
    }
    
    const isCompleted = Number(item.raised) >= Number(item.target);
    const isPastDeadline = item.due_date && new Date(item.due_date) < new Date();
    const donateDisabled = isCompleted || isPastDeadline;
    return (
      <View key={item.id} style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        width: 320,
        alignSelf: 'center',
      }}>
        <View style={{ position: 'relative', marginBottom: 12 }}>
          {imageSource && (
            <Image source={imageSource} style={{
              width: '100%',
              height: 160,
              borderRadius: 12,
              resizeMode: 'cover',
            }} />
          )}
          {/* Type badge (top right) */}
          <View style={{
            position: 'absolute',
            right: 12,
            top: 12,
            backgroundColor: isMoney ? '#0e1fb0ff' : '#0e1fb0ff', // purple for non-monetary
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 4,
            zIndex: 2,
          }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>{item.type}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{item.title}</Text>
        {/* Removed status badge */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 14, color: '#333', marginRight: 16 }}>
            {isMoney
              ? `Target: Rs. ${Number(item.target).toLocaleString('en-US')}.00`
              : `Target: ${item.target} items`}
          </Text>
          <Text style={{ fontSize: 14, color: '#333' }}>
            {isMoney
              ? `Received: Rs. ${Number(item.raised).toLocaleString('en-US')}.00`
              : `Received: ${item.raised} items`}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="calendar-outline" size={18} color="#b61919ff" style={{ marginRight: 4 }} />
          <Text style={{ color: '#b61919ff', fontSize: 14, fontWeight: 'bold' }}>
            Deadline: {item.due_date ? new Date(item.due_date).toLocaleDateString() : 'N/A'}
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
          <TouchableOpacity
            style={{
              backgroundColor: donateDisabled ? '#A0AEC0' : '#7B61FF',
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flex: 1,
              marginRight: 8,
            }}
            onPress={() => {
              if (donateDisabled) return;
              if ((item.type || '').toLowerCase() === 'monetary') {
                router.push({ pathname: '/(drawer)/donation_payment_new', params: { requestId: item.id } });
              } else {
                router.push({ pathname: '/(drawer)/non_monetary_donation', params: { requestId: item.id } });
              }
            }}
            disabled={donateDisabled}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
              {isCompleted ? 'Completed' : isPastDeadline ? 'Deadline Passed' : 'Donate Now'}
            </Text>
          </TouchableOpacity>
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
            onPress={() => router.push({ pathname: '/(drawer)/requestview_ind', params: { requestId: item.id } })}
          >
            <Text style={{ color: '#7B61FF', fontWeight: 'bold', textAlign: 'center' }}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#7B61FF", "#7B61FF"]}
        style={styles.header}
      >
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
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.headerTitle}>Make a Donation</Text>
        <Text style={styles.headerSubtitle}>
          Connect with generous donors who want to help your cause
        </Text>
      </LinearGradient>
      {/* Removed filter row UI */}
      <View style={styles.resultsContainer}>
        {loading ? (
          <Text style={styles.resultsText}>Loading requests...</Text>
        ) : error ? (
          <Text style={[styles.resultsText, { color: 'red' }]}>{error}</Text>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.resultsText}>
              Showing {filteredRequests.length} of {allRequests.length} requests
            </Text>
            <TouchableOpacity
              onPress={() => setShowAll((prev) => !prev)}
              style={{ marginLeft: 12 }}
            >
              <Text style={{ color: '#7B61FF', textDecorationLine: 'underline', fontWeight: 'bold' }}>
                {showAll ? 'Show Recent' : 'View All'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {loading ? (
        <View style={styles.noResultsContainer}>
          <Ionicons name="time-outline" size={48} color="#ccc" />
          <Text style={styles.noResultsText}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.noResultsContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#821010ff" />
          <Text style={styles.noResultsText}>Error loading requests</Text>
          <Text style={styles.noResultsSubtext}>{error}</Text>
        </View>
      ) : filteredRequests.length > 0 ? (
        filteredRequests.map((item) => renderCard(item))
      ) : (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={48} color="#ccc" />
          <Text style={styles.noResultsText}>No requests found</Text>
          <Text style={styles.noResultsSubtext}>Try adjusting your filters</Text>
        </View>
      )}
  {/* Removed TypeDropdown and StatusDropdown */}
    </ScrollView>
  );
};

export default RequestView;