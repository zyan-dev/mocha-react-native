import {capitalizeString} from 'services/operators';

const getMyValues = state =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Value',
  );
const getMyManuals = state =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Manual',
  );
const getMyGoals = state =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Goal',
  );
const getMyFeedbacks = state =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Feedback',
  );
const getMyChronotype = state =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Chronotype',
  );
const getMyMotivations = state =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Motivation',
  );

// User Reflections
const getUserValues = state =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Value',
  );
const getUserManuals = state =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Manual',
  );
const getUserGoals = state =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Goal',
  );
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
  getMyMotivations,
  getUserValues,
  getUserManuals,
  getUserGoals,
  getUserFeedbacks,
};
