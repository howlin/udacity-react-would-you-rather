import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import Question from './question-types/Question'
import { QTYPE } from './question-types/Question'

const QuestionDetails = (props) => {
  const { qid, questions, authedUser, loading } = props
  const q = questions[qid]
  let type = QTYPE.ask

  if( !loading ){
    const userHasAnswered = [
      ...q.optionOne.votes,
      ...q.optionTwo.votes
    ].includes(authedUser)
    type = userHasAnswered ? QTYPE.result : QTYPE.ask
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