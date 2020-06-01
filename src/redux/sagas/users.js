import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';

export function* getTrustMembers(action) {
  const {
    postReducer: {selectedUser},
  } = yield select();
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

    const response = yield call(API.getTrustMembers, action.payload);
    if (response.data.status === 'success') {
      const contacts = response.data.data.contacts;
      yield put({
        type:
          action.payload.status === 0
            ? types.SET_PENDING_MEMBERS
            : types.SET_TRUST_MEMBERS,
        payload: contacts,
      });
      yield put({
        type: types.SET_SEARCH_PAGE_LIMITED,
        payload: action.payload.page === response.data.data.total_pages,
      });
      // select the first trust member by default for users posts screen
      if (
        action.payload.status === 1 &&
        action.payload.page === 1 &&
        contacts.length > 0
      ) {
        // select default user if selected user is invalid
        if (!selectedUser || !contacts.find(i => i._id === selectedUser._id)) {
          yield put({
            type: types.SET_SELECTED_POST_USER,
            payload: contacts[0],
          });
          yield put({
            type: types.GET_POSTS_BY_ID,
            payload: {id: contacts[0]._id, page: 1},
          });
          yield put({
            type: types.SET_USER_POSTS,
            payload: [],
          });
        } else {
          yield put({
            type: types.GET_POSTS_BY_ID,
            payload: {id: selectedUser._id, page: 1},
          });
        }
      }
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
    if (action.payload.param.page === 1) {
      yield put({
        type: types.SET_SEARCHED_USERS,
        payload: [],
      });
    }
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: true,
    });
    let response = {};
    if (action.payload.onlyUntrust)
      response = yield call(API.getUntrustMembers, action.payload.param);
    else response = yield call(API.findUserByName, action.payload.param);
    if (response.data.status === 'success') {
      if (action.payload.param.page === 1) {
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
        payload: action.payload.param.page === response.data.data.total_pages,
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

export function* getRequestUsers(action) {
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

    const response = yield call(API.getRequestUsers, action.payload);
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
