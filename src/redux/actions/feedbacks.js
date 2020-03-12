import * as types from './types';

export const getMyFeedbacks = () => ({
  type: types.GET_MY_FEEDBACKS,
});

export const setMyFeedbacks = feedbacks => ({
  type: types.SET_MY_FEEDBACKS,
  payload: feedbacks,
});

export const getUserFeedbacks = userId => ({
  type: types.GET_USER_FEEDBACKS,
  payload: userId,
});

export const setUserFeedbacks = feedbacks => ({
  type: types.SET_USER_FEEDBACKS,
  payload: feedbacks,
});
