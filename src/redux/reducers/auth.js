import * as types from '../actions/types';

const INITIAL_STATE = {
  sms_verify_status: 'pending', // pending, checking, incorrect, passed
};

const routerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_SMS_VERIFY_STATUS:
      return {
        ...state,
        sms_verify_status: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default routerReducer;
