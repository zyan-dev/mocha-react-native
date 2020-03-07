import * as types from '../actions/types';

const INITIAL_STATE = {
  _id: '',
  created: '',
  updated: '',
  phone: '',
  user_id: '',
  name: '',
  avatar: '',
  points: 0,
  pushToken: '',
  address: '',
  profileCompleted: false,
  name_pronoun: '',
  bio: '',
  gender_pronoun: '',
  email: '',
  userToken: '',
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_PROFILE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    case types.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default profileReducer;
