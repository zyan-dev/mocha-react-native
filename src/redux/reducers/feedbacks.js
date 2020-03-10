import * as types from '../actions/types';

const INITIAL_STATE = {
  myFeedbacks: [],
  userFeedbacks: [],
};

const feedbackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_MY_FEEDBACKS:
      return {
        ...state,
        myFeedbacks: action.payload,
      };
    case types.SET_USER_FEEDBACKS:
      return {
        ...state,
        userFeedbacks: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default feedbackReducer;
