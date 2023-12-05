import axios from "axios";

const API_URL = `http://localhost:3000/api/products`;

// Get Products

const getproducts = async (
  keyword = "",
  currentPage = 1,
  price = [0, 100000],
  category,
  ratings = 0
) => {
  let link = `${API_URL}/getproducts?keyword=${keyword}&page=${currentPage}&minPrice=${price[0]}&maxPrice=${price[1]}&ratings=${ratings}`;
  if (category) {
    link = `${link}&category=${category}`;
  }
  const response = await axios.get(link);
  return response.data;
};

// Get Product Details

const getproductdetails = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

// Get Mobile Products

const getmobileproducts = async (category) => {
  let link = `${API_URL}/getproducts?category=${category}`;
  const response = await axios.get(link);
  return response.data;
};

// Add Product Review

const addproductreview = async (reviewData) => {
  const response = await axios.put(
    `${API_URL}/productreviews/addreview`,
    reviewData
  );
  return response.data;
};

const productService = {
  getproducts,
  getproductdetails,
  getmobileproducts,
  addproductreview,
};

// Get Products

export default productService;
