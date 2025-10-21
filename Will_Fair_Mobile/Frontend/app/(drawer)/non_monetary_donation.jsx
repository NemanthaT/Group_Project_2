import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { API_BASE } from '../constants/API';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getUserInfo } from '../../utils/authHelpers';

const NonMonetaryDonation = () => {
  const { requestId } = useLocalSearchParams();
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/api/donations/${requestId}`);
        const data = await response.json();
        if (data.success && data.request) {
          setRequest(data.request);
        } else {
          setError('Request not found');
        }
      } catch {
        setError('Failed to load request');
      } finally {
        setLoading(false);
      }
    };
    if (requestId) fetchRequest();
  }, [requestId]);

  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
  if (error || !request) return <View style={styles.container}><Text>{error || 'Request not found'}</Text></View>;

  const balanced = Math.max(request.quantity_needed - request.quantity_received, 0);
  const remainingQuantity = balanced;
  const isCompleted = (request.status || '').toLowerCase() === 'completed';
  const isPastDeadline = request.due_date && new Date(request.due_date) < new Date();
  const donateDisabled = isCompleted || isPastDeadline;

  const handleDonate = async () => {
    if (donateDisabled) return;
    const qty = parseInt(quantity, 10);
    if (!item.trim()) {
      setError("Please enter the item you want to donate");
      return;
    }
    if (!qty || qty <= 0) {
      setError("Please enter a valid quantity");
      return;
    }
    
    // Allow donations to exceed target quantity - donors can be generous!
    // Removed the balanced quantity check to allow over-donations

    // Get user info (donor_id)
    const userInfo = await getUserInfo();
    console.log('User ID retrieved:', userInfo?.donor_id);
    
    if (!userInfo || !userInfo.donor_id) {
      Alert.alert("Error", "User not authenticated. Please login again.");
      return;
    }

    try {
      // Call backend to process the non-monetary donation
      const response = await fetch(`${API_BASE}/api/donations/add-amount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request_id: request.request_id,
          amount: qty,
          donor_id: userInfo.donor_id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert(
          "Success",
          `You have donated ${qty} x ${item} to '${request.title}'!`,
          [
            {
              text: "OK",
              onPress: () => router.push("/(drawer)/request_view"),
            },
          ]
        );
        setItem("");
        setQuantity("");
        setError("");
      } else {
        Alert.alert("Error", result.message || "Failed to process donation. Please try again.");
      }
    } catch (error) {
      console.error('Non-monetary donation error:', error);
      Alert.alert("Error", "Network error. Please check your connection and try again.");
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Text style={styles.title}>Make a Non-Monetary Donation</Text>
        <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>{request.category}</Text></View>
        <View style={styles.infoCard}>
          <Text style={[styles.infoText, { fontWeight: 'bold', fontSize: 17 }]}>Title: {request.title}</Text>
          <Text style={styles.infoText}>Target items: {Number(request.quantity_needed).toLocaleString('en-US')}</Text>
          <Text style={styles.infoText}>Received items: {Number(request.quantity_received).toLocaleString('en-US')}</Text>
          <Text style={styles.infoText}>Remaining: {Number(remainingQuantity).toLocaleString('en-US')}</Text>
        </View>
        {remainingQuantity === 0 && !isCompleted && (
          <View style={{ backgroundColor: '#FEF3C7', padding: 10, borderRadius: 8, marginBottom: 12 }}>
            <Text style={{ color: '#92400E', fontSize: 13, textAlign: 'center' }}>
              ✨ Target reached! Your extra contribution will help even more!
            </Text>
          </View>
        )}
        <Text style={styles.label}>Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={item}
          onChangeText={setItem}
          editable={!donateDisabled}
        />
        <Text style={styles.label}>No of items</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={setQuantity}
          editable={!donateDisabled}
        />
        {error ? (
          <Text style={{ color: '#DC2626', marginBottom: 8, fontWeight: 'bold', marginTop: 2, fontSize: 15 }}>
            {error}
          </Text>
        ) : null}
        <TouchableOpacity
          style={[styles.donateButton, donateDisabled && { backgroundColor: '#A0AEC0' }]}
          onPress={handleDonate}
          disabled={donateDisabled}
        >
          <Text style={styles.donateButtonText}>
            {isCompleted ? 'Completed' : isPastDeadline ? 'Deadline Passed' : 'Donate'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '95%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'center',
    backgroundColor: '#E3EFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 12,
  },
  categoryBadgeText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 2,
    color: '#222',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  donateButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default NonMonetaryDonation;
