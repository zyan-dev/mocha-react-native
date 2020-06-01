import {takeEvery, takeLatest, TakeEffect} from 'redux-saga/effects';
import * as types from '../actions/types';
import * as authSaga from './auth';
import * as profileSaga from './profile';
import * as reflectionSaga from './reflections';
import * as feedbackSaga from './feedbacks';
import * as notificationSaga from './notifications';
import * as userSaga from './users';
import * as networkSaga from './network';
import * as resourceSaga from './resource';
import * as otherSaga from './other';
import * as chatSaga from './chat';
import * as postSaga from './post';

function* mySaga() {
  // auth
  yield takeEvery(types.SEND_SMS, authSaga.sendSignUpSMS);
  yield takeLatest(types.VERIFY_SMS, authSaga.verifySignUpSMS);
  yield takeLatest(types.COMPLETE_SIGN_UP, authSaga.completeSignUp);
  yield takeLatest(types.SET_NEW_USER, authSaga.setNewUser);

  // profile
  yield takeLatest(types.GET_MY_PROFILE, profileSaga.getMyProfile);
  yield takeLatest(types.UPDATE_BASIC_PROFILE, profileSaga.updateBasicProfile);
  yield takeLatest(
    types.UPDATE_CONTACT_PROFILE,
    profileSaga.updateContactProfile,
  );
  yield takeLatest(types.GET_USER_PROFILE, profileSaga.getUserProfile);
  yield takeLatest(types.DELETE_ACCOUNT, profileSaga.deleteAccount);
  yield takeLatest(types.UPDATE_PHONE_NUMBER, profileSaga.updatePhoneNumber);

  // reflection
  yield takeLatest(types.GET_MY_REFLECTIONS, reflectionSaga.getMyReflections);
  yield takeLatest(
    types.GET_USER_REFLECTIONS,
    reflectionSaga.getUserReflections,
  );
  yield takeLatest(types.SAVE_CHRONOTYPE, reflectionSaga.saveMyChronotype);
  yield takeLatest(
    types.UPDATE_TAP_TO_COUNTS,
    reflectionSaga.updateTapToCounts,
  );
  yield takeLatest(types.REMOVE_REFLECTION, reflectionSaga.removeReflection);
  yield takeEvery(
    types.ADD_OR_UPDATE_REFLECTION,
    reflectionSaga.addOrUpdateReflection,
  );
  yield takeEvery(types.RESET_MY_HABITS, reflectionSaga.resetMyHabits);
  yield takeEvery(
    types.GET_SUPPORTED_HABITS,
    reflectionSaga.getSupportedHabits,
  );
  yield takeEvery(
    types.UPDATE_SPECIFIC_REFLECTION,
    reflectionSaga.reactToHabit,
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
  yield takeLatest(types.GET_TRUST_MEMBERS, userSaga.getTrustMembers);
  yield takeLatest(types.SEND_CONTACT_REQUEST, userSaga.sendContactRequest);
  yield takeLatest(types.DECLINE_USER_REQUEST, userSaga.declineRequest);
  yield takeLatest(types.APPROVE_REQUEST, userSaga.approveRequest);
  yield takeLatest(types.FIND_USER_BY_NAME, userSaga.findUserByName);
  yield takeLatest(types.GET_REQUEST_USERS, userSaga.getRequestUsers);

  // network
  yield takeLatest(types.GET_TRUST_NETWORKS, networkSaga.getTrustNetworks);
  yield takeLatest(types.CREATE_TRUST_NETWORK, networkSaga.createNetwork);
  yield takeLatest(types.UPDATE_TRUST_NETWORK, networkSaga.updateNetwork);
  yield takeLatest(types.DELETE_TRUST_NETWORK, networkSaga.deleteNetwork);

  // Resource
  yield takeLatest(types.GET_ALL_RESOURCES, resourceSaga.getAllResources);
  yield takeLatest(types.GET_MY_RESOURCES, resourceSaga.getMyResources);
  yield takeEvery(types.CREATE_RESOURCES, resourceSaga.createResources);
  yield takeEvery(types.UPDATE_RESOURCES, resourceSaga.updateResources);
  yield takeEvery(types.REMOVE_RESOURCES, resourceSaga.removeResources);
  yield takeEvery(
    types.TOGGLE_BOOKMARKED_RESOURCE,
    resourceSaga.toggleBookmarkedResource,
  );
  yield takeLatest(
    types.GET_BOOKMARKED_RESOURCES,
    resourceSaga.getBookmarkedResources,
  );
  yield takeLatest(
    types.GET_TRUST_MEMBER_RESOURCES,
    resourceSaga.getTrustMemberResources,
  );
  yield takeLatest(types.SEARCH_RESOURCES, resourceSaga.searchResources);
  yield takeLatest(
    types.GET_RESOURCE_BY_TITLE,
    resourceSaga.getResourceByTitle,
  );
  yield takeLatest(
    types.RECOMMEND_RESOURCE_TO_MEMBERS,
    resourceSaga.recommendResourceToMembers,
  );
  yield takeLatest(
    types.GET_RECOMMENDED_RESOURCES,
    resourceSaga.getRecommendedResources,
  );

  // other
  yield takeLatest(types.PURCHASE_SUBSCRIPTION, otherSaga.purchaseSubscription);
  yield takeLatest(types.SYNC_DATA, otherSaga.syncData);
  yield takeLatest(types.SYNC_DATA_FOR_NEW_USER, otherSaga.syncDataForNewUser);
  yield takeEvery(types.API_CALLING, otherSaga.checkNetwork);
  yield takeEvery(types.GET_USER_COMMITS, otherSaga.getUserCommits);
  yield takeEvery(types.UPDATE_COMMITS, otherSaga.updateCommits);
  yield takeEvery(types.TRACK_MIXPANEL_EVENT, otherSaga.trackMixpanelEvent);
  yield takeEvery(types.ADD_FAVORITE_TOOL, otherSaga.addFavoriteTool);
  yield takeEvery(types.REMOVE_FAVORITE_TOOL, otherSaga.removeFavoriteTool);
  yield takeEvery(types.SEND_EMAIL, otherSaga.sendEmail);

  // chat
  yield takeLatest(types.CREATE_CHAT_ROOM, chatSaga.createChatRoom);
  yield takeLatest(types.GET_MY_CHAT_ROOMS, chatSaga.getMyChatRooms);
  yield takeLatest(types.UPDATE_CHAT_ROOM, chatSaga.updateChatRoom);
  yield takeLatest(types.DELETE_CHAT_ROOM, chatSaga.deleteChatRoom);
  yield takeLatest(types.SET_MY_CHAT_ROOMS, chatSaga.checkChatMissedState);
  yield takeLatest(types.GET_CHAT_VISIT_STATUS, chatSaga.getChatVisitStatus);
  yield takeLatest(types.GO_TO_CHAT_ROOM_BY_ID, chatSaga.goToChatRoom);
  yield takeLatest(
    types.UPDATE_CHAT_VISIT_STATUS,
    chatSaga.updateChatVisitStatus,
  );
  yield takeLatest(
    types.CHECK_CHAT_MISSED_STATE,
    chatSaga.checkChatMissedState,
  );

  // post
  yield takeEvery(types.ADD_OR_UPDATE_POST, postSaga.addOrUpdatePost);
  yield takeEvery(types.GET_POSTS_BY_ID, postSaga.getPostsById);
  yield takeEvery(types.GET_ALL_POSTS, postSaga.getPosts);
  yield takeEvery(types.REMOVE_POSTS, postSaga.removePosts);
}

export default mySaga;
