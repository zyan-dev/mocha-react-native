import * as _ from 'lodash';
import * as types from '../actions/types';

const INITIAL_STATE = {
  allResources: [],
  bookmarkedResources: [],
  selectedMemberResources: [],
  searchedResources: [],
  selectedResource: [],
  recommendedResources: [],
  recommededOwners: [],
  initialResource: {
    title: '',
    link: '',
    type: 'book',
    tags: [],
  },
  searchedResourceByTitle: null,
  pageSearching: false,
  resourceAllPageIndex: 1,
  resourceBookmarkPageIndex: 1,
  resourceMemberPageIndex: 1,
  resourceSearchResourceIndex: 1,
  resourceRecommendResourceIndex: 1,
  resourceRecommendOwnersIndex: 1,
  resourceAllPageLimited: false,
  resourceBookmarkLimited: false,
  resourceMemberLimited: false,
  resourceSearchResourceLimited: false,
  resourceRcommendResourceLimited: false,
  resourceRcommendOwnersLimited: false,
  selectedMemberId: null,
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

    case types.SET_SEARCHED_RECOMMENDED_OWNERS:
      return {
        ...state,
        recommededOwners: action.payload,
      };
    case types.ADD_RECOMMENDED_OWNERS:
      return {
        ...state,
        recommededOwners: state.recommededOwners.concat(action.payload),
      };
    case types.SET_RECOMMENDED_OWNERS_PAGE_LIMITED:
      return {
        ...state,
        resourceRcommendOwnersLimited: action.payload,
      };
    case types.SET_RECOMMENDED_OWNERS_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.SET_RECOMMENDED_OWNERS_PAGE_INDEX:
      return {
        ...state,
        resourceRecommendOwnersIndex: action.payload,
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

    case types.RESET_MEMBER_RESOURCES:
      return {
        ...state,
        selectedMemberResources: [],
      };

    case types.SET_SEARCHED_MEMBER_RESOURCES:
      return {
        ...state,
        selectedMemberResources: action.payload,
      };
    case types.ADD_MEMBER_RESOURCES:
      return {
        ...state,
        selectedMemberResources: state.selectedMemberResources.concat(
          action.payload,
        ),
      };
    case types.SET_MEMBER_RESOURCE_PAGE_LIMITED:
      return {
        ...state,
        resourceMemberLimited: action.payload,
      };
    case types.SET_MEMBER_RESOURCE_STATE:
      return {
        ...state,
        pageSearching: action.payload,
      };
    case types.SET_MEMBER_RESOURCE_PAGE_INDEX:
      return {
        ...state,
        resourceMemberPageIndex: action.payload,
      };
    case types.SELECT_MEMBER:
      return {
        ...state,
        selectedMemberId: action.payload,
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
        searchedResources: state.bookmarkedResources,
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
        searchedResourceByTitle: action.payload,
      };

    default:
      return state;
  }
};

export default resourceReducer;
