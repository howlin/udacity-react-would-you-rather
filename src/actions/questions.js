import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { addUserAnswer, addUserQuestion } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText, 
      optionTwoText, 
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then((question) => dispatch(addUserQuestion(authedUser, question.id)))
      .then(() => dispatch(hideLoading()))
  }
}

export function addQuestion(question){
  return {
    type: ADD_QUESTION,
    question
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