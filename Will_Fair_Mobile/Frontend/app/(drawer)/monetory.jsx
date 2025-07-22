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

  const [openBranch, setOpenBranch] = useState(false);
  const [branchName, setBranchName] = useState(null);
  const [branches, setBranches] = useState([
    { label: "Colombo Main Branch", value: "colombo_main" },
    { label: "Kandy Branch", value: "kandy" },
    { label: "Galle Branch", value: "galle" },
    { label: "Negombo Branch", value: "negombo" },
    { label: "Kurunegala Branch", value: "kurunegala" },
    { label: "Anuradhapura Branch", value: "anuradhapura" },
    { label: "Matara Branch", value: "matara" },
    { label: "Ratnapura Branch", value: "ratnapura" },
    { label: "Jaffna Branch", value: "jaffna" },
    { label: "Batticaloa Branch", value: "batticaloa" },
  ]);

  // Bank Name Dropdown
  const [openBank, setOpenBank] = useState(false);
  const [bankName, setBankName] = useState(null);
  const [banks, setBanks] = useState([
    { label: "Bank of Ceylon", value: "bank_of_ceylon" },
    { label: "People's Bank", value: "peoples_bank" },
    { label: "Commercial Bank", value: "commercial_bank" },
    { label: "Hatton National Bank", value: "hatton_national_bank" },
    { label: "Sampath Bank", value: "sampath_bank" },
    { label: "Nations Trust Bank", value: "nations_trust_bank" },
    { label: "Seylan Bank", value: "seylan_bank" },
    { label: "Union Bank", value: "union_bank" },
    { label: "DFCC Bank", value: "dfcc_bank" },
    { label: "National Development Bank", value: "ndb_bank" },
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
        {/* Request Name */}
        <Text style={donationRequestsStyles.sectionTitle}>Request Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter request name"
          placeholderTextColor="#999"
        />

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

        {/* Target Amount */}
        <Text style={donationRequestsStyles.sectionTitle}>Target Amount</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter target amount"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        {/* Deadline */}
        <Text style={donationRequestsStyles.sectionTitle}>Finalize Date</Text>
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

        {/* Bank Name Dropdown */}
        <Text style={donationRequestsStyles.sectionTitle}>Bank Name</Text>
        <DropDownPicker
          open={openBank}
          value={bankName}
          items={banks}
          setOpen={setOpenBank}
          setValue={setBankName}
          setItems={setBanks}
          placeholder="Select Bank"
          listMode="SCROLLVIEW"
          zIndex={2000}
          zIndexInverse={2000}
          style={{
            marginBottom: openBank ? 150 : 20,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />

        {/* Category Dropdown */}
        <Text style={donationRequestsStyles.sectionTitle}>Branch Name</Text>
        <DropDownPicker
          open={openBranch}
          value={branchName}
          items={branches}
          setOpen={setOpenBranch}
          setValue={setBranchName}
          setItems={setBranches}
          placeholder="Select Branch"
          listMode="SCROLLVIEW" // ✅ Show inline dropdown (not modal, not FlatList)
          style={{
            marginBottom: openBranch ? 150 : 20,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />
        <Text style={donationRequestsStyles.sectionTitle}>Account Number</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter account number"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />


        {/* Request Image Upload */}
        <Text style={donationRequestsStyles.sectionTitle}>Request Image</Text>
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
