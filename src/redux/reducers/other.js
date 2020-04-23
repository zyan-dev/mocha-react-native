import * as types from '../actions/types';
import i18next from 'i18next';

const INITIAL_STATE = {
  purchaseProducts: [], // pending, checking, incorrect, passed
  loadingProducts: false,
  commits: [],
  isShowingUserObjective: false,
  favoriteTools: [],
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
    case types.SET_USER_COMMITS:
      return {
        ...state,
        commits: action.payload,
      };
    case types.SHOW_USER_OBJECTIVES:
      return {
        ...state,
        isShowingUserObjective: action.payload,
      };
    case types.SET_FAVORITE_TOOLS:
      return {
        ...state,
        favoriteTools: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default otherReducer;
