import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin`;

// Register Subscriber - Admin

const registersubscriber = async (email) => {
  const response = await axios.post(`${API_URL}/subscribers`, email);
  return response.data;
};

// Get All Subscribers - Admin

const getallsubscribers = async () => {
  const response = await axios.get(`${API_URL}/subscribers`);
  return response.data;
};

// Delete Subscriber - Admin

const deletesubscriber = async ({ subscriberId }) => {
  const response = await axios.delete(`${API_URL}/subscribers`, {
    data: { subscriberId },
  });
  return response.data;
};

const subscribersServiceAd = {
  getallsubscribers,
  registersubscriber,
  deletesubscriber,
};

export default subscribersServiceAd;
