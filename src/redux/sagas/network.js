import {call, put, select} from 'redux-saga/effects';
import * as _ from 'lodash';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';
import NavigationService from '../../navigation/NavigationService';

export function* getTrustNetworks(action) {
  try {
    const response = yield call(API.getTrustNetworks);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_TRUST_NETWORKS,
        payload: response.data.data.networks,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* createNetwork(action) {
  try {
    const {
      networkReducer: {selectedNetwork},
    } = yield select();
    yield put({type: types.API_CALLING});
    const response = yield call(API.createNetwork, selectedNetwork);
    if (response.data.status === 'success') {
      yield put({type: types.GET_TRUST_NETWORKS});
      yield put({type: types.API_FINISHED});
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: 'create_trust_network',
          data: {networkName: selectedNetwork.name},
        },
      });

      // update trust members after adding pending user to new trust network.
      yield put({
        type: types.GET_TRUST_MEMBERS,
        payload: {
          status: 0,
          name: '',
          page: 1,
        },
      });
      NavigationService.goBack();
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* updateNetwork(action) {
  try {
    const {
      networkReducer: {selectedNetwork},
    } = yield select();
    yield put({type: types.API_CALLING});
    const param = _.pick(selectedNetwork, [
      '_id',
      'permissions',
      'members',
      'name',
      // 'tags',
      // 'vulnerability',
    ]);
    const response = yield call(API.updateNetwork, param);
    if (response.data.status === 'success') {
      yield put({type: types.GET_TRUST_NETWORKS});
      yield put({type: types.API_FINISHED});
      NavigationService.goBack();
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* deleteNetwork(action) {
  try {
    const {
      networkReducer: {selectedNetwork},
    } = yield select();
    yield put({type: types.API_CALLING});
    const response = yield call(API.deleteNetwork, selectedNetwork._id);
    if (response.data.status === 'success') {
      yield put({type: types.GET_TRUST_NETWORKS});
      yield put({type: types.API_FINISHED});
      NavigationService.goBack();
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* getOwnersWithResourcePermission(action) {
  try {
    const {page} = action.payload;
    yield put({
      type: types.SET_OWNERS_WITH_RESOURCE_PERMISSION_STATE,
      payload: true,
    });

    const response = yield call(API.getOwnersWithPermission, {
      page,
      permission: 'resources',
    });
    if (response.data.status === 'success') {
      if (page === 1) {
        yield put({
          type: types.SET_SEARCHED_OWNERS_WITH_RESOURCE_PERMISSION,
          payload: response.data.data.networks,
        });
      } else {
        yield put({
          type: types.ADD_OWNERS_WITH_RESOURCE_PERMISSION,
          payload: response.data.data.networks,
        });
        yield put({
          type: types.SET_SEARCH_OWNERS_WITH_RESOURCE_PERMISSION_INDEX,
          payload: page,
        });
      }
      yield put({
        type: types.SET_OWNERS_WITH_RESOURCE_PERMISSION_PAGE_LIMITED,
        payload: page >= response.data.data.total_pages,
      });
      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_OWNERS_WITH_RESOURCE_PERMISSION_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({
      type: types.SET_OWNERS_WITH_RESOURCE_PERMISSION_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}
