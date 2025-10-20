import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { donationRequestsStyles, donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../constants/API';
import { useLocalSearchParams } from 'expo-router';

const NonMonetary = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  
  // Check if in edit mode
  const isEditMode = params.editMode === 'true';
  const editRequestId = params.requestId;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [docFile, setDocFile] = useState(null);

  // Form data states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Category Dropdown (dynamic from database)
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

    // ✅ Fetch categories dynamically from API (supports emulator and multiple response shapes)
    useEffect(() => {
      const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
          // Use local backend. On Android emulator replace localhost with 10.0.2.2
          const base = Platform.OS === "android" ? "http://10.23.1.180:5000" : "http://localhost:5000";
          const url = `${base}/api/donations/nonMonetaryCategories`;
  
          const res = await fetch(url, { headers: { Accept: "application/json" } });
  
          // Try to parse JSON safely
          const json = await res.json();
  
          // Server may return { success: true, categories: [...] } or raw array
          const payload = Array.isArray(json) ? json : json.categories || json.data || [];
  
          // payload could be array of strings (category_name) or objects { id, name }
          const formatted = payload.map((item) => {
            if (typeof item === "string") return { label: item, value: item };
            // support fields with different names
            const id = item.category_id ?? item.id ?? item.value ?? item.categoryId;
            const name = item.category_name ?? item.name ?? item.label ?? item.categoryName;
            return { label: name || String(id || ""), value: id ?? name };
          });
  
          setCategories(formatted);
        } catch (error) {
          console.error("Error fetching categories:", error);
          Alert.alert("Error", "Failed to load categories from server.");
        } finally {
          setLoadingCategories(false);
        }
      };
  
      fetchCategories();
    }, []);

  // Auto-fill form when in edit mode (only once when component mounts)
  useEffect(() => {
    if (isEditMode && params.requestId) {
      console.log('Edit mode activated, filling form with:', params);
      
      // Set form fields from params
      if (params.title) setTitle(params.title);
      if (params.description) setDescription(params.description);
      if (params.quantity_needed) setQuantity(params.quantity_needed.toString());
      if (params.category_id) setCategory(parseInt(params.category_id));
      if (params.due_date) {
        const dueDate = new Date(params.due_date);
        if (!isNaN(dueDate.getTime())) {
          setDate(dueDate);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, params.requestId]);

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
    if (!result.canceled) {
      const file = result.assets[0];
      setDocFile(file);
      console.log("Selected Document:", file.uri);
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImageFile(result.assets[0]);
      console.log("Selected Image:", result.assets[0].uri);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a reason for your request');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a detailed description');
      return;
    }
    if (!itemName.trim()) {
      Alert.alert('Validation Error', 'Please enter an item name');
      return;
    }
    if (!quantity || parseFloat(quantity) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid quantity');
      return;
    }
    if (!category) {
      Alert.alert('Validation Error', 'Please select a category');
      return;
    }

    setSubmitting(true);

    try {
      // Get logged-in donee info
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        Alert.alert('Error', 'Please login to submit a donation request');
        setSubmitting(false);
        return;
      }

      const user = JSON.parse(userData);
      const doneeId = user.donee_id;

      if (!doneeId) {
        Alert.alert('Error', 'User information is incomplete. Please login again.');
        setSubmitting(false);
        return;
      }

      // Format date as YYYY-MM-DD
      const formattedDate = date.toISOString().split('T')[0];

      console.log(isEditMode ? 'Updating non-monetary donation request' : 'Creating non-monetary donation request');

      // Send to backend (POST for create, PUT for update)
      const url = isEditMode 
        ? `${API_BASE}/api/donations/${editRequestId}` 
        : `${API_BASE}/api/donations`;
      
      let response;
      
      if (isEditMode) {
        // For updates, only send editable fields as JSON
        response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            donee_id: doneeId,
            quantity_needed: quantity.toString(),
            due_date: formattedDate
          })
        });
      } else {
        // For create, send FormData with all fields including files
        const formData = new FormData();
        formData.append('donee_id', doneeId.toString());
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('quantity_needed', quantity.toString());
        formData.append('due_date', formattedDate);
        formData.append('type', 'non-monetary');
        formData.append('category_id', category.toString());

        // Add image file if selected
        if (imageFile) {
          formData.append('image', {
            uri: imageFile.uri,
            type: imageFile.mimeType || 'image/jpeg',
            name: imageFile.fileName || `image_${Date.now()}.jpg`
          });
          console.log('Image file attached:', imageFile.fileName);
        }

        // Add document file if selected
        if (docFile) {
          formData.append('document', {
            uri: docFile.uri,
            type: docFile.mimeType || 'application/pdf',
            name: docFile.name || `document_${Date.now()}.pdf`
          });
          console.log('Document file attached:', docFile.name);
        }

        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
        });
      }

      const data = await response.json();
      console.log('Response from server:', data);

      if (data.success) {
        Alert.alert(
          'Success! 🎉',
          isEditMode 
            ? 'Your donation request has been updated successfully.'
            : 'Your donation request has been submitted successfully with status "pending". We will review it and get back to you soon.',
          [
            {
              text: 'View My Requests',
              onPress: () => {
                // Clear form after update
                if (isEditMode) {
                  setTitle('');
                  setDescription('');
                  setItemName('');
                  setQuantity('');
                  setCategory(null);
                  setDate(new Date());
                  setImageFile(null);
                  setDocFile(null);
                }
                navigation.navigate('mydonationreq');
              },
            },
            {
              text: 'Go to Home',
              onPress: () => {
                // Clear form after update
                if (isEditMode) {
                  setTitle('');
                  setDescription('');
                  setItemName('');
                  setQuantity('');
                  setCategory(null);
                  setDate(new Date());
                  setImageFile(null);
                  setDocFile(null);
                }
                navigation.navigate('homescreen');
              },
            },
          ]
        );

        // Clear form after create (not edit)
        if (!isEditMode) {
          setTitle('');
          setDescription('');
          setItemName('');
          setQuantity('');
          setCategory(null);
          setDate(new Date());
          setImageFile(null);
          setDocFile(null);
        }
      } else {
        Alert.alert('Error', data.message || 'Failed to submit donation request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation request:', error);
      Alert.alert('Error', 'Failed to connect to server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#7B61FF", "#7B61FF"]} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ position: "absolute", top: 10, left: 10, zIndex: 5 }}
        >
          <Ionicons name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.headerTitle}>Submit Donation Request</Text>
        <Text style={styles.headerSubtitle}>
          Connect with generous donors who want to help your cause
        </Text>
      </LinearGradient>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("monetory")}
        >
          <Text style={styles.tabText}>Monetary Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, styles.activeTab]}
          onPress={() => navigation.navigate("nonmonetory")}
        >
          <Text style={styles.tabText}>Non Monetary Support</Text>
        </TouchableOpacity>
      </View>
      {/* Form */}
      <View style={styles.form}>
        {/* ✅ Dynamic Category Dropdown */}
        <Text style={donationRequestsStyles.sectionTitle}>
          Category {isEditMode && <Text style={{ color: '#999', fontSize: 12 }}>(Cannot be changed)</Text>}
        </Text>
        <DropDownPicker
          open={openCategory}
          value={category}
          items={categories}
          setOpen={setOpenCategory}
          setValue={setCategory}
          setItems={setCategories}
          placeholder={loadingCategories ? "Loading categories..." : "Select Category"}
          disabled={loadingCategories || isEditMode}
          listMode="SCROLLVIEW"
          style={{
            marginBottom: openCategory ? 150 : 20,
            borderColor: "#ccc",
            borderRadius: 8,
            backgroundColor: isEditMode ? '#f0f0f0' : '#fff',
          }}
        />
        <Text style={donationRequestsStyles.sectionTitle}>
          Reason for Request {isEditMode && <Text style={{ color: '#999', fontSize: 12 }}>(Cannot be changed)</Text>}
        </Text>
        <TextInput
          style={[styles.inputField, isEditMode && { backgroundColor: '#f0f0f0', color: '#666' }]}
          placeholder="Enter request name"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          editable={!isEditMode}
        />
        <Text style={styles.sectionTitle}>
          Detailed Description {isEditMode && <Text style={{ color: '#999', fontSize: 12 }}>(Cannot be changed)</Text>}
        </Text>
        <TextInput
          style={[styles.inputField, { height: 100, textAlignVertical: "top" }, isEditMode && { backgroundColor: '#f0f0f0', color: '#666' }]}
          multiline
          placeholder="Explain your situation, who will benefit, and how the donations will be used."
          value={description}
          onChangeText={setDescription}
          editable={!isEditMode}
        />
        <Text style={donationRequestsStyles.sectionTitle}>Item Name</Text>
        <TextInput 
          style={styles.inputField} 
          placeholder="Enter item name"
          value={itemName}
          onChangeText={setItemName}
        />
        <Text style={donationRequestsStyles.sectionTitle}>Item Quantity</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter quantity needed"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        <Text style={donationRequestsStyles.sectionTitle}>Dropoff Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputField}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
        )}
        <Text style={donationRequestsStyles.sectionTitle}>
          Request Image (Optional) {isEditMode && <Text style={{ color: '#999', fontSize: 12 }}>(Cannot be changed)</Text>}
        </Text>
        <TouchableOpacity 
          style={[styles.uploadBox, isEditMode && { backgroundColor: '#f0f0f0' }]} 
          onPress={handleImagePick}
          disabled={isEditMode}
        >
          <Text style={{ textAlign: "center", color: isEditMode ? '#999' : '#000' }}>
            {isEditMode ? 'Image cannot be changed' : 'Choose File'}
          </Text>
        </TouchableOpacity>
        {imageFile && !isEditMode && (
          <Text style={{ marginTop: 6, marginBottom: 10, color: "green", fontSize: 12 }}>
            Selected: {imageFile.fileName || "Image selected"}
          </Text>
        )}
        <Text style={donationRequestsStyles.sectionTitle}>
          Proof Documents {isEditMode && <Text style={{ color: '#999', fontSize: 12 }}>(Cannot be changed)</Text>}
        </Text>
        <TouchableOpacity 
          style={[styles.uploadBox, isEditMode && { backgroundColor: '#f0f0f0' }]} 
          onPress={handleDocumentPick}
          disabled={isEditMode}
        >
          <Text style={{ textAlign: "center", color: isEditMode ? '#999' : '#000' }}>
            {isEditMode ? 'Document cannot be changed' : 'Choose File'}
          </Text>
        </TouchableOpacity>
        {docFile && !isEditMode && (
          <Text style={{ marginTop: 6, marginBottom: 10, color: "green", fontSize: 12 }}>
            Selected: {docFile.name}
          </Text>
        )}
        <Text style={donationRequestsStyles.sectionTitle}>
          Upload PDF document/s as proof for your request (medical reports, school documents, etc).
        </Text>
        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, submitting && { opacity: 0.7 }]} 
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>
              {isEditMode ? 'Update Request' : 'Create Request'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NonMonetary;
