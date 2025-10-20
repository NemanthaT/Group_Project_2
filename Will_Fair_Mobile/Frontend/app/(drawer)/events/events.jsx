import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import AddEventModal from './AddEventModal';
import axios from 'axios';
import { API_BASE } from '../../constants/API';
import { useBackHandler } from '../../hooks/useBackHandler';

export default function EventsScreen() {
  const router = useRouter();
  
  // Enable hardware back button navigation
  useBackHandler();
  const [opportunities, setOpportunities] = useState([]);
  const [filters, setFilters] = useState({ sort: '', type: '', commitment: '', location: '', skills: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      setEventsError(null);
      try {
        console.log('Fetching events from:', `${API_BASE}/api/events`);
        const res = await axios.get(`${API_BASE}/api/events`);
        console.log('Response received:', res.data);
        const data = res.data;
        if (!data || !data.success) throw new Error(data?.message || 'Failed to load events');
        setOpportunities(data.events || []);
      } catch (err) {
        console.error('Error fetching events:', err);
        let errorMessage = 'Error loading events';
        if (err.response) {
          // Server responded with error status
          errorMessage = `Server Error: ${err.response.status} - ${err.response.data?.error || err.message}`;
        } else if (err.request) {
          // Request made but no response (network error)
          errorMessage = 'Network Error: Cannot connect to server. Please ensure backend is running on port 5000.';
        } else {
          errorMessage = err.message || 'Error loading events';
        }
        setEventsError(errorMessage);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  const filtered = opportunities.filter(opp => {
    return (
      (filters.type === '' || opp.type === filters.type) &&
      (filters.commitment === '' || opp.commitment === filters.commitment) &&
      (filters.location === '' || opp.location === filters.location) &&
      (filters.skills === '' || opp.skills === filters.skills)
    );
  });

  const sorted = [...filtered].sort((a,b) => {
    if (filters.sort === 'recent') return new Date(b.date) - new Date(a.date);
    if (filters.sort === 'popular') return (b.volunteersSigned / Math.max(1, b.volunteersNeeded)) - (a.volunteersSigned / Math.max(1, a.volunteersNeeded));
    if (filters.sort === 'urgent') return (a.volunteersNeeded - a.volunteersSigned) - (b.volunteersNeeded - b.volunteersSigned);
    return 0;
  });

  if (loadingEvents) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading events...</Text>
      </SafeAreaView>
    );
  }
  if (eventsError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{eventsError}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Featured Programs</Text>
        <Text style={styles.heroSubtitle}>Every act of giving fuels a story of hope. Explore programs where your kindness sparks lasting change.</Text>
      </View>

      <View style={styles.filters}>
        <Picker selectedValue={filters.sort} style={styles.picker} onValueChange={v => handleFilterChange('sort', v)}>
          <Picker.Item label="Sort by" value="" />
          <Picker.Item label="Most Recent" value="recent" />
          <Picker.Item label="Most Popular" value="popular" />
          <Picker.Item label="Most Urgent" value="urgent" />
        </Picker>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Picker selectedValue={filters.type} style={[styles.picker, { flex: 1 }]} onValueChange={v => handleFilterChange('type', v)}>
            <Picker.Item label="Volunteer Type" value="" />
            <Picker.Item label="Environment" value="environment" />
            <Picker.Item label="Teaching" value="teaching" />
            <Picker.Item label="Caregiving" value="caregiving" />
            <Picker.Item label="Construction" value="construction" />
          </Picker>

          <Picker selectedValue={filters.commitment} style={[styles.picker, { flex: 1 }]} onValueChange={v => handleFilterChange('commitment', v)}>
            <Picker.Item label="Commitment" value="" />
            <Picker.Item label="One-time" value="one-time" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Monthly" value="monthly" />
            <Picker.Item label="Flexible" value="flexible" />
          </Picker>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Picker selectedValue={filters.location} style={[styles.picker, { flex: 1 }]} onValueChange={v => handleFilterChange('location', v)}>
            <Picker.Item label="Location" value="" />
            <Picker.Item label="Colombo" value="Colombo" />
            <Picker.Item label="Galle" value="Galle" />
            <Picker.Item label="Kandy" value="Kandy" />
          </Picker>

          <Picker selectedValue={filters.skills} style={[styles.picker, { flex: 1 }]} onValueChange={v => handleFilterChange('skills', v)}>
            <Picker.Item label="Skills" value="" />
            <Picker.Item label="Teaching" value="teaching" />
            <Picker.Item label="Caregiving" value="caregiving" />
            <Picker.Item label="Manual" value="manual" />
            <Picker.Item label="None" value="none" />
          </Picker>
        </View>

        {/* <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddModal(true)}>
          <Text style={{ color: '#fff' }}>+ Add Event</Text>
        </TouchableOpacity> */}
      </View>

      <FlatList data={sorted} keyExtractor={i => String(i.id)} contentContainerStyle={{ padding: 12 }} renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardTop}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.cardImage} /> : <View style={[styles.cardImage, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}><Text style={{ color: '#666' }}>No Image</Text></View>}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
            </View>
          </View>

          <View style={styles.progressRow}>
              <View style={styles.progressBarBackground}>
              <View style={[styles.progressFill, { width: `${(item.volunteersSigned / Math.max(1,item.volunteersNeeded)) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{item.volunteersSigned}/{item.volunteersNeeded} signed</Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.outlineBtn]}
              onPress={() => router.push(`/events/${item.id}`)}
            >
              <Text>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.primaryBtn]}
              onPress={() => {
                router.push({
                  pathname: '/events/volunteer-signup',
                  params: { id: item.id, eventName: item.title }
                });
              }}
            >
              <Text style={{ color: '#fff' }}>Volunteer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )} />

      <AddEventModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onSubmit={async (formData) => {
          try {
            console.log('Submitting event to API...');
            
            const response = await axios.post(`${API_BASE}/api/events`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            console.log('Event creation response:', response.data);

            if (response.data.success) {
              // Refresh events list after successful creation
              const res = await axios.get(`${API_BASE}/api/events`);
              if (res.data && res.data.success) {
                setOpportunities(res.data.events || []);
              }
              
              setShowAddModal(false);
              return { success: true };
            } else {
              alert(response.data.message || 'Failed to create event');
              return { success: false };
            }
          } catch (error) {
            console.error('Error creating event:', error);
            let errorMessage = 'Failed to create event';
            if (error.response) {
              errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
            } else if (error.request) {
              errorMessage = 'Network error: Cannot connect to server';
            }
            alert(errorMessage);
            return { success: false };
          }
        }} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { height: 140, padding: 16, justifyContent: 'center', backgroundColor: '#7B61FF' },
  heroTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  heroSubtitle: { color: '#EEDCFF', marginTop: 6 },
  filters: { padding: 12, backgroundColor: '#fafafa' },
  picker: { height: 50, width: '100%', color: '#333', backgroundColor: '#fff' },
  addBtn: { backgroundColor: '#7B61FF', padding: 10, alignItems: 'center', borderRadius: 6, marginTop: 8 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, elevation: 1 },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  cardImage: { width: 80, height: 60, borderRadius: 6, overflow: 'hidden' },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardDesc: { color: '#666', marginTop: 6 },
  progressRow: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressBarBackground: { flex: 1, height: 8, backgroundColor: '#eee', borderRadius: 6, marginRight: 12, overflow: 'hidden' },
  progressFill: { height: 8, backgroundColor: '#7B61FF' },
  progressText: { fontSize: 12, color: '#555' },
  actionsRow: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { padding: 8, borderRadius: 6, minWidth: 100, alignItems: 'center' },
  outlineBtn: { borderWidth: 1, borderColor: '#ccc' },
  primaryBtn: { backgroundColor: '#7B61FF' }
});