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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { donationRequestsStyles, donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";

const Monetary = () => {
  const navigation = useNavigation();

  // Form states
  const [selectedTab, setSelectedTab] = useState("monetary");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [docFile, setDocFile] = useState(null);

  // ✅ Category Dropdown (dynamic from database)
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // (Branch dropdown removed - unused in this screen)

  // Bank Dropdown
  const [openBank, setOpenBank] = useState(false);
  const [bankName, setBankName] = useState(null);
  const [banks, setBanks] = useState([
    { label: "Bank of Ceylon", value: "bank_of_ceylon" },
    { label: "People's Bank", value: "peoples_bank" },
    { label: "Commercial Bank", value: "commercial_bank" },
    { label: "Hatton National Bank", value: "hatton_national_bank" },
    { label: "Sampath Bank", value: "sampath_bank" },
    { label: "Nations Trust Bank", value: "nations_trust_bank" },
    { label: "DFCC Bank", value: "dfcc_bank" },
    { label: "Seylan Bank", value: "seylan_bank" },
  ]);

  // ✅ Fetch categories dynamically from API (supports emulator and multiple response shapes)
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        // Use local backend. On Android emulator replace localhost with 10.0.2.2
        const base = Platform.OS === "android" ? "http://192.168.122.72:5000" : "http://localhost:5000";
        const url = `${base}/api/donations/monetaryCategories`;

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

  // File pickers
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

  const handleSubmit = () => {
    Alert.alert(
      "Success! 🎉",
      "Your donation request has been submitted successfully. We will review it and get back to you soon.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("homescreen"),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={["#7B61FF", "#9333EA"]} style={styles.header}>
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
          style={[styles.tabButton, styles.activeTab]}
          onPress={() => navigation.navigate("monetory")}
        >
          <Text style={styles.tabText}>Monetary Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("nonmonetory")}
        >
          <Text style={styles.tabText}>Non Monetary Support</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* ✅ Dynamic Category Dropdown */}
        <Text style={donationRequestsStyles.sectionTitle}>Category</Text>
        <DropDownPicker
          open={openCategory}
          value={category}
          items={categories}
          setOpen={setOpenCategory}
          setValue={setCategory}
          setItems={setCategories}
          placeholder={loadingCategories ? "Loading categories..." : "Select Category"}
          disabled={loadingCategories}
          listMode="SCROLLVIEW"
          style={{
            marginBottom: openCategory ? 150 : 20,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />

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
          placeholder="Explain your situation, who will benefit, and how the donations will be used."
        />

        <Text style={donationRequestsStyles.sectionTitle}>Target Amount</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Rs.0"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        {/* Bank Details */}
        <Text style={donationRequestsStyles.sectionTitle}>Bank Account Details</Text>
        <DropDownPicker
          open={openBank}
          value={bankName}
          items={banks}
          setOpen={setOpenBank}
          setValue={setBankName}
          setItems={setBanks}
          placeholder="Select Your Bank"
          listMode="SCROLLVIEW"
          zIndex={2000}
          zIndexInverse={2000}
          style={{
            marginBottom: openBank ? 150 : 20,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Account Number"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        {/* Date Picker */}
        <Text style={donationRequestsStyles.sectionTitle}>Urgent Need Date (Optional)</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputField}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
        )}

        {/* Image Upload */}
        <Text style={donationRequestsStyles.sectionTitle}>Request Image (Optional)</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
          <Text style={{ textAlign: "center" }}>Choose File</Text>
        </TouchableOpacity>
        {imageFile && (
          <Text style={{ marginTop: 6, marginBottom: 10, color: "green", fontSize: 12 }}>
            Selected: {imageFile.fileName || "Image selected"}
          </Text>
        )}

        {/* Document Upload */}
        <Text style={donationRequestsStyles.sectionTitle}>Proof Documents</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleDocumentPick}>
          <Text style={{ textAlign: "center" }}>Choose File</Text>
        </TouchableOpacity>
        {docFile && (
          <Text style={{ marginTop: 6, marginBottom: 10, color: "green", fontSize: 12 }}>
            Selected: {docFile.name}
          </Text>
        )}

        <Text style={donationRequestsStyles.sectionTitle}>
          Upload PDF document/s as proof for your request (medical reports, school documents, etc).
        </Text>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Create Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Monetary;
