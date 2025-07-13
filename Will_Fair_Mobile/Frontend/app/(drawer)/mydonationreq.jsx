import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation,DrawerActions } from "@react-navigation/native";
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import { router } from 'expo-router';


const MyDonationReq = () => {  
  const requests = [
    {
      id: 1,
      title: "Renovations at Early Bird Child Care",
      image: require("../../assets/images/program1.png"),
      raised: 7000,
      target: 60000,
      status: "In Review",
    },
    {
      id: 2,
      title: "Wheelchairs at Sathkara Elderly Care Centre",
      image: require("../../assets/images/program2.png"),
      raised: 23000,
      target: 40000,
      status: "Executed",
    },
    {
      id: 3,
      title: "Renovations at Early Bird Child Care",
      image: require("../../assets/images/program1.png"),
      raised: 7000,
      target: 60000,
      status: "In Review",
    },
  ];
  
  
  const renderCard = (item) => {
    const progress = (item.raised / item.target) * 100;

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
                  item.status === "Executed" ? "#1E90FF" : "#9333EA",
              },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.cardTitle}>{item.title}</Text>

        {/* Raised and Target */}
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.amountText}>
            Raised: {item.raised.toLocaleString()}.00
          </Text>
          <Text style={styles.amountText}>
            Target: {item.target.toLocaleString()}.00
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton}
            // onPress={() => navigation.navigate("donationform", { requestId: item.id })}
          onPress={() => router.push('/donationform')}
            >
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const navigation = useNavigation();  

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
          <TouchableOpacity style={styles.filterButton}>
            <Text>Type</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text>Status</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.newRequestButton}>
          <Text style={styles.newRequestText}>+ New Request</Text>
        </TouchableOpacity>
      </View>

      {/* Request Cards */}
      {requests.map((item) => renderCard(item))}
    </ScrollView>
  );
};

export default MyDonationReq;
