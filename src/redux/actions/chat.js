import database from '@react-native-firebase/database';
import * as _ from 'lodash';
import auth from '@react-native-firebase/auth';
import * as types from './types';
import {setLoading} from './route';
import {compareTimeStampWithDate} from 'services/operators';
import i18next from 'i18next';
import {showAlert} from '../../services/operators';

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

export const updateChatVisitStatus = data => ({
  type: types.UPDATE_CHAT_VISIT_STATUS,
  payload: data,
});

export const updateChatRoom = data => ({
  type: types.UPDATE_CHAT_ROOM,
  payload: data,
});

export const checkChatMissedState = () => ({
  type: types.CHECK_CHAT_MISSED_STATE,
});

export const getChatVisitStatus = () => ({
  type: types.GET_CHAT_VISIT_STATUS,
});

export const gotoChatRoom = roomID => ({
  type: types.GO_TO_CHAT_ROOM_BY_ID,
  payload: roomID,
});

export const getRoomMessages = (roomId, count) => (dispatch, getState) => {
  dispatch(closeRoomMessageListener());
  database()
    .ref(`/chatrooms/${roomId}/history`)
    .limitToLast(count)
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
  const chatRef = database().ref(`/chat_listener/${profile._id}`);
  if (chatRef) {
    chatRef.off();
    database()
      .ref(`/chat_listener/${profile._id}`)
      .on('value', snapshot => {
        dispatch(getMyChatRooms());
      });
  }
};

export const firebaseAuthentication = () => (dispatch, getState) => {
  const profile = getState().profileReducer;
  if (!profile.userToken) return;
  if (auth().currentUser) dispatch(startChatListener());
  auth()
    .signInWithEmailAndPassword('admin@mocha.com', 'Tian.Mocha.Firebase.Secure')
    .then(() => {
      console.log('Firebase Authentication successed!');
      dispatch(startChatListener());
    })
    .catch(error => {
      console.log('Firebase Authentication failed!', e.toString());
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
          last_message: msgData.image
            ? 'chat_message_image_attached'
            : msgData.text,
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

export const updateMessage = (room, bubble, callback) => (
  dispatch,
  getState,
) => {
  database()
    .ref(`/chatrooms/${room._id}/history/${bubble.date}`)
    .set({
      ...bubble,
      text: bubble.text,
      edited: true,
      image: null,
    })
    .then(() => {
      if (compareTimeStampWithDate(bubble.date, room.last_updated)) {
        dispatch(
          updateChatRoom({
            _id: room._id,
            last_message: bubble.text,
          }),
        );
      }
      callback();
    })
    .catch(e => {
      showAlert(e.toString());
    });
};

export const addEmoji = (bubbleId, emoji) => (dispatch, getState) => {
  const {selectedRoom, roomMessages} = getState().chatReducer;
  const {_id} = getState().profileReducer;
  const ts = new Date().getTime();
  database()
    .ref(`/chatrooms/${selectedRoom._id}/history/${bubbleId}`)
    .set({
      ...roomMessages[bubbleId],
      reactions: {
        ..._.get(roomMessages, [bubbleId, 'reactions'], {}),
        [ts]: {
          userId: _id,
          text: emoji,
        },
      },
    })
    .then(() => {})
    .catch(e => {
      showAlert(e.toString());
    });
};

export const deleteChatRoom = roomId => ({
  type: types.DELETE_CHAT_ROOM,
  payload: roomId,
});
