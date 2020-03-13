import {call, put, select} from 'redux-saga/effects';
import i18next from 'i18next';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';
import NavigationService from 'navigation/NavigationService';

export function* getMyFeedbacks(action) {
  try {
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

export function* requestFeedback(action) {
  try {
    const {
      feedbackReducer: {selectedQuestions},
      usersReducer: {selectedUsers},
    } = yield select();
    const param = {
      receivers: selectedUsers.map(user => ({_id: user._id})),
      questions: selectedQuestions.map(question => i18next.t(question)),
    };
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
      NavigationService.goBack();
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}
