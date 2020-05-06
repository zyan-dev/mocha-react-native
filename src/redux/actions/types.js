// Router
export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';
export const SET_NEW_USER = 'SET_NEW_USER';
export const SET_LOADING = 'SET_LOADING';
export const SET_THEME_INDEX = 'SET_THEME_INDEX';
export const RESET_ALL_REDUCER = 'RESET_ALL_REDUCER';
export const SET_SOCIAL_DRAWER_OPENED = 'SET_SOCIAL_DRAWER_OPENED';
export const SET_PROFILE_DRAWER_OPENED = 'SET_PROFILE_DRAWER_OPENED';
export const SET_NETWORK_STATUS = 'SET_NETWORK_STATUS';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const API_CALLING = 'API_CALLING';
export const API_FINISHED = 'API_FINISHED';
export const TRACK_MIXPANEL_EVENT = 'TRACK_MIXPANEL_EVENT';
export const VISIT_TOOLS_TAB = 'VISIT_TOOLS_TAB';
export const VISIT_PROFILE_TAB = 'VISIT_PROFILE_TAB';
export const SET_MAIN_TAB_INDEX = 'SET_MAIN_TAB_INDEX';

// authentication
export const SET_SMS_VERIFY_STATUS = 'SET_SMS_VERIFY_STATUS';
export const COMPLETE_SIGN_UP = 'COMPLETE_SIGN_UP';
export const VERIFY_SMS = 'VERIFY_SMS';
export const SEND_SMS = 'SEND_SMS';

// Profile
export const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
export const GET_MY_PROFILE = 'GET_MY_PROFILE';
export const UPDATE_BASIC_PROFILE = 'UPDATE_BASIC_PROFILE';
export const UPDATE_CONTACT_PROFILE = 'UPDATE_CONTACT_PROFILE';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

// Reflection
export const GET_MY_REFLECTIONS = 'GET_MY_REFLECTIONS';
export const GET_USER_REFLECTIONS = 'GET_USER_REFLECTIONS';
export const SET_MY_REFLECTIONS = 'SET_MY_REFLECTIONS';
export const SET_USER_REFLECTIONS = 'SET_USER_REFLECTIONS';
export const SAVE_CHRONOTYPE = 'SAVE_CHRONOTYPE';
export const ADD_CHRONOTYPE = 'ADD_CHRONOTYPE';
export const SET_INITIAL_REFLECTION = 'SET_INITIAL_REFLECTION';
export const SELECT_REFLECTION = 'SELECT_MOTIVATION';
export const UPDATE_SELECTED_REFLECTION = 'UPDATE_SELECTED_MOTIVATION';
export const ADD_OR_UPDATE_REFLECTION = 'ADD_OR_UPDATE_MOTIVATION';
export const REMOVE_REFLECTION = 'REMOVE_REFLECTION';
export const ADD_CUSTOM_REFLECTION_TITLE = 'ADD_CUSTOM_REFLECTION_TITLE';
export const UPDATE_TAP_TO_COUNTS = 'UPDATE_TAP_TO_COUNTS';
export const RESET_MY_HABITS = 'RESET_MY_HABITS';
export const SET_HABIT_RESET_TIME = 'SET_HABIT_RESET_TIME';
export const GET_SUPPORTED_HABITS = 'GET_SUPPORTED_HABITS';
export const SET_SUPPORTED_HABITS = 'SET_SUPPORTED_HABITS';
export const UPDATE_SPECIFIC_REFLECTION = 'UPDATE_SPECIFIC_REFLECTION';
export const SAVE_REFLECTION_DRAFT = 'SAVE_REFLECTION_DRAFT';

// Feedback
export const GET_MY_FEEDBACKS = 'GET_MY_FEEDBACKS';
export const SET_MY_FEEDBACKS = 'SET_MY_FEEDBACKS';
export const GET_USER_FEEDBACKS = 'GET_USER_FEEDBACKS';
export const SET_USER_FEEDBACKS = 'SET_USER_FEEDBACKS';
export const SELECT_QUESTION = 'SELECT_QUESTION';
export const DESELECT_QUESTION = 'DESELECT_QUESTION';
export const SET_SELCTED_QUESTIONS = 'SET_SELCTED_QUESTIONS';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const REQUEST_FEEDBACK = 'REQUEST_FEEDBACK';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const REMOVE_FEEDBACK_REQUEST = 'REMOVE_FEEDBACK_REQUEST';
export const SUBMIT_FEEDBACK = 'SUBMIT_FEEDBACK';

