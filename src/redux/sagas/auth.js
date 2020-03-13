import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import NavigationService from 'navigation/NavigationService';
import API from 'services/api';
import {showAlert} from 'services/operators';
import {AsyncStorage} from 'react-native';

export function* sendSignUpSMS(action) {
  try {
    // call send sms API
    const response = yield call(API.sendSMS, action.payload);
    if (response.data.status === 'success') {
      // if success go to verify sms screen
      NavigationService.navigate('Auth_VerifySMS', {phone: action.payload});
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
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
    showAlert(e.toString());
  }
}

export function* completeSignUp(action) {
  try {
    const {
      profileReducer: {phone, name, user_id, avatar, pushToken},
    } = yield select();
    let updatedProfile = {phone, name, user_id, pushToken};
    if (action.payload) {
      // avatar Changed
      const fileResponse = yield call(API.fileUploadToS3, {avatar, name});
      if (response !== 'error') {
        updatedProfile.avatar = fileResponse;
      } else {
        return;
      }
    }
    const response = yield call(API.updateProfile, updatedProfile);
    yield put({
      type: types.SET_PROFILE_DATA,
      payload: response.data.data.user,
    });
    NavigationService.navigate('Auth_Welcome');
  } catch (e) {
    showAlert(e.toString());
  }
}
