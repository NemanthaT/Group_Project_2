import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_BASE } from '../constants/API';

const MyDonationReq = () => {
  const { requestId } = useLocalSearchParams();
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Request ID:', requestId);
    const fetchRequest = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/api/donations/${requestId}`);
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

  const isCompleted = Number(request.quantity_received) >= Number(request.quantity_needed);
  const progress = isCompleted ? 100 : (request.quantity_received / request.quantity_needed) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={["#7B61FF", "#9333EA"]} style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 5,
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#fff" />
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

      <View style={styles.card}>
        <Image source={{ uri: request.image_path }} style={styles.cardImage} />

        {/* Category
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>Category: {request.category_id || 'N/A'}</Text>
        </View> */}

        {/* Fundraising Progress Title */}
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 4,
          marginTop: 16,
          textAlign: 'left',
        }}>
          Fundraising Progress
        </Text>
        {/* Progress Bar - Modern Style */}
        <View style={{
          backgroundColor: '#A0AEC0',
          borderRadius: 12,
          height: 18,
          marginVertical: 16,
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <View style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: 18,
            borderRadius: 12,
            backgroundColor: '#ffffffff',
            width: '100%',
            opacity: isCompleted ? 1 : 0.85,
            transition: 'width 0.3s',
          }} />
          <View style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: 18,
            borderRadius: 12,
            backgroundColor: '#7B61FF',
            width: `${progress}%`,
            opacity: isCompleted ? 1 : 0.85,
            transition: 'width 0.3s',
          }} />
          <Text style={{
            position: 'absolute',
            right: 12,
            top: 0,
            height: 18,
            color: '#7B61FF',
            fontWeight: 'bold',
            fontSize: 13,
            textAlignVertical: 'center',
            textAlign: 'right',
            lineHeight: 18,
          }}>{isCompleted ? '100%' : `${Math.round(progress)}%`}</Text>
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
        </View>
        {/* Removed status badge */}

        {/* Description */}
        <Text style={styles.description}>Description: {request.description || 'No description provided.'}</Text>

        {/* Deadline, Category, Organizer with Icons */}
        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Ionicons name="calendar-outline" size={18} color="#FF4444" style={{ marginRight: 6 }} />
            <Text style={[styles.amountLabel, { color: '#FF4444', fontWeight: 'bold' }] }>
              Deadline: {request.due_date ? new Date(request.due_date).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Ionicons name="pricetag-outline" size={18} color="#7B61FF" style={{ marginRight: 6 }} />
            <Text style={styles.amountLabel}>
              Category: {request.category || 'N/A'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="person-outline" size={18} color="#9333EA" style={{ marginRight: 6 }} />
            <Text style={styles.amountLabel}>
              Organizer: Anonymous
            </Text>
          </View>
        </View>

        {/* Donate Now Button (styled like request_view) */}
        <View style={{ marginTop: 24, alignItems: 'center' }}>
          {request && (
            <TouchableOpacity
              style={{
                backgroundColor:
                  Number(request.quantity_received) >= Number(request.quantity_needed) || (request.due_date && new Date(request.due_date) < new Date())
                    ? '#A0AEC0'
                    : '#7B61FF',
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 32,
                width: '90%',
                shadowColor: '#7B61FF',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 3,
              }}
              onPress={() => {
                if (Number(request.quantity_received) >= Number(request.quantity_needed) || (request.due_date && new Date(request.due_date) < new Date())) return;
                if ((request.type || '').toLowerCase() === 'monetary') {
                  router.push({ pathname: '/(drawer)/donation_payment_new', params: { requestId: request.request_id } });
                } else {
                  router.push({ pathname: '/(drawer)/non_monetary_donation', params: { requestId: request.request_id } });
                }
              }}
              disabled={Number(request.quantity_received) >= Number(request.quantity_needed) || (request.due_date && new Date(request.due_date) < new Date())}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                {Number(request.quantity_received) >= Number(request.quantity_needed)
                  ? 'Completed'
                  : request.due_date && new Date(request.due_date) < new Date()
                  ? 'Deadline Passed'
                  : 'Donate Now'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default MyDonationReq;
