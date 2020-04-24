import {all, call, put, select} from 'redux-saga/effects';
import RNIap from 'react-native-iap';
import Mixpanel from 'react-native-mixpanel';
import NetInfo from '@react-native-community/netinfo';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';
import NavigationService from 'navigation/NavigationService';

export function* purchaseSubscription(action) {
  try {
    RNIap.finishTransaction(action.payload.purchase, false);
    // const response = yield call(API.purchaseSubscription, action.payload.receipt);
    // if (response.data.status === 'success') {

    // } else {
    //   showAlert(response.data.data.message);
    // }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* checkNetwork(action) {
  const {
    routerReducer: {isInternetReachable},
  } = yield select();
  const networkState = yield call(NetInfo.fetch);

  if (networkState.isInternetReachable !== null) {
    yield put({
      type: types.SET_NETWORK_STATUS,
      payload: networkState.isInternetReachable,
    });
    yield put({
      type: types.TRACK_MIXPANEL_EVENT,
      payload: {
        event: `Network ${
          networkState.isInternetReachable ? 'Online' : 'Offline'
        }`,
      },
    });
    if (!isInternetReachable && networkState.isInternetReachable) {
      yield put({type: types.SYNC_DATA, payload: false});
    }
  }
}

export function* syncData(action) {
  const {
    profileReducer,
    reflectionReducer: {myReflections},
    notificationReducer,
  } = yield select();
  try {
    yield put({type: types.API_CALLING});
    // sync profile
    const avatar = profileReducer.avatar;
    if (avatar.length > 0 && avatar.indexOf('https://') < 0) {
      // avatar should be uploaded to server
      const fileResponse = yield call(API.fileUploadToS3, {
        image: profileReducer.avatar,
        name: profileReducer.name,
        type: 'avatar',
      });
      if (fileResponse !== 'error') {
        profileReducer.avatar = fileResponse;
      } else {
        showAlert('Upload Error');
        return;
      }
    }
    let response = yield call(API.updateProfile, profileReducer);
    yield put({
      type: types.SET_PROFILE_DATA,
      payload: response.data.data.user,
    });

    // sync reflection
    response = yield call(API.getMyReflections);
    if (response.data.status === 'success') {
      const serverReflections = response.data.data.reflections;
      const localReflections = myReflections;
      // processing deleted reflections
      if (!action.payload) {
        yield all(
          serverReflections.map(sr => {
            const find = localReflections.find(lr => lr._id === sr._id);
            if (!find) {
              put({type: types.REMOVE_REFLECTION, payload: sr});
            }
          }),
        );
      }

      // processing updated reflections
      const reflections_should_be_uppdated = [];
      const reflections_should_be_added = [];
      const reflections_should_be_removed = [];
      for (let i = 0; i < localReflections.length; i++) {
        const lr = localReflections[i];
        const find = serverReflections.find(sr => lr._id === sr._id);
        if (lr._id && !lr.data) {
          reflections_should_be_removed.push(lr._id);
        } else if (
          lr.data &&
          lr.data.image &&
          lr.data.image.length &&
          lr.data.image.indexOf('https://') < 0
        ) {
          response = yield call(API.fileUploadToS3, {
            image: lr.data.image,
            name: profileReducer.name,
            type: lr.type,
          });
          if (response === 'error') {
            return;
          } else {
            lr.data.image = response;
          }
        }
        if (find && lr.updated > find.updated) {
          reflections_should_be_uppdated.push(lr);
        } else if (!find) {
          reflections_should_be_added.push(lr);
        }
      }
      if (reflections_should_be_uppdated.length > 0) {
        response = yield call(API.updateReflections, {
          data: reflections_should_be_uppdated,
        });
        if (response.data.status !== 'success') {
          yield put({
            type: types.API_FINISHED,
            payload: 'Error occured while updating reflections',
          });
          return;
        }
      }

      if (reflections_should_be_removed.length > 0) {
        response = yield call(API.removeReflection, {
          data: reflections_should_be_removed,
        });
        if (response.data.status !== 'success') {
          yield put({
            type: types.API_FINISHED,
            payload: 'Error occured while deleting reflections',
          });
          return;
        }
      }

      if (reflections_should_be_added.length > 0) {
        response = yield call(API.addReflections, {
          data: {
            goal: reflections_should_be_added
              .filter(({type}) => type === 'Goal')
              .map(reflection => reflection.data),
            value: reflections_should_be_added
              .filter(({type}) => type === 'Value')
              .map(reflection => reflection.data),
            manual: reflections_should_be_added
              .filter(({type}) => type === 'Manual')
              .map(reflection => reflection.data),
            feedback: reflections_should_be_added
              .filter(({type}) => type === 'Feedback')
              .map(reflection => reflection.data),
            chronotype: reflections_should_be_added
              .filter(({type}) => type === 'Chronotype')
              .map(reflection => reflection.data),
            motivation: reflections_should_be_added
              .filter(({type}) => type === 'Motivation')
              .map(reflection => reflection.data),
            emotion: reflections_should_be_added
              .filter(({type}) => type === 'Emotion')
              .map(reflection => reflection.data),
          },
        });
        if (response.data.status !== 'success') {
          yield put({
            type: types.API_FINISHED,
            payload: 'Error occured while adding new reflections',
          });
          return;
        }
      }

      //sync notification settings
      if (notificationReducer.owner) {
        console.log('updating notification settings...', notificationReducer);
        response = yield call(
          API.updateNotificationSettings,
          notificationReducer,
        );
        if (response.data.status !== 'success') {
          yield put({
            type: types.API_FINISHED,
            payload:
              'Error occured while synchronizing your notification settings',
          });
          return;
        }
      } else if (notificationReducer) {
        console.log('adding notification settings...', notificationReducer);
        response = yield call(
          API.createNotificationSettings,
          notificationReducer,
        );
        if (response.data.status !== 'success') {
          yield put({
            type: types.API_FINISHED,
            payload:
              'Error occured while synchronizing your notification settings',
          });
          return;
        }
      }

      yield put({
        type: types.API_FINISHED,
        payload: 'All data has been synced successfully',
      });
      if (action.payload) {
        NavigationService.navigate('Auth_Welcome');
      } else {
        yield put({type: types.GET_MY_REFLECTIONS});
      }
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    yield put({
      type: types.API_FINISHED,
      payload: e.toString(),
    });
  }
}

export function* getUserCommits(action) {
  try {
    const response = yield call(API.getUserCommits, action.payload);
    if (response.data.status !== 'success') {
      showAlert(response.data.data.message);
    } else if (response.data.data.commits) {
      yield put({
        type: types.SET_USER_COMMITS,
        payload: response.data.data.commits,
      });
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* updateCommits(action) {
  try {
    const {profileReducer} = yield select();
    const response = yield call(API.updateCommits, action.payload);
    if (response.data.status !== 'success') {
      showAlert(response.data.data.message);
    } else {
      yield put({type: types.GET_USER_COMMITS, payload: profileReducer._id});
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* trackMixpanelEvent(action) {
  const {profileReducer} = yield select();
  Mixpanel.trackWithProperties(action.payload.event, {
    ...action.payload.data,
    userId: profileReducer._id,
  });
}

export function* addFavoriteTool(action) {
  const {
    otherReducer: {favoriteTools},
  } = yield select();
  if (favoriteTools) {
    const find = favoriteTools.find(i => i.key === action.payload.key);
    if (!find) favoriteTools.push(action.payload);
    yield put({type: types.SET_FAVORITE_TOOLS, payload: favoriteTools});
  } else {
    yield put({type: types.SET_FAVORITE_TOOLS, payload: [action.payload]});
  }
}

export function* removeFavoriteTool(action) {
  const {
    otherReducer: {favoriteTools},
  } = yield select();
  const filtered = favoriteTools.filter(i => i.key !== action.payload.key);
  yield put({type: types.SET_FAVORITE_TOOLS, payload: filtered});
}
