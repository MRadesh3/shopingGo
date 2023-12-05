import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersServiceAd from "./usersServiceAd";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get all users - Admin

export const getallusers = createAsyncThunk(
  "userAd/getallusers",

  async (_, thunkAPI) => {
    try {
      return await usersServiceAd.getallusers();
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

// Get User - Admin

export const getuser = createAsyncThunk(
  "userAd/getuser",

  async (userdetails, thunkAPI) => {
    try {
      return await usersServiceAd.getuser(userdetails);
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

// Update User - Admin

export const updateuserdetails = createAsyncThunk(
  "userAd/updateuserdetails",

  async ({ userdetails, userdata }, thunkAPI) => {
    try {
      return await usersServiceAd.updateuserdetails(userdetails, userdata);
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

// Delete User - Admin

export const deleteuser = createAsyncThunk(
  "userAd/deleteuser",

  async (userdetails, thunkAPI) => {
    try {
      return await usersServiceAd.deleteuser(userdetails);
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

const usersSliceAd = createSlice({
  name: "userAd",
  initialState,
  reducers: {
    RESET_USER: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // Get all users - Admin

      .addCase(getallusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload.users;
        console.log(action.payload.users);
      })
      .addCase(getallusers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get User - Admin

      .addCase(getuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user;
        console.log(action.payload.user);
      })
      .addCase(getuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update User - Admin

      .addCase(updateuserdetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateuserdetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.user;
        toast.success("User updated successfully");
        console.log(action.payload.user);
      })
      .addCase(updateuserdetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete User - Admin

      .addCase(deleteuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        console.log(action.payload.message);
        toast.success("User deleted successfully");
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET_USER } = usersSliceAd.actions;

export default usersSliceAd.reducer;
