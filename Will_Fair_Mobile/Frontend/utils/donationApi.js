import { API_BASE } from '../app/constants/API';

// Call monetary donation payment API
export const makeDonationPayment = async ({ requestId, amount, donorId }) => {
  try {
    console.log('=== DONATION API CALL ===');
    console.log('URL:', `${API_BASE}/api/donations/add-amount`);
    console.log('Payload:', { request_id: requestId, amount, donor_id: donorId });
    
    const response = await fetch(
      `${API_BASE}/api/donations/add-amount`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request_id: requestId,
          amount: amount,
          donor_id: donorId,
        }),
      }
    );

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    console.log('=== END DONATION API CALL ===');
    
    return data;
  } catch (error) {
    console.error('=== DONATION PAYMENT ERROR ===');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    console.error('=== END ERROR ===');
    return { 
      success: false, 
      error: error.message || 'Network error occurred'
    };
  }
};

// Call non-monetary donation API (not currently used, but kept for future)
export const makeNonMonetaryDonation = async (donationData) => {
  try {
    const formData = new FormData();
    Object.entries(donationData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    const response = await fetch(
      `${API_BASE}/createNonMonDonation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Non-monetary donation error:', error);
    return { 
      success: false, 
      error: error.message || 'Network error occurred'
    };
  }
};
