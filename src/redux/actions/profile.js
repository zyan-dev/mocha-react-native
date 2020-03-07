import * as types from './types';

export const setProfileData = profile => ({
  type: types.SET_PROFILE_DATA,
  payload: profile,
});

export const getMyProfile = param => ({
  type: types.GET_MY_PROFILE,
  payload: param,
});
