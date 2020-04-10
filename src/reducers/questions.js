import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
  ADD_QUESTION } from '../actions/questions';

export default function questions ( state = {}, action ) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWER_QUESTION: {
      const answeredQuestion = state[action.qid];
      const { authedUser, qid, answer } = action;
      answeredQuestion[answer].votes.push(authedUser);

      return {
        ...state,
        [qid]: answeredQuestion
      };
    }
    case ADD_QUESTION: {
      const { question } = action;
      return {
        ...state,
        [question.id]: question
      };
    }
    default:
      return state;
  }
}