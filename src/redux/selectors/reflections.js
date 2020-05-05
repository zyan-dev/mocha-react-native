import * as _ from 'lodash';
import {mainTabKeys} from 'utils/constants';

const getMySpecialReflections = (state, reflectionType) => {
  const myReflections = _.cloneDeep(state.reflectionReducer.myReflections);
  const filtered = myReflections.filter(({type}) => type === reflectionType);
  return filtered || [];
};

const findMySpecialReflections = (state, reflectionType) => {
  const myReflections = _.cloneDeep(state.reflectionReducer.myReflections);
  return myReflections.find(({type}) => type === reflectionType);
};

// User Reflections
const getUserSpecialReflections = (state, reflectionType) => {
  const userReflections = _.cloneDeep(state.reflectionReducer.userReflections);
  const filtered = userReflections.filter(({type}) => type === reflectionType);
  return filtered || [];
};

const findUserSpecialReflections = (state, reflectionType) => {
  const userReflections = _.cloneDeep(state.reflectionReducer.userReflections);
  return userReflections.find(({type}) => type === reflectionType);
};

const getSelectedReflection = state => {
  const mainTabIndex = state.routerReducer.mainTabIndex;
  return state.reflectionReducer.selectedReflection[mainTabKeys[mainTabIndex]];
};

export {
  getMySpecialReflections,
  findMySpecialReflections,
  getUserSpecialReflections,
  findUserSpecialReflections,
  getSelectedReflection,
};
