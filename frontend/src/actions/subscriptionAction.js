import axios from "axios";
import {
    ALL_SUBSCRIPTIONS_FAIL,
    ALL_SUBSCRIPTIONS_REQUEST,
    ALL_SUBSCRIPTIONS_SUCCESS,
    DELETE_SUBSCRIPTION_FAIL,
    DELETE_SUBSCRIPTION_REQUEST,
    DELETE_SUBSCRIPTION_RESET,
    DELETE_SUBSCRIPTION_SUCCESS,
    NEW_SUBSCRIPTION_FAIL,
    NEW_SUBSCRIPTION_REQUEST,
    NEW_SUBSCRIPTION_RESET,
    NEW_SUBSCRIPTION_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/subscriptionConstants";
import {host} from "./host"


// New Subscription
export const newSubscription = (subscription) => async (dispatch) => {
    try {
        dispatch({ type: NEW_SUBSCRIPTION_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `${host}/api/v1/subscription/new`,
            subscription,
            config
        );


        dispatch({ type: NEW_SUBSCRIPTION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: NEW_SUBSCRIPTION_FAIL, payload: error.response.data.message });
    }
}

// Get all subscriptions
export const getSubscriptions = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_SUBSCRIPTIONS_REQUEST });

        const { data } = await axios.get(`${host}/api/v1/subscriptions`);

        dispatch({ type: ALL_SUBSCRIPTIONS_SUCCESS, payload: data.subscriptions });
    } catch (error) {
        dispatch({ type: ALL_SUBSCRIPTIONS_FAIL, payload: error.response.data.message });
    }
}

// Delete Subscription
export const deleteSubscription = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUBSCRIPTION_REQUEST });

        const { data } = await axios.delete(`${host}/api/v1/subscription/${id}`);

        dispatch({ type: DELETE_SUBSCRIPTION_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: DELETE_SUBSCRIPTION_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}