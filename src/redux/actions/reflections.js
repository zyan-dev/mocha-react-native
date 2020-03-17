import * as types from './types';

export const getMyReflections = () => ({
  type: types.GET_MY_REFLECTIONS,
});

export const getUserReflections = userId => ({
  type: types.GET_USER_REFLECTIONS,
  payload: userId,
});

export const saveMyChronotype = param => ({
  type: types.SAVE_CHRONOTYPE,
  payload: param,
});

export const setInitialMotivation = () => ({
  type: types.SET_INITIAL_MOTIVATION,
});

export const selectMotivation = motivation => ({
  type: types.SELECT_MOTIVATION,
  payload: motivation,
});

export const updateSelectedMotivation = param => ({
  type: types.UPDATE_SELECTED_MOTIVATION,
  payload: param,
});

export const addOrUpdateMotivation = () => ({
  type: types.ADD_OR_UPDATE_MOTIVATION,
});

export const removeReflection = reflection => ({
  type: types.REMOVE_REFLECTION,
  payload: reflection,
});
