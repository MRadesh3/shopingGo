import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import mobileReducer from "./features/product/mobileSlice";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/order/orderSlice";
import productAdReducer from "./features/admin/products/productSliceAd";
import orderAdReducer from "./features/admin/orders/orderSliceAd";
import usersAdReducer from "./features/admin/users/usersSliceAd";
import reviewsSliceAd from "./features/admin/reviews/reviewsSliceAd";
import subscribersSliceAd from "./features/admin/subscribers/subscribersSliceAd";

const rootReducer = {
  auth: authReducer,
  product: productReducer,
  mobile: mobileReducer,
  cart: cartReducer,
  order: orderReducer,
  productAd: productAdReducer,
  orderAd: orderAdReducer,
  userAd: usersAdReducer,
  reviewAd: reviewsSliceAd,
  subscriberAd: subscribersSliceAd,
};

let initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: [...middleware],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
