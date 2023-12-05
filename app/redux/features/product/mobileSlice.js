import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

// Get Mobile Products

export const getmobileproducts = createAsyncThunk(
  "product/getmobileproducts",

  async ({ category }, thunkAPI) => {
    try {
      return await productService.getmobileproducts(category);
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

const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    RESET_MOBILE_STATE(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // Get Products
      .addCase(getmobileproducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getmobileproducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductCount = action.payload.filteredProductCount;
      })
      .addCase(getmobileproducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_MOBILE_STATE } = mobileSlice.actions;
export default mobileSlice.reducer;
