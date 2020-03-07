import * as types from '../actions/types';
import {colorThemes, baseTheme} from 'theme';

const INITIAL_STATE = {
  isLoading: false,
  screenName: '',
  isNewUser: true,
  theme: {
    base: baseTheme,
    colors: colorThemes[0],
  },
  isSocialDrawerOpened: false,
  isProfileDrawerOpened: false,
};

const routerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_CURRENT_SCREEN:
      return {
        ...state,
        screenName: action.payload,
      };
    case types.SET_NEW_USER:
      return {
        ...state,
        isNewUser: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.SET_THEME_INDEX:
      return {
        ...state,
        theme: {
          ...state.theme,
          colors: colorThemes[action.payload],
        },
      };
    case types.SET_SOCIAL_DRAWER_OPENED:
      return {
        ...state,
        isSocialDrawerOpened: action.payload,
      };
    case types.SET_PROFILE_DRAWER_OPENED:
      return {
        ...state,
        isProfileDrawerOpened: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default routerReducer;
