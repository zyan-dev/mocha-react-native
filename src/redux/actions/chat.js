import database from '@react-native-firebase/database';
import * as types from './types';
import {setLoading} from './route';
import i18next from 'i18next';

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

export const updateLastMessageDate = data => ({
  type: types.UPDATE_LAST_MESSAGE_DATE,
  payload: data,
});

export const updateChatRoom = data => ({
  type: types.UPDATE_CHAT_ROOM,
  payload: data,
});

export const getRoomMessages = roomId => (dispatch, getState) => {
  dispatch(setRoomMessages([]));
  database()
    .ref(`/chatrooms/${roomId}/history`)
    .on('value', snapshot => {
      dispatch(setChatLoading(true));
      dispatch(setRoomMessages(snapshot.val() || {}));
      dispatch(getMyChatRooms());
      dispatch(setChatLoading(false));
    });
};

export const startChatListener = () => (dispatch, getState) => {
  const profile = getState().profileReducer;
  if (!profile.userToken) return;
  database()
    .ref(`/chat_listener/${profile._id}`)
    .on('value', snapshot => {
      dispatch(getMyChatRooms());
    });
};

export const closeRoomMessageListener = () => (dispatch, getState) => {
  const roomId = getState().chatReducer.selectedRoom._id;
  database()
    .ref(`/chatrooms/${roomId}/history`)
    .off();
};

export const sendMessage = (msgData, callback) => (dispatch, getState) => {
  const selectedRoom = getState().chatReducer.selectedRoom;
  database()
    .ref(`/chatrooms/${selectedRoom._id}/history/${msgData.date}`)
    .set(msgData)
    .then(() => {
      dispatch(
        updateChatRoom({
          _id: selectedRoom._id,
          last_updated: msgData.date,
          last_message: msgData.text,
          last_userId: msgData.userId,
        }),
      );
      callback();
    });
};

export const addMemberToRoom = (selectedUsers, room, callback) => (
  dispatch,
  getState,
) => {
  const profile = getState().profileReducer;
  const newMemberIds = selectedUsers.map(i => i._id);

  // set date, id, text (e.g. Tian added John and other 2 members)
  const last_updated = new Date().getTime();
  const last_userId = profile._id;
  let last_message = 'chat_message_who_added_whom';
  newMemberIds.map(id => {
    last_message += `&${id}`;
  });

  database()
    .ref(`/chatrooms/${room._id}/history/${last_updated}`)
    .set({
      date: last_updated,
      text: last_message,
      userId: last_userId,
    })
    .then(() => {
      dispatch(
        updateChatRoom({
          _id: room._id,
          members: room.members.concat(newMemberIds),
          last_updated,
          last_message,
          last_userId,
        }),
      );
      callback();
    });
};

export const deleteChatRoom = roomId => ({
  type: types.DELETE_CHAT_ROOM,
  payload: roomId,
});