// Notifications
export const GET_NOTIFICATION_SETTINGS = 'GET_NOTIFICATION_SETTINGS';
export const SET_NOTIFICATION_SETTINGS = 'SET_NOTIFICATION_SETTINGS';
export const UPDATE_NOTIFICATION_SETTINGS = 'UPDATE_NOTIFICATION_SETTINGS';

// User, TrustMembers
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SET_ALL_USERS = 'SET_ALL_USERS';
export const GET_ALL_TRUST_MEMBERS = 'GET_ALL_TRUST_MEMBERS';
export const SET_ALL_TRUST_MEMBERS = 'SET_ALL_TRUST_MEMBERS';
export const SEND_CONTACT_REQUEST = 'SEND_CONTACT_REQUEST';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const SET_SELECTED_USERS = 'SET_SELECTED_USERS';
export const SET_SINGLE_SELECTED_USERS = 'SET_SINGLE_SELECTED_USERS';
export const SELECT_USER = 'SELECT_USER';
export const DESELECT_USER = 'DESELECT_USER';
export const DECLINE_USER_REQUEST = 'DECLINE_USER_REQUEST';
export const APPROVE_REQUEST = 'APPROVE_REQUEST';

// Networks
export const GET_TRUST_NETWORKS = 'GET_TRUST_NETWORKS';
export const SET_TRUST_NETWORKS = 'SET_TRUST_NETWORKS';
export const INIT_TRUST_NETWORK = 'INIT_TRUST_NETWORK';
export const SELECT_TRUST_NETWORK = 'SELECT_TRUST_NETWORK';
export const UPDATE_SELECTED_TRUST_NETWORK = 'UPDATE_SELECTED_TRUST_NETWORK';
export const CREATE_TRUST_NETWORK = 'CREATE_TRUST_NETWORK';
export const UPDATE_TRUST_NETWORK = 'UPDATE_TRUST_NETWORK';
export const DELETE_TRUST_NETWORK = 'DELETE_TRUST_NETWORK';

// Resources
export const GET_ALL_RESOURCES = 'GET_ALL_RESOURCES';
export const SET_ALL_RESOURCES = 'SET_ALL_RESOURCES';
export const GET_MY_RESOURCES = 'GET_MY_RESOURCES';
export const SET_MY_RESOURCES = 'SET_MY_RESOURCES';
export const SET_INITIAL_RESOURCE = 'SET_INITIAL_RESOURCE';
export const SELECT_RESOURCE = 'SELECT_RESOURCE';
export const CREATE_RESOURCES = 'CREATE_RESOURCES';
export const UPDATE_RESOURCES = 'UPDATE_RESOURCES';
export const UPDATE_SELECTED_RESOURCE = 'UPDATE_SELECTED_RESOURCE';
export const REMOVE_RESOURCES = 'REMOVE_RESOURCES';
export const BOOKMARK_RESOURCE = 'BOOKMARK_RESOURCE';
export const SET_BOOKMARKED_RESOURCES = 'SET_BOOKMARKED_RESOURCES';

// Other
export const SET_PURCHASE_PRODUCTS = 'SET_PURCHASE_PRODUCTS';
export const PURCHASE_SUBSCRIPTION = 'PURCHASE_SUBSCRIPTION';
export const LOADING_PURCHASE_PRODUCTS = 'LOADING_PURCHASE_PRODUCTS';
export const SYNC_DATA = 'SYNC_DATA';
export const UPDATE_COMMITS = 'UPDATE_COMMITS';
export const GET_USER_COMMITS = 'GET_USER_COMMITS';
export const SET_USER_COMMITS = 'SET_USER_COMMITS';
export const SHOW_USER_HABITS = 'SHOW_USER_HABITS';
export const ADD_FAVORITE_TOOL = 'ADD_FAVORITE_TOOL';
export const REMOVE_FAVORITE_TOOL = 'REMOVE_FAVORITE_TOOL';
export const SET_FAVORITE_TOOLS = 'SET_FAVORITE_TOOLS';
export const SET_PROFILE_TAB = 'SET_PROFILE_TAB';
export const SET_TOOLS_TAB = 'SET_TOOLS_TAB';
export const CHECK_COMPLETED_BASIC_PROFILE = 'CHECK_COMPLETED_BASIC_PROFILE';
export const CHECK_WELCOME_BASIC_PROFILE = 'CHECK_WELCOME_BASIC_PROFILE';
export const CHECK_WELCOME_ADVANCE_PROFILE = 'CHECK_WELCOME_ADVANCE_PROFILE';
export const CHECK_COMPLETED_ADVANCE_PROFILE =
  'CHECK_COMPLETED_ADVANCE_PROFILE';
export const SEND_EMAIL = 'SEND_EMAIL';
