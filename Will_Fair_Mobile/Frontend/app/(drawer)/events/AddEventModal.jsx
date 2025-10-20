import React, { useState } from 'react';
import { Modal, View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export default function AddEventModal({ isOpen, onClose, onSubmit }) {
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
  const [imageFile, setImageFile] = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const sanitizePhoneNumber = (phone) => phone.replace(/\s+/g, '');
  const validatePhoneNumber = (phone) => /^\+94\d{9}$/.test(sanitizePhoneNumber(phone));

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
    if (!validatePhoneNumber(form.contactNumber)) newErrors.contactNumber = 'Format: +94xxxxxxxxx';
    if (!form.volunteersNeeded || Number(form.volunteersNeeded) < 1) newErrors.volunteersNeeded = 'At least 1';
    if (!imageFile) newErrors.image = 'Event image required';
    if (documentFiles.length === 0) newErrors.documents = 'At least one PDF required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.cancelled) {
      setImageFile(result);
      setErrors(prev => ({ ...prev, image: null }));
    }
  };

  const handleDocumentPick = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      multiple: true
    });
    if (result.type === 'success') {
      setDocumentFiles(prev => [...prev, result]);
      setErrors(prev => ({ ...prev, documents: null }));
    }
  };

  const removeDocument = (index) => {
    setDocumentFiles(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert('Validation', 'Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    const sanitizedPhone = sanitizePhoneNumber(form.contactNumber);
    let formData = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'volunteersNeeded') {
        formData.append(k, Number(v));
      } else {
        formData.append(k, v);
      }
    });
    formData.append('contactNumber', sanitizedPhone);

    if (form.isRange) {
      formData.append('startDate', form.startDate);
      formData.append('endDate', form.endDate);
    } else {
      formData.append('date', form.date);
    }

    if (imageFile) {
      formData.append('image', {
        uri: Platform.OS === 'ios' ? imageFile.uri.replace('file://', '') : imageFile.uri,
        name: 'event_image.jpg',
        type: 'image/jpeg'
      });
    }

    documentFiles.forEach((file, idx) => {
      formData.append('documents', {
        uri: file.uri,
        name: file.name || `document_${idx + 1}.pdf`,
        type: 'application/pdf'
      });
    });

    const result = await onSubmit(formData);
    setIsSubmitting(false);

    if (result && result.success) {
      setForm({
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
      setImageFile(null);
      setDocumentFiles([]);
      setErrors({});
      onClose && onClose();
    }
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
            {/* ...fields as in your web version, using TextInput, Switch, etc... */}
            {/* Add error display below each field as in the web version */}
            {/* Add image/document pickers and display selected files */}
            {/* Add Cancel/Create buttons */}
            {/* ... */}
            {/* For brevity, use your previous field rendering code, but add error display and file pickers as above */}
            <Text style={styles.label}>Event Name</Text>
            <TextInput style={styles.input} value={form.name} onChangeText={t => updateField('name', t)} />
            {errors.name && <Text style={styles.err}>{errors.name}</Text>}

            {/* ...repeat for all fields... */}


            <Text style={styles.label}>Event Image (required)</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
              <Text style={styles.uploadText}>{imageFile ? 'Change image' : 'Choose image'}</Text>
            </TouchableOpacity>
            {imageFile && <Text style={{ marginTop: 4 }}>{imageFile.uri.split('/').pop()}</Text>}
            {errors.image && <Text style={styles.err}>{errors.image}</Text>}

            <Text style={styles.label}>Proof Documents (PDF) (required)</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={handleDocumentPick}>
              <Text style={styles.uploadText}>Choose PDF</Text>
            </TouchableOpacity>
            {documentFiles.map((file, idx) => (
              <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text>{file.name}</Text>
                <TouchableOpacity onPress={() => removeDocument(idx)} style={{ marginLeft: 8 }}>
                  <Text style={{ color: '#d9534f' }}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            {errors.documents && <Text style={styles.err}>{errors.documents}</Text>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={onClose}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleSubmit} disabled={isSubmitting}>
                <Text style={{ color: '#fff' }}>{isSubmitting ? 'Creating...' : 'Create Event'}</Text>
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
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#7B61FF',
    backgroundColor: '#f6f6ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  uploadText: {
    color: '#4d4187a3',
    fontWeight: '600',
    fontSize: 16,
  },
  err: { color: '#d9534f', marginTop: 4 }
});