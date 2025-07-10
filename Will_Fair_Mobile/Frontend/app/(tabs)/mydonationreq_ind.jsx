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
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";

const MyDonationReq = () => {
  const request = {
    id: 1,
    title: "Renovations at Early Bird Child Care",
    location: "Karapitiya",
    category: "Education",
    image: require("../../assets/images/program1.png"),
    raised: 7000,
    target: 60000,
    status: "Active",
    description:
      "Early Bird Child Care is in need of essential renovations to provide a safer, more engaging, and nurturing environment for our children. With your generous support, we aim to upgrade classrooms, improve play areas, and ensure our facilities meet the highest standards of care and learning. Every contribution brings us closer to giving these young learners the bright and supportive space they deserve.",
  };

  const progress = (request.raised / request.target) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#7B61FF", "#9333EA"]} style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.headerTitle}>{request.title}</Text>
      </LinearGradient>

      {/* Image Card */}
      <View style={styles.card}>
        <Image source={request.image} style={styles.cardImage} />

        {/* Location & Category */}
       <View style={styles.infoRow}>
        {/* Location on the left */}
        <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={18} color="#7B61FF" />
            <Text style={styles.sectionTitle}>{request.location}</Text>
        </View>

        {/* Category button on the right */}
        <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>{request.category}</Text>
        </View>
        </View>


        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        

        <View style={styles.amountRow}>
        {/* Left: Raised and Target */}
        <View>
            <Text style={styles.amountLabel}>
            Raised: {request.raised.toLocaleString()}.00
            </Text>
            <Text style={styles.amountLabel}>
            Target: {request.target.toLocaleString()}.00
            </Text>
        </View>

        {/* Right: Status badge */}
        <View style={styles.statusBadgeNew}>
            <Text style={styles.statusTextNew}>{request.status}</Text>
        </View>
        </View>


        {/* Description */}
        <Text style={styles.description}>{request.description}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.statusBadgeNew}>
            <Text style={styles.statusTextNew}>Send Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButtonNew}>
            <Ionicons name="create-outline" size={14} color="#fff" />
            <Text style={styles.editTextNew}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton}>
            <Ionicons name="trash-outline" size={14} color="#fff" />
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyDonationReq;
