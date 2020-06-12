import {AsyncStorage} from 'react-native';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {s3_Options} from '../utils/config';
import {genetratedDate, showAlert} from './operators';
const axios = require('axios');

// const BACKEND_BASE_URL = 'https://api.mocha.me/api';
const BACKEND_BASE_URL = 'http://localhost:3002/api';
const API_TIMEOUT = 5000;

const URL_SEND_SMS = '/auth/signup-request';
const URL_VERIFY_SMS = '/auth/signup-confirm';
const URL_MY_PROFILE = '/user/me';
const URL_USER_FIND = '/user/find';
const URL_SEARCH_USER = '/user/search-user'; // returns user whom you can send request
const URL_SEARCH_UNTRUST_USER = '/user/search-untrustuser'; // returns untrust members
const URL_MY_PROFILE_PHONE = '/user/me/phone-number';
const URL_REFLECTION_UPDATE = '/reflection/update';
const URL_REFLECTION_ADD = '/reflection/add';
const URL_GET_MY_REFLECTION = '/reflection/list';
const URL_GET_USER_REFLECTION = '/reflection/list/user';
const URL_REFLECTION = '/reflection';
const URL_FEEDBACK = '/feedback';
const URL_REQUEST_FEEDBACK = '/feedback/request';
const URL_NOTIFICATION = '/notification';
const URL_TRUST_MEMBERS = '/member';
const URL_USER_PROFILE = '/user/trust/profile/';
const URL_NETWORK = '/network';
const URL_COMMIT = '/commit';
const URL_RESOURCE = '/resource';
const URL_CONTACT_US = '/contact-us';
const URL_SEARCH_RESOURCE = '/resource/books';
const URL_CHAT = '/chat';
const URL_POST = '/posts';
const URL_CHAT_VISIT = '/chat-visit';
const URL_CHALLENGE = '/challenge';

