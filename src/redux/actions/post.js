import * as types from './types';

export const selectPost = post => ({
  type: types.SELECT_POST,
  payload: post,
});

export const getUserPosts = () => ({
  type: types.GET_USER_POSTS,
});

export const getPostsById = param => ({
  type: types.GET_POSTS_BY_ID,
  payload: param,
});

export const getPosts = param => ({
  type: types.GET_ALL_POSTS,
  payload: param,
});

export const setInitialPost = () => ({
  type: types.SET_INITIAL_POST,
});

export const updateSelectedPost = data => ({
  type: types.UPDATE_SELECTED_POST,
  payload: data,
});

export const addOrUpdatePost = () => ({
  type: types.ADD_OR_UPDATE_POST,
});

export const removePosts = ids => ({
  type: types.REMOVE_POSTS,
  payload: ids,
});
