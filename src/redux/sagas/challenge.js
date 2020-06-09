import {call, put, select} from 'redux-saga/effects';
import * as _ from 'lodash';
import * as types from '../actions/types';
import API from 'services/api';
import NavigationService from 'navigation/NavigationService';

export function* getUserChallenges(action) {
  try {
    const {
      challengeReducer: {selectedChallenge, myChallenges},
      profileReducer: {_id},
    } = yield select();
    const {id} = action.payload;
    const response = yield call(API.getUserChallenges, id);
    if (response.data.status === 'success') {
      if (id === _id) {
        // if my challenges
        yield put({
          type: types.SET_MY_CHALLENGES,
          payload: response.data.data.challenges,
        });
      }
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

export function* getAvailableTeammates(action) {
  try {
    const {name, page} = action.payload;
    if (page === 1) {
      yield put({
        type: types.SET_AVAILBLE_TEAMMATES,
        payload: [],
      });
    }
    yield put({
      type: types.SET_TEAMMATES_LOADING_STATE,
      payload: true,
    });
    const response = yield call(API.getOwnersWithPermission, {
      me: 'owner',
      name: name || '',
      page: page,
      permission: 'progress',
    });
    if (response.data.status === 'success') {
      if (page === 1) {
        yield put({
          type: types.SET_AVAILBLE_TEAMMATES,
          payload: response.data.data.networks,
        });
      } else {
        yield put({
          type: types.ADD_POST_TRUST_MEMBERS,
          payload: response.data.data.networks,
        });
      }
      yield put({
        type: types.SET_TEAMMATES_PAGE_INDEX,
        payload: page,
      });
      yield put({
        type: types.SET_TEAMMATES_PAGE_LIMITED,
        payload: page === response.data.data.total_pages,
      });
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_TEAMMATES_LOADING_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* addOrUpdateChallenge(action) {
  try {
    let response = {};
    const {
      challengeReducer: {selectedChallenge, myChallenges},
      routerReducer: {isInternetReachable},
      profileReducer: {userToken, _id},
    } = yield select();
    yield put({type: types.API_CALLING});
    if (!selectedChallenge) {
      yield put({type: types.API_FINISHED, payload: 'Challenge is empty'});
    } else if (selectedChallenge._id) {
      if (userToken && isInternetReachable) {
        // online update
        response = yield call(API.updateChallenges, {
          data: [selectedChallenge],
        });
      } else {
        // offline update
        const updated = myChallenges.map(challenge => {
          if (challenge._id === selectedChallenge._id) return selectedChallenge;
          else return challenge;
        });
        yield put({
          type: types.SET_MY_CHALLENGES,
          payload: updated,
        });
      }
    } else {
      if (userToken && isInternetReachable) {
        // online add
        response = yield call(API.addChallenges, {
          data: [selectedChallenge],
        });
      } else {
        // offline add
        yield put({
          type: types.SET_MY_CHALLENGES,
          payload: myChallenges.concat({
            ...selectedChallenge,
            _id: new Date().getTime(),
          }),
        });
      }
    }
    if (response.data && response.data.status === 'success') {
      yield put({type: types.GET_USER_CHALLENGES, payload: {id: _id}});
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: selectedChallenge._id ? 'update_challenge' : 'add_challenge',
          data: selectedChallenge,
        },
      });
      yield put({type: types.API_FINISHED});
      NavigationService.navigate('Progress');
    } else if (response.data) {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    } else {
      yield put({type: types.API_FINISHED});
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}
