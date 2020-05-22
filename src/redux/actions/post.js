import * as types from './types';

export const selectPost = post => ({
  type: types.SELECT_POST,
  payload: post,
});

export const getUserPosts = () => ({
  type: types.GET_USER_POSTS,
});

export const getMyPosts = () => ({
  type: types.GET_MY_POSTS,
});

export const setInitialPost = () => ({
  type: types.SET_INITIAL_POST,
});

export const updateSelectedPost = data => ({
  type: types.UPDATE_SELECTED_POST,
  payload: data,
});
