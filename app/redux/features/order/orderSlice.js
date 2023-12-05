import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderService from "./orderService";

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create a new order

export const createneworder = createAsyncThunk(
  "order/createneworder",

  async (order, thunkAPI) => {
    try {
      return await orderService.createneworder(order);
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

// Get My Orders

export const getmyorders = createAsyncThunk(
  "order/getmyorders",

  async (_, thunkAPI) => {
    try {
      return await orderService.getmyorders();
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

// Get Order Details

export const getorderdetails = createAsyncThunk(
  "order/getorderdetails",

  async (orderId, thunkAPI) => {
    try {
      return await orderService.getorderdetails(orderId);
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // Create a new order
      .addCase(createneworder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createneworder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload.order;
        console.log(action.payload.order);
      })
      .addCase(createneworder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get My Orders
      .addCase(getmyorders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getmyorders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload.orders;
        console.log(action.payload.orders);
      })
      .addCase(getmyorders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get Order Details
      .addCase(getorderdetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getorderdetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload.order;
        console.log(action.payload.order);
      })
      .addCase(getorderdetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
