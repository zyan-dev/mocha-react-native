import * as types from './types';

export const getAllResources = pageIndex => ({
  type: types.GET_ALL_RESOURCES,
  payload: pageIndex,
});

export const setALLResourcePageIndex = index => ({
  type: types.SET_ALL_RESOURCE_PAGE_INDEX,
  payload: index,
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

export const toggleBookmarkedResource = data => ({
  type: types.TOGGLE_BOOKMARKED_RESOURCE,
  payload: data,
});

export const getBookmarkedResources = pageIndex => ({
  type: types.GET_BOOKMARKED_RESOURCES,
  payload: pageIndex,
});

export const setBookmarkedResourcePageIndex = index => ({
  type: types.SET_BOOKMARKED_RESOURCE_PAGE_INDEX,
  payload: index,
});

export const getResourceByTitle = title => ({
  type: types.GET_RESOURCE_BY_TITLE,
  payload: title,
});

export const getSelectedMemberResources = data => ({
  type: types.GET_SELECTED_MEMBER_RESOURCES,
  payload: data,
});

export const resetMemberResources = () => ({
  type: types.RESET_MEMBER_RESOURCES,
});

export const setMemberResourcePageIndex = index => ({
  type: types.SET_MEMBER_RESOURCE_PAGE_INDEX,
  payload: index,
});

export const selectMember = id => ({
  type: types.SELECT_MEMBER,
  payload: id,
});

export const searchResources = data => ({
  type: types.SEARCH_RESOURCES,
  payload: data,
});

export const setSearchResourcePageIndex = index => ({
  type: types.SET_SEARCH_RESOURCE_PAGE_INDEX,
  payload: index,
});

export const resetSearchResources = () => ({
  type: types.RESET_SEARCH_RESOURCES,
});

export const recommendResourceToMembers = data => ({
  type: types.RECOMMEND_RESOURCE_TO_MEMBERS,
  payload: data,
});

export const getRecommendedOwners = pageIndex => ({
  type: types.GET_RECOMMENDED_OWNERS,
  payload: pageIndex,
});

export const setRecommendedOwnersPageIndex = index => ({
  type: types.SET_RECOMMENDED_OWNERS_PAGE_INDEX,
  payload: index,
});

export const removeRecommendedResource = id => ({
  type: types.REMOVE_RECOMMENDED_RESOURCE,
  payload: id,
});

export const hiddenRecommendedResource = id => ({
  type: types.HIDDEN_RECOMMENDED_RESOURCE,
  payload: id,
});
