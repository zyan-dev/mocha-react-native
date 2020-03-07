import {AsyncStorage} from 'react-native';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {s3_Options} from '../utils/config';
const axios = require('axios');

const BACKEND_BASE_URL = 'https://api.mocha.me/api';
const API_TIMEOUT = 5000;

const URL_SEND_SMS = '/auth/signup-request';
const URL_VERIFY_SMS = '/auth/signup-confirm';
const URL_UPDATE_PROFILE = '/user/me';

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

const fileUploadToS3 = async file => {
  const response = await RNS3.put(file, s3_Options);
  return response;
};

export default {
  sendSMS,
  verifySMS,
  updateProfile,
  getMyProfile,
  fileUploadToS3,
};
