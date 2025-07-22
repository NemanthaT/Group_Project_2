import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from '@react-navigation/native';
import { router } from 'expo-router';
import {
  donationRequestsStyles,
  donationRequestsStyles as styles,
} from "../../assets/styles/donationrequestsstyles";

const Monetary = () => {
  const navigation = useNavigation();  
  const [selectedTab, setSelectedTab] = useState("monetary");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [docFile, setDocFile] = useState(null);

  // Dropdown
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([
    { label: "Education", value: "education" },
    { label: "Health Care & Medical Aid", value: "health care & medical aid" },
    { label: "Disaster & Crisis Relief", value: "disaster & crisis relief" },
    { label: "Basic Needs & Essentials", value: "basic needs & essentials" },
    { label: "Children & Orphan Care", value: "children & orphan care" },
  ]);

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
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

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      {/* Header */}
      <LinearGradient colors={["#7B61FF", "#9333EA"]} style={styles.header}>
         <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 5,
            }}
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

      {/* Support Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton,styles.activeTab]}
        onPress={() => navigation.navigate("monetory")}>
          <Text style={styles.tabText}>Monetary Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}
        onPress={() => navigation.navigate("nonmonetory")}>
          <Text style={styles.tabText}>Non Monetary Support</Text>
        </TouchableOpacity>
      </View>

      
      {/* Form */}
      <View style={styles.form}>

        {/* Category Dropdown */}
        <Text style={donationRequestsStyles.sectionTitle}>Category</Text>
        <DropDownPicker
          open={openCategory}
          value={category}
          items={categories}
          setOpen={setOpenCategory}
          setValue={setCategory}
          setItems={setCategories}
          placeholder="Select Category"
          listMode="SCROLLVIEW" // ✅ Show inline dropdown (not modal, not FlatList)
          style={{
            marginBottom: openCategory ? 150 : 20,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />

        {/* Request Name */}
        <Text style={donationRequestsStyles.sectionTitle}>Reason for Request</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter request name"
          placeholderTextColor="#999"
        />

        <Text style={styles.sectionTitle}>Detailed Description</Text>
        <TextInput
        style={[styles.inputField, { height: 100, textAlignVertical: "top" }]}
          multiline
          placeholder="Describe your request in detail. Include why you need"
        />

        {/* Target Amount */}
        <Text style={donationRequestsStyles.sectionTitle}>Target Amount</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter target amount"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        {/* Deadline */}
        <Text style={donationRequestsStyles.sectionTitle}>Urgent Need Date(Optional)</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.inputField}
        >
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Request Image Upload */}
        <Text style={donationRequestsStyles.sectionTitle}>Request Image(optional)</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
          <Text style={{ textAlign: "center" }}>Choose Image</Text>
        </TouchableOpacity>
        {imageFile && (
          <Text
            style={{
              marginTop: 6,
              marginBottom: 10,
              color: "green",
              fontSize: 12,
            }}
          >
            Selected: {imageFile.fileName || "Image selected"}
          </Text>
        )}

        {/* Proof Document Upload */}
        <Text style={donationRequestsStyles.sectionTitle}>Proof Document</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleDocumentPick}>
          <Text style={{ textAlign: "center" }}>Choose PDF Document</Text>
        </TouchableOpacity>
        {docFile && (
          <Text
            style={{
              marginTop: 6,
              marginBottom: 10,
              color: "green",
              fontSize: 12,
            }}
          >
            Selected: {docFile.name}
          </Text>
        )}

        <Text style={donationRequestsStyles.sectionTitle}>
          Upload PDF document(s) as proof for your request (medical reports,
          school documents, etc). PDF only, max 5MB.
        </Text>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}
        onPress={() => router.push('/donation_payment')} // Must match your route name
        >
          <Text style={styles.submitText}>Create Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Monetary;
