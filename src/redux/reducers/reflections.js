import * as _ from 'lodash';
import * as types from '../actions/types';
import {
  DefaultReflections,
  SampleReflectionSections,
  mainTabKeys,
} from 'utils/constants';

const INITIAL_STATE = {
  myReflections: [],
  userReflections: [],
  selectedReflection: mainTabKeys.map(key => ({
    type: '',
    data: {},
  })),
  reflectionSections: SampleReflectionSections,
  habitResetTime: 0,
  supportedHabits: [],
  supportedHabitOwners: [],
  selectedHabitUser: {},
  draft: {},
  mainTabIndex: 3,
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
      return {
        ...state,
        selectedReflection: {
          ...state.selectedReflection,
          [mainTabKeys[state.mainTabIndex]]: _.cloneDeep(reflection),
        },
      };
    case types.SELECT_REFLECTION:
      return {
        ...state,
        selectedReflection: {
          ...state.selectedReflection,
          [mainTabKeys[state.mainTabIndex]]: action.payload,
        },
      };
    case types.SAVE_REFLECTION_DRAFT:
      return {
        ...state,
        draft: {
          ...state.draft,
          ...action.payload,
        },
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
    case types.SET_SUPPORTED_HABITS:
      return {
        ...state,
        supportedHabits: action.payload,
      };
    case types.SET_SUPPORTED_HABIT_USER:
      return {
        ...state,
        selectedHabitUser: action.payload,
      };
    case types.SET_SUPPORTED_HABIT_OWNERS:
      return {
        ...state,
        supportedHabitOwners: action.payload,
      };
    case types.UPDATE_SELECTED_REFLECTION:
      const key = [mainTabKeys[state.mainTabIndex]];
      return {
        ...state,
        selectedReflection: {
          ...state.selectedReflection,
          [key]: {
            ...state.selectedReflection[key],
            data: {
              ...state.selectedReflection[key].data,
              ...action.payload,
            },
            updated: new Date().toISOString(),
          },
        },
      };
    case types.SET_HABIT_RESET_TIME:
      return {
        ...state,
        habitResetTime: action.payload,
      };
    case types.SET_MAIN_TAB_INDEX:
      return {
        ...state,
        mainTabIndex: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reflectionReducer;
