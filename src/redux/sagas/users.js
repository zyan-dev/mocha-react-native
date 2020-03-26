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
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* sendContactRequest(action) {
  try {
    // call send sms API
    const response = yield call(API.sendContactRequest, action.payload);
    if (response.data.status === 'success') {
      showAlert('Your request has been sent successfully');
      yield put({type: types.GET_ALL_TRUST_MEMBERS});
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {event: 'Send Request', data: action.payload},
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* declineRequest(action) {
  try {
    // call send sms API
    yield put({type: types.API_CALLING});
    const response = yield call(API.declineRequest, action.payload);
    if (response.data.status === 'success') {
      yield put({type: types.GET_ALL_TRUST_MEMBERS});
      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({
      type: types.API_FINISHED,
      payload: e.toString(),
    });
  }
}
