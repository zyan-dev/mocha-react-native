import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import NavigationService from 'navigation/NavigationService';

export function* addOrUpdatePost(action) {
  const {
    postReducer: {selectedPost},
    profileReducer: {_id},
  } = yield select();
  yield put({type: types.API_CALLING});
  let temp = [];

  for (let i = 0; i < selectedPost.attachments.length; i++) {
    const path = selectedPost.attachments[i];
    if (path.indexOf('https://') < 0) {
      const s3Url = yield call(API.fileUploadToS3, {
        image: path,
        type: 'Post',
        userId: _id,
      });
      if (s3Url === 'error') {
        return;
      } else {
        temp.push(s3Url); // replace with S3 URL if local image
      }
    } else {
      temp.push(path);
    }
  }
  selectedPost.attachments = temp;
  if (selectedPost._id) {
    // update Post
    try {
      const response = yield call(API.updatePosts, {data: [selectedPost]});
      if (response.data.status === 'success') {
        yield put({type: types.GET_POSTS_BY_ID, payload: {id: _id, page: 1}});
        NavigationService.navigate('Progress');
      } else {
        yield put({
          type: types.API_FINISHED,
          payload: response.data.data.message,
        });
      }
    } catch (e) {
      yield put({type: types.API_FINISHED, payload: e.toString()});
    }
  } else {
    // add Post
    try {
      const response = yield call(API.addPosts, {data: [selectedPost]});
      if (response.data.status === 'success') {
        yield put({type: types.GET_POSTS_BY_ID, payload: {id: _id, page: 1}});
        NavigationService.navigate('Progress');
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
}

export function* getPostsById(action) {
  try {
    const {
      profileReducer: {_id},
    } = yield select();
    const {id, page} = action.payload;
    yield put({type: types.API_CALLING});
    const response = yield call(API.getPostsById, id, page);
    if (response.data.status === 'success') {
      yield put({
        type:
          action.payload.id === _id ? types.SET_MY_POSTS : types.SET_USER_POSTS,
        payload: response.data.data.posts,
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

export function* getPosts(action) {
  try {
    if (action.payload.page === 1) {
      yield put({
        type: types.SET_USER_POSTS,
        payload: [],
      });
    }
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: true,
    });
    yield put({type: types.API_CALLING});
    const response = yield call(
      API.getPosts,
      action.payload.title,
      action.payload.page,
    );
    if (response.data.status === 'success') {
      if (action.payload.page === 1) {
        yield put({
          type: types.SET_USER_POSTS,
          payload: response.data.data.posts,
        });
      } else {
        yield put({
          type: types.ADD_USER_POSTS,
          payload: response.data.data.posts,
        });
      }
      yield put({
        type: types.SET_SEARCH_PAGE_LIMITED,
        payload: action.payload.page === response.data.data.total_pages,
      });
      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({
      type: types.SET_PAGE_SEARCHING_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* removePosts(action) {
  try {
    const {
      profileReducer: {_id},
    } = yield select();
    yield put({type: types.API_CALLING});
    const response = yield call(API.removePosts, {data: action.payload});
    if (response.data.status === 'success') {
      yield put({
        type: types.GET_POSTS_BY_ID,
        payload: {id: _id, page: 1},
      });
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
