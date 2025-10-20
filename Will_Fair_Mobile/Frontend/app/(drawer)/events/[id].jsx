import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { API_BASE } from '../../constants/API';
import { useBackHandler } from '../../hooks/useBackHandler';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Enable hardware back button navigation
  useBackHandler();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching event details for ID:', id);
        const res = await axios.get(`${API_BASE}/events/${id}`);
        console.log('Event details received:', res.data);
        const data = res.data;
        
        if (!data || !data.success) {
          throw new Error(data?.error || 'Failed to load event details');
        }
        
        setEvent(data.event);
      } catch (err) {
        console.error('Error fetching event details:', err);
        let errorMessage = 'Error loading event details';
        if (err.response) {
          errorMessage = `Server Error: ${err.response.status} - ${err.response.data?.error || err.message}`;
        } else if (err.request) {
          errorMessage = 'Network Error: Cannot connect to server. Please ensure backend is running.';
        } else {
          errorMessage = err.message || 'Error loading event details';
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#7B61FF" />
        <Text style={styles.loadingText}>Loading event details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Error Loading Event</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Event Not Found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const percent = event.volunteersNeeded 
    ? Math.round((event.volunteersSigned / event.volunteersNeeded) * 100) 
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Title Banner */}
        <View style={styles.titleBanner}>
          <Text style={styles.title}>{event.title}</Text>
        </View>

        {/* Event Image */}
        <View style={styles.imageContainer}>
          {event.image ? (
            <Image 
              source={{ uri: event.image }} 
              style={styles.eventImage}
              onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
            />
          ) : (
            <View style={[styles.eventImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>No Image Available</Text>
            </View>
          )}
        </View>

        {/* Event Info */}
        <View style={styles.infoContainer}>
          {/* Basic Info */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{event.date || 'TBD'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{event.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type:</Text>
            <Text style={styles.infoValue}>{event.type}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Commitment:</Text>
            <Text style={styles.infoValue}>{event.commitment}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Skills:</Text>
            <Text style={styles.infoValue}>{event.skills || 'None required'}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[styles.progressBarFill, { width: `${percent}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>
              {event.volunteersSigned} / {event.volunteersNeeded} volunteers signed up ({percent}%)
            </Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>

          {/* Organizer Info */}
          {event.organiser && (
            <View style={styles.organiserSection}>
              <Text style={styles.sectionTitle}>Organizer</Text>
              <Text style={styles.organiserText}>
                <Text style={styles.organiserLabel}>Name: </Text>
                {event.organiser.name}
              </Text>
              {event.organiser.email && (
                <Text style={styles.organiserText}>
                  <Text style={styles.organiserLabel}>Email: </Text>
                  {event.organiser.email}
                </Text>
              )}
              {event.organiser.phone && (
                <Text style={styles.organiserText}>
                  <Text style={styles.organiserLabel}>Phone: </Text>
                  {event.organiser.phone}
                </Text>
              )}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.outlineButton]}
              onPress={() => router.back()}
            >
              <Text style={styles.outlineButtonText}>Back to Events</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                router.push({
                  pathname: '/events/volunteer-signup',
                  params: { id: event.id, eventName: event.title }
                });
              }}
            >
              <Text style={styles.primaryButtonText}>Volunteer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  titleBanner: {
    backgroundColor: '#7B61FF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  imageContainer: {
    padding: 16,
  },
  eventImage: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  infoContainer: {
    padding: 16,
    paddingTop: 0,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
    minWidth: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  progressSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: 12,
    backgroundColor: '#7B61FF',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  descriptionSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  organiserSection: {
    marginTop: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#7B61FF',
  },
  organiserText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  organiserLabel: {
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#7B61FF',
  },
  outlineButtonText: {
    color: '#7B61FF',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#7B61FF',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#7B61FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});