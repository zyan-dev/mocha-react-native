import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';

export function* getTrustMembers(action) {
  try {
    if (action.payload.page === 1) {
      yield put({
        type: types.SET_SEARCHED_USERS,
        payload: [],
      });
    }
    yield put({type: types.API_CALLING});
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: true,
    });
    // call send sms API
    const response = yield call(API.getTrustMembers, action.payload);
    if (response.data.status === 'success') {
      yield put({
        type:
          action.payload.status === 0
            ? types.SET_PENDING_MEMBERS
            : types.SET_TRUST_MEMBERS,
        payload: response.data.data.contacts,
      });
      yield put({
        type: types.SET_SEARCH_PAGE_LIMITED,
        payload: action.payload.page === response.data.data.total_pages,
      });
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED});
  } catch (e) {
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* sendContactRequest(action) {
  try {
    // call send sms API
    const response = yield call(API.sendContactRequest, action.payload);
    if (response.data.status === 'success') {
      showAlert('Your request has been sent successfully');
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {event: 'send_request', data: action.payload},
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* declineRequest(action) {
  try {
    // call send sms API
    yield put({type: types.API_CALLING});
    const response = yield call(API.declineRequest, action.payload);
    if (response.data.status === 'success') {
      yield put({
        type: types.GET_TRUST_MEMBERS,
        payload: {
          status: 0,
          name: '',
          page: 1,
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

export function* approveRequest(action) {
  try {
    // call send sms API
    yield put({type: types.API_CALLING});
    const response = yield call(API.approveRequest, action.payload);
    if (response.data.status === 'success') {
      yield put({
        type: types.GET_TRUST_MEMBERS,
        payload: {
          status: 0,
          name: '',
          page: 1,
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

export function* findUserByName(action) {
  try {
    if (action.payload.page === 1) {
      yield put({
        type: types.SET_SEARCHED_USERS,
        payload: [],
      });
    }
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: true,
    });
    const response = yield call(API.findUserByName, action.payload);
    if (response.data.status === 'success') {
      if (action.payload.page === 1) {
        yield put({
          type: types.SET_SEARCHED_USERS,
          payload: response.data.data.users,
        });
      } else {
        yield put({
          type: types.ADD_SEARCHED_USERS,
          payload: response.data.data.users,
        });
      }
      yield put({
        type: types.SET_SEARCH_PAGE_LIMITED,
        payload: action.payload.page === response.data.data.total_pages,
      });
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED});
  } catch (e) {
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* getUntrustmembers(action) {
  try {
    if (action.payload.page === 1) {
      yield put({
        type: types.SET_SEARCHED_TRUST_MEMBERS,
        payload: [],
      });
    }
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: true,
    });

    const response = yield call(API.getUntrustmembers, action.payload);
    if (response.data.status === 'success') {
      if (action.payload.page === 1) {
        yield put({
          type: types.SET_SEARCHED_TRUST_MEMBERS,
          payload: response.data.data.users,
        });
      } else {
        yield put({
          type: types.ADD_SEARCHED_TRUST_MEMBERS,
          payload: response.data.data.users,
        });
      }
      yield put({
        type: types.SET_SEARCH_PAGE_LIMITED,
        payload: action.payload.page === response.data.data.total_pages,
      });
    } else {
      showAlert(response.data.data.message);
    }
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: false,
    });
  } catch (e) {
    showAlert(e.toString());
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: false,
    });
  }
}
