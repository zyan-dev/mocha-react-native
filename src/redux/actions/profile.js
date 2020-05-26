import * as types from './types';

export const setProfileData = profile => ({
  type: types.SET_PROFILE_DATA,
  payload: profile,
});

export const getMyProfile = () => ({
  type: types.GET_MY_PROFILE,
});

export const getUserProfile = id => ({
  type: types.GET_USER_PROFILE,
  payload: {id},
});

export const updateBasicProfile = () => ({
  type: types.UPDATE_BASIC_PROFILE,
});

export const updateContactProfile = () => ({
  type: types.UPDATE_CONTACT_PROFILE,
});

export const deleteAccount = () => ({
  type: types.DELETE_ACCOUNT,
});

export const updatePhoneNumber = param => ({
  type: types.UPDATE_PHONE_NUMBER,
  payload: param,
});
