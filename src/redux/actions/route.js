import * as types from './types';

export const setRouteName = routeName => ({
  type: types.SET_CURRENT_SCREEN,
  payload: routeName,
});

export const resetAllReducer = () => ({
  type: types.RESET_ALL_REDUCER,
});

export const setLoading = status => ({
  type: types.SET_LOADING,
  payload: status,
});

export const setThemeIndex = themeIndex => ({
  type: types.SET_THEME_INDEX,
  payload: themeIndex,
});

export const setNewUser = isNewUser => ({
  type: types.SET_NEW_USER,
  payload: isNewUser,
});

export const setSocialDrawerOpened = opened => ({
  type: types.SET_SOCIAL_DRAWER_OPENED,
  payload: opened,
});

export const setProfileDrawerOpened = opened => ({
  type: types.SET_PROFILE_DRAWER_OPENED,
  payload: opened,
});
