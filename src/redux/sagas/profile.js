import {call, put} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';

export function* getMyProfile(action) {
  try {
    // call send sms API
    const response = yield call(API.getMyProfile);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_PROFILE_DATA,
        payload: response.data.data.user,
      });
    } else {
      showAlert('API failed');
    }
  } catch (e) {
    showAlert(e.toString());
  }
}
