import * as _ from 'lodash';
import * as types from '../actions/types';
import {EmptyChallenge} from 'utils/constants';

const INITIAL_STATE = {
  selectedChallenge: EmptyChallenge,
};

const challengeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECT_CHALLENGE:
      console.log(action.payload);
      return {
        ...state,
        selectedChallenge: action.payload,
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
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default challengeReducer;
