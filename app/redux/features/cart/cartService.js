import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`;

// Get Products

const addproducttocart = async (productId, quantity) => {
  const { data } = await axios.get(`${API_URL}/${productId}`);
  return {
    _id: data.product._id,
    name: data.product.name,
    image: data.product.images[0].url,
    price: data.product.price,
    stock: data.product.stock,
    quantity,
  };
};

// Remove Product

const removeproductfromcart = async (productId) => {
  return {
    _id: productId,
  };
};

// Shipping Address

const shippingaddress = async (data) => {
  return data;
};

const cartService = {
  addproducttocart,
  removeproductfromcart,
  shippingaddress,
};

export default cartService;
