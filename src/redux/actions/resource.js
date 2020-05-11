import * as types from './types';

export const getAllResources = () => ({
  type: types.GET_ALL_RESOURCES,
});

export const getMyResources = () => ({
  type: types.GET_MY_RESOURCES,
});

export const selectResource = resource => ({
  type: types.SELECT_RESOURCE,
  payload: resource,
});

export const setInitialResource = () => ({
  type: types.SET_INITIAL_RESOURCE,
});

export const createResources = data => ({
  type: types.CREATE_RESOURCES,
  payload: data,
});

export const updateResources = data => ({
  type: types.UPDATE_RESOURCES,
  payload: data,
});

export const updateSelectedResource = data => ({
  type: types.UPDATE_SELECTED_RESOURCE,
  payload: data,
});

export const removeResources = ids => ({
  type: types.REMOVE_RESOURCES,
  payload: ids,
});

export const bookmarkResource = link => ({
  type: types.BOOKMARK_RESOURCE,
  payload: link,
});

export const searchResources = title => ({
  type: types.SEARCH_RESOURCES,
  payload: title,
});
