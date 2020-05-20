import * as types from '../actions/types';

const INITIAL_STATE = {
  myRooms: [],
  selectedRoom: {},
  roomMessages: [],
  blockList: [],
  loading: false,
  lastMessageDateChecked: {},
  hasMissedMessages: false,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_MY_CHAT_ROOMS:
      return {
        ...state,
        myRooms: action.payload,
      };
    case types.SELECT_CHAT_ROOM:
      return {
        ...state,
        selectedRoom: action.payload,
      };
    case types.SET_CHAT_ROOM_MESSAGES:
      return {
        ...state,
        roomMessages: action.payload,
      };
    case types.SET_CHAT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.SET_CHAT_MISSED_STATE:
      return {
        ...state,
        hasMissedMessages: action.payload,
      };
    case types.UPDATE_LAST_MESSAGE_DATE:
      return {
        ...state,
        lastMessageDateChecked: {
          ...state.lastMessageDateChecked,
          ...action.payload,
        },
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default chatReducer;
