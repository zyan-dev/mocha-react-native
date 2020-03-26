import {takeEvery, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import * as authSaga from './auth';
import * as profileSaga from './profile';
import * as reflectionSaga from './reflections';
import * as feedbackSaga from './feedbacks';
import * as notificationSaga from './notifications';
import * as userSaga from './users';
import * as networkSaga from './network';
import * as otherSaga from './other';

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
  yield takeLatest(types.GET_USER_PROFILE, profileSaga.getUserProfile);
  yield takeLatest(types.DELETE_ACCOUNT, profileSaga.deleteAccount);

  // reflection
  yield takeLatest(types.GET_MY_REFLECTIONS, reflectionSaga.getMyReflections);
  yield takeLatest(
    types.GET_USER_REFLECTIONS,
    reflectionSaga.getUserReflections,
  );
  yield takeLatest(types.SAVE_CHRONOTYPE, reflectionSaga.saveMyChronotype);
  yield takeLatest(types.REMOVE_REFLECTION, reflectionSaga.removeReflection);
  yield takeLatest(
    types.ADD_OR_UPDATE_REFLECTION,
    reflectionSaga.addOrUpdateReflection,
  );

  // feedback
  yield takeLatest(types.GET_MY_FEEDBACKS, feedbackSaga.getMyFeedbacks);
  yield takeLatest(types.GET_USER_FEEDBACKS, feedbackSaga.getUserFeedbacks);
  yield takeLatest(types.REQUEST_FEEDBACK, feedbackSaga.requestFeedback);
  yield takeLatest(types.SUBMIT_FEEDBACK, feedbackSaga.submitFeedback);
  yield takeLatest(
    types.REMOVE_FEEDBACK_REQUEST,
    feedbackSaga.removeFeedbackRequest,
  );

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
  yield takeLatest(types.SEND_CONTACT_REQUEST, userSaga.sendContactRequest);
  yield takeLatest(types.DECLINE_USER_REQUEST, userSaga.declineRequest);

  // network
  yield takeLatest(types.GET_TRUST_NETWORKS, networkSaga.getTrustNetworks);
  yield takeLatest(types.CREATE_TRUST_NETWORK, networkSaga.createNetwork);
  yield takeLatest(types.UPDATE_TRUST_NETWORK, networkSaga.updateNetwork);
  yield takeLatest(types.DELETE_TRUST_NETWORK, networkSaga.deleteNetwork);

  // other
  yield takeLatest(types.PURCHASE_SUBSCRIPTION, otherSaga.purchaseSubscription);
  yield takeLatest(types.SYNC_DATA, otherSaga.syncData);
  yield takeEvery(types.API_CALLING, otherSaga.checkNetwork);
  yield takeEvery(types.TRACK_MIXPANEL_EVENT, otherSaga.trackMixpanelEvent);
}

export default mySaga;
