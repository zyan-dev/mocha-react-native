import * as types from '../actions/types';

const INITIAL_STATE = {
  supportReminder: {
    daily_time: '00:00:00.000Z',
    enabled: true,
  },
  dailyReflection: {
    daily_time: '00:00:00.000Z',
    enabled: true,
  },
  feedbackReceived: {
    enabled: true,
  },
  feedbackRequested: {
    enabled: true,
  },
  addTrustMember: {
    enabled: true,
  },
  habit: {
    enabled: true,
  },
  reaction: {
    enabled: true,
  },
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATION_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default notificationReducer;
