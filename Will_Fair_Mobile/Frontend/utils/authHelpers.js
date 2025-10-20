import { saveUserData, loadUserData } from '../utils/authStorage';

// Example usage after login API call
export const handleLoginResponse = async (response) => {
  if (response.success && response.token && response.user) {
    await saveUserData(response);
    // Navigate to home/dashboard, etc.
  } else {
    // Show error message
  }
};

// Example usage to get token for API requests
export const getAuthToken = async () => {
  const data = await loadUserData();
  return data?.token || null;
};

// Example usage to get user info
// fetch the saved user info
export const getUserInfo = async () => {
  const data = await loadUserData();
  return data?.user || null;
};
