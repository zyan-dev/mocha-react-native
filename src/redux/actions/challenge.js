import * as types from './types';

export const selectChallenge = data => ({
  type: types.SELECT_CHALLENGE,
  payload: data,
});

export const updateSelectedChallenge = data => ({
  type: types.UPDATE_SELECTED_CHALLENGE,
  payload: data,
});
