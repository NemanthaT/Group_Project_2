import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_BASE } from '../constants/API';

const MyDonationReq = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Request ID:', id);
    const fetchRequest = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/api/donations/${id}`);
        const data = await response.json();
        console.log('Fetched request data:', data);
        if (data.success && data.request) {
          setRequest(data.request);
        } else {
          setError('Request not found');
        }
      } catch (err) {
        console.error('Error fetching request:', err);
        setError('Failed to load request');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRequest();
  }, [id]);

  const handleEdit = () => {
    // Navigate to edit page (you can create this later)
    Alert.alert('Edit', 'Edit functionality will be implemented');
    // router.push({ pathname: '/(drawer)/edit_donation_request', params: { id } });
  };

  const handleRemove = () => {
    Alert.alert(
      'Remove Request',
      'Are you sure you want to remove this donation request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: Implement delete API call
              Alert.alert('Success', 'Request removed successfully');
              router.back();
            } catch (_err) {
              Alert.alert('Error', 'Failed to remove request');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#7B61FF" />
        <Text style={{ marginTop: 12, color: '#666' }}>Loading...</Text>
      </View>
    );
  }

  if (error || !request) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Ionicons name="alert-circle-outline" size={64} color="#FF4444" />
        <Text style={{ marginTop: 12, fontSize: 16, color: '#666' }}>{error || 'Request not found'}</Text>
        <TouchableOpacity
          style={{ marginTop: 20, backgroundColor: '#7B61FF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
          onPress={() => router.back()}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isCompleted = Number(request.quantity_received) >= Number(request.quantity_needed);
  const progress = isCompleted ? 100 : (request.quantity_received / request.quantity_needed) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
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

      {/* Card Content */}
      <View style={styles.card}>
        {/* Image */}
        {request.image_url ? (
          <Image 
            source={{ uri: request.image_url }} 
            style={styles.cardImage} 
          />
        ) : (
          <View style={[styles.cardImage, { backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="image-outline" size={48} color="#999" />
          </View>
        )}

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

        {/* Progress Bar - Modern Style (same as requestview_ind) */}
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
          }}>
            {isCompleted ? '100%' : `${Math.round(progress)}%`}
          </Text>
        </View>

        {/* Amount Display */}
        <View style={styles.amountRow}>
          <View>
            <Text style={styles.amountLabel}>
              Raised: Rs. {Number(request.quantity_received || 0).toLocaleString('en-US')}.00
            </Text>
            <Text style={styles.amountLabel}>
              Target: Rs. {Number(request.quantity_needed || 0).toLocaleString('en-US')}.00
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Description: {request.description || 'No description provided.'}
        </Text>

        {/* Deadline, Category, Organizer with Icons */}
        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Ionicons name="calendar-outline" size={18} color="#FF4444" style={{ marginRight: 6 }} />
            <Text style={[styles.amountLabel, { color: '#FF4444', fontWeight: 'bold' }]}>
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

        {/* Action Buttons - Edit and Remove */}
        <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#7B61FF',
              borderRadius: 8,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#7B61FF',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 3,
            }}
            onPress={handleEdit}
          >
            <Ionicons name="create-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#FF4444',
              borderRadius: 8,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#FF4444',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 3,
            }}
            onPress={handleRemove}
          >
            <Ionicons name="trash-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyDonationReq;
