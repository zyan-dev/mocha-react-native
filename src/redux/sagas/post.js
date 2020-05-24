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
  } else {
    // add Post
    try {
      const response = yield call(API.addPost, {data: [selectedPost]});
      if (response.data.status === 'success') {
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
}
