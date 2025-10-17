import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import { router } from 'expo-router';

const RequestView = () => {  
  const navigation = useNavigation();
  
  // Filter states
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Backend data state
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Platform-aware API base URL
  const API_BASE = Platform.select({
    android: 'http://192.168.122.72:5000',
    ios: 'http://localhost:5000',
    default: 'http://localhost:5000',
  });

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = showAll ? '/api/donations/all' : '/api/donations/recent';
        const response = await fetch(`${API_BASE}${endpoint}`);
        const data = await response.json();
        if (data.success && Array.isArray(data.donations)) {
          const mapped = data.donations.map((item) => ({
            id: item.request_id,
            title: item.title,
            image_path: item.image_path,
            raised: item.quantity_received,
            target: item.quantity_needed,
            due_date: item.due_date,
            status: getStatus(item),
            type: getType(item),
            category: item.category || 'General',
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
    if (!item.due_date) return 'Active';
    const due = new Date(item.due_date);
    const now = new Date();
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    if (diff < 2) return 'Urgent';
    if (item.quantity_received >= item.quantity_needed) return 'Completed';
    return 'Active';
  }
  function getType(item) {
    // You can adjust this logic if you have monetary requests
    return 'Non-Monetary';
  }

  // Filter requests based on selected type and status
  const getFilteredRequests = () => {
    return allRequests.filter(request => {
      const typeMatch = selectedType === 'All' || request.type === selectedType;
      const statusMatch = selectedStatus === 'All' || request.status === selectedStatus;
      return typeMatch && statusMatch;
    });
  };

  const filteredRequests = getFilteredRequests();

  // Type filter options
  const typeOptions = ['All', 'Monetary', 'Non-Monetary'];
  
  // Status filter options
  const statusOptions = ['All', 'Active', 'In Review', 'Urgent', 'Completed'];

  const renderCard = (item) => {
    const progress = item.target > 0 ? (item.raised / item.target) * 100 : 0;
    const isMoney = item.type === 'Monetary';
    let imageSource = require('../../assets/images/child.jpg');
    if (item.image_path) {
      if (item.image_path.startsWith('http')) {
        imageSource = { uri: item.image_path };
      } else {
        imageSource = { uri: `../../assets/images/child.jpg` };
        console.log('Image URL:', imageSource.uri);
      }
    }
    return (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardImageWrapper}>
          <Image source={imageSource} style={styles.cardImage} />
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "Urgent" ? "#FF4444" :
                  item.status === "Active" ? "#4CAF50" :
                  item.status === "Completed" ? "#2196F3" : "#9333EA",
              },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <View style={[styles.typeBadge, {
            backgroundColor: isMoney ? '#FFB800' : '#00BCD4'
          }]}> 
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.amountText}>
            {isMoney ? 
              `Raised: Rs. ${item.raised?.toLocaleString?.() ?? item.raised}.00` :
              `Collected: ${item.raised} items`
            }
          </Text>
          <Text style={styles.amountText}>
            {isMoney ? 
              `Target: Rs. ${item.target?.toLocaleString?.() ?? item.target}.00` :
              `Target: ${item.target} items`
            }
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { 
            width: `${progress}%`,
            backgroundColor: isMoney ? '#7B61FF' : '#00BCD4'
          }]} />
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.editButton, {
              backgroundColor: isMoney ? '#7B61FF' : '#00BCD4'
            }]}
            onPress={() => {
              if (isMoney) {
                router.push('/(drawer)/donation_payment');
              } else {
                router.push('/(drawer)/donationform');
              }
            }}
          >
            <Text style={styles.editText}>
              {isMoney ? 'Donate Money' : 'Donate Items'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => router.push('requestview_ind')}
          >
            <Text style={styles.viewText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const TypeDropdown = () => (
    <Modal
      transparent={true}
      visible={showTypeDropdown}
      onRequestClose={() => setShowTypeDropdown(false)}
    >
      <TouchableOpacity 
        style={styles.dropdownOverlay}
        onPress={() => setShowTypeDropdown(false)}
      >
        <View style={styles.dropdownContainer}>
          {typeOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.dropdownOption,
                selectedType === option && styles.selectedOption
              ]}
              onPress={() => {
                setSelectedType(option);
                setShowTypeDropdown(false);
              }}
            >
              <Text style={[
                styles.dropdownOptionText,
                selectedType === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
              {selectedType === option && (
                <Ionicons name="checkmark" size={16} color="#7B61FF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const StatusDropdown = () => (
    <Modal
      transparent={true}
      visible={showStatusDropdown}
      onRequestClose={() => setShowStatusDropdown(false)}
    >
      <TouchableOpacity 
        style={styles.dropdownOverlay}
        onPress={() => setShowStatusDropdown(false)}
      >
        <View style={styles.dropdownContainer}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.dropdownOption,
                selectedStatus === option && styles.selectedOption
              ]}
              onPress={() => {
                setSelectedStatus(option);
                setShowStatusDropdown(false);
              }}
            >
              <Text style={[
                styles.dropdownOptionText,
                selectedStatus === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
              {selectedStatus === option && (
                <Ionicons name="checkmark" size={16} color="#7B61FF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#7B61FF", "#9333EA"]}
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
      <View style={styles.filterRow}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedType !== 'All' && styles.activeFilterButton]}
            onPress={() => setShowTypeDropdown(true)}
          >
            <Text style={[styles.filterButtonText, selectedType !== 'All' && styles.activeFilterButtonText]}>
              Type: {selectedType}
            </Text>
            <Ionicons name="chevron-down" size={14} color={selectedType !== 'All' ? '#fff' : '#666'} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedStatus !== 'All' && styles.activeFilterButton]}
            onPress={() => setShowStatusDropdown(true)}
          >
            <Text style={[styles.filterButtonText, selectedStatus !== 'All' && styles.activeFilterButtonText]}>
              Status: {selectedStatus}
            </Text>
            <Ionicons name="chevron-down" size={14} color={selectedStatus !== 'All' ? '#fff' : '#666'} />
          </TouchableOpacity>
        </View>
        {(selectedType !== 'All' || selectedStatus !== 'All') && (
          <TouchableOpacity 
            style={styles.clearFiltersButton}
            onPress={() => {
              setSelectedType('All');
              setSelectedStatus('All');
            }}
          >
            <Text style={styles.clearFiltersText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
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
          <Ionicons name="alert-circle-outline" size={48} color="#FF4444" />
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
      <TypeDropdown />
      <StatusDropdown />
    </ScrollView>
  );
};

export default RequestView;