import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';
import NavigationService from 'navigation/NavigationService';

export function* getMyReflections(action) {
  try {
    const response = yield call(API.getMyReflections);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_MY_REFLECTIONS,
        payload: response.data.data.reflections,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* getUserReflections(action) {
  try {
    const response = yield call(API.getUserReflections, action.payload);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_USER_REFLECTIONS,
        payload: response.data.data.reflections,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* saveMyChronotype(action) {
  try {
    let response = {};
    yield put({type: types.API_CALLING});
    if (action.payload.isNew) {
      response = yield call(API.addReflections, {
        data: {
          chronotype: [action.payload.param.data],
        },
      });
    } else {
      response = yield call(API.updateReflections, {
        data: [action.payload.param],
      });
    }
    if (response.data.status === 'success') {
      yield put({type: types.GET_MY_REFLECTIONS});
      yield put({type: types.API_FINISHED});
      NavigationService.goBack();
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

export function* addOrUpdateReflection(action) {
  try {
    let response = {};
    const {
      reflectionReducer: {selectedReflection},
      profileReducer: {name},
    } = yield select();
    yield put({type: types.API_CALLING});
    if (
      selectedReflection.image &&
      selectedReflection.data.image.length &&
      selectedReflection.data.image.indexOf('https://') < 0
    ) {
      response = yield call(API.fileUploadToS3, {
        image: selectedReflection.data.image,
        name,
        type: selectedReflection.type,
      });
      if (response === 'error') {
        return;
      } else {
        selectedReflection.data.image = response;
      }
    }
    if (selectedReflection._id) {
      // update
      response = yield call(API.updateReflections, {
        data: [selectedReflection],
      });
    } else {
      // add
      response = yield call(API.addReflections, {
        data: {
          [selectedReflection.type]: [selectedReflection.data],
        },
      });
    }
    if (response.data.status === 'success') {
      yield put({type: types.GET_MY_REFLECTIONS});
      yield put({type: types.API_FINISHED});
      yield put({
        type: types.SET_INITIAL_REFLECTION,
        payload: selectedReflection.type,
      });
      if (selectedReflection._id && selectedReflection.type === 'motivation')
        return;
      NavigationService.goBack();
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

export function* removeReflection(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.removeReflection, action.payload._id);
    if (response.data.status === 'success') {
      yield put({type: types.GET_MY_REFLECTIONS});
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
