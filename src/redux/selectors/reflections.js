import {capitalizeString} from 'services/operators';

const getMyValues = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Value',
  );
const getMyManuals = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Manual',
  );
const getMyGoals = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Goal',
  );
const getMyDailyObjectives = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type, data}) => capitalizeString(type) === 'Objective' && data.isDaily,
  );
const getMyWeeklyObjectives = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type, data}) => capitalizeString(type) === 'Objective' && !data.isDaily,
  );
const getMyChronotype = (state) =>
  state.reflectionReducer.myReflections.find(
    ({type}) => capitalizeString(type) === 'Chronotype',
  );
const getMyPersonality = (state) =>
  state.reflectionReducer.myReflections.find(
    ({type}) => capitalizeString(type) === 'Personality',
  );
const getMyMotivations = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Motivation',
  );
const getMyEmotions = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Emotion',
  );
const getMyNeeds = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Need',
  );
const getMyTapToCounts = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Tap',
  );
const getMyResources = (state) =>
  state.reflectionReducer.myReflections.filter(
    ({type}) => capitalizeString(type) === 'Resource',
  );

// User Reflections
const getUserValues = (state) =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Value',
  );
const getUserManuals = (state) =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Manual',
  );
const getUserGoals = (state) =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Goal',
  );
const getUserChronotype = (state) =>
  state.reflectionReducer.userReflections.find(
    ({type}) => capitalizeString(type) === 'Chronotype',
  );
const getUserMotivations = (state) =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Motivation',
  );
const getUserEmotions = (state) =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Emotion',
  );
const getUserNeeds = (state) =>
  state.reflectionReducer.userReflections.filter(
    ({type}) => capitalizeString(type) === 'Need',
  );

const getUserPersonality = (state) =>
  state.reflectionReducer.userReflections.find(
    ({type}) => capitalizeString(type) === 'Personality',
  );

const getUserDailyObjectives = (state) =>
  state.reflectionReducer.userReflections.filter(
    ({type, data}) => capitalizeString(type) === 'Objective' && data.isDaily,
  );
const getUserWeeklyObjectives = (state) =>
  state.reflectionReducer.userReflections.filter(
    ({type, data}) => capitalizeString(type) === 'Objective' && !data.isDaily,
  );

export {
  getMyValues,
  getMyManuals,
  getMyGoals,
  getMyDailyObjectives,
  getMyWeeklyObjectives,
  getMyChronotype,
  getMyPersonality,
  getMyMotivations,
  getMyEmotions,
  getMyNeeds,
  getMyTapToCounts,
  getMyResources,
  getUserValues,
  getUserManuals,
  getUserGoals,
  getUserChronotype,
  getUserMotivations,
  getUserEmotions,
  getUserNeeds,
  getUserPersonality,
  getUserDailyObjectives,
  getUserWeeklyObjectives,
};
