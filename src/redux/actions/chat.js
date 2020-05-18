import database from '@react-native-firebase/database';
import * as types from './types';
import {setLoading} from './route';

export const setChatLoading = loading => ({
  type: types.SET_CHAT_LOADING,
  payload: loading,
});

export const createChatRoom = param => ({
  type: types.CREATE_CHAT_ROOM,
  payload: param,
});

export const getMyChatRooms = () => ({
  type: types.GET_MY_CHAT_ROOMS,
});

export const selectChatRoom = room => ({
  type: types.SELECT_CHAT_ROOM,
  payload: room,
});

export const setRoomMessages = messages => ({
  type: types.SET_CHAT_ROOM_MESSAGES,
  payload: messages,
});

export const updateChatRoom = data => ({
  type: types.UPDATE_CHAT_ROOM,
  payload: data,
});

export const getRoomMessages = roomId => (dispatch, getState) => {
  dispatch(setRoomMessages([]));
  dispatch(setChatLoading(true));
  database()
    .ref(`/chatrooms/${roomId}/history`)
    .on('value', snapshot => {
      console.log('Chat Messages: ', snapshot.val());
      dispatch(setRoomMessages(snapshot.val() || []));
      dispatch(setChatLoading(false));
    });
};

export const closeRoomMessageListener = () => (dispatch, getState) => {
  const roomId = getState().chatReducer.selectedRoom._id;
  database()
    .ref(`/chatrooms/${roomId}/history`)
    .off();
};

export const sendMessage = (msgData, callback) => (dispatch, getState) => {
  const roomId = getState().chatReducer.selectedRoom._id;
  database()
    .ref(`/chatrooms/${roomId}/history/${msgData.date}`)
    .set(msgData)
    .then(() => {
      dispatch(
        updateChatRoom({
          _id: roomId,
          last_updated: msgData.date,
          last_message: msgData.text,
          last_userId: msgData.userId,
        }),
      );
      callback();
    });
};

export const deleteChatRoom = roomId => ({
  type: types.DELETE_CHAT_ROOM,
  payload: roomId,
});
