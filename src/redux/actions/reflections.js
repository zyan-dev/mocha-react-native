import * as types from './types';

export const getMyReflections = () => ({
  type: types.GET_MY_REFLECTIONS,
});

export const getUserReflections = (userId) => ({
  type: types.GET_USER_REFLECTIONS,
  payload: userId,
});

export const saveMyChronotype = (param) => ({
  type: types.SAVE_CHRONOTYPE,
  payload: param,
});

export const setInitialReflection = (type) => ({
  type: types.SET_INITIAL_REFLECTION,
  payload: type,
});

export const selectReflection = (reflection) => ({
  type: types.SELECT_REFLECTION,
  payload: reflection,
});

export const updateSelectedReflection = (param) => ({
  type: types.UPDATE_SELECTED_REFLECTION,
  payload: param,
});

export const addOrUpdateReflection = (redirectTo = 'goBack') => ({
  type: types.ADD_OR_UPDATE_REFLECTION,
  payload: redirectTo,
});

export const removeReflection = (reflection) => ({
  type: types.REMOVE_REFLECTION,
  payload: reflection,
});

export const addCustomReflectionTitle = (type, title) => ({
  type: types.ADD_CUSTOM_REFLECTION_TITLE,
  payload: {type, title},
});

export const updateTapToCounts = (tapToCounts) => ({
  type: types.UPDATE_TAP_TO_COUNTS,
  payload: tapToCounts,
});

export const resetMyObjectives = () => ({
  type: types.RESET_MY_OBJECTIVES,
});

export const getSupportedObjectives = () => ({
  type: types.GET_SUPPORTED_OJBECTIVES,
});

export const reactToObjective = (reflection) => ({
  type: types.UPDATE_SPECIFIC_REFLECTION,
  payload: reflection,
});
