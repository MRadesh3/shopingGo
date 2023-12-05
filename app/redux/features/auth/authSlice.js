import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  user: null,
  isUpdated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Register User

export const register = createAsyncThunk(
  "auth/register",

  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
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

// Login User

export const login = createAsyncThunk(
  "auth/login",

  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
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

// Logout User

export const logout = createAsyncThunk(
  "auth/logout",

  async (_, thunkAPI) => {
    try {
      return await authService.logout();
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

// Get Login Status

export const getloginstatus = createAsyncThunk(
  "auth/getloginstatus",

  async (_, thunkAPI) => {
    try {
      return await authService.getloginstatus();
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

// Get User

export const getuser = createAsyncThunk(
  "auth/getuser",

  async (_, thunkAPI) => {
    try {
      return await authService.getuser();
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

// Update User

export const updateuser = createAsyncThunk(
  "auth/updateuser",

  async (userData, thunkAPI) => {
    try {
      return await authService.updateuser(userData);
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

// Update Password

export const updatepassword = createAsyncThunk(
  "auth/updatepassword",

  async (passwords, thunkAPI) => {
    try {
      return await authService.updatepassword(passwords);
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

// Forgot Password

export const forgotpassword = createAsyncThunk(
  "auth/forgotpassword",

  async (email, thunkAPI) => {
    try {
      return await authService.forgotpassword(email);
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

// Reset Password

export const resetpassword = createAsyncThunk(
  "auth/resetpassword",

  async ({ token, passwords }, thunkAPI) => {
    try {
      return await authService.resetpassword(token, passwords);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isUpdated = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // Register User
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Registered successfully");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        console.log(action.payload);
        toast.error(action.payload);
      })

      // Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        console.log(action.payload.token);

        if (action.payload.message === "User does not exists") {
          toast.error(action.payload.message);
          state.isLoggedIn = false;
        } else if (action.payload.message === "Invalid email or password") {
          toast.error(action.payload.message);
          state.isLoggedIn = false;
        } else {
          toast.success("Logged in successfully");
          state.isLoggedIn = true;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // Logout User
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get Login Status
      .addCase(getloginstatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getloginstatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        console.log(action.payload);
        if (action.payload.message === "invalid signature") {
          state.isLoggedIn = false;
        }
      })
      .addCase(getloginstatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get User
      .addCase(getuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload);
      })
      .addCase(getuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update User
      .addCase(updateuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload);
        toast.success("Profile updated successfully");
        state.isUpdated = true;
      })
      .addCase(updateuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isUpdated = false;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update Password
      .addCase(updatepassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatepassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Profile password updated successfully");
        state.isUpdated = true;
        console.log(action.payload);
      })
      .addCase(updatepassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isUpdated = false;
        state.message = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })

      // Forgot Password

      .addCase(forgotpassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotpassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload.message);
        state.isUpdated = true;
        state.isLoggedIn = false;
      })
      .addCase(forgotpassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
        state.isUpdated = false;
        toast.error(action.payload);
      })

      // Reset Password

      .addCase(resetpassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetpassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isUpdated = true;
        toast.success("Password reset successfully");
        state.isLoggedIn = false;
      })
      .addCase(resetpassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error(action.payload);
        state.isUpdated = false;
        state.isLoggedIn = false;
      });
  },
});

export const { RESET_AUTH } = authSlice.actions;
export default authSlice.reducer;
