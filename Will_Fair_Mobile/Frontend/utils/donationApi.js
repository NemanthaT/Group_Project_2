import axios from 'axios';
import { getAuthToken } from '../utils/authHelpers';

// Call monetary donation payment API
export const makeDonationPayment = async ({ requestId, amount, donorId }) => {
  const token = await getAuthToken();
  try {
    const response = await axios.post(
      'http://192.168.122.72:5000/api/donations/add-amount',
      { request_id: requestId, amount, donor_id: donorId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || error.message };
  }
};

// Call non-monetary donation API
export const makeNonMonetaryDonation = async (donationData) => {
  const token = await getAuthToken();
  try {
    const formData = new FormData();
    Object.entries(donationData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await axios.post(
      'http://192.168.122.72:5000/createNonMonDonation',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, error: error?.response?.data?.error || error.message };
  }
};
