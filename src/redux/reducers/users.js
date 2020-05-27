import * as types from '../actions/types';

const INITIAL_STATE = {
  pendingUsers: [],
  trustMembers: [],
  userProfile: {
    _id: '',
    created: '',
    updated: '',
    phone: '',
    user_id: '',
    name: '',
    avatar: '',
    points: 0,
    pushToken: '',
    neighborhood: '',
    namepronoun: '',
    bio: '',
    preferredtobecalled: '',
    preferredpronoun: '',
    email: '',
    avatarChanged: false,
  },
  userProfilePermissions: [],
  selectedUsers: [], // for multiple picker
  selectedUser: [], // for single picker
  searchedUsers: [], // for full search
  searchedUnTrustMembers: [], // for send request screen
  searchPageLimited: false,
  pageSearching: false,
  searchPageIndex: 1,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_TRUST_MEMBERS:
      return {
        ...state,
        trustMembers: action.payload,
      };
    case types.SET_PENDING_MEMBERS:
      return {
        ...state,
        pendingUsers: action.payload,
      };
    case types.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          ...INITIAL_STATE.userProfile,
          ...action.payload,
        },
      };
    case types.SET_USER_PROFILE_PERMISSIONS:
      return {
        ...state,
        userProfilePermissions: action.payload,
      };
    case types.SET_SELECTED_USERS:
      return {
        ...state,
        selectedUsers: action.payload,
      };
    case types.SELECT_USER:
      return {
        ...state,
        selectedUsers: state.selectedUsers.concat(action.payload),
      };
    case types.DESELECT_USER:
      return {
        ...state,
        selectedUsers: state.selectedUsers.filter(
          user => user._id !== action.payload._id,
        ),
      };
    case types.INIT_TRUST_NETWORK:
      return {
        ...state,
        selectedUsers: [],
      };
    case types.SET_SINGLE_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case types.SET_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: action.payload,
      };
    case types.ADD_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: state.searchedUsers.concat(action.payload),
      };
    case types.SET_SEARCHED_TRUST_MEMBERS:
      return {
        ...state,
        searchedUnTrustMembers: action.payload,
      };
    case types.ADD_SEARCHED_TRUST_MEMBERS:
      return {
        ...state,
        searchedUnTrustMembers: state.searchedUnTrustMembers.concat(
          action.payload,
        ),
      };
    case types.SET_SEARCH_PAGE_INDEX:
      return {
        ...state,
        searchPageIndex: action.payload,
      };
    case types.SET_SEARCH_PAGE_LIMITED:
      return {
        ...state,
        searchPageLimited: action.payload,
      };
    case types.SET_PAGE_SEARCHING_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default usersReducer;
