import axios from "axios";
import {host} from "./host"
import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";


// Create new Order
export const createOrder = (userId, userOrderId, carOrderId, urls, offer) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestData = { userId, userOrderId, carOrderId, urls, offer }; // Include the offer in the request payload
console.log('action : ',urls);
    const { data } = await axios.post(`${host}/api/v1/sellerContact/new`, requestData, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get Single Order
export const getOrder = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${host}/api/v1/order/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${host}/api/v1/orders/${id}`);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });

  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${host}/api/v1/order/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });

  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
