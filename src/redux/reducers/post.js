import * as _ from 'lodash';
import * as types from '../actions/types';

const emptyPost = {
  title: '',
  content: '',
  attachments: [],
  level_challenge: 2,
  level_morale: 2,
  skills: [],
  comments: [],
  reactions: {},
  post_updated: new Date(),
};

const INITIAL_STATE = {
  selectedPost: emptyPost,
  userPosts: [],
  myPosts: [],
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECT_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case types.UPDATE_SELECTED_POST:
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          ...action.payload,
        },
      };
    case types.SET_INITIAL_POST:
      return {
        ...state,
        selectedPost: _.cloneDeep(emptyPost),
      };
    case types.SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    case types.SET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default postReducer;
