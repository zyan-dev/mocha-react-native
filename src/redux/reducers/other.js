import * as types from '../actions/types';

const INITIAL_STATE = {
  purchaseProducts: [], // pending, checking, incorrect, passed
  loadingProducts: false,
  myCommits: [],
};

const otherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_PURCHASE_PRODUCTS:
      return {
        ...state,
        purchaseProducts: action.payload,
      };
    case types.LOADING_PURCHASE_PRODUCTS:
      return {
        ...state,
        loadingProducts: action.payload,
      };
    case types.SET_MY_COMMITS:
      return {
        ...state,
        myCommits: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default otherReducer;
