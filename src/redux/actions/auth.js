import * as types from './types';

export const sendSMS = phone => ({
  type: types.SEND_SMS,
  payload: phone,
});

export const verifySMS = param => ({
  type: types.VERIFY_SMS,
  payload: param,
});

export const setSMSVerifyStatus = status => ({
  type: types.SET_SMS_VERIFY_STATUS,
  payload: status,
});

export const completeSignUp = avatarChanged => ({
  type: types.COMPLETE_SIGN_UP,
  payload: avatarChanged,
});
