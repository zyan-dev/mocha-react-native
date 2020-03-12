import * as types from '../actions/types';

const INITIAL_STATE = {
  allUsers: [],
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
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case types.SET_ALL_TRUST_MEMBERS:
      return {
        ...state,
        trustMembers: action.payload,
      };
    case types.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          ...INITIAL_STATE.userProfile,
          ...action.payload,
        },
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default usersReducer;
