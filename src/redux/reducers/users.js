import * as types from '../actions/types';

const INITIAL_STATE = {
  allUsers: [],
  trustMembers: [],
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case types.SET_ALL_TRUST_MEMBERS:
      return {
        ...state,
        trustMembers: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default usersReducer;
