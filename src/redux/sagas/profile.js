import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import * as _ from 'lodash';
import {showAlert} from 'services/operators';
import {ContactProfileKeys} from 'utils/constants';
import NavigationService from 'navigation/NavigationService';

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
      profileReducer: {bio, name, avatar, avatarChanged, userToken},
    } = yield select();
    if (!userToken) return;
    let updatedProfile = {bio, name, avatar};
    yield put({type: types.API_CALLING});
    if (avatar.length && avatar.indexOf('https://') < 0) {
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
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_PROFILE_DATA,
        payload: response.data.data.user,
      });
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: 'update_basic_profile',
          data: {profile: response.data.data.user},
        },
      });
      yield put({type: types.API_FINISHED});
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

export function* updateContactProfile(action) {
  try {
    const {profileReducer} = yield select();
    if (!profileReducer.userToken) return;
    yield put({type: types.API_CALLING});
    const updatedProfile = _.pick(profileReducer, ContactProfileKeys);
    const response = yield call(API.updateProfile, updatedProfile);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_PROFILE_DATA,
        payload: response.data.data.user,
      });
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: 'update_contact_profile',
          data: {profile: response.data.data.user},
        },
      });
      yield put({type: types.API_FINISHED});
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

export function* deleteAccount() {
  try {
    const {
      profileReducer: {_id},
    } = yield select();
    yield put({type: types.API_CALLING});
    const response = yield call(API.deleteProfile);
    if (response.data.status === 'success') {
      yield put({type: types.API_FINISHED});
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: 'delete_account',
          data: {userId: _id},
        },
      });
      yield put({type: types.RESET_ALL_REDUCER});
      NavigationService.reset('welcomeStack');
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
