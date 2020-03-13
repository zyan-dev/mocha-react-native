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

export const selectQuestion = question => ({
  type: types.SELECT_QUESTION,
  payload: question,
});

export const deselectQuestion = question => ({
  type: types.DESELECT_QUESTION,
  payload: question,
});

export const setSeletedQuestions = questions => ({
  type: types.SET_SELCTED_QUESTIONS,
  payload: questions,
});

export const createQuestion = question => ({
  type: types.CREATE_QUESTION,
  payload: question,
});

export const requestFeedback = () => ({
  type: types.REQUEST_FEEDBACK,
});
