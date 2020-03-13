import * as types from '../actions/types';

const INITIAL_STATE = {
  myNetworks: [],
  selectedNetwork: {
    members: [],
    permissions: [],
    tags: [],
    owner: '',
    name: '',
    vulnerability: 1,
  },
};

const networkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_TRUST_NETWORKS:
      return {
        ...state,
        myNetworks: action.payload,
      };
    case types.INIT_TRUST_NETWORK:
      return {
        ...state,
        selectedNetwork: {
          ...INITIAL_STATE.selectedNetwork,
          owner: action.payload,
        },
      };
    case types.SELECT_TRUST_NETWORK:
      return {
        ...state,
        selectedNetwork: action.payload,
      };
    case types.UPDATE_SELECTED_TRUST_NETWORK:
      return {
        ...state,
        selectedNetwork: {
          ...state.selectedNetwork,
          ...action.payload,
        },
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default networkReducer;
