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

export const newSubscriptionReducer = (state = { subscription: {} }, action) => {
    switch (action.type) {
        case NEW_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case NEW_SUBSCRIPTION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                subscription: action.payload.subscription,
            };

        case NEW_SUBSCRIPTION_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case NEW_SUBSCRIPTION_RESET:
            return {
                ...state,
                success: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

export const subscriptionsReducer = (state = { subscriptions: [] }, action) => {
    switch (action.type) {
        case ALL_SUBSCRIPTIONS_REQUEST:
            return {
                loading: true,
                subscriptions: [],
            };

        case ALL_SUBSCRIPTIONS_SUCCESS:
            return {
                loading: false,
                subscriptions: action.payload,
            };

        case ALL_SUBSCRIPTIONS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
            case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

export const subscriptionReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case DELETE_SUBSCRIPTION_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_SUBSCRIPTION_RESET:
            return {
                ...state,
                isDeleted: false,
            };
            case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

