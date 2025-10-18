import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storage
const USER_DATA_KEY = 'userData';
const AUTH_TOKEN_KEY = 'authToken';

/**
 * Save user data and auth token to AsyncStorage
 * @param {Object} userData - User information (id, name, email, role, etc.)
 * @param {string} token - Authentication token
 */
export const saveUser = async (userData, token) => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    return { success: true };
  } catch (error) {
    console.error('Error saving user data:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user data from AsyncStorage
 * @returns {Object|null} User data object or null if not found
 */
export const getUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Get auth token from AsyncStorage
 * @returns {string|null} Auth token or null if not found
 */
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Remove user data and auth token from AsyncStorage
 */
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error removing user data:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if auth token exists
 */
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

/**
 * Update specific user data fields
 * @param {Object} updates - Object containing fields to update
 */
export const updateUser = async (updates) => {
  try {
    const currentUser = await getUser();
    if (!currentUser) {
      return { success: false, error: 'No user data found' };
    }
    
    const updatedUser = { ...currentUser, ...updates };
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Error updating user data:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Clear all stored data
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return { success: true };
  } catch (error) {
    console.error('Error clearing all data:', error);
    return { success: false, error: error.message };
  }
};
