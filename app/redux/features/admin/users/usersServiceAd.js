import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin`;

// Get all users - Admin

const getallusers = async () => {
  const response = await axios.get(`${API_URL}/getallusers`);
  return response.data;
};

// Get User - Admin

const getuser = async (userdetails) => {
  const response = await axios.get(`${API_URL}/${userdetails}`);
  return response.data;
};

// Update User Role - Admin

const updateuserdetails = async (userdetails, userdata) => {
  const response = await axios.patch(`${API_URL}/${userdetails}`, userdata);
  return response.data;
};

// Delete User - Admin

const deleteuser = async (userdetails) => {
  const response = await axios.delete(`${API_URL}/${userdetails}`);
  return response.data;
};

const usersServiceAd = {
  getallusers,
  getuser,
  updateuserdetails,
  deleteuser,
};

export default usersServiceAd;
