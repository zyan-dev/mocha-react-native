import {call, put, select} from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import * as _ from 'lodash';
import * as types from '../actions/types';
import NavigationService from 'navigation/NavigationService';
import API from 'services/api';
import {showAlert} from 'services/operators';

export function* getMyChatRooms(action) {
  try {
    const {
      chatReducer: {selectedRoom},
    } = yield select();
    yield put({type: types.SET_CHAT_LOADING, payload: true});
    const response = yield call(API.getMyChatRooms);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_MY_CHAT_ROOMS,
        payload: response.data.data.chats,
      });
      if (selectedRoom) {
        const find = response.data.data.chats.find(
          i => i._id === selectedRoom._id,
        );
        yield put({type: types.SELECT_CHAT_ROOM, payload: find});
      }
      yield put({type: types.SET_CHAT_LOADING, payload: false});
    } else {
      yield put({type: types.SET_CHAT_LOADING, payload: false});
      showAlert(response.data.data.message);
    }
  } catch (e) {
    yield put({type: types.SET_CHAT_LOADING, payload: false});
    showAlert(e.toString());
  }
}

export function* updateChatRoom(action) {
  try {
    const response = yield call(API.updateChatRoom, action.payload);
    if (response.data.status === 'success') {
      yield put({type: types.GET_MY_CHAT_ROOMS});
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* createChatRoom(action) {
  try {
    const {profileReducer} = yield select();
    yield put({type: types.API_CALLING});
    const response = yield call(API.createChatRoom, action.payload);
    if (response.data.status === 'success') {
      // if success go to verify sms screen
      yield put({type: types.GET_MY_CHAT_ROOMS});

      // Add chat room to firebase
      const CTS = new Date().getTime();
      database()
        .ref(`/chatrooms/${response.data.data.chat._id}/history`)
        .set({
          [CTS]: {
            userId: profileReducer._id,
            date: CTS,
            text: 'who_chat_message_created_room',
          },
        });
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

export function* deleteChatRoom(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.deleteChatRoom, action.payload);
    if (response.data.status === 'success') {
      // if success go to verify sms screen
      yield put({type: types.GET_MY_CHAT_ROOMS});

      // Add chat room to firebase
      const CTS = new Date().getTime();
      database()
        .ref(`/chatrooms/${action.payload}`)
        .remove()
        .then(() => {
          NavigationService.goBack();
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
