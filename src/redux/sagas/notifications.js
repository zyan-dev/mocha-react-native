import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';

export function* getNotificationSettings(action) {
  try {
    const {notificationReducer} = yield select();
    const response = yield call(API.getNotificationSettings);
    if (
      response.data.status === 'success' &&
      response.data.data.notificationSetting
    ) {
      yield put({
        type: types.SET_NOTIFICATION_SETTINGS,
        payload: response.data.data.notificationSetting,
      });
    } else if (response.data.data.notificationSetting === null) {
      yield call(API.createNotificationSettings, notificationReducer);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* updateNotificationSettings(action) {
  try {
    const {notificationReducer} = yield select();
    const response = yield call(
      API.updateNotificationSettings,
      notificationReducer,
    );
    if (response.data.status === 'error') {
      showAlert(response.data.data.message);
    } else {
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: 'update_notification_settings',
          data: {settings: notificationReducer},
        },
      });
    }
  } catch (e) {
    showAlert(e.toString());
  }
}
