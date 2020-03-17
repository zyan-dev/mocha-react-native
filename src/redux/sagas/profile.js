import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import * as _ from 'lodash';
import {showAlert} from 'services/operators';
import {ContactProfileKeys} from 'utils/constants';

export function* getMyProfile(action) {
  try {
    const response = yield call(API.getMyProfile);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_PROFILE_DATA,
        payload: response.data.data.user,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* updateBasicProfile(action) {
  try {
    let response = {};
    const {
      profileReducer: {bio, name, avatar, avatarChanged},
    } = yield select();
    let updatedProfile = {bio, name, avatar};
    if (avatarChanged) {
      // avatar Changed
      response = yield call(API.fileUploadToS3, {
        image: avatar,
        name,
        type: 'avatar',
      });
      if (response !== 'error') {
        updatedProfile.avatar = response;
      } else {
        return;
      }
    }
    response = yield call(API.updateProfile, updatedProfile);
    yield put({
      type: types.SET_PROFILE_DATA,
      payload: {
        ...response.data.data.user,
        avatarChanged: false,
      },
    });
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* updateContactProfile(action) {
  try {
    const {profileReducer} = yield select();
    const updatedProfile = _.pick(profileReducer, ContactProfileKeys);
    const response = yield call(API.updateProfile, updatedProfile);
    yield put({
      type: types.SET_PROFILE_DATA,
      payload: response.data.data.user,
    });
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* getUserProfile(action) {
  try {
    const response = yield call(API.getUserProfile, action.payload);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_USER_PROFILE,
        payload: response.data.data.user,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}
