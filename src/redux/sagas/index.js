import {takeEvery} from 'redux-saga/effects';
import * as types from '../actions/types';
import * as authSaga from './auth';
import * as profileSaga from './profile';

function* mySaga() {
  // auth
  yield takeEvery(types.SEND_SMS, authSaga.sendSignUpSMS);
  yield takeEvery(types.VERIFY_SMS, authSaga.verifySignUpSMS);
  yield takeEvery(types.COMPLETE_SIGN_UP, authSaga.completeSignUp);

  // profile
  yield takeEvery(types.GET_MY_PROFILE, profileSaga.getMyProfile);
}

export default mySaga;
