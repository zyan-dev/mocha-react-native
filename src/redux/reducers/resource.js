import * as _ from 'lodash';
import * as types from '../actions/types';

const INITIAL_STATE = {
  allResources: [],
  myResources: [],
  bookmarkedResources: [],
  selectedResource: [],
  initialResource: {
    title: '',
    link: '',
    type: 'book',
    tags: [],
  },
  searchResource: null,
};

const resourceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_ALL_RESOURCES:
      return {
        ...state,
        allResources: action.payload,
      };
    case types.SET_MY_RESOURCES:
      return {
        ...state,
        myResources: action.payload,
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
    case types.SET_BOOKMARKED_RESOURCES:
      return {
        ...state,
        bookmarkedResources: action.payload,
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    case types.SET_SEARCH_RESOURCE:
      return {
        ...state,
        searchResource: action.payload,
      };
    default:
      return state;
  }
};

export default resourceReducer;
