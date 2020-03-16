const getMyValues = state =>
  state.reflectionReducer.myReflections.filter(({type}) => type === 'Value');
const getMyManuals = state =>
  state.reflectionReducer.myReflections.filter(({type}) => type === 'Manual');
const getMyGoals = state =>
  state.reflectionReducer.myReflections.filter(({type}) => type === 'Goal');
const getMyFeedbacks = state =>
  state.reflectionReducer.myReflections.filter(({type}) => type === 'Feedback');
const getMyChronotype = state => {
  const filtered = state.reflectionReducer.myReflections.filter(
    ({type}) => type === 'Chronotype',
  );
  return filtered;
};
const getUserValues = state =>
  state.reflectionReducer.userReflections.filter(({type}) => type === 'Value');
const getUserManuals = state =>
  state.reflectionReducer.userReflections.filter(({type}) => type === 'Manual');
const getUserGoals = state =>
  state.reflectionReducer.userReflections.filter(({type}) => type === 'Goal');
const getUserFeedbacks = state =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => type === 'Feedback',
  );

export {
  getMyValues,
  getMyManuals,
  getMyGoals,
  getMyFeedbacks,
  getMyChronotype,
  getUserValues,
  getUserManuals,
  getUserGoals,
  getUserFeedbacks,
};
