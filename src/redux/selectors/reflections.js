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
const getMyDailyObjectives = state =>
  state.reflectionReducer.myReflections.filter(
    ({type, data}) => capitalizeString(type) === 'Objective' && data.isDaily,
  );
const getMyWeeklyObjectives = state =>
  state.reflectionReducer.myReflections.filter(
    ({type, data}) => capitalizeString(type) === 'Objective' && !data.isDaily,
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
const getMyEmotions = state =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Emotion',
  );
const getMyNeeds = state =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Need',
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

const getUserChronotype = state =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Chronotype',
  );
const getUserMotivations = state =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Motivation',
  );
const getUserEmotions = state =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Emotion',
  );
const getUserNeeds = state =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Need',
  );

export {
  getMyValues,
  getMyManuals,
  getMyGoals,
  getMyDailyObjectives,
  getMyWeeklyObjectives,
  getMyFeedbacks,
  getMyChronotype,
  getMyMotivations,
  getMyEmotions,
  getMyNeeds,
  getUserValues,
  getUserManuals,
  getUserGoals,
  getUserFeedbacks,
  getUserChronotype,
  getUserMotivations,
  getUserEmotions,
  getUserNeeds,
};
