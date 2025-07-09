import { StyleSheet } from "react-native";

export const donationRequestsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  // Header Section
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

    sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginVertical: 10,
    color: "#333",
  },

  headerTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#EEDCFF",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },

  // Filter Row
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  filterButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 10,
  },
  newRequestButton: {
    backgroundColor: "#9333EA",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newRequestText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Donation Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    marginHorizontal: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  statusBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
  amountText: {
    fontSize: 13,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#9333EA",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    borderColor: "#9333EA",
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editText: {
    color: "#9333EA",
    fontWeight: "600",
  },
  viewButton: {
    backgroundColor: "#9333EA",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewText: {
    color: "#fff",
    fontWeight: "600",
  },
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
  // Tabs
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#7B61FF",
  },
  tabText: {
    color: "#000",
    fontWeight: "500",
  },

  // Form
  form: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputField: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  uploadBox: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 50,
    alignItems: "center",
    marginBottom: 15,
    borderColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#9333EA",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    alignContent : "center",
    textAlign: "center",
  },
   instructionBox: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  instructionText: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
  },
   checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    width: '100%',
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
