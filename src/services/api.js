import {AsyncStorage} from 'react-native';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {s3_Options} from '../utils/config';
import {genetratedDate, showAlert} from './operators';
const axios = require('axios');

const BACKEND_BASE_URL = 'https://api.mocha.me/api';
const API_TIMEOUT = 5000;

const URL_SEND_SMS = '/auth/signup-request';
const URL_VERIFY_SMS = '/auth/signup-confirm';
const URL_UPDATE_PROFILE = '/user/me';
const URL_GET_MY_REFLECTION = '/reflection/list';
const URL_GET_USER_REFLECTION = '/reflection/list/user';
const URL_GET_MY_FEEDBACK = '/feedback';

const apiCall = async (type, url, param, withToken = false, options = {}) => {
  let opt = {
    timeout: API_TIMEOUT,
    ...options,
  };
  const token = await AsyncStorage.getItem('userToken');
  if (withToken) {
    opt = {
      ...opt,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  }
  if (type === 'get') {
    return axios[type](`${BACKEND_BASE_URL}${url}`, opt);
  } else {
    return axios[type](`${BACKEND_BASE_URL}${url}`, param, opt);
  }
};

const sendSMS = phone => apiCall('post', URL_SEND_SMS, {phone});
const verifySMS = param => apiCall('post', URL_VERIFY_SMS, param);
const updateProfile = param =>
  apiCall('patch', URL_UPDATE_PROFILE, param, true);
const getMyProfile = () => apiCall('get', URL_UPDATE_PROFILE, {}, true);
const getMyReflections = () => apiCall('get', URL_GET_MY_REFLECTION, {}, true);
const getUserReflections = userId =>
  apiCall('get', `${URL_GET_USER_REFLECTION}/${userId}`, {}, true);
const getMyFeedbacks = param => apiCall('get', URL_GET_MY_FEEDBACK, {}, true);

const fileUploadToS3 = async ({avatar, name}) => {
  const imageType = avatar.includes('.jpg') ? 'jpg' : 'png';
  const imageName = `${name}/avatar_${genetratedDate()}.${imageType}`;
  const file = {
    uri: avatar,
    name: imageName,
    type: `image/${imageType}`,
  };
  const response = await RNS3.put(file, s3_Options);
  if (response.status !== 201) {
    showAlert('Failed to upload image to S3');
    return 'error';
  } else {
    return response.body.postResponse.location;
  }
};

export default {
  sendSMS,
  verifySMS,
  updateProfile,
  getMyProfile,
  fileUploadToS3,
  getMyReflections,
  getUserReflections,
  getMyFeedbacks,
};
