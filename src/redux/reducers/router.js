import * as types from '../actions/types';
import {colorThemes, baseTheme} from 'theme';
import {showAlert} from 'services/operators';
import i18next from 'i18next';

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
  isToolsDrawerOpened: false,
  isInternetReachable: true,
  visitedTools: false,
  visitedProfile: false,
  mainTabIndex: 2,
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
    case types.SET_TOOLS_DRAWER_OPENED:
      return {
        ...state,
        isToolsDrawerOpened: action.payload,
      };
    case types.API_CALLING:
      return {
        ...state,
        isLoading: true,
      };
    case types.API_FINISHED:
      if (action.payload) {
        showAlert(action.payload);
      }
      return {
        ...state,
        isLoading: false,
      };
    case types.SET_NETWORK_STATUS:
      if (action.payload && !state.isInternetReachable) {
        showAlert(i18next.t('network_offline_message'));
      } else if (state.isInternetReachable && !action.payload) {
        showAlert(i18next.t('network_online_message'));
      }
      return {
        ...state,
        isInternetReachable: action.payload ? true : false,
      };
    case types.VISIT_TOOLS_TAB:
      return {
        ...state,
        visitedTools: true,
      };
    case types.VISIT_PROFILE_TAB:
      return {
        ...state,
        visitedProfile: true,
      };
    case types.SET_MAIN_TAB_INDEX:
      return {
        ...state,
        mainTabIndex: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return {
        ...INITIAL_STATE,
        theme: state.theme,
        visitedProfile: state.visitedProfile,
        visitedTools: state.visitedTools,
      };
    default:
      return state;
  }
};

export default routerReducer;
