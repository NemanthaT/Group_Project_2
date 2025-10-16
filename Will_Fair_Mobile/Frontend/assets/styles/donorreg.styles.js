import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
  
  container: {
    width: '100%',
    paddingHorizontal: 20,
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
errorText: {
  color: 'red',
  fontSize: 12,
  marginLeft: 10,
  alignSelf: 'flex-start',
},

// Add these new styles to the existing styles object:
dropdownText: {
  flex: 1,
  fontSize: 16,
  color: '#000',
  paddingVertical: 12,
},

dropdownContainer: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  marginBottom: 15,
  maxHeight: 200,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 5,
},

dropdownOption: {
  paddingHorizontal: 15,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#fff',

},

selectedOption: {
  backgroundColor: '#7B61FF',
},

dropdownOptionText: {
  fontSize: 16,
  color: '#222',
},

selectedOptionText: {
  color: '#fff',
  fontWeight: 'bold',
},
});