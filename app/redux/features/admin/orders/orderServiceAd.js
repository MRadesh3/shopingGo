import axios from "axios";

const ADMIN_API_URL = "http://localhost:3000/api/auth/admin/orders";

// Get all orders - Admin

const getallorders = async () => {
  const response = await axios.get(`${ADMIN_API_URL}/allorders`);
  return response.data;
};

// Get order details - Admin

const getorderdetails = async (orderId) => {
  const response = await axios.get(`${ADMIN_API_URL}/${orderId}`);
  return response.data;
};

// Update order - Admin

const updateorder = async (orderId, orderStatus) => {
  const response = await axios.put(`${ADMIN_API_URL}/${orderId}`, {
    orderStatus,
  });
  return response.data;
};

// Delete order - Admin

const deleteorder = async (orderId) => {
  const response = await axios.delete(`${ADMIN_API_URL}/${orderId}`);
  return response.data;
};

const orderServiceAd = {
  getallorders,
  updateorder,
  deleteorder,
  getorderdetails,
};

export default orderServiceAd;
