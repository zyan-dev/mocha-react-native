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
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* getUserFeedbacks(action) {
  try {
    const response = yield call(API.getUserFeedbacks, action.payload);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_USER_FEEDBACKS,
        payload: response.data.data.feedbacks.feedbacks,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}
