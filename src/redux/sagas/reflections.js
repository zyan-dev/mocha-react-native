import {call, put} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';

export function* getMyReflections(action) {
  try {
    // call send sms API
    const response = yield call(API.getMyReflections);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_MY_REFLECTIONS,
        payload: response.data.data.reflections,
      });
    } else {
      showAlert('API failed');
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* getUserReflections(action) {
  try {
    // call send sms API
    const response = yield call(API.getUserReflections, action.payload);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_USER_REFLECTIONS,
        payload: response.data.data.reflections,
      });
    } else {
      showAlert('API failed');
    }
  } catch (e) {
    showAlert(e.toString());
  }
}
