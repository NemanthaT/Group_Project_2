import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { donationRequestsStyles as styles } from "../../assets/styles/donationrequestsstyles";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { router } from 'expo-router';
import BackButton from '../components/backbutton'



const DonationForm = () => {
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigation = useNavigation(); // ← Hook for drawer access
  

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const CustomCheckbox = ({ value, onValueChange }) => (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={{
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#7B61FF",
        backgroundColor: value ? "#7B61FF" : "#fff",
        borderRadius: 4,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {value && <Text style={{ color: "#fff", fontWeight: "bold" }}>✓</Text>}
    </TouchableOpacity>
  );

  const handleSubmit = () => {
        // You can add form validation here if needed
        // For now, just show success message
        Alert.alert(
          "Success! 🎉",
          "Your donation has been submitted successfully. Thank you for your contribution.",
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
    <ScrollView contentContainerStyle={styles.container}>
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

      {/* Instruction Box */}
      <View style={styles.instructionBox}>
        <Text style={styles.instructionText}>
          Please ensure the items are in good condition and bring them at your
          scheduled time. You will receive a confirmation email with your
          drop-off details.
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Quantity to Donate</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text style={styles.sectionTitle}>Dropoff Location</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.sectionTitle}>Dropoff Date</Text>
        <TouchableOpacity
          style={styles.inputField}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toLocaleDateString()}</Text>
          {/* <Ionicons name="calendar-outline" size={20} color="#666" /> */}
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

            {/* Terms & Conditions Checkbox */}
            <View style={styles.checkboxContainer}>
            <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAgreed(!agreed)}
            >
            {agreed && <Ionicons name="checkmark" size={14} color="#7B61FF" />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
                I agree to <Text style={styles.link}>Terms and Conditions</Text> of Welfair Community
            </Text>
            </View>


        {/* Submit Button */}
         {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}
        onPress={handleSubmit}
        >
            <Text style={styles.submitText}>Submit Donation</Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DonationForm;
