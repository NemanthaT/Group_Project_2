import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_BASE } from '../../constants/API';
import { useBackHandlerWithConfirmation } from '../../hooks/useBackHandler';

export default function VolunteerSignUpScreen() {
  const router = useRouter();
  const { id, eventName } = useLocalSearchParams();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: new Date(),
    eventId: id || '',
    eventName: eventName || '',
    availability: '',
    volunteerRole: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Check if form has any data (to warn about unsaved changes)
  const hasUnsavedChanges = formData.name !== '' || 
                           formData.email !== '' || 
                           formData.phone !== '' || 
                           formData.address !== '';
  
  // Enable hardware back button with confirmation if form has data
  useBackHandlerWithConfirmation(hasUnsavedChanges);

  // Update form field
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address/City is required';
    if (!formData.availability) newErrors.availability = 'Availability is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact name is required';
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency contact phone is required';
    } else if (!/^\d{10}$/.test(formData.emergencyPhone.replace(/\s/g, ''))) {
      newErrors.emergencyPhone = 'Emergency phone must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      updateField('dob', selectedDate);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Implement API call to submit volunteer registration
      console.log('Form submitted:', formData);
      
      // For now, show success and navigate back
      alert('Thank you for volunteering! Your registration has been submitted!');
      router.back();
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Volunteer Sign Up</Text>
          <Text style={styles.headerSubtitle}>
            Join us in making a difference!
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Event Information (Read-only) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Event ID</Text>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>{formData.eventId}</Text>
              </View>
            </View>

            {eventName && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Event Name</Text>
                <View style={styles.readOnlyInput}>
                  <Text style={styles.readOnlyText}>{eventName}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Full Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(value) => updateField('name', value)}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email Address <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="your.email@example.com"
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Phone Number <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                placeholder="0771234567"
                value={formData.phone}
                onChangeText={(value) => updateField('phone', value)}
                keyboardType="phone-pad"
                maxLength={10}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Address / City <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.address && styles.inputError]}
                placeholder="Enter your city or address"
                value={formData.address}
                onChangeText={(value) => updateField('address', value)}
              />
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Date of Birth <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>{formatDate(formData.dob)}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.dob}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>
          </View>

          {/* Volunteer Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Availability Duration <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.pickerContainer, errors.availability && styles.inputError]}>
                <Picker
                  selectedValue={formData.availability}
                  onValueChange={(value) => updateField('availability', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select availability..." value="" />
                  <Picker.Item label="Morning (8:00 AM - 12:00 PM)" value="morning" />
                  <Picker.Item label="Evening (1:00 PM - 5:00 PM)" value="evening" />
                  <Picker.Item label="Full Day (8:00 AM - 8:00 PM)" value="fullday" />
                </Picker>
              </View>
              {errors.availability && (
                <Text style={styles.errorText}>{errors.availability}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Volunteer Role (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Team Leader, Helper, Coordinator"
                value={formData.volunteerRole}
                onChangeText={(value) => updateField('volunteerRole', value)}
              />
              <Text style={styles.helperText}>
                Leave blank if not applicable
              </Text>
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Emergency Contact Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.emergencyContact && styles.inputError]}
                placeholder="Enter emergency contact name"
                value={formData.emergencyContact}
                onChangeText={(value) => updateField('emergencyContact', value)}
              />
              {errors.emergencyContact && (
                <Text style={styles.errorText}>{errors.emergencyContact}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Emergency Contact Phone <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.emergencyPhone && styles.inputError]}
                placeholder="0771234567"
                value={formData.emergencyPhone}
                onChangeText={(value) => updateField('emergencyPhone', value)}
                keyboardType="phone-pad"
                maxLength={10}
              />
              {errors.emergencyPhone && (
                <Text style={styles.errorText}>{errors.emergencyPhone}</Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Registration</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerNote}>
            <Text style={styles.required}>*</Text> Required fields
          </Text>
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
  header: {
    backgroundColor: '#7B61FF',
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#EEDCFF',
    textAlign: 'center',
  },
  formContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#7B61FF',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#FF3B30',
    fontSize: 16,
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
  inputError: {
    borderColor: '#FF3B30',
  },
  readOnlyInput: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
  },
  readOnlyText: {
    fontSize: 16,
    color: '#666',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: '#999',
    fontSize: 13,
    marginTop: 4,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#7B61FF',
  },
  cancelButtonText: {
    color: '#7B61FF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#7B61FF',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footerNote: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 24,
  },
});