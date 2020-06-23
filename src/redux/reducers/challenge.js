import * as _ from 'lodash';
import * as types from '../actions/types';
import {EmptyChallenge} from 'utils/constants';

const INITIAL_STATE = {
  selectedChallenge: EmptyChallenge,
  focusedChallenge: null,
  myChallenges: [],
  teammates: [],
  pageIndex: 1,
  pageLimited: false,
  loading: false,
  resetTime: 0,
};

const challengeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECT_CHALLENGE:
      return {
        ...state,
        selectedChallenge: action.payload,
      };
    case types.FOCUS_CHALLENGE:
      return {
        ...state,
        focusedChallenge: action.payload,
      };
    case types.UPDATE_SELECTED_CHALLENGE:
      return {
        ...state,
        selectedChallenge: {
          ...state.selectedChallenge,
          ...action.payload,
        },
      };
      break;
    case types.UPDATE_FOCUSED_CHALLENGE:
      return {
        ...state,
        focusedChallenge: {
          ...state.focusedChallenge,
          ...action.payload,
        },
      };
      break;
    case types.SET_MY_CHALLENGES:
      return {
        ...state,
        myChallenges: action.payload,
      };
    case types.SET_TEAMMATES_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case types.SET_TEAMMATES_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload,
      };
    case types.SET_TEAMMATES_PAGE_LIMITED:
      return {
        ...state,
        pageLimited: action.payload,
      };
    case types.SET_AVAILBLE_TEAMMATES:
      return {
        ...state,
        teammates: action.payload,
      };
    case types.ADD_AVAILBLE_TEAMMATES:
      return {
        ...state,
        teammates: state.teammates.concat(action.payload),
      };
    case types.SET_CHALLENGE_RESET_TIME:
      return {
        ...state,
        resetTime: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default challengeReducer;
