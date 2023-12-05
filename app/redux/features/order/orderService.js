import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`;

// Create a new order

const createneworder = async (order) => {
  const response = await axios.post(`${API_URL}/neworder`, order);
  return response.data;
};

// Get My Orders

const getmyorders = async () => {
  const response = await axios.get(`${API_URL}/myorders`);
  return response.data;
};

// Get Order Details

const getorderdetails = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data;
};

const orderService = {
  createneworder,
  getmyorders,
  getorderdetails,
};

export default orderService;
