import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { payment as styles } from "../../assets/styles/payment";
import { useRouter } from "expo-router";

const DonationPayment = () => {
  const navigation = useNavigation();  
  const router = useRouter();
  const [anonymous, setAnonymous] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const handleFilePick = async (setFile) => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        <Text style={styles.headerTitle}>Make a Donation</Text>
        <Text style={styles.headerSubtitle}>
          Your generosity makes a difference in our community
        </Text>
      </LinearGradient>

      <Text style={styles.paymentTitle}>Payment Methods</Text>

      {/* Bank Transfer */}
      <View style={styles.card}>
        <View style={styles.methodTabs}>
          <TouchableOpacity style={styles.tabButtonActive}>
            <Text style={styles.tabTextActive}>Credit/ Debit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Bank Transfer</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.noteText}>
          All donations are secure and encrypted. You will receive a confirmation email with your donation details.
        </Text>

        <Text style={styles.label}>
          Please transfer the donation amount to the following bank account:
        </Text>

        <View style={styles.bankInfo}>
          <Text>
            <Text style={styles.bold}>Bank: </Text>
            Peoples Bank
          </Text>
          <Text>
            <Text style={styles.bold}>Account Name: </Text>
            Welfair Foundation
          </Text>
          <Text>
            <Text style={styles.bold}>Account Number: </Text>
            1234-5678-9012-3456
          </Text>
          <Text>
            <Text style={styles.bold}>Branch: </Text>
            Main Branch, Colombo
          </Text>
          <Text>
            <Text style={styles.bold}>Reference: </Text>
            REG6737
          </Text>
        </View>

        <Text style={styles.label}>
          Please upload your payment receipt after completing the transaction.
        </Text>

        <View style={styles.uploadRow}>
          <Text style={styles.uploadLabel}>
            {selectedFile1 ? selectedFile1.name : "Documents"}
          </Text>
          <TouchableOpacity
            style={styles.chooseFileButton}
            onPress={() => handleFilePick(setSelectedFile1)}
          >
            <Text style={styles.chooseFileText}>Choose File</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mobile Payment */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.tabButtonActive}>
          <Text style={styles.tabTextActive}>Mobile Payment</Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Please transfer the donation amount to the following account:
        </Text>

        <View style={styles.bankInfo}>
          <Text>
            <Text style={styles.bold}>Mobile Number: </Text>
            077-123-4567
          </Text>
          <Text>
            <Text style={styles.bold}>Provider: </Text>
            Dialog, Mobitel, Hutch
          </Text>
          <Text>
            <Text style={styles.bold}>Reference: </Text>
            REG6737
          </Text>
        </View>

        <Text style={styles.label}>
          Please upload your payment receipt after completing the transaction.
        </Text>

        <View style={styles.uploadRow}>
          <Text style={styles.uploadLabel}>
            {selectedFile2 ? selectedFile2.name : "Documents"}
          </Text>
          <TouchableOpacity
            style={styles.chooseFileButton}
            onPress={() => handleFilePick(setSelectedFile2)}
          >
            <Text style={styles.chooseFileText}>Choose File</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Anonymous Donation Checkbox */}
      <View style={styles.checkboxRow}>
        <TouchableOpacity onPress={() => setAnonymous(!anonymous)} style={styles.checkbox}>
          {anonymous && <Ionicons name="checkmark" size={14} color="#7B61FF" />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Make this donation Anonymous</Text>
      </View>


            {/* Terms & Conditions Checkbox */}
            <View style={styles.checkboxRow}>
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
      {/* Terms & Conditions Checkbox */}
      {/* <View style={styles.checkboxRow}>
        <TouchableOpacity onPress={() => setAgreed(!agreed)} style={styles.checkbox}>
          {agreed && <Ionicons name="checkmark" size={14} color="#fff" />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          I agree to the <Text style={styles.link}>Terms and Conditions and Privacy Policy</Text>
        </Text>
      </View> */}

      {/* Complete Button */}
      <TouchableOpacity style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Complete Donation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DonationPayment;
