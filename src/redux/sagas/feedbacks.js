import {call, put} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';

export function* getMyFeedbacks(action) {
  try {
    const response = yield call(API.getMyFeedbacks);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_MY_FEEDBACKS,
        payload: response.data.data.feedbacks.feedbacks,
      });
    } else {
      showAlert('API failed');
    }
  } catch (e) {
    showAlert(e.toString());
  }
}
