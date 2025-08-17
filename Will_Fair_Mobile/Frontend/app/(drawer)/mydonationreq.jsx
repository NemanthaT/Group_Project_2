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

const MyDonationReq = () => {  
  const navigation = useNavigation();
  
  // Filter states
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');

  // All my donation requests data (expanded with types)
  const allRequests = [
    {
      id: 1,
      title: "Renovations at Early Bird Child Care",
      image: require("../../assets/images/program1.png"),
      raised: 7000,
      target: 60000,
      status: "In Review",
      type: "Monetary",
      category: "Education"
    },
    {
      id:23,
      title: "Books for Community Library",
      image: require("../../assets/images/books.jpg"),
      raised: 25, // Number of books collected
      target: 100,
      status: "Active",
      type: "Non-Monetary",
      category: "Education"
    },
    {
      id: 3,
      title: "Winter Clothing for Homeless",
      image: require("../../assets/images/cloths.jpeg"),
      raised: 15, // Number of clothing items
      target: 50,
      status: "Completed",
      type: "Non-Monetary",
      category: "Basic Needs"
    },
    {
      id: 4,
      title: "Food Supplies for Orphanage",
      image: require("../../assets/images/food.jpg"),
      raised: 30, // Number of food packets
      target: 80,
      status: "In Review",
      type: "Non-Monetary",
      category: "Basic Needs"
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

  // Filter options
  const typeOptions = ['All', 'Monetary', 'Non-Monetary'];
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
                  item.status === "Completed" ? "#2196F3" :
                  item.status === "In Review" ? "#FF8C00" : "#9333EA",
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
            style={[
              styles.editButton,
              { backgroundColor: isMoney ? '#7B61FF' : '#00BCD4' }
            ]}
            onPress={() => router.push('mydonationreq_ind')}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => router.push('mydonationreq_ind')}
          >
            <Text style={styles.viewText}>View</Text>
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
      </LinearGradient>

      {/* Filter and New Request */}
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

        <TouchableOpacity 
          style={styles.newRequestButton}
          onPress={() => navigation.navigate('monetory')}
        >
          <Text style={styles.newRequestText}>+ New Request</Text>
        </TouchableOpacity>
      </View>

      {/* Clear Filters (if any active) */}
      {(selectedType !== 'All' || selectedStatus !== 'All') && (
        <View style={styles.clearFiltersRow}>
          <TouchableOpacity 
            style={styles.clearFiltersButton}
            onPress={() => {
              setSelectedType('All');
              setSelectedStatus('All');
            }}
          >
            <Text style={styles.clearFiltersText}>Clear All Filters</Text>
            <Ionicons name="close-circle" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

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
          <Ionicons name="document-outline" size={48} color="#ccc" />
          <Text style={styles.noResultsText}>No requests found</Text>
          <Text style={styles.noResultsSubtext}>
            {selectedType !== 'All' || selectedStatus !== 'All' 
              ? "Try adjusting your filters" 
              : "Create your first donation request"
            }
          </Text>
          {selectedType === 'All' && selectedStatus === 'All' && (
            <TouchableOpacity 
              style={styles.createFirstButton}
              onPress={() => navigation.navigate('monetory')}
            >
              <Text style={styles.createFirstButtonText}>Create Request</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Dropdowns */}
      <TypeDropdown />
      <StatusDropdown />
    </ScrollView>
  );
};

export default MyDonationReq;