import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import { router } from 'expo-router';

const MyDonationReq = () => {  
  const navigation = useNavigation();

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

  // Show all requests directly
  const filteredRequests = allRequests;

  const renderCard = (item) => {
    const progress = item.target > 0 ? (item.raised / item.target) * 100 : 0;
    const isMoney = item.type === 'Monetary';

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
          <Image source={item.image} style={{
            width: '100%',
            height: 160,
            borderRadius: 12,
            resizeMode: 'cover',
          }} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{item.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {/* Category */}
          <Text style={{ fontSize: 14, color: '#666', marginRight: 8 }}>{item.category}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 14, color: '#333', marginRight: 16 }}>
            {isMoney
              ? `Target: Rs. ${Number(item.target).toLocaleString('en-US')}.00`
              : `Target: ${item.target} items`}
          </Text>
          <Text style={{ fontSize: 14, color: '#333' }}>
            {isMoney
              ? `Raised: Rs. ${Number(item.raised).toLocaleString('en-US')}.00`
              : `Collected: ${item.raised} items`}
          </Text>
        </View>
        <View style={{ height: 8, backgroundColor: '#eee', borderRadius: 4, marginBottom: 8, overflow: 'hidden' }}>
          <View style={{
            height: 8,
            width: `${progress}%`,
            backgroundColor: '#7B61FF',
            borderRadius: 4,
          }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#7B61FF',
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flex: 1,
              marginRight: 8,
            }}
            onPress={() => router.push('mydonationreq_ind')}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
              Edit
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
            onPress={() => router.push('mydonationreq_ind')}
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
      <View style={[styles.header, { backgroundColor: "#5d40efff" }]}>
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
          Showing {filteredRequests.length} requests
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
    </ScrollView>
  );
};

export default MyDonationReq;