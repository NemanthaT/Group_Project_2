import React, { useState } from 'react';
import { Modal, View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';

export default function AddEventModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: '',
    isRange: false,
    date: '',
    startDate: '',
    endDate: '',
    description: '',
    volunteersNeeded: '5',
    location: '',
    type: '',
    commitment: '',
    skills: '',
    contactName: '',
    contactEmail: '',
    contactNumber: ''
  });

  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const newErrors = {};
    const required = ['name','location','type','commitment','skills','description','contactName','contactEmail','contactNumber'];
    for (const k of required) {
      if (!form[k] || String(form[k]).trim() === '') newErrors[k] = 'Required';
    }
    if (!form.isRange && !form.date) newErrors.date = 'Select date';
    if (form.isRange && (!form.startDate || !form.endDate)) {
      if (!form.startDate) newErrors.startDate = 'Select start date';
      if (!form.endDate) newErrors.endDate = 'Select end date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      Alert.alert('Validation', 'Please fix the errors in the form');
      return;
    }

    const date = form.isRange ? (form.startDate + ' to ' + form.endDate) : form.date;
    const payload = { ...form, volunteersNeeded: Number(form.volunteersNeeded) || 0, date };
    onCreate && onCreate(payload);
    // reset
    setForm({ name: '', isRange: false, date: '', startDate: '', endDate: '', description: '', volunteersNeeded: '5', location: '', type: '', commitment: '', skills: '', contactName: '', contactEmail: '', contactNumber: '' });
    onClose && onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Event</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}><Text style={{fontSize:18}}>✕</Text></TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ padding: 12 }}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput style={styles.input} value={form.name} onChangeText={t => updateField('name', t)} />
            {errors.name && <Text style={styles.err}>{errors.name}</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
              <Text style={styles.label}>Event spans multiple days</Text>
              <Switch value={form.isRange} onValueChange={v => updateField('isRange', v)} />
            </View>

            {!form.isRange ? (
              <>
                <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
                <TextInput style={styles.input} value={form.date} onChangeText={t => updateField('date', t)} placeholder="2023-08-15" />
                {errors.date && <Text style={styles.err}>{errors.date}</Text>}
              </>
            ) : (
              <>
                <Text style={styles.label}>Start Date</Text>
                <TextInput style={styles.input} value={form.startDate} onChangeText={t => updateField('startDate', t)} placeholder="2023-08-01" />
                {errors.startDate && <Text style={styles.err}>{errors.startDate}</Text>}
                <Text style={styles.label}>End Date</Text>
                <TextInput style={styles.input} value={form.endDate} onChangeText={t => updateField('endDate', t)} placeholder="2023-08-05" />
                {errors.endDate && <Text style={styles.err}>{errors.endDate}</Text>}
              </>
            )}

            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} value={form.location} onChangeText={t => updateField('location', t)} />
            {errors.location && <Text style={styles.err}>{errors.location}</Text>}

            <Text style={styles.label}>Volunteer Type</Text>
            <TextInput style={styles.input} value={form.type} onChangeText={t => updateField('type', t)} placeholder="environment, teaching, caregiving..." />
            {errors.type && <Text style={styles.err}>{errors.type}</Text>}

            <Text style={styles.label}>Time Commitment</Text>
            <TextInput style={styles.input} value={form.commitment} onChangeText={t => updateField('commitment', t)} placeholder="one-time, weekly..." />
            {errors.commitment && <Text style={styles.err}>{errors.commitment}</Text>}

            <Text style={styles.label}>Skills Needed</Text>
            <TextInput style={styles.input} value={form.skills} onChangeText={t => updateField('skills', t)} placeholder="teaching, caregiving, none" />
            {errors.skills && <Text style={styles.err}>{errors.skills}</Text>}

            <Text style={styles.label}>Volunteers Needed</Text>
            <TextInput style={styles.input} value={String(form.volunteersNeeded)} keyboardType="numeric" onChangeText={t => updateField('volunteersNeeded', t)} />

            <Text style={styles.label}>Description</Text>
            <TextInput style={[styles.input, { height: 90 }]} value={form.description} onChangeText={t => updateField('description', t)} multiline />
            {errors.description && <Text style={styles.err}>{errors.description}</Text>}

            <Text style={styles.label}>Contact Name</Text>
            <TextInput style={styles.input} value={form.contactName} onChangeText={t => updateField('contactName', t)} />
            {errors.contactName && <Text style={styles.err}>{errors.contactName}</Text>}

            <Text style={styles.label}>Contact Email</Text>
            <TextInput style={styles.input} value={form.contactEmail} onChangeText={t => updateField('contactEmail', t)} keyboardType="email-address" />
            {errors.contactEmail && <Text style={styles.err}>{errors.contactEmail}</Text>}

            <Text style={styles.label}>Contact Number</Text>
            <TextInput style={styles.input} value={form.contactNumber} onChangeText={t => updateField('contactNumber', t)} keyboardType="phone-pad" />
            {errors.contactNumber && <Text style={styles.err}>{errors.contactNumber}</Text>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={onClose}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleSubmit}>
                <Text style={{ color: '#fff' }}>Create Event</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
