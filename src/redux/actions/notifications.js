import * as types from './types';

export const getNotificationSettings = () => ({
  type: types.GET_NOTIFICATION_SETTINGS,
});

export const setNotificationSettings = settings => ({
  type: types.SET_NOTIFICATION_SETTINGS,
  payload: settings,
});

export const updateNotificationSettings = () => ({
  type: types.UPDATE_NOTIFICATION_SETTINGS,
});
