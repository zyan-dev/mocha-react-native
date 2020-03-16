import * as types from './types';

export const getAllUsers = () => ({
  type: types.GET_ALL_USERS,
});

export const getAllTrustMembers = () => ({
  type: types.GET_ALL_TRUST_MEMBERS,
});

export const sendContactRequest = param => ({
  type: types.SEND_CONTACT_REQUEST,
  payload: param,
});

export const setSeletedUsers = users => ({
  type: types.SET_SELECTED_USERS,
  payload: users,
});

export const selectSingleUser = user => ({
  type: types.SET_SINGLE_SELECTED_USERS,
  payload: user,
});

export const selectUser = user => ({
  type: types.SELECT_USER,
  payload: user,
});

export const deselectUser = user => ({
  type: types.DESELECT_USER,
  payload: user,
});

export const declineRequest = userId => ({
  type: types.DECLINE_USER_REQUEST,
  payload: userId,
});