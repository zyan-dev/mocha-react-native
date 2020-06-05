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
  pageSearching: false,
  networkPageIndex: 1,
  networksWithResourcePermission: [],
  networksPageLimited: false,
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
    case types.SET_SEARCHED_OWNERS_WITH_RESOURCE_PERMISSION:
      return {
        ...state,
        networksWithResourcePermission: action.payload,
      };
    case types.ADD_OWNERS_WITH_RESOURCE_PERMISSION:
      return {
        ...state,
        networksWithResourcePermission: state.networksWithResourcePermission.concat(
          action.payload,
        ),
      };
    case types.SET_OWNERS_WITH_RESOURCE_PERMISSION_PAGE_LIMITED:
      return {
        ...state,
        networksPageLimited: action.payload,
      };
    case types.SET_OWNERS_WITH_RESOURCE_PERMISSION_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.SET_SEARCH_OWNERS_WITH_RESOURCE_PERMISSION_INDEX:
      return {
        ...state,
        networkPageIndex: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default networkReducer;
