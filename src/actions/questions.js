import { saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { addUserAnswer } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleAnswerQuestion( answer, qid ){
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser, 
      qid, 
      answer 
    })
      .then(() => dispatch(answerQuestion({authedUser, qid, answer})))
      .then(() => dispatch(addUserAnswer({authedUser, qid, answer})))
      .then(() => dispatch(hideLoading()))
  }
}

export function answerQuestion ({authedUser, qid, answer}) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
} 