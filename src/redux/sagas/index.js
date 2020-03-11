import {takeEvery, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import * as authSaga from './auth';
import * as profileSaga from './profile';
import * as reflectionSaga from './reflections';
import * as feedbackSaga from './feedbacks';
import * as notificationSaga from './notifications';
import * as userSaga from './users';

function* mySaga() {
  // auth
  yield takeEvery(types.SEND_SMS, authSaga.sendSignUpSMS);
  yield takeLatest(types.VERIFY_SMS, authSaga.verifySignUpSMS);
  yield takeLatest(types.COMPLETE_SIGN_UP, authSaga.completeSignUp);

  // profile
  yield takeLatest(types.GET_MY_PROFILE, profileSaga.getMyProfile);
  yield takeLatest(types.UPDATE_BASIC_PROFILE, profileSaga.updateBasicProfile);
  yield takeLatest(
    types.UPDATE_CONTACT_PROFILE,
    profileSaga.updateContactProfile,
  );

  // reflection
  yield takeLatest(types.GET_MY_REFLECTIONS, reflectionSaga.getMyReflections);
  yield takeLatest(
    types.GET_USER_REFLECTIONS,
    reflectionSaga.getUserReflections,
  );

  // feedback
  yield takeLatest(types.GET_MY_FEEDBACKS, feedbackSaga.getMyFeedbacks);

  // notification
  yield takeLatest(
    types.GET_NOTIFICATION_SETTINGS,
    notificationSaga.getNotificationSettings,
  );
  yield takeLatest(
    types.UPDATE_NOTIFICATION_SETTINGS,
    notificationSaga.updateNotificationSettings,
  );
  
  // user
  yield takeLatest(types.GET_ALL_USERS, userSaga.getAllUsers);
  yield takeLatest(types.GET_ALL_TRUST_MEMBERS, userSaga.getAllTrustMembers);
}

export default mySaga;
