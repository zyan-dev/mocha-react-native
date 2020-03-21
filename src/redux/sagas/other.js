import {all, call, put, select} from 'redux-saga/effects';
import RNIap from 'react-native-iap';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert, capitalizeString} from 'services/operators';

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

export function* syncData(action) {
  const {
    profileReducer,
    reflectionReducer: {myReflections},
  } = yield select();

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
            console.log('removing reflection: ', sr._id);
            put({type: types.REMOVE_REFLECTION, payload: sr});
          }
        }),
      );
    }

    // processing updated reflections
    const reflections_should_be_uppdated = [];
    const reflections_should_be_added = [];
    yield all(
      localReflections.map(lr => {
        const find = serverReflections.find(sr => lr._id === sr._id);
        if (
          lr.data.image &&
          lr.data.image.length &&
          lr.data.image.indexOf('https://') < 0
        ) {
          response = call(API.fileUploadToS3, {
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
      }),
    );

    if (reflections_should_be_uppdated.length > 0) {
      response = yield call(API.updateReflections, {
        data: reflections_should_be_uppdated,
      });
      if (response.data.status !== 'success') {
        yield put({
          type: types.API_FINISHED,
          payload: 'Error occured while processing updated reflections',
        });
        return;
      }
    }

    if (reflections_should_be_added.length > 0) {
      response = yield call(API.addReflections, {
        data: {
          goal: reflections_should_be_added.filter(
            ({type}) => capitalizeString(type) === 'Goal',
          ),
          value: reflections_should_be_added.filter(
            ({type}) => capitalizeString(type) === 'Value',
          ),
          manual: reflections_should_be_added.filter(
            ({type}) => capitalizeString(type) === 'Manual',
          ),
          feedback: reflections_should_be_added.filter(
            ({type}) => capitalizeString(type) === 'Feedback',
          ),
          chronotype: reflections_should_be_added.filter(
            ({type}) => capitalizeString(type) === 'Chronotype',
          ),
          motivation: reflections_should_be_added.filter(
            ({type}) => capitalizeString(type) === 'Motivation',
          ),
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
    yield put({
      type: types.API_FINISHED,
      payload: 'All data has been synced successfully',
    });
    yield put({type: types.GET_MY_REFLECTIONS});
  } else {
    showAlert(response.data.data.message);
  }
}
