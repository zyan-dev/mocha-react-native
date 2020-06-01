import {call, put, select} from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import * as _ from 'lodash';
import * as types from '../actions/types';
import NavigationService from 'navigation/NavigationService';
import API from 'services/api';
import {showAlert, compareTimeStampWithDate} from 'services/operators';

export function* getMyChatRooms(action) {
  try {
    yield put({type: types.SET_CHAT_LOADING, payload: true});
    const response = yield call(API.getMyChatRooms);
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_MY_CHAT_ROOMS,
        payload: response.data.data.chats,
      });

      // end chat loading
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

export function* checkChatMissedState(action) {
  const {
    chatReducer: {chatVisitStatus, myRooms},
  } = yield select();
  // check updated chat status
  const rooms = action.payload || myRooms;
  const find = rooms.find(room => {
    return !compareTimeStampWithDate(
      chatVisitStatus[room._id],
      room.last_updated,
    );
  });
  if (find) {
    yield put({type: types.SET_CHAT_MISSED_STATE, payload: true});
  } else {
    yield put({type: types.SET_CHAT_MISSED_STATE, payload: false});
  }
}

export function* getChatVisitStatus(action) {
  try {
    const response = yield call(API.getChatVisitStatus);
    if (response.data.status === 'success') {
      const temp = response.data.data.chatVisits.lastVisits || []; // array
      let status = {};
      temp.map(i => {
        status[i.roomId] = i.last_visit;
      });
      yield put({
        type: types.SET_CHAT_VISIT_STATUS,
        payload: status, // json {roomId: last_visit}
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* updateChatVisitStatus(action) {
  try {
    const {
      chatReducer: {chatVisitStatus},
    } = yield select();
    const updatedChatVisitStatus = {
      ...chatVisitStatus,
      ...action.payload,
    };

    // get chatVisit param by converting json to array
    let lastVisits = [];
    Object.keys(updatedChatVisitStatus).map(roomId => {
      lastVisits.push({roomId, last_visit: updatedChatVisitStatus[roomId]});
    });

    const {
      chatReducer: {myRooms},
    } = yield select();
    // get chat badge number
    const filtered = myRooms.filter(room => {
      return !compareTimeStampWithDate(
        updatedChatVisitStatus[room._id],
        room.last_updated,
      );
    });

    const response = yield call(API.updateChatVisitStatus, {
      lastVisits,
      badge: filtered.length,
    });
    if (response.data.status === 'success') {
      yield put({
        type: types.SET_CHAT_VISIT_STATUS,
        payload: updatedChatVisitStatus,
      });
      yield put({
        type: types.SET_CHAT_MISSED_STATE,
        payload: filtered.length > 0,
      });
    } else {
      showAlert(response.data.data.message);
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* updateChatRoom(action) {
  try {
    const {
      profileReducer,
      chatReducer: {selectedRoom},
    } = yield select();
    const response = yield call(API.updateChatRoom, action.payload);
    if (response.data.status === 'success') {
      yield put({type: types.GET_MY_CHAT_ROOMS});
      yield put({
        type: types.SELECT_CHAT_ROOM,
        payload: response.data.data.chat,
      });
      selectedRoom.includes.map(user => {
        if (user._id === profileReducer._id) return;
        // update last message date for all members
        database()
          .ref(`/chat_listener/${user._id}/${selectedRoom._id}`)
          .set({
            last_updated: new Date().getTime(),
          });
      });
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
