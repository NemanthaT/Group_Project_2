import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';

const DonationPayment = () => {
  const { requestId } = useLocalSearchParams();
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [errorShown, setErrorShown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = Platform.select({
      android: 'http://192.168.122.72:5000', // replace with your actual IP
      ios: 'http://localhost:5000',
      default: 'http://localhost:5000',
    });
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

  const isCompleted = (request.status || '').toLowerCase() === 'completed';
  const isPastDeadline = request.due_date && new Date(request.due_date) < new Date();
  const progress = isCompleted ? 100 : (request.quantity_received / request.quantity_needed) * 100;
  const balanced = Math.max(request.quantity_needed - request.quantity_received, 0);
  const donateDisabled = isCompleted || isPastDeadline;

  const handleQuickAmount = (val) => {
    setAmount(val.toString());
    setError("");
  };

  const handleDonate = () => {
    const amt = parseInt(amount, 10);
    if (!amt || amt <= 0) {
      if (!errorShown) {
        setError("Please enter a valid amount");
        setErrorShown(true);
        setTimeout(() => {
          setError("");
          setErrorShown(false);
          router.push({ pathname: '/(drawer)/requestview_ind', params: { requestId: request.request_id } });
        }, 2000);
      }
      return;
    }
    if (amt > balanced) {
      if (!errorShown) {
        setError(`Amount cannot exceed the target or balanced amount (Rs. ${balanced})`);
        setErrorShown(true);
        setTimeout(() => {
          setError("");
          setErrorShown(false);
          router.push({ pathname: '/(drawer)/requestview_ind', params: { requestId: request.request_id } });
        }, 2000);
      }
      return;
    }
    // Here you would call your backend to process the donation
    Alert.alert(
      "Success",
      `You have donated Rs. ${amt} to '${request.title}'!`,
      [
        {
          text: "OK",
          onPress: () => router.push("/(drawer)/request_view"),
        },
      ]
    );
    setAmount("");
  };

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Text style={styles.title}>Make a Donation</Text>
        <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>{request.category}</Text></View>
        <Text style={styles.progressLabel}>Progress:</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressPercent}>{progress.toFixed(1)}%{isCompleted ? ' (Complete)' : ''}</Text>
        <View style={styles.infoCard}>
          <Text style={[styles.infoText, { fontWeight: 'bold', fontSize: 17 }]}>Title: {request.title}</Text>
          <Text style={styles.infoText}>Target Amount: Rs. {Number(request.quantity_needed).toLocaleString('en-US')}</Text>
          <Text style={styles.infoText}>Received Amount: Rs. {Number(request.quantity_received).toLocaleString('en-US')}</Text>
        </View>
        <Text style={styles.label}>Amount (Rs.)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          editable={!donateDisabled}
        />
        {error ? (
          <Text style={{ color: '#DC2626', marginBottom: 8, fontWeight: 'bold', marginTop: 2, fontSize: 15 }}>
            {error}
          </Text>
        ) : null}
        <View style={styles.quickAmountsRow}>
          {[500, 1000, 2500].map((val) => (
            <TouchableOpacity key={val} style={styles.quickAmount} onPress={() => handleQuickAmount(val)} disabled={donateDisabled}>
              <Text>Rs. {val}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={[styles.donateButton, donateDisabled && { backgroundColor: '#A0AEC0' }]} onPress={handleDonate} disabled={donateDisabled}>
          <Text style={styles.donateButtonText}>{isCompleted ? 'Completed' : isPastDeadline ? 'Deadline Passed' : 'Donate'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DonationPayment;

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
    fontSize: 28,
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
  progressLabel: {
    color: '#1E3A8A',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  progressBarBg: {
    backgroundColor: '#B6C6E3',
    borderRadius: 8,
    height: 8,
    marginBottom: 2,
    marginTop: 2,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#2563EB',
    height: 8,
    borderRadius: 8,
  },
  progressPercent: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'right',
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
  error: {
    color: '#DC2626',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  quickAmountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickAmount: {
    backgroundColor: '#E3EFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 4,
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
