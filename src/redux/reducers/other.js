import * as types from '../actions/types';
import i18next from 'i18next';
import {profileIcons} from '../../utils/constants';

const INITIAL_STATE = {
  purchaseProducts: [], // pending, checking, incorrect, passed
  loadingProducts: false,
  commits: [],
  isShowingUserHabit: false,
  favoriteTools: [],
  profileTab: 'overview',
  profileLayout: [...profileIcons],
  toolsTab: 0,
  completedBasicProfile: false,
  completedAdvanceProfile: false,
  completedExpertProfile: false,
  showWelcomeBasicProfile: true,
  showWelcomeAdvanceProfile: true,
  setCrown: false,
};

const otherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_PURCHASE_PRODUCTS:
      return {
        ...state,
        purchaseProducts: action.payload,
      };
    case types.LOADING_PURCHASE_PRODUCTS:
      return {
        ...state,
        loadingProducts: action.payload,
      };
    case types.SET_USER_COMMITS:
      return {
        ...state,
        commits: action.payload,
      };
    case types.SET_PROFILE_LAYOUT:
      return {
        ...state,
        profileLayout: action.payload,
      };
    case types.SHOW_USER_HABITS:
      return {
        ...state,
        isShowingUserHabit: action.payload,
      };
    case types.SET_FAVORITE_TOOLS:
      return {
        ...state,
        favoriteTools: action.payload,
      };
    case types.SET_PROFILE_TAB:
      return {
        ...state,
        profileTab: action.payload,
      };
    case types.SET_TOOLS_TAB:
      return {
        ...state,
        toolsTab: action.payload,
      };
    case types.CHECK_COMPLETED_BASIC_PROFILE:
      return {
        ...state,
        completedBasicProfile: true,
      };
    case types.CHECK_WELCOME_BASIC_PROFILE:
      return {
        ...state,
        showWelcomeBasicProfile: false,
      };
    case types.CHECK_WELCOME_ADVANCE_PROFILE:
      return {
        ...state,
        showWelcomeAdvanceProfile: false,
      };
    case types.CHECK_COMPLETED_ADVANCE_PROFILE:
      return {
        ...state,
        completedAdvanceProfile: true,
      };
    case types.CHECK_COMPLETED_EXPERT_PROFILE:
      return {
        ...state,
        completedExpertProfile: true,
      };
    case types.RESET_ALL_REDUCER:
      return {
        ...INITIAL_STATE,
        favoriteTools: state.favoriteTools,
      };
    case types.PROFILE_CROWN_TOGGLE:
      return {
        ...state,
        setCrown: action.payload,
      };
    default:
      return state;
  }
};

export default otherReducer;
