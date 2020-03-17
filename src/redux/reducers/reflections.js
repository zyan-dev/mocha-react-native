import * as types from '../actions/types';

const defaultMotivation = {
  type: 'Motivation',
  data: {
    title: '',
    description: '',
    image: '',
  },
};

const INITIAL_STATE = {
  myReflections: [],
  userReflections: [],
  selectedMotivation: null,
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
    case types.SET_INITIAL_MOTIVATION:
      return {
        ...state,
        selectedMotivation: defaultMotivation,
      };
    case types.SELECT_MOTIVATION:
      return {
        ...state,
        selectedMotivation: action.payload,
      };
    case types.UPDATE_SELECTED_MOTIVATION:
      return {
        ...state,
        selectedMotivation: {
          ...state.selectedMotivation,
          data: {
            ...state.selectedMotivation.data,
            ...action.payload,
          },
        },
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reflectionReducer;
