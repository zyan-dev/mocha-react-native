import * as _ from 'lodash';
import * as types from '../actions/types';

const INITIAL_STATE = {
  allResources: [],
  myResources: [],
  bookmarkedResources: [],
  trustMemberResources: [],
  searchedResources: [],
  selectedResource: [],
  initialResource: {
    title: '',
    link: '',
    type: 'book',
    tags: [],
  },
  resourceByTitle: null,
  pageSearching: false,
  resourceAllPageIndex: 1,
  resourceMyPageIndex: 1,
  resourceBookmarkPageIndex: 1,
  resourceTrustMemberPageIndex: 1,
  resourceSearchResourceIndex: 1,
  resourceAllPageLimited: false,
  resourceMyPageLimited: false,
  resourceBookmarkLimited: false,
  resourceTrustMemberLimited: false,
  resourceSearchResourceLimited: false,
};

const resourceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_SEARCHED_ALL_RESOURCES:
      return {
        ...state,
        allResources: action.payload,
      };
    case types.ADD_ALL_RESOURCES:
      return {
        ...state,
        allResources: state.allResources.concat(action.payload),
      };
    case types.SET_ALL_RESOURCE_PAGE_LIMITED:
      return {
        ...state,
        resourceAllPageLimited: action.payload,
      };
    case types.SET_ALL_RESOURCE_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.SET_ALL_RESOURCE_PAGE_INDEX:
      return {
        ...state,
        resourceAllPageIndex: action.payload,
      };

    case types.SET_SEARCHED_MY_RESOURCES:
      return {
        ...state,
        myResources: action.payload,
      };
    case types.ADD_MY_RESOURCES:
      return {
        ...state,
        myResources: state.myResources.concat(action.payload),
      };
    case types.SET_MY_RESOURCE_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.SET_MY_RESOURCE_PAGE_LIMITED:
      return {
        ...state,
        resourceMyPageLimited: action.payload,
      };
    case types.SET_MY_RESOURCE_PAGE_INDEX:
      return {
        ...state,
        resourceMyPageIndex: action.payload,
      };

    case types.SET_SEARCHED_BOOKMARKED_RESOURCES:
      return {
        ...state,
        bookmarkedResources: action.payload,
      };
    case types.ADD_BOOKMARKED_RESOURCES:
      return {
        ...state,
        bookmarkedResources: state.bookmarkedResources.concat(action.payload),
      };
    case types.SET_BOOKMARKED_RESOURCE_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.SET_BOOKMARKED_RESOURCE_PAGE_LIMITED:
      return {
        ...state,
        resourceBookmarkLimited: action.payload,
      };
    case types.SET_BOOKMARKED_RESOURCE_PAGE_INDEX:
      return {
        ...state,
        resourceBookmarkPageIndex: action.payload,
      };

    case types.SET_SEARCHED_TRUST_MEMBER_RESOURCES:
      return {
        ...state,
        trustMemberResources: action.payload,
      };
    case types.ADD_TRUST_MEMBER_RESOURCES:
      return {
        ...state,
        trustMemberResources: state.trustMemberResources.concat(action.payload),
      };
    case types.SET_TRUST_MEMBER_RESOURCE_PAGE_LIMITED:
      return {
        ...state,
        resourceTrustMemberLimited: action.payload,
      };
    case types.SET_TRUST_MEMBER_RESOURCE_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.SET_TRUST_MEMBER_RESOURCE_PAGE_INDEX:
      return {
        ...state,
        resourceTrustMemberPageIndex: action.payload,
      };

    case types.SET_SEARCHED_RESOURCES:
      return {
        ...state,
        searchedResources: action.payload,
      };
    case types.ADD_SEARCH_RESOURCES:
      return {
        ...state,
        searchedResources: state.searchedResources.concat(action.payload),
      };
    case types.SET_SEARCH_RESOURCE_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.SET_SEARCH_RESOURCE_PAGE_LIMITED:
      return {
        ...state,
        resourceSearchResourceLimited: action.payload,
      };
    case types.SET_SEARCH_RESOURCE_PAGE_INDEX:
      return {
        ...state,
        resourceSearchResourceIndex: action.payload,
      };
    case types.RESET_SEARCH_RESOURCES:
      return {
        ...state,
        searchedResources: state.allResources,
      };

    case types.UPDATE_SELECTED_RESOURCE:
      return {
        ...state,
        selectedResource: {
          ...state.selectedResource,
          ...action.payload,
        },
      };
    case types.SELECT_RESOURCE:
      return {
        ...state,
        selectedResource: action.payload,
      };
    case types.SET_INITIAL_RESOURCE:
      return {
        ...state,
        selectedResource: {
          ..._.cloneDeep(INITIAL_STATE.initialResource),
          _id: new Date().getTime().toString(),
        },
      };

    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    case types.SET_RESOURCE_BY_TITLE:
      return {
        ...state,
        resourceByTitle: action.payload,
      };

    default:
      return state;
  }
};

export default resourceReducer;
