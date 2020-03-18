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

export const setInitialReflection = type => ({
  type: types.SET_INITIAL_REFLECTION,
  payload: type,
});

export const selectReflection = motivation => ({
  type: types.SELECT_REFLECTION,
  payload: motivation,
});

export const updateSelectedReflection = param => ({
  type: types.UPDATE_SELECTED_REFLECTION,
  payload: param,
});

export const addOrUpdateReflection = () => ({
  type: types.ADD_OR_UPDATE_REFLECTION,
});

export const removeReflection = reflection => ({
  type: types.REMOVE_REFLECTION,
  payload: reflection,
});

export const addCustomReflectionTitle = (type, title) => ({
  type: types.ADD_CUSTOM_REFLECTION_TITLE,
  payload: {type, title},
});
