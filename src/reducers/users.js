import { RECEIVE_USERS, ADD_USER_ANSWER, ADD_USER_QUESTION } from '../actions/users';

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USER_ANSWER: {
      const { authedUser, qid, answer } = action;
      const user = state[authedUser];
      user.answers[qid] = answer;

      return {
        ...state,
        [authedUser]: user
      };
    }
    case ADD_USER_QUESTION: {
      const { authedUser } = action;
      const user = state[action.authedUser];
      user.questions.push(action.qid);

      return {
        ...state,
        [authedUser]: user
      };
    }
    default:
      return state;
  }
}