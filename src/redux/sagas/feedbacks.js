import {call, put, select} from 'redux-saga/effects';
import i18next from 'i18next';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';
import NavigationService from 'navigation/NavigationService';

export function* getMyFeedbacks(action) {
  try {
    const {
      routerReducer: {isInternetReachable},
    } = yield select();
    if (!isInternetReachable) return;
    const response = yield call(API.getMyFeedbacks);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_MY_FEEDBACKS,
        payload: response.data.data.feedbacks.feedbacks,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* getUserFeedbacks(action) {
  try {
    const response = yield call(API.getUserFeedbacks, action.payload);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_USER_FEEDBACKS,
        payload: response.data.data.feedbacks.feedbacks,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* submitFeedback(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.submitFeedback, action.payload.id, {
      feedback: {
        pending: false,
        feedback: action.payload.feedback,
      },
    });
    if (response.data.status === 'success') {
      yield put({type: types.GET_MY_FEEDBACKS});
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: 'Give Feedback',
          data: {feedback: action.payload.feedback},
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
    yield put({
      type: types.API_FINISHED,
      payload: e.toString(),
    });
  }
}

export function* requestFeedback(action) {
  try {
    const {
      feedbackReducer: {selectedQuestions},
      usersReducer: {selectedUsers},
    } = yield select();
    const param = {
      receivers: selectedUsers.map(user => ({_id: user._id})),
      questions: selectedQuestions,
    };
    yield put({type: types.API_CALLING});
    const response = yield call(API.sendFeedbackRequest, param);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_SELECTED_USERS,
        payload: [],
      });
      yield put({
        type: types.SET_SELCTED_QUESTIONS,
        payload: [],
      });
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: 'Request Feedback',
          data: {to: param.receivers},
        },
      });
      yield put({type: types.GET_MY_FEEDBACKS});
      yield put({type: types.API_FINISHED});
      console.log('feedback sent');
      if (action.payload.goBack) {
        NavigationService.goBack();
      } else {
        NavigationService.navigate('CompletedFeedback');
      }
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({
      type: types.API_FINISHED,
      payload: e.toString(),
    });
  }
}

export function* removeFeedbackRequest(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.removeFeedbackRequest, action.payload);
    if (response.data.status === 'success') {
      yield put({type: types.GET_MY_FEEDBACKS});
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
