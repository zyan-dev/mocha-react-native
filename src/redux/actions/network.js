import * as types from './types';

export const getTrustNetworks = () => ({
  type: types.GET_TRUST_NETWORKS,
});

export const initTrustNetwork = ownerId => ({
  type: types.INIT_TRUST_NETWORK,
  payload: ownerId,
});

export const selectTrustNetwork = network => ({
  type: types.SELECT_TRUST_NETWORK,
  payload: network,
});

export const updateSelectedTrustNetwork = updated => ({
  type: types.UPDATE_SELECTED_TRUST_NETWORK,
  payload: updated,
});

export const createNetwork = () => ({
  type: types.CREATE_TRUST_NETWORK,
});

export const updateNetwork = () => ({
  type: types.UPDATE_TRUST_NETWORK,
});

export const deleteNetwork = () => ({
  type: types.DELETE_TRUST_NETWORK,
});

export const getOwnersWithResourcePermission = pageIndex => ({
  type: types.GET_OWNERS_WITH_RESOURCE_PERMISSION,
  payload: pageIndex,
});

export const setSearchOwnersWithResourcePermissionIndex = index => ({
  type: types.SET_SEARCH_OWNERS_WITH_RESOURCE_PERMISSION_INDEX,
  payload: index,
});
