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

export const updateLastMessageDate = data => ({
  type: types.UPDATE_LAST_MESSAGE_DATE,
  payload: data,
});

export const updateChatRoom = data => ({
  type: types.UPDATE_CHAT_ROOM,
  payload: data,
});

export const checkChatMissedState = () => ({
  type: types.CHECK_CHAT_MISSED_STATE,
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

  // var Base64 = {
  //   _keyStr:
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  //   encode: function(e) {
  //     var t = '';
  //     var n, r, i, s, o, u, a;
  //     var f = 0;
  //     e = Base64._utf8_encode(e);
  //     while (f < e.length) {
  //       n = e.charCodeAt(f++);
  //       r = e.charCodeAt(f++);
  //       i = e.charCodeAt(f++);
  //       s = n >> 2;
  //       o = ((n & 3) << 4) | (r >> 4);
  //       u = ((r & 15) << 2) | (i >> 6);
  //       a = i & 63;
  //       if (isNaN(r)) {
  //         u = a = 64;
  //       } else if (isNaN(i)) {
  //         a = 64;
  //       }
  //       t =
  //         t +
  //         this._keyStr.charAt(s) +
  //         this._keyStr.charAt(o) +
  //         this._keyStr.charAt(u) +
  //         this._keyStr.charAt(a);
  //     }
  //     return t;
  //   },
  //   decode: function(e) {
  //     var t = '';
  //     var n, r, i;
  //     var s, o, u, a;
  //     var f = 0;
  //     e = e.replace(/++[++^A-Za-z0-9+/=]/g, '');
  //     while (f < e.length) {
  //       s = this._keyStr.indexOf(e.charAt(f++));
  //       o = this._keyStr.indexOf(e.charAt(f++));
  //       u = this._keyStr.indexOf(e.charAt(f++));
  //       a = this._keyStr.indexOf(e.charAt(f++));
  //       n = (s << 2) | (o >> 4);
  //       r = ((o & 15) << 4) | (u >> 2);
  //       i = ((u & 3) << 6) | a;
  //       t = t + String.fromCharCode(n);
  //       if (u != 64) {
  //         t = t + String.fromCharCode(r);
  //       }
  //       if (a != 64) {
  //         t = t + String.fromCharCode(i);
  //       }
  //     }
  //     t = Base64._utf8_decode(t);
  //     return t;
  //   },
  //   _utf8_encode: function(e) {
  //     e = e.replace(/\r\n/g, 'n');
  //     var t = '';
  //     for (var n = 0; n < e.length; n++) {
  //       var r = e.charCodeAt(n);
  //       if (r < 128) {
  //         t += String.fromCharCode(r);
  //       } else if (r > 127 && r < 2048) {
  //         t += String.fromCharCode((r >> 6) | 192);
  //         t += String.fromCharCode((r & 63) | 128);
  //       } else {
  //         t += String.fromCharCode((r >> 12) | 224);
  //         t += String.fromCharCode(((r >> 6) & 63) | 128);
  //         t += String.fromCharCode((r & 63) | 128);
  //       }
  //     }
  //     return t;
  //   },
  //   _utf8_decode: function(e) {
  //     var t = '';
  //     var n = 0;
  //     var r = (c1 = c2 = 0);
  //     while (n < e.length) {
  //       r = e.charCodeAt(n);
  //       if (r < 128) {
  //         t += String.fromCharCode(r);
  //         n++;
  //       } else if (r > 191 && r < 224) {
  //         c2 = e.charCodeAt(n + 1);
  //         t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
  //         n += 2;
  //       } else {
  //         c2 = e.charCodeAt(n + 1);
  //         c3 = e.charCodeAt(n + 2);
  //         t += String.fromCharCode(
  //           ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63),
  //         );
  //         n += 3;
  //       }
  //     }
  //     return t;
  //   },
  // };
  // Sign in to firebase
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
