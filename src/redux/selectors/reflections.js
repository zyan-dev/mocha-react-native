const getMySpecialReflections = (state, reflectionType) => {
  const filtered = state.reflectionReducer.myReflections.filter(
    ({type}) => type === reflectionType,
  );
  return filtered || [];
};

const findMySpecialReflections = (state, reflectionType) =>
  state.reflectionReducer.myReflections.find(
    ({type}) => type === reflectionType,
  );

// User Reflections
const getUserSpecialReflections = (state, reflectionType) => {
  const filtered = state.reflectionReducer.userReflections.filter(
    ({type}) => type === reflectionType,
  );
  return filtered || [];
};

const findUserSpecialReflections = (state, reflectionType) =>
  state.reflectionReducer.userReflections.find(
    ({type}) => type === reflectionType,
  );

export {
  getMySpecialReflections,
  findMySpecialReflections,
  getUserSpecialReflections,
  findUserSpecialReflections,
};
