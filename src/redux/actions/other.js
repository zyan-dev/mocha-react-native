import * as types from './types';

export const purchaseSubscription = param => ({
  type: types.PURCHASE_SUBSCRIPTION,
  payload: param,
});

export const setPurchaseProducts = products => ({
  type: types.SET_PURCHASE_PRODUCTS,
  payload: products,
});

export const loadingProducts = loading => ({
  type: loading ? types.API_CALLING : types.API_FINISHED,
});

export const updateAnalyzeStatus = param => ({
  type: types.UPDATE_COMMITS,
  payload: param,
});

export const getUserCommits = userId => ({
  type: types.GET_USER_COMMITS,
  payload: userId,
});

export const showUserHabits = show => ({
  type: types.SHOW_USER_HABITS,
  payload: show,
});

export const trackEvent = param => ({
  type: types.TRACK_MIXPANEL_EVENT,
  payload: param,
});

export const addFavoriteTool = card => ({
  type: types.ADD_FAVORITE_TOOL,
  payload: card,
});

export const removeFavoriteTool = card => ({
  type: types.REMOVE_FAVORITE_TOOL,
  payload: card,
});

export const setFavoriteTools = cards => ({
  type: types.SET_FAVORITE_TOOLS,
  payload: cards,
});

export const changeProfileTab = key => ({
  type: types.SET_PROFILE_TAB,
  payload: key,
});

export const changeToolsTab = key => ({
  type: types.SET_TOOLS_TAB,
  payload: key,
});

export const checkedCompletedBasicProfile = () => ({
  type: types.CHECKED_COMPLETED_BASIC_PROFILE,
});

export const sendEmail = data => ({
  type: types.SEND_EMAIL,
  payload: data,
});
