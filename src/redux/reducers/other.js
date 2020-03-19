import * as types from '../actions/types';

const INITIAL_STATE = {
  purchaseProducts: [], // pending, checking, incorrect, passed
  loadingProducts: false,
};

const otherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_PURCHASE_PRODUCTS:
      return {
        purchaseProducts: action.payload,
      };
    case types.LOADING_PURCHASE_PRODUCTS:
      return {
        loadingProducts: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default otherReducer;
