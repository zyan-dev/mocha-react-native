import * as types from './types';

export const sendSMS = params => ({
  type: types.SEND_SMS,
  payload: params,
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
