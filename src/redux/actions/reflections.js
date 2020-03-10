import * as types from './types';

export const getMyReflections = () => ({
  type: types.GET_MY_REFLECTIONS,
});

export const getUserReflections = userId => ({
  type: types.GET_USER_REFLECTIONS,
  payload: userId,
});
