
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  carsReducer,
  newCarReducer,
  carReducer,
  carDetailsReducer,
  // newReviewReducer,
  // carReviewsReducer,
  // reviewReducer,
} from "./reducers/carReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
  wishlistReducer
} from "./reducers/userReducer";

import {
  allOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

import {
  newSubscriptionReducer,
  subscriptionReducer,
  subscriptionsReducer,
} from "./reducers/subscriptionReducer";

const reducer = combineReducers({
  cars: carsReducer,
  newCar: newCarReducer,
  car: carReducer,
  carDetails: carDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  wishlist: wishlistReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  allOrders: allOrdersReducer,
  newOrder: newOrderReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  newSubscription: newSubscriptionReducer,
  subscription: subscriptionReducer,
  subscriptions: subscriptionsReducer,
});

const initialState = {
  // user: {
  //   userInfo: localStorage.getItem("userInfo")
  //     ? JSON.parse(localStorage.getItem("userInfo"))
  //     : null,
  // },

  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")

      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
