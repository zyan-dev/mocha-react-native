import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';
import NavigationService from 'navigation/NavigationService';

export function* getAllResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.getAllResources);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_ALL_RESOURCES,
        payload: response.data.data.resources,
      });
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

export function* getMyResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.getMyResources);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_MY_RESOURCES,
        payload: response.data.data.resources,
      });
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

export function* createResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.createResources, {
      data: action.payload,
    });
    if (response.data.status === 'success') {
      yield put({type: types.GET_ALL_RESOURCES});
      yield put({
        type: types.SET_SEARCH_RESOURCE,
        payload: {},
      });
      NavigationService.goBack();
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

export function* updateResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.updateResources, {
      data: action.payload,
    });
    if (response.data.status === 'success') {
      yield put({type: types.GET_ALL_RESOURCES});
      yield put({
        type: types.SET_SEARCH_RESOURCE,
        payload: {},
      });
      NavigationService.navigate('Resources');
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

export function* removeResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.removeResources, {
      data: action.payload,
    });
    if (response.data.status === 'success') {
      yield put({type: types.GET_ALL_RESOURCES});
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

export function* bookmarkResource(action) {
  try {
    const {
      resourceReducer: {bookmarkedResources},
    } = yield select();
    const index = bookmarkedResources.indexOf(action.payload);
    if (index < 0) {
      bookmarkedResources.push(action.payload);
    } else {
      bookmarkedResources.splice(index, 1);
    }
    yield put({
      type: types.SET_BOOKMARKED_RESOURCES,
      payload: bookmarkedResources,
    });
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* searchResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.searchResources, action.payload);

    if (response.data.status === 'success') {
      yield put({
        type: types.SET_SEARCH_RESOURCE,
        payload: response.data.data.resources,
      });
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
