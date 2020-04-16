import * as _ from 'lodash';

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
  const userReflections = _.cloneDeep(state.reflectionReducer.myReflections);
  const filtered = userReflections.filter(({type}) => type === reflectionType);
  return filtered || [];
};

const findUserSpecialReflections = (state, reflectionType) => {
  const userReflections = _.cloneDeep(state.reflectionReducer.myReflections);
  return userReflections.find(({type}) => type === reflectionType);
};

export {
  getMySpecialReflections,
  findMySpecialReflections,
  getUserSpecialReflections,
  findUserSpecialReflections,
};
