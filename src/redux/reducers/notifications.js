import * as types from '../actions/types';

export const INITIAL_STATE = {
  supportReminder: {
    daily_time: '00:00:00.000Z',
    enabled: true,
  },
  supportReminderSecond: {
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
  chat: {
    enabled: true,
  },
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATION_SETTINGS:
      return {
        ...INITIAL_STATE,
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
