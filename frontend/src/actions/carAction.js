import axios from "axios";
import { host } from "./host";

import {
  ALL_CAR_FAIL,
  ALL_CAR_REQUEST,
  ALL_CAR_SUCCESS,
  ADMIN_CAR_REQUEST,
  ADMIN_CAR_SUCCESS,
  ADMIN_CAR_FAIL,
  NEW_CAR_REQUEST,
  NEW_CAR_SUCCESS,
  NEW_CAR_FAIL,
  UPDATE_CAR_REQUEST,
  UPDATE_CAR_SUCCESS,
  UPDATE_CAR_FAIL,
  DELETE_CAR_REQUEST,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_FAIL,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_FAIL,
  CAR_DETAILS_SUCCESS,
  SELLER_CAR_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/carConstants";

export const getCar =
  (
    keyword = "",
    currentPage = 1,
    price = [10000, 50000000],
    category,
    fuel,
    transmission,
    city
  ) =>
  async (dispatch) => {
    if (typeof dispatch === "function") {
      try {
        dispatch({ type: ALL_CAR_REQUEST });

        let link = `${host}/api/v1/cars?page=${currentPage}`;

        // Search for each word in the keyword
        if (keyword) {
          const keywords = keyword.split(" ");
          keywords.forEach((word) => {
            link += `&keyword=${word}`;
          });
        }

        if (price.length === 2) {
          link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }
        if (category && category !== "All") {
          link += `&category=${category}`;
        }
        if (fuel && fuel !== "All") {
          link += `&fuel=${fuel}`;
        }
        if (transmission && transmission !== "All") {
          link += `&transmission=${transmission}`;
        }
        if (city && city !== "") {
          link += `&city=${encodeURIComponent(city)}`;
        }

        const { data } = await axios.get(link);

        dispatch({
          type: ALL_CAR_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_CAR_FAIL,
          payload: error.response ? error.response.data.message : error.message,
        });
      }
    }
  };
export const getRCar = (category, price) => async (dispatch) => {
  if (typeof dispatch === "function") {
    try {
      dispatch({ type: ALL_CAR_REQUEST });

      // let link = `${host}/api/v1/cars?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      let link = `${host}/api/v1/cars?&price[gte]=${
        price - 100000 ? price - 100000 : price
      }&price[lte]=${price + 1000000000}`;
      if (category) {
        link += `&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_CAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CAR_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  }
};

// Get All Cars By Seller
export const getAllCarsBySeller = (userId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CAR_REQUEST });

    const { data } = await axios.get(`${host}/api/v1/${userId}/cars`);
    dispatch({
      type: SELLER_CAR_SUCCESS,
      payload: data.cars,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CAR_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Get All Pending Cars
export const getAllPendingCars = (city) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CAR_REQUEST });

    const { data } = await axios.get(`${host}/api/v1/cars/pending?city=${city}`);

    const notVerifiedCars = data.cars;

    console.log(notVerifiedCars);

    dispatch({
      type: ADMIN_CAR_SUCCESS,
      payload: notVerifiedCars,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CAR_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


// Create Car
export const createCar = (id, carData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CAR_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${host}/api/v1/${id}/car/new`,
      carData,
      config
    );

    dispatch({
      type: NEW_CAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Approve Pending Car /cars/pending/:id
export const approvePendingCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CAR_REQUEST });

    const { data } = await axios.put(
      `${host}/api/v1/cars/pending/${id}`,
      { verified: true, active: true }
    );
    dispatch({
      type: ADMIN_CAR_SUCCESS,
      payload: data.approvedCar, // Update the payload to include the approved car object
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CAR_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update Car
export const updateCar = (userId, carId, carData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CAR_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `${host}/api/v1/${userId}/car/${carId}`,
      carData,
      config
    );
    dispatch({
      type: UPDATE_CAR_SUCCESS,
      payload: data.car, // Pass the updated car object as payload
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Car
export const deleteCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CAR_REQUEST });

    const { data } = await axios.delete(`${host}/api/v1/car/${id}`);

    dispatch({
      type: DELETE_CAR_SUCCESS,
      payload: data.success,
    });
    return data;
  } catch (error) {
    dispatch({
      type: DELETE_CAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Cars Details
export const getCarDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAR_DETAILS_REQUEST });

    const { data } = await axios.get(`${host}/api/v1/car/${id}`);

    dispatch({
      type: CAR_DETAILS_SUCCESS,
      payload: data.car, // Update the payload to include the car data
    });
    return data; // Return the response data
  } catch (error) {
    dispatch({
      type: CAR_DETAILS_FAIL,
      payload: error.response.data.error,
    });
    throw error; // Re-throw the error to be caught in the component
  }
};

// NEW REVIEW
// export const newReview = (reviewData) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_REVIEW_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(`${host}/api/v1/review`, reviewData, config);

//     dispatch({
//       type: NEW_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Get All Reviews of a Car
// export const getAllReviews = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_REVIEW_REQUEST });

//     const { data } = await axios.get(`${host}/api/v1/reviews?id=${id}`);

//     dispatch({
//       type: ALL_REVIEW_SUCCESS,
//       payload: data.reviews,
//     });
//   } catch (error) {
//     dispatch({
//       type: ALL_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Delete Review of a Car
// export const deleteReviews = (reviewId, carId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_REVIEW_REQUEST });

//     const { data } = await axios.delete(
//       `${host}/api/v1/reviews?id=${reviewId}&carId=${carId}`
//     );

//     dispatch({
//       type: DELETE_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
