import axios from "axios";

const API_URL = `http://localhost:3000/api/products`;

const ADMIN_API_URL = `http://localhost:3000/api/auth/admin/products`;

// Get Admin Products

const getadminproducts = async () => {
  const response = await axios.get(`${API_URL}/getadminproducts`);
  return response.data;
};

// Create New Product - Admin

const createnewproduct = async (productdata) => {
  const response = await axios.post(
    `${ADMIN_API_URL}/createproduct`,
    productdata
  );
  return response.data;
};

// Get Product Details

const getproductdetails = async (productId) => {
  const response = await axios.get(`${ADMIN_API_URL}/${productId}`);
  return response.data;
};

// Update Product - Admin

const updateproduct = async (productId, productdata) => {
  const response = await axios.put(
    `${ADMIN_API_URL}/${productId}`,
    productdata
  );
  return response.data;
};

// Delete Product - Admin

const deleteproduct = async (productId) => {
  const response = await axios.delete(`${ADMIN_API_URL}/${productId}`);
  return response.data;
};

const productServiceAd = {
  getadminproducts,
  createnewproduct,
  getproductdetails,
  updateproduct,
  deleteproduct,
};

export default productServiceAd;
