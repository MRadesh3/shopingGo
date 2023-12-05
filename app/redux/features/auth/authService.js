import axios from "axios";

export const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/`;

// Register User

const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData, {
    withCredentials: true,
  });
  return response.data;
};

// Login User

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData, {
    withCredentials: true,
  });
  return response.data;
};

// Logout User

const logout = async () => {
  const response = await axios.get(`${API_URL}logout`);
  return response.data.message;
};

// Get Login Status

const getloginstatus = async () => {
  const response = await axios.get(`${API_URL}getloginstatus`);
  return response.data;
};

// Get User

const getuser = async () => {
  const response = await axios.get(`${API_URL}getuser`);
  return response.data;
};

// Update USer

const updateuser = async (userData) => {
  const response = await axios.patch(`${API_URL}updateuser`, userData);
  return response.data;
};

// Update Password

const updatepassword = async (passwords) => {
  const response = await axios.put(
    `${API_URL}password/updatepassword`,
    passwords
  );
  return response.data;
};

// Forgot Password

const forgotpassword = async (email) => {
  const response = await axios.post(`${API_URL}forgotpassword`, email);
  return response.data;
};

// Reset Password

const resetpassword = async (token, passwords) => {
  const response = await axios.put(
    `${API_URL}password/reset/${token}`,
    passwords
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getloginstatus,
  getuser,
  updateuser,
  updatepassword,
  forgotpassword,
  resetpassword,
};

export default authService;
