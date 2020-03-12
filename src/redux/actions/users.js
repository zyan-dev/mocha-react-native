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
