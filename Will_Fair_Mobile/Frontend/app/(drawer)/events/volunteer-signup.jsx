
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { API_BASE } from '../../constants/API';

export default function VolunteerSignUpScreen() {
  const router = useRouter();
  const { id, eventName } = useLocalSearchParams();

  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({ name: '', email: '', contact: '', notes: '' });
    setErrors({});
  }, [id]);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.contact.trim()) newErrors.contact = 'Contact number is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert('Validation', 'Please fix the errors in the form');
      return;
    }
    if (!id) {
      Alert.alert('Error', 'Missing event ID. Please try again.');
      return;
    }
    try {
      await axios.post(`${API_BASE}/api/volunteers`, {
        event_id: id,
        volunteer_name: form.name,
        volunteer_email: form.email,
        volunteer_phone: form.contact,
        notes: form.notes,
      });
      Alert.alert('Success', `Thank you for volunteering for ${eventName || 'this event'}!`);
      setForm({ name: '', email: '', contact: '', notes: '' });
      router.back();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error)
        Alert.alert('Error', err.response.data.error);
      else Alert.alert('Error', 'Submission failed. Please try again.');
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Volunteer for this Event</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}><Text style={{fontSize:18}}>✕</Text></TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ padding: 12 }}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={form.name} onChangeText={t => updateField('name', t)} />
          {errors.name && <Text style={styles.err}>{errors.name}</Text>}

          <Text style={styles.label}>Contact Number</Text>
          <TextInput style={styles.input} value={form.contact} onChangeText={t => updateField('contact', t)} keyboardType="phone-pad" />
          {errors.contact && <Text style={styles.err}>{errors.contact}</Text>}

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={form.email} onChangeText={t => updateField('email', t)} keyboardType="email-address" />
          {errors.email && <Text style={styles.err}>{errors.email}</Text>}

          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput style={[styles.input, { height: 80 }]} value={form.notes} onChangeText={t => updateField('notes', t)} multiline />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={() => router.back()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleSubmit}>
              <Text style={{ color: '#fff' }}>Volunteer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, maxHeight: '90%' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 18, fontWeight: '600' },
  closeBtn: { padding: 6 },
  label: { marginTop: 8, fontSize: 14, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 8, marginTop: 6 },
  btn: { padding: 12, borderRadius: 6, minWidth: 120, alignItems: 'center' },
  btnPrimary: { backgroundColor: '#7B61FF' },
  btnOutline: { borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' },
  err: { color: '#d9534f', marginTop: 4 }
});