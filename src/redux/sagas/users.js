import {call, put} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';

export function* getAllUsers(action) {
  try {
    // call send sms API
    const response = yield call(API.getAllUsers);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_ALL_USERS,
        payload: response.data.data.users,
      });
    } else {
      showAlert('API failed');
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* getAllTrustMembers(action) {
  try {
    // call send sms API
    const response = yield call(API.getAllTrustMembers);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_ALL_TRUST_MEMBERS,
        payload: response.data.data.contacts,
      });
    } else {
      showAlert('API failed');
    }
  } catch (e) {
    showAlert(e.toString());
  }
}
