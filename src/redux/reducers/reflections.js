import * as types from '../actions/types';

const defaultChronotype = {
  type: 'Chronotype',
  data: {
    type: 'morning', // morning, flexible, night
    night_sleep_offset_start: 3, // 0 ~ 12
    night_sleep_offset_end: 3, // 0 ~ 12
    day_sleep_offset_start: 5, // 0 ~ 12
    day_sleep_offset_end: 5, // 0 ~ 12
  },
};

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
    case types.ADD_INITIAL_CHRONOTYPE:
      return {
        ...state,
        myReflections: state.myReflections.concat(defaultChronotype),
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reflectionReducer;
