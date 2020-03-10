import * as types from '../actions/types';

const INITIAL_STATE = {
  myReflections: [],
  userReflections: [],
};

const reflectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_MY_REFLECTIONS:
      return {
        ...state,
        myReflections: action.payload,
      };
    case types.SET_USER_REFLECTIONS:
      return {
        ...state,
        userReflections: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reflectionReducer;
