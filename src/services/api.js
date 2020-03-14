import {AsyncStorage} from 'react-native';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {s3_Options} from '../utils/config';
import {genetratedDate, showAlert} from './operators';
const axios = require('axios');

const BACKEND_BASE_URL = 'https://api.mocha.me/api';
const API_TIMEOUT = 5000;

const URL_SEND_SMS = '/auth/signup-request';
const URL_VERIFY_SMS = '/auth/signup-confirm';
const URL_MY_PROFILE = '/user/me';
const URL_GET_MY_REFLECTION = '/reflection/list';
const URL_GET_USER_REFLECTION = '/reflection/list/user';
const URL_FEEDBACK = '/feedback';
const URL_REQUEST_FEEDBACK = '/feedback/request';
const URL_NOTIFICATION = '/notification';
const URL_ALL_USERS = '/user/all';
const URL_TRUST_MEMBERS = '/member';
const URL_USER_PROFILE = '/user/profile/';
const URL_NETWORK = '/network';

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
  if (type === 'get' || type === 'delete') {
    return axios[type](`${BACKEND_BASE_URL}${url}`, opt);
  } else {
    return axios[type](`${BACKEND_BASE_URL}${url}`, param, opt);
  }
};

const sendSMS = phone => apiCall('post', URL_SEND_SMS, {phone});
const verifySMS = param => apiCall('post', URL_VERIFY_SMS, param);
const updateProfile = param => apiCall('patch', URL_MY_PROFILE, param, true);
const getMyProfile = () => apiCall('get', URL_MY_PROFILE, {}, true);
const getUserProfile = userId =>
  apiCall('get', `${URL_USER_PROFILE}${userId}`, {}, true);
const getMyReflections = () => apiCall('get', URL_GET_MY_REFLECTION, {}, true);
const getUserReflections = userId =>
  apiCall('get', `${URL_GET_USER_REFLECTION}/${userId}`, {}, true);
const getMyFeedbacks = () => apiCall('get', URL_FEEDBACK, {}, true);
const submitFeedback = (id, param) =>
  apiCall('patch', `${URL_FEEDBACK}/${id}`, param, true);
const removeFeedbackRequest = id =>
  apiCall('delete', `${URL_REQUEST_FEEDBACK}/${id}`, {}, true);
const getUserFeedbacks = userId =>
  apiCall('get', `${URL_FEEDBACK}/${userId}`, {}, true);
const getNotificationSettings = () =>
  apiCall('get', URL_NOTIFICATION, {}, true);
const updateNotificationSettings = param =>
  apiCall('patch', URL_NOTIFICATION, param, true);
const createNotificationSettings = param =>
  apiCall('post', URL_NOTIFICATION, param, true);
const getAllUsers = param => apiCall('get', URL_ALL_USERS, {}, true);
const getAllTrustMembers = param => apiCall('get', URL_TRUST_MEMBERS, {}, true);
const sendContactRequest = param =>
  apiCall('post', URL_TRUST_MEMBERS, param, true);
const sendFeedbackRequest = param => apiCall('post', URL_FEEDBACK, param, true);
const getTrustNetworks = () => apiCall('get', URL_NETWORK, {}, true);
const declineRequest = userId =>
  apiCall('delete', `${URL_TRUST_MEMBERS}/${userId}`, {}, true);
const createNetwork = param => apiCall('post', URL_NETWORK, param, true);
const deleteNetwork = networkId =>
  apiCall('delete', `${URL_NETWORK}/${networkId}`, {}, true);
const updateNetwork = network =>
  apiCall('patch', `${URL_NETWORK}/${network._id}`, network, true);

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
  getUserFeedbacks,
  getNotificationSettings,
  updateNotificationSettings,
  createNotificationSettings,
  getAllUsers,
  getAllTrustMembers,
  sendContactRequest,
  getUserProfile,
  sendFeedbackRequest,
  getTrustNetworks,
  declineRequest,
  createNetwork,
  updateNetwork,
  deleteNetwork,
  removeFeedbackRequest,
  submitFeedback,
};
