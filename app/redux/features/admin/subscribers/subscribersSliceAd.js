import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subscribersServiceAd from "./subscribersServiceAd";
import { toast } from "react-toastify";

const initialState = {
  subscribers: [],
  subscriber: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Register Subscriber - Admin

export const registersubscriber = createAsyncThunk(
  "subscribersAd/registersubscriber",

  async (email, thunkAPI) => {
    try {
      return await subscribersServiceAd.registersubscriber(email);
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

// Get All Subscribers - Admin

export const getallsubscribers = createAsyncThunk(
  "subscribersAd/getallsubscribers",

  async (_, thunkAPI) => {
    try {
      return await subscribersServiceAd.getallsubscribers();
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

// Delete Subscriber - Admin

export const deletesubscriber = createAsyncThunk(
  "subscribersAd/deletesubscriber",

  async ({ subscriberId }, thunkAPI) => {
    try {
      return await subscribersServiceAd.deletesubscriber({ subscriberId });
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

const subscribersSliceAd = createSlice({
  name: "subscribersAd",
  initialState,
  reducers: {
    RESET_SUBSCRIBERS_STATE: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // Register Subscriber - Admin

      .addCase(registersubscriber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registersubscriber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.subscriber = action.payload.subscriber;
        toast.success("You have subscribed successfully");
      })
      .addCase(registersubscriber.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get all subscribers - Admin

      .addCase(getallsubscribers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallsubscribers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.subscribers = action.payload.subscribers;
      })
      .addCase(getallsubscribers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Subscriber - Admin

      .addCase(deletesubscriber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletesubscriber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deletesubscriber.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_SUBSCRIBERS_STATE } = subscribersSliceAd.actions;

export default subscribersSliceAd.reducer;
