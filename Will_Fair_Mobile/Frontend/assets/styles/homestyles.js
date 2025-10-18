import { StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
   
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },

  hero: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7B61FF",
  },

  heroTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },

  heroSubtitle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },

  heroButtons: {
    flexDirection: "row",
    gap: 10,
  },

  ctaButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  donateButton: {
    backgroundColor: "#9333EA",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  ctaText: {
    color: "#7B61FF",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 16,
    textAlign: "center",
    color: "#333",
  },

  cardRow: {
    paddingHorizontal: 16,
  },

  programCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 200,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  programImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },

  programTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  programGoal: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },

  progressBarContainer: {
    width: "100%",
    height: 6,
    backgroundColor: "#e5e5e5",
    borderRadius: 3,
  },

  progressBarFill: {
    height: 6,
    backgroundColor: "#7B61FF",
    borderRadius: 3,
  },

  impactContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#EEEEFF",
    alignItems: "center",
  },

  impactBox: {
    alignItems: "center",
    marginBottom: 20,
  },

  impactValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7B61FF",
    marginTop: 6,
  },

  impactLabel: {
    fontSize: 14,
    color: "#555",
    textAlign:"center",
    padding:10
  },

  testimonialContainer: {
    padding: 20,
    backgroundColor: "#EEE9FF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 20,
  },

  testimonialText: {
    color: "#333",
    fontStyle: "italic",
    textAlign: "center",
  },

  contactContainer: {
    padding: 20,
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

  submitButton: {
    backgroundColor: "#7B61FF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  aboutContainer: {
    padding: 20,
    backgroundColor: "#EEE9FF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 20,
  },

  aboutText: {
    color: "#333",
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "400",

  },

   overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  
  logoContainer: {
    marginBottom: 20,
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
  },
  
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 24,
  },
  
  question: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  
  buttonsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  
  loginButton: {
    // Additional styles for donor button if needed
  },
  
  
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  loginContainer: {
    marginTop: 8,
  },
  
  loginText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  
  loginLink: {
    color: '#7B61FF',
    fontWeight: '600',
  },

  formContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 15,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: '#333',
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
  termsText: {
    fontSize: 13,
    color: '#6B7280',
    flexShrink: 1,
  },

 toggleContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 15,
  marginBottom: 15,
  gap: 10,
},

toggleButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderWidth: 1.5,
  borderColor: '#7B61FF',
  borderRadius: 8,
  backgroundColor: '#fff',
},

activeToggleButton: {
  backgroundColor: '#7B61FF',
  borderColor: '#7B61FF',
  elevation: 2,
},

toggleText: {
  color: '#7B61FF',
  fontWeight: '500',
},

activeToggleText: {
  color: '#fff',
  fontWeight: '600',
},

documentPreview: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 12,
  borderRadius: 8,
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#ccc',
},

documentPicker: {
  flex: 1,
  height: 48,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  justifyContent: 'center',
  paddingHorizontal: 10,
  backgroundColor: '#fff',
},

documentText: {
  fontSize: 14,
  color: '#999',
},
cardButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},

cardDonateButton: {
  backgroundColor: '#7B61FF',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 10,
},

cardDetailsButton: {
  backgroundColor: '#4B5563',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 10,
},

cardButtonText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 14,
},

contactusContainer: {
  marginTop: 20,
  paddingHorizontal: 20,
  paddingVertical: 15,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 12,
  alignItems: 'center',
},

contactTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 5,
},

contactText: {
  fontSize: 14,
  color: '#Black',
  marginBottom: 8,
  textAlign: 'center',
},

contactInfo: {
  fontSize: 15,
  color: 'black',
  textAlign: 'center',
  fontWeight: 'bold',
},
contactRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  fontWeight: 'bold',
},

aboutImage:{
    width: "150%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
},

imageofabout: {
  alignSelf: 'center', // This centers the image horizontally
  marginVertical : 10
},

});
