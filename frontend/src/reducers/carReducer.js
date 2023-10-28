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
    NEW_CAR_RESET,
    UPDATE_CAR_REQUEST,
    UPDATE_CAR_SUCCESS,
    UPDATE_CAR_FAIL,
    UPDATE_CAR_RESET,
    DELETE_CAR_REQUEST,
    DELETE_CAR_SUCCESS,
    DELETE_CAR_FAIL,
    DELETE_CAR_RESET,
    CAR_DETAILS_REQUEST,
    CAR_DETAILS_FAIL,
    CAR_DETAILS_SUCCESS,
    SELLER_CAR_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_SEARCH_RESULTS,
    CLEAR_ERRORS,
  } from "../constants/carConstants";
  
  // export const carsReducer = (state = { cars: [] }, action) => {
  //   switch (action.type) {
  //     case ALL_CAR_REQUEST:
  //     case ADMIN_CAR_REQUEST:
  //       return {
  //         loading: true,
  //         cars: [],
  //         relatedCars: [],
  //       };
  //     case ALL_CAR_SUCCESS:
  //       return {
  //         loading: false,
  //         cars: action.payload.cars,
  //         carsCount: action.payload.carsCount,
  //         resultPerPage: action.payload.resultPerPage,
  //         filteredCarsCount: action.payload.filteredCarsCount,
  //       };
  
  //     case ADMIN_CAR_SUCCESS:
  //       return {
  //         loading: false,
  //         cars: action.payload,
  //       };
  //     case ALL_CAR_FAIL:
  //     case ADMIN_CAR_FAIL:
  //       return {
  //         loading: false,
  //         error: action.payload,
  //       };
  
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null,
  //       };
  //     default:
  //       return state;
  //   }
  // };
  export const carsReducer = (
    state = {
      loading: false,
      cars: [],
      notVerifiedCars: [],
      currentPage: 1,
      totalPages: 1,
    },
    action
  ) => {
    switch (action.type) {
      case ALL_CAR_REQUEST:
      case ADMIN_CAR_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ALL_CAR_SUCCESS:
        return {
          ...state,
          loading: false,
          cars: action.payload.cars,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          carCount: action.payload.carCount,
        };
  
      case ADMIN_CAR_SUCCESS:
        return {
          ...state,
          loading: false,
          notVerifiedCars: action.payload,
        };
  
      case SELLER_CAR_SUCCESS:
        return {
          ...state,
          loading: false,
          cars: action.payload,
        };
  
      case ALL_CAR_FAIL:
      case ADMIN_CAR_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_SEARCH_RESULTS:
        return {
          ...state,
          loading: false,
          cars: [],
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const newCarReducer = (state = { car: {} }, action) => {
    switch (action.type) {
      case NEW_CAR_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_CAR_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          car: action.payload.car,
        };
      case NEW_CAR_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_CAR_RESET:
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
  };
  
  export const carReducer = (state = {
    loading: false,
    isDeleted: false,
    isUpdated: false,
    error: null,
  }, action) => {
    switch (action.type) {
      case DELETE_CAR_REQUEST:
      case UPDATE_CAR_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_CAR_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_CAR_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_CAR_FAIL:
      case UPDATE_CAR_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_CAR_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_CAR_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const carDetailsReducer = (state = { loading: false, car: {}, error: null }, action) => {
    switch (action.type) {
      case CAR_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CAR_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          car: action.payload,
        };
      case CAR_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
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
  };
  
  
  // export const newReviewReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case NEW_REVIEW_REQUEST:
  //       return {
  //         ...state,
  //         loading: true,
  //       };
  //     case NEW_REVIEW_SUCCESS:
  //       return {
  //         loading: false,
  //         success: action.payload,
  //       };
  //     case NEW_REVIEW_FAIL:
  //       return {
  //         ...state,
  //         loading: false,
  //         error: action.payload,
  //       };
  //     case NEW_REVIEW_RESET:
  //       return {
  //         ...state,
  //         success: false,
  //       };
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null,
  //       };
  //     default:
  //       return state;
  //   }
  // };
  
  // export const carReviewsReducer = (state = { reviews: [] }, action) => {
  //   switch (action.type) {
  //     case ALL_REVIEW_REQUEST:
  //       return {
  //         ...state,
  //         loading: true,
  //       };
  //     case ALL_REVIEW_SUCCESS:
  //       return {
  //         loading: false,
  //         reviews: action.payload,
  //       };
  //     case ALL_REVIEW_FAIL:
  //       return {
  //         ...state,
  //         loading: false,
  //         error: action.payload,
  //       };
  
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null,
  //       };
  //     default:
  //       return state;
  //   }
  // };
  
  // export const reviewReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case DELETE_REVIEW_REQUEST:
  //       return {
  //         ...state,
  //         loading: true,
  //       };
  //     case DELETE_REVIEW_SUCCESS:
  //       return {
  //         ...state,
  //         loading: false,
  //         isDeleted: action.payload,
  //       };
  //     case DELETE_REVIEW_FAIL:
  //       return {
  //         ...state,
  //         loading: false,
  //         error: action.payload,
  //       };
  //     case DELETE_REVIEW_RESET:
  //       return {
  //         ...state,
  //         isDeleted: false,
  //       };
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null,
  //       };
  //     default:
  //       return state;
  //   }
  // };