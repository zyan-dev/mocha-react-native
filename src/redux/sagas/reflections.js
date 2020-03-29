import {call, put, select} from 'redux-saga/effects';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';
import NavigationService from 'navigation/NavigationService';
import {getWeekStartDateStamp} from 'services/operators';

export function* getMyReflections(action) {
  try {
    const {
      profileReducer: {userToken},
      routerReducer: {isInternetReachable},
    } = yield select();
    if (!userToken || !isInternetReachable) return;
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
      reflectionReducer: {selectedReflection, myReflections},
      profileReducer: {name, userToken},
      routerReducer: {isInternetReachable},
    } = yield select();
    yield put({type: types.API_CALLING});
    if (
      isInternetReachable &&
      selectedReflection.data.image &&
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
      if (userToken && isInternetReachable) {
        // online update
        response = yield call(API.updateReflections, {
          data: [selectedReflection],
        });
      } else {
        // offline update
        const updated = myReflections.map(reflection => {
          if (reflection._id === selectedReflection._id)
            return selectedReflection;
          else return reflection;
        });
        yield put({
          type: types.SET_MY_REFLECTIONS,
          payload: updated,
        });
      }
    } else {
      if (userToken && isInternetReachable) {
        // online add
        response = yield call(API.addReflections, {
          data: {
            [selectedReflection.type]: [selectedReflection.data],
          },
        });
      } else {
        // offline add
        yield put({
          type: types.SET_MY_REFLECTIONS,
          payload: myReflections.concat({
            ...selectedReflection,
            _id: new Date().getTime(),
          }),
        });
      }
    }
    if (
      !userToken ||
      !isInternetReachable ||
      response.data.status === 'success'
    ) {
      yield put({type: types.GET_MY_REFLECTIONS});
      yield put({
        type: types.TRACK_MIXPANEL_EVENT,
        payload: {
          event: selectedReflection._id
            ? 'Update Reflection'
            : 'Add Reflection',
          data: {type: selectedReflection.type},
        },
      });
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
    const {
      reflectionReducer: {myReflections},
      profileReducer: {userToken},
    } = yield select();
    yield put({type: types.API_CALLING});
    if (userToken) {
      // online remove
      const response = yield call(API.removeReflection, {
        data: [action.payload._id],
      });
      if (response.data.status === 'success') {
        yield put({type: types.GET_MY_REFLECTIONS});
        yield put({
          type: types.TRACK_MIXPANEL_EVENT,
          payload: {
            event: 'Remove Reflection',
            data: {type: action.payload.type},
          },
        });
        yield put({type: types.API_FINISHED});
      } else {
        yield put({
          type: types.API_FINISHED,
          payload: response.data.data.message,
        });
      }
    } else {
      // offline remove
      const filtered = myReflections.filter(
        reflection => reflection._id !== action.payload._id,
      );
      yield put({
        type: types.SET_MY_REFLECTIONS,
        payload: filtered,
      });
      yield put({type: types.API_FINISHED});
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* updateTapToCounts(action) {
  try {
    const tapToCounts = action.payload.map(i => ({
      ...i,
      data: {
        ...i.data,
        times: i.data.times.filter(t => t > getWeekStartDateStamp()),
      },
    }));
    const state = yield select();
    const origin = selector.reflections.getMyTapToCounts(state);
    const addItems = tapToCounts
      .filter(i => i._id.length < 20)
      .map(i => i.data);
    const removeItems = origin
      .filter(i => {
        const find = tapToCounts.find(item => item._id === i._id);
        return !find;
      })
      .map(i => i._id);
    const updateItems = tapToCounts
      .filter(i => i._id.length > 20)
      .filter(i => {
        const find = origin.find(item => item._id === i._id);
        if (find.updated === i.updated) return false;
        else return true;
      })
      .map(i => _.pick(i, ['_id', 'data']));
    let response;
    if (addItems.length > 0) {
      response = yield call(API.addReflections, {
        data: {
          tap: addItems,
        },
      });
      if (response.data.status !== 'success') {
        showAlert(response.data.data.message);
        return;
      }
    }
    if (removeItems.length > 0) {
      response = yield call(API.removeReflection, {
        data: removeItems,
      });
      if (response.data.status !== 'success') {
        showAlert(response.data.data.message);
        return;
      }
    }
    if (updateItems.length > 0) {
      response = yield call(API.updateReflections, {
        data: updateItems,
      });
      if (response.data.status !== 'success') {
        showAlert(response.data.data.message);
        return;
      }
    }
    yield put({type: types.GET_MY_REFLECTIONS});
  } catch (e) {
    showAlert(e.toString());
  }
}
