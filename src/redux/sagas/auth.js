import {call, put, select} from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import * as _ from 'lodash';
import * as types from '../actions/types';
import NavigationService from 'navigation/NavigationService';
import API from 'services/api';
import {showAlert} from 'services/operators';
import {AsyncStorage} from 'react-native';

export function* sendSignUpSMS(action) {
  try {
    // call send sms API
    yield put({type: types.API_CALLING});
    const response = yield call(API.sendSMS, action.payload.phone);
    if (response.data.status === 'success') {
      // if success go to verify sms screen
      NavigationService.navigate('Auth_VerifySMS', {data: action.payload});
      showAlert('Verification has been sent successfully');
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

export function* verifySignUpSMS(action) {
  try {
    const {
      profileReducer: {pushToken},
    } = yield select();
    yield put({type: types.SET_SMS_VERIFY_STATUS, payload: 'checking'});
    const response = yield call(API.verifySMS, action.payload); // payload is {phont: '123'} for example
    if (response.data.status === 'success') {
      // Change sms verification status to success
      yield put({type: types.SET_SMS_VERIFY_STATUS, payload: 'passed'});
      const profileData = {
        ...response.data.data.user,
        pushToken,
        userToken: response.data.data.token,
      };
      // set Crashlytics attributes:
      crashlytics().setUserId(profileData._id.toString());
      crashlytics().setUserName(_.get(profileData, ['name'], 'anonymous'));
      // save token to AsyncStorage for API calls
      AsyncStorage.setItem('userToken', response.data.data.token);
      // save phone in profile reducer
      yield put({
        type: types.SET_PROFILE_DATA,
        payload: profileData,
      });
      // navigate to complete sign up screen
      NavigationService.navigate('Auth_CompleteSignUp');
    } else {
      yield put({type: types.SET_SMS_VERIFY_STATUS, payload: 'incorrect'});
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* completeSignUp(action) {
  try {
    const {profileReducer} = yield select();
    const {user_id, created, updated} = profileReducer;
    yield put({type: types.API_CALLING});

    const response = yield call(API.updateProfile, profileReducer);
    if (response.data.status === 'success') {
      if (created === updated) {
        // new user
        yield put({type: types.SYNC_DATA_FOR_NEW_USER, payload: true});
      } else {
        // existing user
        NavigationService.navigate('mainStack');
        yield put({type: types.API_FINISHED});
      }
      // track mixpanel event
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {event: 'verified_sms', data: {username: user_id}},
      });

      yield put({
        type: types.SET_PROFILE_DATA,
        payload: response.data.data.user,
      });
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
