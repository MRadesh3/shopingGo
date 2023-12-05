import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServiceAd from "./productServiceAd";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  product: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get Admin Products

export const getadminproducts = createAsyncThunk(
  "productAd/getadminproducts",

  async (_, thunkAPI) => {
    try {
      return await productServiceAd.getadminproducts();
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

// Create New Product - Admin

export const createnewproduct = createAsyncThunk(
  "productAd/createnewproduct",

  async (productdata, thunkAPI) => {
    try {
      return await productServiceAd.createnewproduct(productdata);
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
  "productAd/getproductdetails",

  async (productId, thunkAPI) => {
    try {
      return await productServiceAd.getproductdetails(productId);
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

// Update Product - Admin

export const updateproduct = createAsyncThunk(
  "productAd/updateproduct",

  async ({ productId, productdata }, thunkAPI) => {
    try {
      return await productServiceAd.updateproduct(productId, productdata);
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

// Delete Product - Admin

export const deleteproduct = createAsyncThunk(
  "productAd/deleteproduct",

  async (productId, thunkAPI) => {
    try {
      return await productServiceAd.deleteproduct(productId);
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

const productSliceAd = createSlice({
  name: "productAd",
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
      // Get Admin Products
      .addCase(getadminproducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getadminproducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        console.log(action.payload.products);
      })
      .addCase(getadminproducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Create New Product - Admin

      .addCase(createnewproduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createnewproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.product;
        console.log(action.payload.product);
        toast.success("Product created successfully");
      })
      .addCase(createnewproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error("Product creatiion failed");
      })

      // Get Product Details
      .addCase(getproductdetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproductdetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.product;
        console.log(action.payload.product);
      })
      .addCase(getproductdetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Product - Admin

      .addCase(updateproduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.updatedProduct;
        console.log(action.payload);
        toast.success("Product updated successfully");
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error("Product updation failed");
      })

      // Delete Product - Admin

      .addCase(deleteproduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        console.log(action.payload.message);
        toast.success("Product deleted successfully");
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
        toast.error("Product deletion failed");
      });
  },
});

export const { RESET_PRODUCT_STATE } = productSliceAd.actions;

export default productSliceAd.reducer;
