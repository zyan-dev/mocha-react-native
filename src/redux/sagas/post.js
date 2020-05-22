import {call, put, select} from 'redux-saga/effects';

export function* addOrUpdatePost(action) {
  const {
    postReducer: {selectedPost},
  } = yield select();
  if (selectedPost._id) {
    // update Post
  } else {
    // add Post
  }
}
