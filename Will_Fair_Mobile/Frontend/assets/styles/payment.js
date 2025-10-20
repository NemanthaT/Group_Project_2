import { StyleSheet } from "react-native";

export const payment = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: { alignItems: "center", padding: 20, borderRadius: 10 },

logoBackground: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  
  logo: {
    width: 100,
    height: 100,
    marginVertical : 10
  },

  logoContainer: {
    marginBottom: 20,
  },
  
//  
// header: {
//     paddingTop: 60,
//     paddingBottom: 20,
//     paddingHorizontal: 16,
//     alignItems: "center",
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },

    sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginVertical: 10,
    color: "#333",
  },

  headerTitle: {
    color: "#ffffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#EEDCFF",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },
  paymentTitle: { fontSize: 20, fontWeight: "700", marginVertical: 16 },
  card: { backgroundColor: "#f9f9f9", borderRadius: 10, padding: 16, marginBottom: 20 },
  methodTabs: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  tabButton: { padding: 10, backgroundColor: "#e0d4ff", borderRadius: 6 },
  tabButtonActive: { padding: 10, backgroundColor: "#9333EA", borderRadius: 6 },
  tabText: { color: "#555", fontWeight: "600" },
  tabTextActive: { color: "#fff", fontWeight: "600" },
  noteText: { fontSize: 12, color: "#666", marginBottom: 10 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  bankInfo: { marginBottom: 10 },
  bold: { fontWeight: "700" },
  uploadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 12,
  uploadLabel: { color: "#888", fontSize: 13 },
  chooseFileButton: { backgroundColor: "#9333EA", padding: 8, borderRadius: 6 },
  chooseFileText: { color: "#fff", fontWeight: "500" },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  checkboxLabel: { fontSize: 13 },
  link: { color: "#7B61FF", textDecorationLine: "underline" },

  submitButton: {
    backgroundColor: "#9333EA",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "70%",
    alignSelf: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    alignContent : "center",
    textAlign: "center",
  },
    checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#7B61FF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1, // optional, for better spacing
    },

  checked: {
    width: 10,
    height: 10,
    backgroundColor: '#7B61FF',
    borderRadius: 2,
  },

});
