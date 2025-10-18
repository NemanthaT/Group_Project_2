import React, { useState } from 'react';
import { Modal, View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

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
    contactNumber: '',
    image: null,
    documents: [] // Changed from single document to array
  });

  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow access to your photo library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        updateField('image', result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
        multiple: true // Allow multiple document selection
      });

      console.log('Document picker result:', result);

      // Handle both single and multiple document selection
      if (!result.canceled) {
        // result.assets contains the selected files for expo-document-picker v11+
        if (result.assets && result.assets.length > 0) {
          const newDocs = result.assets.map(asset => ({
            uri: asset.uri,
            name: asset.name,
            mimeType: asset.mimeType || 'application/octet-stream',
            size: asset.size
          }));
          
          // Add to existing documents (max 5 total)
          const currentDocs = form.documents || [];
          const updatedDocs = [...currentDocs, ...newDocs].slice(0, 5);
          updateField('documents', updatedDocs);
        }
      } else if (result.type === 'success') {
        // Fallback for older versions of expo-document-picker
        const newDoc = {
          uri: result.uri,
          name: result.name,
          mimeType: result.mimeType || 'application/octet-stream',
          size: result.size
        };
        const currentDocs = form.documents || [];
        const updatedDocs = [...currentDocs, newDoc].slice(0, 5);
        updateField('documents', updatedDocs);
      }
    } catch (error) {
      console.error('Document picker error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const removeDocument = (index) => {
    const updatedDocs = form.documents.filter((_, i) => i !== index);
    updateField('documents', updatedDocs);
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
    if (!form.image) newErrors.image = 'Event image is required';
    if (!form.documents || form.documents.length === 0) newErrors.documents = 'At least one proof document is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert('Validation', 'Please fix the errors in the form');
      return;
    }
    
    // Create form data for multipart/form-data submission
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('isRange', form.isRange ? 'true' : 'false');
    
    // Add date fields based on isRange
    if (form.isRange) {
      formData.append('startDate', form.startDate);
      formData.append('endDate', form.endDate);
    } else {
      formData.append('date', form.date);
    }
    
    formData.append('description', form.description);
    formData.append('volunteersNeeded', String(Number(form.volunteersNeeded) || 1));
    formData.append('location', form.location);
    formData.append('type', form.type);
    formData.append('commitment', form.commitment);
    formData.append('skills', form.skills);
    formData.append('contactName', form.contactName);
    formData.append('contactEmail', form.contactEmail);
    formData.append('contactNumber', form.contactNumber);

    // Append image if selected
    if (form.image) {
      const imageUri = form.image.uri;
      const imageName = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(imageName);
      const imageType = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('image', {
        uri: imageUri,
        name: imageName,
        type: imageType
      });
    }

    // Append all documents
    if (form.documents && form.documents.length > 0) {
      form.documents.forEach((doc, index) => {
        formData.append('documents', {
          uri: doc.uri,
          name: doc.name,
          type: doc.mimeType
        });
      });
    }

    console.log('Submitting form data:', {
      name: form.name,
      isRange: form.isRange,
      documentsCount: form.documents?.length || 0,
      hasImage: !!form.image
    });

    onCreate && onCreate(formData);
    
    // reset form
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
      contactNumber: '',
      image: null,
      documents: []
    });
    onClose && onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Event</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={{fontSize:18, color: '#fff'}}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput style={styles.input} value={form.name} onChangeText={t => updateField('name', t)} />
            {errors.name && <Text style={styles.err}>{errors.name}</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
              <Text style={styles.label}>Event spans multiple days</Text>
              <Switch style={styles.switch} value={form.isRange} onValueChange={v => updateField('isRange', v)} />
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

            <Text style={styles.label}>Event Image</Text>
            <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
              <Text style={styles.uploadText}>Choose Image</Text>
            </TouchableOpacity>
            {errors.image && <Text style={styles.err}>{errors.image}</Text>}
            {form.image && (
              <View style={styles.previewContainer}>
                <Image source={{ uri: form.image.uri }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.removeBtn} 
                  onPress={() => updateField('image', null)}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.label}>Supporting Documents (Max 5)</Text>
            <TouchableOpacity style={styles.uploadBtn} onPress={pickDocument}>
              <Text style={styles.uploadText}>Choose Documents</Text>
            </TouchableOpacity>
            {errors.documents && <Text style={styles.err}>{errors.documents}</Text>}
            
            {form.documents && form.documents.length > 0 && (
              <View style={styles.documentsContainer}>
                {form.documents.map((doc, index) => (
                  <View key={index} style={styles.docPreview}>
                    <Text numberOfLines={1} style={styles.docName}>
                      {index + 1}. {doc.name}
                    </Text>
                    <TouchableOpacity 
                      style={styles.removeBtn} 
                      onPress={() => removeDocument(index)}
                    >
                      <Text style={styles.removeText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <Text style={styles.docCount}>{form.documents.length}/5 documents selected</Text>
              </View>
            )}

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 24, marginBottom: 16 }}>
              <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={onClose}>
                <Text style={{ color: '#7B61FF', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleSubmit}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Create Event</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', 
    padding: 16 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    maxHeight: '90%' 
  },
  header: { 
    backgroundColor: '#e6e6e6ff',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative'
  },
  title: { 
    fontSize: 26,
    fontWeight: '700',
    color: '#000000ff',
    marginBottom: 2,
    alignSelf: 'left'
  },
  closeBtn: { 
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 5,
    backgroundColor: 'rgba(54, 54, 54, 0.36)',
    borderRadius: 4,
  },
  label: { 
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  btn: { 
    flex: 1,
    padding: 12, 
    borderRadius: 5, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: { 
    backgroundColor: '#7B61FF' 
  },
  btnOutline: { 
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#7B61FF',
  },
  err: { 
    color: '#FF3B30', 
    fontSize: 14,
    marginTop: 4 
  },
  uploadBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#7B61FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#F8F7FF'
  },
  uploadText: {
    color: '#7B61FF',
    fontSize: 16,
    fontWeight: '600'
  },
  previewContainer: {
    marginTop: 8,
    position: 'relative'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8
  },
  docPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F7FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    position: 'relative'
  },
  docName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 30
  },
  removeBtn: {
    position: 'absolute',
    right: 8,
    top: '50%',
    marginTop: -12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700'
  },
  switch: {
    marginTop: 10,
  },
  documentsContainer: {
    marginTop: 8,
    gap: 8
  },
  docCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right'
  }
});
