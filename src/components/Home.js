import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Grid, Card , Button, ButtonGroup } from '@material-ui/core'
import Question from './question-types/Question'
import { QTYPE } from './question-types/Question'


const UNANSWERED = "UNANSWERED"
const ANSWERED = "ANSWERED"

class Home extends Component {
  state = {
    showAnsweredQuestions: false
  }
  handleButtonClick(e) {
    const whichQuestions = e.currentTarget.name
    this.setState(() => ({
      showAnsweredQuestions: whichQuestions === ANSWERED
    }))
  }
  render(){
    const { authedUser, questions } = this.props
    const { showAnsweredQuestions } = this.state

    const questionsListIds = Object.keys(questions).filter(qid => {
      const didVote = [
        ...questions[qid].optionOne.votes,
        ...questions[qid].optionTwo.votes
      ].includes(authedUser)
      return this.state.showAnsweredQuestions ? didVote : !didVote
    }).sort((a, b) => questions[b].timestamp - questions[a].timestamp)


    if (authedUser === null) {
      return (
        <Redirect to="/" />
      )
    }

    return (
        <Card variant="outlined" style={{width: 600, padding: 10}}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <ButtonGroup>
                <Button
                  name={UNANSWERED}
                  variant={showAnsweredQuestions === false ? 'contained' : 'outlined'}
                  onClick={this.handleButtonClick.bind(this)}>Unanswered Questions</Button>
                <Button 
                  name={ANSWERED}
                  variant={showAnsweredQuestions === true ? 'contained' : 'outlined'}
                  onClick={this.handleButtonClick.bind(this)}>Answered Questions</Button>
              </ButtonGroup>
            </Grid>
            {questionsListIds.map(qid => (
              <Grid key={qid} item>
                <Question qid={qid} type={QTYPE.summary} />
              </Grid>
            ))}
          </Grid>
        </Card>
    )
  }
}

function mapStateToProps({ authedUser, questions }){
  return {
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Home)