import * as types from './types';

export const getTrustMembers = param => ({
  type: types.GET_TRUST_MEMBERS,
  payload: param,
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
  type: types.SET_SINGLE_SELECTED_USER,
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

export const approveRequest = userId => ({
  type: types.APPROVE_REQUEST,
  payload: userId,
});

export const setSearchPageIndex = index => ({
  type: types.SET_SEARCH_PAGE_INDEX,
  payload: index,
});

// used in social search tab
export const findUserByName = param => ({
  type: types.FIND_USER_BY_NAME,
  payload: {param},
});

// used in add trust network member screen
export const findUntrustUserByName = param => ({
  type: types.FIND_USER_BY_NAME,
  payload: {onlyUntrust: true, param},
});

// used in send request screen
export const getRequestUsers = param => ({
  type: types.GET_REQUEST_USERS,
  payload: param,
});
