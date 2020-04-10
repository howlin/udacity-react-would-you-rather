import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import Question from './question-types/Question'
import { QTYPE } from './question-types/Question'

const QuestionDetails = (props) => {
  const { qid, questions, authedUser, loading } = props
  const q = questions[qid]
  let type = QTYPE.ask

  if( !loading ){

    if( q === undefined) {
      return <Redirect to='/404' />
    }

    const userHasAnswered = [
      ...q.optionOne.votes,
      ...q.optionTwo.votes
    ].includes(authedUser)
    type = userHasAnswered ? QTYPE.result : QTYPE.ask
  }

  if (authedUser === null) {
    return (
      <Redirect to={`/?returnTo=questions/${qid}`} />
    )
  }
  
  return (
    <div>
      {loading 
        ? <CircularProgress />
        : <Question qid={qid} type={type} />}
    </div>
  )
}

function mapStateToProps({ questions, authedUser }, props){
  const { qid } = props.match.params

  return {
    qid,
    questions,
    authedUser,
    loading: Object.keys(questions).length === 0
  }
}

export default connect(mapStateToProps)(QuestionDetails)