import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  cartItems: [],
  shippingAddress: {},
};

// Add Product To Cart

export const addproducttocart = createAsyncThunk(
  "cart/addproducttocart",

  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await cartService.addproducttocart(productId, quantity);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove Product From Cart

export const removeproductfromcart = createAsyncThunk(
  "cart/removeproductfromcart",

  async (productId, thunkAPI) => {
    try {
      return await cartService.removeproductfromcart(productId);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Shipping Address

export const shippingaddress = createAsyncThunk(
  "cart/shippingaddress",

  async (data, thunkAPI) => {
    try {
      return await cartService.shippingaddress(data);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    RESET_CART_STATE(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      isLoading = false;
      isSuccess = false;
      isError = false;
      message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // Add Product To Cart

      .addCase(addproducttocart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addproducttocart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const item = action.payload;
        const product = state.cartItems.find((x) => x._id === item._id);
        if (product) {
          state.cartItems = state.cartItems.map((x) =>
            x._id === product._id ? item : x
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addproducttocart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Remove Product From Cart

      .addCase(removeproductfromcart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(removeproductfromcart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        const item = action.payload;
        state.cartItems = state.cartItems.filter((x) => x._id !== item._id);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(removeproductfromcart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Shipping Address

      .addCase(shippingaddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(shippingaddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shippingAddress = action.payload;
        localStorage.setItem(
          "shippingAddress",
          JSON.stringify(state.shippingAddress)
        );
      })
      .addCase(shippingaddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET_CART_STATE } = cartSlice.actions;

export default cartSlice.reducer;
