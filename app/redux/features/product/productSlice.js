import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  products: null,
  product: null,
  resultPerPage: 0,
  productCount: 0,
  filteredProductCount: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get Products

export const getproducts = createAsyncThunk(
  "product/getproducts",

  async ({ keyword, currentPage, price, category, ratings }, thunkAPI) => {
    try {
      return await productService.getproducts(
        keyword,
        currentPage,
        price,
        category,
        ratings
      );
    } catch (error) {
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

// Get Product Details

export const getproductdetails = createAsyncThunk(
  "product/getproductdetails",

  async (productId, thunkAPI) => {
    try {
      return await productService.getproductdetails(productId);
    } catch (error) {
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

// Add Product Review

export const addproductreview = createAsyncThunk(
  "product/addproductreview",

  async (reviewData, thunkAPI) => {
    try {
      return await productService.addproductreview(reviewData);
    } catch (error) {
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_PRODUCT_STATE(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // Get Products
      .addCase(getproducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductCount = action.payload.filteredProductCount;
      })
      .addCase(getproducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get Product Details
      .addCase(getproductdetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproductdetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.product;
        console.log(action.payload);
      })
      .addCase(getproductdetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Add Product Review
      .addCase(addproductreview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addproductreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.product;
        console.log(action.payload);
      })
      .addCase(addproductreview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_PRODUCT_STATE } = productSlice.actions;
export default productSlice.reducer;
