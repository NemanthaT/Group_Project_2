import React, { useState } from 'react';
import { Modal, View, Text, TextInput, ScrollView, StyleSheet, Platform, TouchableOpacity, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
// import { EVENT_OPTIONS } from '../../../constants/eventOptions';

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

  const clearForm = () => {
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
  };

  const handleClose = () => {
    clearForm();
    onClose && onClose();
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
    if (imageFile) {
      Alert.alert('Limit', 'Only one image can be submitted.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      console.log("Selected Image:", selectedImage.uri);  // Add logging
      setImageFile(selectedImage);
      setErrors(prev => ({ ...prev, image: null }));
    }
  };


  const handleDocumentPick = async () => {
    if (documentFiles.length >= 5) {
      Alert.alert('Limit', 'Maximum 5 PDF documents allowed.');
      return;
    }
    
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        multiple: true,
        copyToCacheDirectory: true
      });
      
      if (result.canceled === false && result.assets) {
        // Handle the new API format with multiple assets
        const newFiles = [...documentFiles];
        
        for (const asset of result.assets) {
          if (newFiles.length < 5) {
            newFiles.push({
              uri: asset.uri,
              name: asset.name,
              type: 'application/pdf',
              size: asset.size
            });
          }
        }
        
        setDocumentFiles(newFiles);
        setErrors(prev => ({ ...prev, documents: null }));
        
        if (result.assets.length > 5 - documentFiles.length) {
          Alert.alert('Some files not added', `Only added ${5 - documentFiles.length} file(s) to stay within the 5 PDF limit.`);
        }
      } else if (result.type === 'success') {
        // Handle legacy format for backward compatibility
        setDocumentFiles(prev => {
          const newFiles = [...prev, result];
          return newFiles.slice(0, 5);
        });
        setErrors(prev => ({ ...prev, documents: null }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document. Please try again.');
      console.error('Document picking error:', error);
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

    if (!onSubmit) {
      Alert.alert('Error', 'Submit handler not provided');
      return;
    }

    setIsSubmitting(true);

    try {
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

      if (imageFile && imageFile.uri) {
        const imageUri = Platform.OS === 'ios' ? imageFile.uri.replace('file://', '') : imageFile.uri;
        const imageName = imageFile.fileName || imageFile.uri.split('/').pop() || 'event_image.jpg';
        const imageType = imageFile.type || 'image/jpeg';
        
        formData.append('image', {
          uri: imageUri,
          name: imageName,
          type: imageType
        });
      }

      documentFiles.forEach((file, idx) => {
        formData.append('documents', {
          uri: file.uri,
          name: file.name || `document_${idx + 1}.pdf`,
          type: 'application/pdf'
        });
      });

      console.log('Calling onSubmit with formData...');
      const result = await onSubmit(formData);
      console.log('onSubmit result:', result);

      if (result && result.success) {
        Alert.alert('Success', 'Event created successfully!');
        clearForm();
        onClose && onClose();
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      Alert.alert('Error', 'An unexpected error occurred while creating the event');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Event</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}><Text style={{fontSize:18}}>✕</Text></TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ padding: 12 }}>
            {/* Event Name */}
            <Text style={styles.label}>Event Name</Text>
            <TextInput style={styles.input} value={form.name} onChangeText={t => updateField('name', t)} />
            {errors.name && <Text style={styles.err}>{errors.name}</Text>}

            {/* Event Date & Range Toggle */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Text style={styles.label}>Event Date</Text>
              <Switch value={form.isRange} onValueChange={v => updateField('isRange', v)} style={{ marginLeft: 12 }} />
              <Text style={{ marginLeft: 8, color: '#888' }}>Multi-day?</Text>
            </View>
            {!form.isRange ? (
              <View>
                <TextInput style={styles.input} value={form.date} onChangeText={t => updateField('date', t)} placeholder="YYYY-MM-DD" />
                {errors.date && <Text style={styles.err}>{errors.date}</Text>}
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <TextInput style={styles.input} value={form.startDate} onChangeText={t => updateField('startDate', t)} placeholder="Start Date" />
                  {errors.startDate && <Text style={styles.err}>{errors.startDate}</Text>}
                </View>
                <Text style={{ marginHorizontal: 8 }}>to</Text>
                <View style={{ flex: 1 }}>
                  <TextInput style={styles.input} value={form.endDate} onChangeText={t => updateField('endDate', t)} placeholder="End Date" />
                  {errors.endDate && <Text style={styles.err}>{errors.endDate}</Text>}
                </View>
              </View>
            )}

            {/* Location */}
            <Text style={styles.label}>Location</Text>
            <View style={styles.pickerBox}>
              {/* <Picker
                selectedValue={form.location}
                onValueChange={v => updateField('location', v)}
              >
                <Picker.Item label="Select Location" value="" />
                {EVENT_OPTIONS.location.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker> */}
            </View>
            {errors.location && <Text style={styles.err}>{errors.location}</Text>}

            {/* Volunteer Type */}
            <Text style={styles.label}>Volunteer Type</Text>
            <View style={styles.pickerBox}>
              {/* <Picker
                selectedValue={form.type}
                onValueChange={v => updateField('type', v)}
              >
                {/* <Picker.Item label="Select Type" value="" />
                {EVENT_OPTIONS.type.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker> */}
            </View> */
            {errors.type && <Text style={styles.err}>{errors.type}</Text>}

            {/* Time Commitment */}
            <Text style={styles.label}>Time Commitment</Text>
            <View style={styles.pickerBox}>
              {/* <Picker
                selectedValue={form.commitment}
                onValueChange={v => updateField('commitment', v)}
              >
                <Picker.Item label="Select Commitment" value="" />
                {EVENT_OPTIONS.commitment.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker> */}
            </View>
            {errors.commitment && <Text style={styles.err}>{errors.commitment}</Text>}

            {/* Skills */}
            <Text style={styles.label}>Skills</Text>
            <View style={styles.pickerBox}>
              {/* <Picker
                selectedValue={form.skills}
                onValueChange={v => updateField('skills', v)}
              >
                <Picker.Item label="Select Skills" value="" />
                {EVENT_OPTIONS.skills.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker> */}
            </View>
            {errors.skills && <Text style={styles.err}>{errors.skills}</Text>}

            {/* Number of Volunteers */}
            <Text style={styles.label}>Number of Volunteers</Text>
            <TextInput style={styles.input} value={form.volunteersNeeded} onChangeText={t => updateField('volunteersNeeded', t.replace(/[^0-9]/g, ''))} keyboardType="numeric" />
            {errors.volunteersNeeded && <Text style={styles.err}>{errors.volunteersNeeded}</Text>}

            {/* Event Description */}
            <Text style={styles.label}>Event Description</Text>
            <TextInput style={[styles.input, { height: 80 }]} value={form.description} onChangeText={t => updateField('description', t)} multiline numberOfLines={4} />
            {errors.description && <Text style={styles.err}>{errors.description}</Text>}

            {/* Contact Name */}
            <Text style={styles.label}>Contact Name</Text>
            <TextInput style={styles.input} value={form.contactName} onChangeText={t => updateField('contactName', t)} />
            {errors.contactName && <Text style={styles.err}>{errors.contactName}</Text>}

            {/* Contact Email */}
            <Text style={styles.label}>Contact Gmail</Text>
            <TextInput style={styles.input} value={form.contactEmail} onChangeText={t => updateField('contactEmail', t)} keyboardType="email-address" placeholder="example@gmail.com" />
            {errors.contactEmail && <Text style={styles.err}>{errors.contactEmail}</Text>}

            {/* Contact Number */}
            <Text style={styles.label}>Contact Number</Text>
            <TextInput style={styles.input} value={form.contactNumber} onChangeText={t => updateField('contactNumber', t)} keyboardType="phone-pad" placeholder="e.g. +94 77 123 4567" />
            {errors.contactNumber && <Text style={styles.err}>{errors.contactNumber}</Text>}

            {/* Event Image (required) */}
            <Text style={styles.label}>Event Image (required)</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick} disabled={!!imageFile}>
              <Text style={styles.uploadText}>{imageFile ? 'Image selected' : 'Choose image'}</Text>
            </TouchableOpacity>
            {imageFile && imageFile.uri && (
              <View style={styles.fileItem}>
                <Text style={styles.fileName}>{imageFile.uri.split('/').pop()}</Text>
                <TouchableOpacity onPress={() => setImageFile(null)} style={styles.removeBtn}>
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {errors.image && <Text style={styles.err}>{errors.image}</Text>}

            {/* Proof Documents (PDF) (required) */}
            <Text style={styles.label}>Proof Documents (PDF) (required) - Max 5</Text>
            <TouchableOpacity 
              style={[styles.uploadBox, documentFiles.length >= 5 ? styles.uploadBoxDisabled : {}]} 
              onPress={handleDocumentPick} 
              disabled={documentFiles.length >= 5}
            >
              <Text style={styles.uploadText}>
                {documentFiles.length < 5 ? `Select PDF Files (${documentFiles.length}/5)` : 'Max 5 PDFs reached'}
              </Text>
            </TouchableOpacity>
            
            {documentFiles.length > 0 && (
              <View style={styles.fileListContainer}>
                <Text style={styles.fileListHeader}>Selected PDF Files:</Text>
                {documentFiles.map((file, idx) => (
                  <View key={idx} style={styles.fileItem}>
                    <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
                      {file.name || `Document ${idx + 1}`}
                    </Text>
                    <TouchableOpacity onPress={() => removeDocument(idx)} style={styles.removeBtn}>
                      <Text style={styles.removeText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            
            {errors.documents && <Text style={styles.err}>{errors.documents}</Text>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={handleClose}>
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
  uploadBoxDisabled: {
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  uploadText: {
    color: '#4d4187a3',
    fontWeight: '600',
    fontSize: 16,
  },
  fileListContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 8,
  },
  fileListHeader: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 8,
    marginBottom: 6,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
  },
  removeBtn: {
    padding: 4,
    marginLeft: 8,
  },
  removeText: {
    color: '#d9534f',
    fontSize: 16,
    fontWeight: '600',
  },
  err: { color: '#d9534f', marginTop: 4 }
});