import * as _ from 'lodash';
import * as types from '../actions/types';
import {DefaultReflections, SampleReflectionSections} from 'utils/constants';

const INITIAL_STATE = {
  myReflections: [],
  userReflections: [],
  selectedReflection: {
    type: '',
    data: {},
  },
  reflectionSections: SampleReflectionSections,
  objectiveResetTime: 0,
  supportedObjectives: [],
  draft: {},
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
    case types.SET_INITIAL_REFLECTION:
      const reflection = DefaultReflections[action.payload.toLowerCase()];
      console.log({reflection});
      return {
        ...state,
        selectedReflection: _.cloneDeep(reflection),
      };
    case types.SELECT_REFLECTION:
      return {
        ...state,
        selectedReflection: action.payload,
      };
    case types.ADD_CUSTOM_REFLECTION_TITLE:
      return {
        ...state,
        reflectionSections: {
          ...state.reflectionSections,
          [action.payload.type]: state.reflectionSections[
            action.payload.type
          ].concat(action.payload.title),
        },
      };
    case types.SET_SUPPORTED_OJBECTIVES:
      return {
        ...state,
        supportedObjectives: action.payload,
      };
    case types.UPDATE_SELECTED_REFLECTION:
      return {
        ...state,
        selectedReflection: {
          ...state.selectedReflection,
          data: {
            ...state.selectedReflection.data,
            ...action.payload,
          },
          updated: new Date().toISOString(),
        },
      };
    case types.SET_OBJECTIVE_RESET_TIME:
      return {
        ...state,
        objectiveResetTime: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reflectionReducer;
