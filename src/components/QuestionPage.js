import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import Question from './question-types/Question'
import { QTYPE } from './question-types/Question'

const QuestionDetails = (props) => {
  const { qid, loading } = props
  return (
    <div>
      {loading 
        ? <CircularProgress />
        : <Question qid={qid} type={QTYPE.ask} />}
    </div>
  )
}

function mapStateToProps({ authedUser, questions, users}, props){
  const { qid } = props.match.params

  return {
    qid,
    loading: Object.keys(questions).length === 0
  }
}

export default connect(mapStateToProps)(QuestionDetails)