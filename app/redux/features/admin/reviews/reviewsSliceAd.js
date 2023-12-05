import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewsServiceAd from "./reviewsServiceAd";
import { toast } from "react-toastify";

const initialState = {
  reviews: [],
  review: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get all reviews - Admin

export const getallreviews = createAsyncThunk(
  "reviewAd/getallreviews",

  async (productId, thunkAPI) => {
    try {
      return await reviewsServiceAd.getallreviews(productId);
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

// Delete Review - Admin

export const deletereview = createAsyncThunk(
  "reviewAd/deletereview",

  async ({ reviewId, productId }, thunkAPI) => {
    try {
      return await reviewsServiceAd.deletereview(reviewId, productId);
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

const reviewsSliceAd = createSlice({
  name: "reviewAd",
  initialState,
  reducers: {
    RESET_REVIEW: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // Get all reviews - Admin

      .addCase(getallreviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallreviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviews = action.payload.reviews;
        console.log(action.payload.reviews);
      })
      .addCase(getallreviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })

      // Delete Review - Admin

      .addCase(deletereview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletereview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deletereview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_REVIEW } = reviewsSliceAd.actions;

export default reviewsSliceAd.reducer;
