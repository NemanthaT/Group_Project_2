import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user data and token after login
export const saveUserData = async (response) => {
  try {
    await AsyncStorage.setItem('authToken', response.token);
    await AsyncStorage.setItem('userData', JSON.stringify(response.user));
    console.log('User data saved successfully!');
  } catch (error) {
    console.error('Error saving user data', error);
  }
};

// Load user data and token
export const loadUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const userData = await AsyncStorage.getItem('userData');
    if (token && userData) {
      return { token, user: JSON.parse(userData) };
    }
    return null;
  } catch (error) {
    console.error('Error loading user data', error);
    return null;
  }
};

// Remove user data and token (logout)
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
    console.log('User logged out');
  } catch (error) {
    console.error('Error removing user data', error);
  }
};
