import axios from "axios";

const API_URL = "http://localhost:3000/api/products/productreviews";

// Get All Reviews - Admin

const getallreviews = async (productId) => {
  const response = await axios.get(
    `${API_URL}/getallreviews?productId=${productId}`
  );
  return response.data;
};

// Delete Review - Admin

const deletereview = async (reviewId, productId) => {
  const response = await axios.delete(
    `${API_URL}/deletereview?id=${reviewId}&productId=${productId}`
  );
  return response.data;
};

const reviewsServiceAd = {
  getallreviews,
  deletereview,
};

export default reviewsServiceAd;