const apiCall = async (type, url, param, withToken = false, options = {}) => {
  let opt = {
    timeout: API_TIMEOUT,
    ...options,
  };
  const token = await AsyncStorage.getItem('userToken');
  console.log(`API calling: [${type}]`, url, param);
  console.log({token});
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
const updateProfilePhoneNumber = param =>
  apiCall('patch', URL_MY_PROFILE_PHONE, param, true);
const getMyProfile = () => apiCall('get', URL_MY_PROFILE, {}, true);
const deleteProfile = () => apiCall('delete', URL_MY_PROFILE, {}, true);
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
const getTrustMembers = param =>
  apiCall(
    'get',
    `${URL_TRUST_MEMBERS}?status=${param.status}&me=${param.me}&name=${
      param.name
    }&page=${param.page}`,
    {},
    true,
  );
const sendContactRequest = param =>
  apiCall('post', URL_TRUST_MEMBERS, param, true);
const sendFeedbackRequest = param => apiCall('post', URL_FEEDBACK, param, true);
const getTrustNetworks = () => apiCall('get', URL_NETWORK, {}, true);
const approveRequest = userId =>
  apiCall('patch', `${URL_TRUST_MEMBERS}`, {joiner: userId}, true);
const declineRequest = userId =>
  apiCall('delete', `${URL_TRUST_MEMBERS}/${userId}`, {}, true);
const createNetwork = param => apiCall('post', URL_NETWORK, param, true);
const deleteNetwork = networkId =>
  apiCall('delete', `${URL_NETWORK}/${networkId}`, {}, true);
const updateNetwork = network =>
  apiCall('patch', `${URL_NETWORK}/${network._id}`, network, true);
const getOwnersWithPermission = param =>
  apiCall(
    'get',
    `${URL_NETWORK}/permission/me?me=${param.me}&page=${param.page}&name=${
      param.name
    }&permission=${param.permission}`,
    {},
    true,
  );
const addReflections = param =>
  apiCall('post', URL_REFLECTION_ADD, param, true);
const updateReflections = param =>
  apiCall('post', URL_REFLECTION_UPDATE, param, true);
const removeReflection = param =>
  apiCall('post', `${URL_REFLECTION}/remove`, param, true);
const updateCommits = param => apiCall('patch', URL_COMMIT, param, true);
const getUserCommits = userId =>
  apiCall('get', `${URL_COMMIT}/${userId}`, {}, true);
const getAllResources = param =>
  apiCall(
    'get',
    `${URL_RESOURCE}?page=${param.pageIndex}&title=${param.title}&type=${
      param.type
    }&bookmark=${param.bookmark}&recommended=${param.recommended}`,
    {},
    true,
  );

const getSelectedMemberResources = data =>
  apiCall(
    'get',
    `${URL_RESOURCE}?ownerId=${data.member}&page=${data.pageIndex}`,
    {},
    true,
  );
const createResources = param =>
  apiCall('post', `${URL_RESOURCE}`, param, true);
const updateResources = param =>
  apiCall('patch', `${URL_RESOURCE}`, param, true);
const removeResources = param =>
  apiCall('post', `${URL_RESOURCE}/remove`, param, true);
const bookmarkResources = param =>
  apiCall('patch', `${URL_RESOURCE}/bookmark`, param, true);
const recommendResourceToMembers = param =>
  apiCall('post', `${URL_RESOURCE}/recommends`, param, true);
const getRecommendedOwners = pageIndex =>
  apiCall(
    'get',
    `${URL_RESOURCE}/list/recommendedOwners?page=${pageIndex}`,
    {},
    true,
  );
const removeRecommendedResource = param =>
  apiCall('post', `${URL_RESOURCE}/remove`, param, true);
const hiddenRecommendedResource = param =>
  apiCall('post', `${URL_RESOURCE}/setHidden`, param, true);
const getSupportedHabits = () =>
  apiCall('get', `${URL_REFLECTION}/habit-shared`, {}, true);
const sendEmail = param => apiCall('post', `${URL_CONTACT_US}`, param);
const findUserByName = param =>
  apiCall(
    'get',
    `${URL_USER_FIND}?name=${param.name}&page=${param.page}`,
    {},
    true,
  );
const getRequestUsers = param =>
  apiCall('get', `${URL_SEARCH_USER}?page=${param.page}`, {}, true);
const getUntrustMembers = param =>
  apiCall(
    'get',
    `${URL_SEARCH_UNTRUST_USER}?name=${param.name}&page=${param.page}`,
    {},
    true,
  );

const fileUploadToS3 = async ({image, type, userId}) => {
  const imageType = image.includes('.jpg') ? 'jpg' : 'png';
  const imageName = `${type}/${userId}_${new Date().getTime()}.${imageType}`;
  const file = {
    uri: image,
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

const getResourceByTitle = resource =>
  apiCall('get', `${URL_SEARCH_RESOURCE}/${resource}`, {}, true);
const createChatRoom = param => apiCall('post', `${URL_CHAT}`, param, true);
const getMyChatRooms = () => apiCall('get', `${URL_CHAT}`, {}, true);
const updateChatRoom = param =>
  apiCall('patch', `${URL_CHAT}/${param._id}`, param, true);
const deleteChatRoom = roomId =>
  apiCall('delete', `${URL_CHAT}/${roomId}`, {}, true);
const addPosts = param => apiCall('post', `${URL_POST}`, param, true);
const updatePosts = param => apiCall('post', `${URL_POST}/update`, param, true);
const getPostsById = (id, page) =>
  apiCall('get', `${URL_POST}/${id}?page=${page}`, {}, true);
const getPosts = (title, page) =>
  apiCall('get', `${URL_POST}/all?title=${title}&page=${page}`, {}, true);
const removePosts = param => apiCall('post', `${URL_POST}/remove`, param, true);
const getChatVisitStatus = () => apiCall('get', `${URL_CHAT_VISIT}`, {}, true);
const updateChatVisitStatus = param =>
  apiCall('patch', `${URL_CHAT_VISIT}`, param, true);
const updateChallenges = param =>
  apiCall('post', `${URL_CHALLENGE}/update`, param, true);
const addChallenges = param => apiCall('post', `${URL_CHALLENGE}`, param, true);
const getUserChallenges = id =>
  apiCall('get', `${URL_CHALLENGE}/${id}`, {}, true);

export default {
  sendSMS,
  verifySMS,
  updateProfile,
  updateProfilePhoneNumber,
  getMyProfile,
  fileUploadToS3,
  getMyReflections,
  getUserReflections,
  getMyFeedbacks,
  getUserFeedbacks,
  getNotificationSettings,
  updateNotificationSettings,
  createNotificationSettings,
  getTrustMembers,
  sendContactRequest,
  getUserProfile,
  sendFeedbackRequest,
  getTrustNetworks,
  approveRequest,
  declineRequest,
  createNetwork,
  updateNetwork,
  deleteNetwork,
  removeFeedbackRequest,
  submitFeedback,
  addReflections,
  updateReflections,
  removeReflection,
  deleteProfile,
  updateCommits,
  getUserCommits,
  getAllResources,
  createResources,
  updateResources,
  removeResources,
  bookmarkResources,
  getSelectedMemberResources,
  recommendResourceToMembers,
  getRecommendedOwners,
  removeRecommendedResource,
  hiddenRecommendedResource,
  getResourceByTitle,
  getSupportedHabits,
  sendEmail,
  findUserByName,
  getRequestUsers,
  getUntrustMembers,
  createChatRoom,
  getMyChatRooms,
  updateChatRoom,
  deleteChatRoom,
  getPostsById,
  addPosts,
  updatePosts,
  getPosts,
  removePosts,
  getChatVisitStatus,
  updateChatVisitStatus,
  getOwnersWithPermission,
  updateChallenges,
  addChallenges,
  getUserChallenges,
};
