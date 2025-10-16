import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
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

  // All requests data
  const allRequests = [
    // Monetary Requests
    {
      id: 1,
      title: "Medical Treatment for Cancer Patient",
      image: require("../../assets/images/child.jpg"),
      raised: 15000,
      target: 50000,
      status: "Active",
      type: "Monetary",
      category: "Healthcare"
    },
    {
      id: 2,
      title: "School Fee Support for Underprivileged Children",
      image: require("../../assets/images/cloth1.jpg"),
      raised: 8000,
      target: 25000,
      status: "Active",
      type: "Monetary",
      category: "Education"
    },
    {
      id: 3,
      title: "Emergency Flood Relief Fund",
      image: require("../../assets/images/program3.png"),
      raised: 30000,
      target: 100000,
      status: "Urgent",
      type: "Monetary",
      category: "Disaster Relief"
    },
    // Non-Monetary Requests
    {
      id: 4,
      title: "Books and Educational Materials Needed",
      image: require("../../assets/images/books.jpg"),
      raised: 150, // Number of books collected
      target: 500,
      status: "Active",
      type: "Non-Monetary",
      category: "Education"
    },
    {
      id: 5,
      title: "Clothing Donation for Homeless Shelter",
      image: require("../../assets/images/cloths.jpeg"),
      raised: 80, // Number of clothing items
      target: 200,
      status: "Active",
      type: "Non-Monetary",
      category: "Basic Needs"
    },
    {
      id: 6,
      title: "Food Items for Community Kitchen",
      image: require("../../assets/images/food.jpg"),
      raised: 45, // Number of food packets
      target: 100,
      status: "Active",
      type: "Non-Monetary",
      category: "Basic Needs"
    },
    {
      id: 7,
      title: "Medical Equipment for Rural Clinic",
      image: require("../../assets/images/medical-equipment.png"),
      raised: 3, // Number of equipment donated
      target: 10,
      status: "In Review",
      type: "Non-Monetary",
      category: "Healthcare"
    },
  ];

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
    const progress = (item.raised / item.target) * 100;
    const isMoney = item.type === 'Monetary';

    return (
      <View key={item.id} style={styles.card}>
        {/* Image with Status Badge */}
        <View style={styles.cardImageWrapper}>
          <Image source={item.image} style={styles.cardImage} />
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
          {/* Type Badge */}
          <View style={[styles.typeBadge, {
            backgroundColor: isMoney ? '#FFB800' : '#00BCD4'
          }]}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.cardTitle}>{item.title}</Text>

        {/* Category */}
        <Text style={styles.categoryText}>{item.category}</Text>

        {/* Raised and Target */}
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.amountText}>
            {isMoney ? 
              `Raised: Rs. ${item.raised.toLocaleString()}.00` :
              `Collected: ${item.raised} items`
            }
          </Text>
          <Text style={styles.amountText}>
            {isMoney ? 
              `Target: Rs. ${item.target.toLocaleString()}.00` :
              `Target: ${item.target} items`
            }
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { 
            width: `${progress}%`,
            backgroundColor: isMoney ? '#7B61FF' : '#00BCD4'
          }]} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.editButton, {
              backgroundColor: isMoney ? '#7B61FF' : '#00BCD4'
            }]}
            onPress={() => {
              if (isMoney) {
                // Navigate to donation payment for monetary donations
                router.push('/(drawer)/donation_payment');
              } else {
                // Navigate to donation form for non-monetary donations
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
      {/* Header */}
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

      {/* Filter Buttons */}
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

        {/* Clear Filters */}
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

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          Showing {filteredRequests.length} of {allRequests.length} requests
        </Text>
      </View>

      {/* Request Cards */}
      {filteredRequests.length > 0 ? (
        filteredRequests.map((item) => renderCard(item))
      ) : (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={48} color="#ccc" />
          <Text style={styles.noResultsText}>No requests found</Text>
          <Text style={styles.noResultsSubtext}>Try adjusting your filters</Text>
        </View>
      )}

      {/* Dropdowns */}
      <TypeDropdown />
      <StatusDropdown />
    </ScrollView>
  );
};

export default RequestView;