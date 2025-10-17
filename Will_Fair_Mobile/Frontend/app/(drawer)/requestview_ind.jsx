import React, { useEffect, useState } from "react";
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
import { useLocalSearchParams, useRouter } from 'expo-router';

const MyDonationReq = () => {
  const { requestId } = useLocalSearchParams();
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/donations/${requestId}`);
        const data = await response.json();
        if (data.success && data.request) {
          setRequest(data.request);
        } else {
          setError('Request not found');
        }
      } catch (_err) {
        setError('Failed to load request');
      } finally {
        setLoading(false);
      }
    };
    if (requestId) fetchRequest();
  }, [requestId]);

  if (loading) {
    return <View style={styles.noResultsContainer}><Text>Loading...</Text></View>;
  }
  if (error || !request) {
    return <View style={styles.noResultsContainer}><Text>{error || 'Request not found'}</Text></View>;
  }

  const progress = (request.quantity_received / request.quantity_needed) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#7B61FF", "#9333EA"]} style={styles.header}>
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
        <Image source={{ uri: request.image_path }} style={styles.cardImage} />

        {/* Category */}
        <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>{request.category}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.amountRow}>
          <View>
            <Text style={styles.amountLabel}>
              Raised: Rs. {Number(request.quantity_received).toLocaleString('en-US')}.00
            </Text>
            <Text style={styles.amountLabel}>
              Target: Rs. {Number(request.quantity_needed).toLocaleString('en-US')}.00
            </Text>
          </View>
          <View style={styles.statusBadgeNew}>
            <Text style={styles.statusTextNew}>{request.status}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{request.description}</Text>

        {/* Deadline & Organizer */}
        <View style={{ marginTop: 12 }}>
          <Text style={styles.amountLabel}>
            Deadline: {request.due_date ? new Date(request.due_date).toLocaleDateString() : 'N/A'}
          </Text>
          <Text style={styles.amountLabel}>
            Organizer: {request.organizer || 'Anonymous'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.statusBadgeNew} onPress={() => navigation.navigate('donation_payment')}>
            <Text style={styles.statusTextNew}>Donate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyDonationReq;
