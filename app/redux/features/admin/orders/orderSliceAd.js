import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderServiceAd from "./orderServiceAd";
import { toast } from "react-toastify";

const initialState = {
  orders: [],
  order: {},
  totalAmount: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get all orders - Admin

export const getallorders = createAsyncThunk(
  "orderAd/getallorders",

  async (_, thunkAPI) => {
    try {
      return await orderServiceAd.getallorders();
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

// Get order details - Admin

export const getorderdetails = createAsyncThunk(
  "orderAd/getorderdetails",

  async (orderId, thunkAPI) => {
    try {
      return await orderServiceAd.getorderdetails(orderId);
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

// Update order - Admin

export const updateorder = createAsyncThunk(
  "orderAd/updateorder",

  async ({ orderId, orderStatus }, thunkAPI) => {
    try {
      return await orderServiceAd.updateorder(orderId, orderStatus);
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

// Delete order - Admin

export const deleteorder = createAsyncThunk(
  "orderAd/deleteorder",

  async (orderId, thunkAPI) => {
    try {
      return await orderServiceAd.deleteorder(orderId);
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

const orderSliceAd = createSlice({
  name: "orderAd",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // Get all orders - Admin

      .addCase(getallorders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallorders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(getallorders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get order details - Admin

      .addCase(getorderdetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getorderdetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload.order;
        console.log(action.payload.order);
      })
      .addCase(getorderdetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update order - Admin

      .addCase(updateorder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateorder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload.order;
        toast.success("Order updated successfully");
        console.log(action.payload.order);
      })
      .addCase(updateorder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Delete order - Admin

      .addCase(deleteorder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteorder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        toast.success("Order deleted successfully");
        console.log(action.payload.message);
      })
      .addCase(deleteorder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetOrder } = orderSliceAd.actions;

export default orderSliceAd.reducer;
