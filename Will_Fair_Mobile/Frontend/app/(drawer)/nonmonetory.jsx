import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";

const NonMonetary = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [docFile, setDocFile] = useState(null);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([
    { label: "Dry rations", value: "dry rations" },
    { label: "Medical Supplies(First Aid Kits,Mobility aids)", value: "medical supplies" },
    { label: "Education Materials(Books,Notebooks,Stationery,Digital Devices)", value: "education materials" },
    { label: "Shelter & Household Essentials(Blankets,Bedsheets,Sleeping Mats)", value: "shelter & household essentials" },
    { label: "Used Toys", value: "used toys" },
  ]);

  const [provinceOpen, setProvinceOpen] = useState(false);
  const [province, setProvince] = useState(null);
  const [provinces, setProvinces] = useState([
    { label: "Central", value: "central" },
    { label: "Eastern", value: "eastern" },
    { label: "Northern", value: "northern" },
    { label: "Southern", value: "southern" },
    { label: "Western", value: "western" },
    { label: "North Western", value: " north western" },
    { label: "Sabaragamuwa", value: "sabaragamuwa" },
    { label: "Uva", value: "uva" },
    { label: "North Central", value: "north central" },
  ]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImageFile(result.assets[0]);
    }
  };

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      setDocFile(result.assets[0]);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = () => {
      // You can add form validation here if needed
      // For now, just show success message
      Alert.alert(
        "Success! 🎉",
        "Your donation request has been submitted successfully. We will review it and get back to you soon.",
        [
          {
            text: "OK",
            onPress: () => {
              // Optional: Navigate back to previous screen or clear form
              navigation.navigate("homescreen");
              // Or navigate to a specific screen:
              // navigation.navigate('mydonationreq');
            }
          }
        ]
      );
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
        <TouchableOpacity style={styles.tabButton}
        onPress={() => navigation.navigate("monetory")}>
          <Text style={styles.tabText}>Monetary Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}
        onPress={() => navigation.navigate("nonmonetory")}>
          <Text style={styles.tabText}>Non Monetary Support</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Category</Text>
        <DropDownPicker
          open={categoryOpen}
          value={category}
          items={categories}
          setOpen={setCategoryOpen}
          setValue={setCategory}
          setItems={setCategories}
          placeholder="Select a category"
          listMode="SCROLLVIEW" // ✅ Prevents nested FlatList warning
          style={{ marginBottom: categoryOpen ? 150 : 20 }}
        />

        <Text style={styles.sectionTitle}>Reason for Request</Text>
        <TextInput style={styles.inputField} placeholder="Enter request name" />


        <Text style={styles.sectionTitle}>Item Name</Text>
        <TextInput style={styles.inputField} placeholder="Enter item name" />

        <Text style={styles.sectionTitle}>Item Quantity</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter quantity"
          keyboardType="numeric"
        />

        <Text style={styles.sectionTitle}>Dropoff Date</Text>
        <TouchableOpacity
          style={styles.inputField}
          onPress={() => setShowDatePicker(true)}
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


        {/* <Text style={styles.sectionTitle}>Province</Text>
        <DropDownPicker
          open={provinceOpen}
          value={province}
          items={provinces}
          setOpen={setProvinceOpen}
          setValue={setProvince}
          setItems={setProvinces}
          placeholder="Select province"
          listMode="SCROLLVIEW" // ✅ Prevents nesting error
          style={{ marginBottom: provinceOpen ? 150 : 20 }}
        /> */}

        <Text style={styles.sectionTitle}>Request Image(Optioal)</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
          <Text style={{ textAlign: "center" }}>Choose Image</Text>
        </TouchableOpacity>
        {imageFile && (
          <Text style={styles.fileText}>
            Selected: {imageFile.fileName || "Image selected"}
          </Text>
        )}

        <Text style={styles.sectionTitle}>Proof Documents</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleDocumentPick}>
          <Text style={{ textAlign: "center" }}>Choose PDF Document</Text>
        </TouchableOpacity>
        {docFile && (
          <Text style={styles.fileText}>Selected: {docFile.name}</Text>
        )}

        <Text style={styles.sectionTitle}>
          Upload PDF documents as proof for your request (medical reports, school
          documents, etc). PDF only, max 5MB.
        </Text>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}
        onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Create Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NonMonetary;
