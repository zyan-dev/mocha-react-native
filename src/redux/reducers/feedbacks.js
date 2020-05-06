import * as types from '../actions/types';
import {SampleFeedbackQuestions} from 'utils/constants';

const INITIAL_STATE = {
  myFeedbacks: [],
  userFeedbacks: [],
  questions: SampleFeedbackQuestions,
  selectedQuestions: [], // feedback questions for new request
};

const feedbackReducer = (state = INITIAL_STATE, action) => {
  console.log({questions: state.questions});
  switch (action.type) {
    case types.SET_MY_FEEDBACKS:
      return {
        ...state,
        myFeedbacks: action.payload,
      };
    case types.SET_USER_FEEDBACKS:
      return {
        ...state,
        userFeedbacks: action.payload,
      };
    case types.SET_SELCTED_QUESTIONS:
      return {
        ...state,
        selectedQuestions: action.payload,
      };
    case types.SELECT_QUESTION:
      return {
        ...state,
        selectedQuestions: state.selectedQuestions.concat(action.payload),
      };
    case types.DESELECT_QUESTION:
      return {
        ...state,
        selectedQuestions: state.selectedQuestions.filter(
          question => question !== action.payload,
        ),
      };
    case types.CREATE_QUESTION:
      return {
        ...state,
        questions: state.questions.concat(action.payload),
        selectedQuestions: state.selectedQuestions.concat(action.payload),
      };
    case types.ADD_NEW_QUESTION:
      return {
        ...state,
        questions: state.questions.concat(action.payload),
      };
    case types.RESET_ALL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default feedbackReducer;
