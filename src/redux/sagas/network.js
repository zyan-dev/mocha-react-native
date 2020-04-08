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
          event: 'Create Network',
          data: {networkName: selectedNetwork.name},
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
      usersReducer: {allUsers},
    } = yield select();
    yield put({type: types.API_CALLING});
    selectedNetwork.members = selectedNetwork.members.filter((member) => {
      return allUsers.find((user) => user._id === member);
    });
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
