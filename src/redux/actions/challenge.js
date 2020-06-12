import * as types from './types';

export const selectChallenge = data => ({
  type: types.SELECT_CHALLENGE,
  payload: data,
});

export const updateFocusedChallenge = data => ({
  type: types.UPDATE_FOCUSED_CHALLENGE,
  payload: data,
});

export const updateSelectedChallenge = data => ({
  type: types.UPDATE_SELECTED_CHALLENGE,
  payload: data,
});

export const getAvailableTeammates = param => ({
  type: types.GET_AVAILBLE_TEAMMATES,
  payload: param,
});

export const addOrUpdateChallenge = () => ({
  type: types.ADD_OR_UPDATE_CHALLENGE,
});

export const getUserChallenges = id => ({
  type: types.GET_USER_CHALLENGES,
  payload: {id},
});
