import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import {showAlert} from 'services/operators';
import NavigationService from 'navigation/NavigationService';
import resourceReducer from '../reducers/resource';

export function* getAllResources(action) {
  try {
    yield put({
      type: types.SET_ALL_RESOURCE_STATE,
      payload: true,
    });

    const response = yield call(API.getAllResources, action.payload);

    if (response.data.status === 'success') {
      if (action.payload === 1) {
        yield put({
          type: types.SET_SEARCHED_ALL_RESOURCES,
          payload: response.data.data.resources,
        });
      } else {
        yield put({
          type: types.ADD_ALL_RESOURCES,
          payload: response.data.data.resources,
        });
        yield put({
          type: types.SET_ALL_RESOURCE_PAGE_INDEX,
          payload: action.payload,
        });
      }
      yield put({
        type: types.SET_ALL_RESOURCE_PAGE_LIMITED,
        payload: action.payload >= response.data.data.total_pages,
      });
      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_ALL_RESOURCE_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({
      type: types.SET_ALL_RESOURCE_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* getMyResources(action) {
  try {
    yield put({
      type: types.SET_MY_RESOURCE_STATE,
      payload: true,
    });

    const response = yield call(API.getMyResources, action.payload);

    if (response.data.status === 'success') {
      if (action.payload === 1) {
        yield put({
          type: types.SET_SEARCHED_MY_RESOURCES,
          payload: response.data.data.resources,
        });
      } else {
        yield put({
          type: types.ADD_MY_RESOURCES,
          payload: response.data.data.resources,
        });
        yield put({
          type: types.SET_MY_RESOURCE_PAGE_INDEX,
          payload: action.payload,
        });
      }
      yield put({
        type: types.SET_MY_RESOURCE_PAGE_LIMITED,
        payload: action.payload >= response.data.data.total_pages,
      });

      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_MY_RESOURCE_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({
      type: types.SET_MY_RESOURCE_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* getBookmarkedResources(action) {
  try {
    yield put({
      type: types.SET_BOOKMARKED_RESOURCE_STATE,
      payload: true,
    });

    const response = yield call(API.getBookmarkedResources, action.payload);

    if (response.data.status === 'success') {
      if (action.payload === 1) {
        yield put({
          type: types.SET_SEARCHED_BOOKMARKED_RESOURCES,
          payload: response.data.data.resources,
        });
      } else {
        yield put({
          type: types.ADD_BOOKMARKED_RESOURCES,
          payload: response.data.data.resources,
        });
        yield put({
          type: types.SET_BOOKMARKED_RESOURCE_PAGE_INDEX,
          payload: action.payload,
        });
      }
      yield put({
        type: types.SET_BOOKMARKED_RESOURCE_PAGE_LIMITED,
        payload: action.payload >= response.data.data.total_pages,
      });

      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_BOOKMARKED_RESOURCE_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({
      type: types.SET_BOOKMARKED_RESOURCE_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* getTrustMemberResources(action) {
  try {
    yield put({
      type: types.SET_TRUST_MEMBER_RESOURCE_STATE,
      payload: true,
    });

    const response = yield call(API.getTrustMemberResources, action.payload);

    if (response.data.status === 'success') {
      if (action.payload.pageIndex === 1) {
        yield put({
          type: types.SET_SEARCHED_TRUST_MEMBER_RESOURCES,
          payload: response.data.data.resources,
        });
      } else {
        yield put({
          type: types.ADD_TRUST_MEMBER_RESOURCES,
          payload: response.data.data.resources,
        });
        yield put({
          type: types.SET_TRUST_MEMBER_RESOURCE_PAGE_INDEX,
          payload: action.payload.pageIndex,
        });
      }
      yield put({
        type: types.SET_TRUST_MEMBER_RESOURCE_PAGE_LIMITED,
        payload: action.payload.pageIndex >= response.data.data.total_pages,
      });

      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_TRUST_MEMBER_RESOURCE_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({
      type: types.SET_TRUST_MEMBER_RESOURCE_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* searchResources(action) {
  try {
    yield put({
      type: types.SET_SEARCH_RESOURCE_STATE,
      payload: true,
    });

    yield put({type: types.API_CALLING});
    const response = yield call(API.searchResources, action.payload);

    if (response.data.status === 'success') {
      if (action.payload.pageIndex === 1) {
        yield put({
          type: types.SET_SEARCHED_RESOURCES,
          payload: response.data.data.resources,
        });
      } else {
        yield put({
          type: types.ADD_SEARCH_RESOURCES,
          payload: response.data.data.resources,
        });
        yield put({
          type: types.SET_SEARCH_RESOURCE_PAGE_INDEX,
          payload: action.payload.pageIndex,
        });
      }
      yield put({
        type: types.SET_SEARCH_RESOURCE_PAGE_LIMITED,
        payload: action.payload.pageIndex >= response.data.data.total_pages,
      });

      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_SEARCH_RESOURCE_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({
      type: types.SET_SEARCH_RESOURCE_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* createResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.createResources, {
      data: action.payload,
    });
    if (response.data.status === 'success') {
      const {resourceReducer} = yield select();
      yield put({
        type: types.GET_MY_RESOURCES,
        payload: 1,
      });
      // yield put({
      //   type: types.GET_ALL_RESOURCES,
      //   payload: 1,
      // });

      yield put({
        type: types.SET_MY_RESOURCE_PAGE_INDEX,
        payload: 1,
      });

      yield put({
        type: types.SET_ALL_RESOURCE_PAGE_INDEX,
        payload: 1,
      });

      yield put({
        type: types.SET_RESOURCE_BY_TITLE,
        payload: {},
      });
      NavigationService.navigate('Resources');
      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* updateResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.updateResources, {
      data: action.payload,
    });
    if (response.data.status === 'success') {
      const {resourceReducer} = yield select();
      yield put({
        type: types.GET_MY_RESOURCES,
        payload: 1,
      });

      // yield put({
      //   type: types.GET_ALL_RESOURCES,
      //   payload: 1,
      // });

      yield put({
        type: types.SET_MY_RESOURCE_PAGE_INDEX,
        payload: 1,
      });

      yield put({
        type: types.SET_ALL_RESOURCE_PAGE_INDEX,
        payload: 1,
      });

      yield put({
        type: types.SET_RESOURCE_BY_TITLE,
        payload: {},
      });
      NavigationService.navigate('Resources');
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* removeResources(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.removeResources, {
      data: action.payload,
    });
    if (response.data.status === 'success') {
      yield put({type: types.GET_ALL_RESOURCES});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* toggleBookmarkedResource(action) {
  try {
    try {
      yield put({type: types.API_CALLING});
      const response = yield call(API.bookmarkResources, action.payload);
      if (response.data.status === 'success') {
        const {resourceReducer} = yield select();
        yield put({
          type: types.GET_BOOKMARKED_RESOURCES,
          payload: 1,
        });
        yield put({
          type: types.GET_RECOMMENDED_RESOURCES,
          payload: 1,
        });
        // yield put({
        //   type: types.GET_ALL_RESOURCES,
        //   payload: 1,
        // });
        yield put({
          type: types.GET_MY_RESOURCES,
          payload: 1,
        });
        yield put({
          type: types.GET_TRUST_MEMBER_RESOURCES,
          payload: {
            pageIndex: 1,
            trustMember: resourceReducer.selectedTrustMemberId,
          },
        });

        yield put({
          type: types.SET_MY_RESOURCE_PAGE_INDEX,
          payload: 1,
        });

        yield put({
          type: types.SET_ALL_RESOURCE_PAGE_INDEX,
          payload: 1,
        });

        yield put({
          type: types.SET_BOOKMARKED_RESOURCE_PAGE_INDEX,
          payload: 1,
        });

        yield put({
          type: types.SET_TRUST_MEMBER_RESOURCE_PAGE_INDEX,
          payload: 1,
        });
        yield put({
          type: types.SET_RECOMMENDED_RESOURCE_PAGE_INDEX,
          payload: 1,
        });
      } else {
        yield put({
          type: types.API_FINISHED,
          payload: response.data.data.message,
        });
      }
    } catch (e) {
      yield put({type: types.API_FINISHED, payload: e.toString()});
    }
  } catch (e) {
    showAlert(e.toString());
  }
}

export function* getResourceByTitle(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.getResourceByTitle, action.payload);

    if (response.data.status === 'success') {
      yield put({
        type: types.SET_RESOURCE_BY_TITLE,
        payload: response.data.data.resources,
      });
      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* recommendResourceToMembers(action) {
  try {
    yield put({type: types.API_CALLING});
    const response = yield call(API.recommendResourceToMembers, action.payload);

    if (response.data.status === 'success') {
      yield put({
        type: types.SET_RESOURCE_BY_TITLE,
        payload: {},
      });
      yield put({type: types.API_FINISHED});
      NavigationService.navigate('Resources');
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
  } catch (e) {
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}

export function* getRecommendedResources(action) {
  try {
    yield put({
      type: types.SET_RECOMMENDED_RESOURCE_STATE,
      payload: true,
    });

    const response = yield call(API.getRecommendedResources, action.payload);

    if (response.data.status === 'success') {
      if (action.payload === 1) {
        yield put({
          type: types.SET_SEARCHED_RECOMMENDED_RESOURCES,
          payload: response.data.data.resources,
        });
      } else {
        yield put({
          type: types.ADD_RECOMMENDED_RESOURCES,
          payload: response.data.data.resources,
        });
        yield put({
          type: types.SET_RECOMMENDED_RESOURCE_PAGE_INDEX,
          payload: action.payload,
        });
      }
      yield put({
        type: types.SET_RECOMMENDED_RESOURCE_PAGE_LIMITED,
        payload: action.payload >= response.data.data.total_pages,
      });

      yield put({type: types.API_FINISHED});
    } else {
      yield put({
        type: types.API_FINISHED,
        payload: response.data.data.message,
      });
    }
    yield put({
      type: types.SET_RECOMMENDED_RESOURCE_STATE,
      payload: false,
    });
  } catch (e) {
    yield put({
      type: types.SET_RECOMMENDED_RESOURCE_STATE,
      payload: false,
    });
    yield put({type: types.API_FINISHED, payload: e.toString()});
  }
}
